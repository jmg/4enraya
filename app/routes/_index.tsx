import type { MetaFunction } from "@remix-run/node"
import { useState } from "react"
import { motion } from "framer-motion"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faRedoAlt } from "@fortawesome/free-solid-svg-icons";

export const meta: MetaFunction = () => {
    return [
        { title: "Four in Line" },
        { name: "description", content: "Four in Line" },
    ]
}

const WIDTH = 7
const HEIGHT = 6
const PIECE_SIZE = 100

const RoundedPiece = ({ color, row }) => {

    return (
        <motion.div initial={{ y: - (row + 1) * PIECE_SIZE }} animate={{ y: 0 }} transition={{ ease: "easeOut", duration: 0.5 }}>
        <div style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            backgroundColor: color,
        }}/>
        </motion.div>
    )
}

const Tile = ({children}) => {

    return <div style={{
        width: PIECE_SIZE,
        height: PIECE_SIZE,
    }} className="flex flex-col items-center justify-center border-2">
        {children}
    </div>
}

export default function Index() {

    const [board, setBoard] = useState(Array.from({ length: HEIGHT }).map(() => Array.from({ length: WIDTH }).map(() => null)))
    const [player, setPlayer] = useState(1)
    const [winner, setWinner] = useState(false)

    const putPiece = (col: number) => {

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

        setBoard(Array.from({ length: HEIGHT }).map(() => Array.from({ length: WIDTH }).map(() => null)))
        setPlayer(1)
        setWinner(false)
    }

    return (
        <div className="flex flex-col items-center justify-center gap-10 h-screen">

            <h1 className="text-3xl font-bold text-blue-500 underline">Four in Line</h1>

            <div className="flex flex-col items-center justify-center gap-10">
                <div>
                    {board.map((row, i) => (
                        <div key={i} style={{ display: "flex" }}>
                            {row.map((cell, j) => (
                                <div key={(i+1)*j} onClick={() => putPiece(j)}>
                                <Tile>
                                    {cell === 1 && <RoundedPiece color="red" row={i} />}
                                    {cell === 2 && <RoundedPiece color="green" row={i} />}
                                </Tile>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

                {winner && <div className="flex flex-row items-center justify-center gap-10">
                    <h1 className="text-3xl font-bold" style={{"color": player === 1 ? "green": "red"}}>Player {player === 1 ? "green" : "red"} wins!</h1>
                    <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={resetBoard}>
                        Play again
                        <FontAwesomeIcon icon={faRedoAlt} className="ml-2" />
                    </button>
                </div>}
                {!winner && <h1 className={`text-3xl font-bold " + ${player === 1 ? "text-red-500": "text-green-500"}`}>Player {player === 1 ? "red" : "green"} turn</h1>}
            </div>

        </div>
    )
}
