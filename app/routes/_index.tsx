import type { MetaFunction } from "@remix-run/node"
import { useState } from "react"

export const meta: MetaFunction = () => {
    return [
        { title: "4 en raya" },
        { name: "description", content: "4 en raya" },
    ]
}

const WIDTH = 7
const HEIGHT = 6

const RoundedPiece = ({ color }) => {

    return (
        <div style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            backgroundColor: color,
        }}/>
    )
}

const Tile = ({children}) => {

    return <div style={{
        width: "100px",
        height: "100px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        border: "1px solid #000",
        fontSize: "2em",
    }}>
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

        //check 4 in line horizontally, vertically and diagonally
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
        <div style={{ fontFamily: "system-ui, sans-serif", lineHeight: "1.8", display: "flex", alignItems: "center", justifyContent: "center", height: "95vh"  }}>

            <div style={{display: "flex", flexDirection: "column", gap: "10px", textAlign: "center"}}>
                <div>
                    {board.map((row, i) => (
                        <div key={i} style={{ display: "flex" }}>
                            {row.map((cell, j) => (
                                <div key={(i+1)*j} onClick={() => putPiece(j)}>
                                <Tile>
                                    {cell === 1 && <RoundedPiece color="red" />}
                                    {cell === 2 && <RoundedPiece color="green" />}
                                </Tile>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>

                {winner && <div style={{display: "flex", flexDirection: "row", gap: "10px", alignItems: "center", justifyContent: "center"}}>
                    <h1 style={{"color": player === 1 ? "green": "red"}}>Player {player === 1 ? "green" : "red"} wins!</h1>
                    <button style={{height: 50}} onClick={resetBoard}>Play again</button>
                </div>}
                {!winner && <h1>Player {player === 1 ? "red" : "green"} turn</h1>}
            </div>
        </div>
    )
}
