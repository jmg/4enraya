import { motion } from "framer-motion"
import React from "react"
import { PIECE_SIZE, TILE_SIZE } from "../config"

const RoundedPiece = ({ color, row }: { color: string, row: number }) => {

    return (
        <motion.div initial={{ y: - (row + 1) * PIECE_SIZE }} animate={{ y: 0 }} transition={{ ease: "easeOut", duration: 0.5 }}>
        <div style={{
            backgroundColor: color,
        }} className="border-2 dark:border-white border-gray-300 rounded-full piece">
        </div>
        </motion.div>
    )
}

const Tile = ({children}: {children: React.ReactNode}) => {

    return <div className="flex flex-col items-center justify-center border-2 tile cursor-pointer">
        {children}
    </div>
}

export { RoundedPiece, Tile }