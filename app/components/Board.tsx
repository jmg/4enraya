import { useState } from "react"

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faRedoAlt } from "@fortawesome/free-solid-svg-icons";
import { RoundedPiece, Tile } from "./Piece"
import { HEIGHT, WIDTH } from "../config"

interface IBoard {
    [key: number]: (number|null)[]
}

export default function Board() {

    const getNewBoard = () => {

        return Array.from({ length: HEIGHT }).map(() => Array.from({ length: WIDTH }).map(() => null))
    }

    const [board, setBoard] = useState<IBoard>(getNewBoard())
    const [player, setPlayer] = useState(1)
    const [winner, setWinner] = useState(false)

    const playPiece = (col: number) => {

        if (winner) {
            return
        }

        const findFreeSpace = (col: number) => {

            for (let i = HEIGHT - 1; i >= 0; i--) {
                if (board[i][col] === null) {
                    return i
                }
            }
            return -1
        }

        const row = findFreeSpace(col)
        if (row === -1) {
            return
        }

        const newBoard = structuredClone(board)
        newBoard[row][col] = player

        setBoard(newBoard)
        setPlayer(player === 1 ? 2 : 1)

        checkWinner(newBoard)
    }

    const checkWinner = (board: number[][]) => {

        for (let i = 0; i < HEIGHT; i++) {
            for (let j = 0; j < WIDTH; j++) {
                if (board[i][j] !== null) {
                    if (j + 3 < WIDTH && board[i][j] === board[i][j + 1] && board[i][j] === board[i][j + 2] && board[i][j] === board[i][j + 3]) {
                        setWinner(true)
                        return
                    }
                    if (i + 3 < HEIGHT) {
                        if (board[i][j] === board[i + 1][j] && board[i][j] === board[i + 2][j] && board[i][j] === board[i + 3][j]) {
                            setWinner(true)
                            return
                        }
                        if (j + 3 < WIDTH && board[i][j] === board[i + 1][j + 1] && board[i][j] === board[i + 2][j + 2] && board[i][j] === board[i + 3][j + 3]) {
                            setWinner(true)
                            return
                        }
                        if (j - 3 >= 0 && board[i][j] === board[i + 1][j - 1] && board[i][j] === board[i + 2][j - 2] && board[i][j] === board[i + 3][j - 3]) {
                            setWinner(true)
                            return
                        }
                    }
                }
            }
        }
    }

    const resetBoard = () => {

        setBoard(getNewBoard())
        setPlayer(1)
        setWinner(false)
    }

    return <>
        <div className="mb-12">
        {winner && <div className="flex flex-row items-center justify-center gap-10">
            <h1 className="text-3xl font-bold" style={{"color": player === 1 ? "green": "red"}}>Player {player === 1 ? "green" : "red"} wins!</h1>
            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={resetBoard}>
                Play again
                <FontAwesomeIcon icon={faRedoAlt} className="ml-2" />
            </button>
        </div>}
        {!winner && <h1 className={`text-3xl font-bold " + ${player === 1 ? "text-red-500": "text-green-500"}`}>Player {player === 1 ? "red" : "green"} turn</h1>}
        </div>

        <div className="flex flex-col items-center justify-center gap-10">
            <div>
                {board.map((row, i) => (
                    <div key={i} style={{ display: "flex" }}>
                        {row.map((cell, j) => (
                            <div key={(i+1)*j} onClick={() => playPiece(j)}>
                            <Tile>
                                {cell === 1 && <RoundedPiece color="red" row={i} />}
                                {cell === 2 && <RoundedPiece color="green" row={i} />}
                            </Tile>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    </>
}

