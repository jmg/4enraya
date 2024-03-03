import { motion } from "framer-motion"
import React from "react"
import { PIECE_SIZE } from "../config"

const RoundedPiece = ({ color, row }: { color: string, row: number }) => {

    return (
        <motion.div initial={{ y: - (row + 1) * PIECE_SIZE }} animate={{ y: 0 }} transition={{ ease: "easeOut", duration: 0.5 }}>
        <div style={{
            width: "80px",
            height: "80px",
            borderRadius: "50%",
            backgroundColor: color,
        }} className="border-2 dark:border-white border-gray-300">
        </div>
        </motion.div>
    )
}

const Tile = ({children}: {children: React.ReactNode}) => {

    return <div style={{
        width: PIECE_SIZE,
        height: PIECE_SIZE,
    }} className="flex flex-col items-center justify-center border-2">
        {children}
    </div>
}

export { RoundedPiece, Tile }