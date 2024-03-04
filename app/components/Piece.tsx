import { motion } from "framer-motion"
import React from "react"

const RoundedPiece = ({ color, row }: { color: string, row: number }) => {

    return <>
        <Piece color={color} row={row} size={50} className="sm:hidden"/>
        <Piece color={color} row={row} size={100} className="sm:visible hidden"/>
    </>
}

const Piece = ({ color, row, size, className }: { color: string, row: number, size: number, className: string }) => {

    return <motion.div className={className} initial={{ y: - (row + 1) * size }} animate={{ y: 0 }} transition={{ ease: "easeOut", duration: 0.5 }}>
        <div style={{
            backgroundColor: color,
        }} className="border-2 dark:border-white border-gray-300 rounded-full piece">
        </div>
    </motion.div>
}

const Tile = ({children}: {children: React.ReactNode}) => {

    return <div className="flex flex-col items-center justify-center border-2 tile cursor-pointer">
        {children}
    </div>
}

export { RoundedPiece, Tile }