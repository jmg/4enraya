import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub } from "@fortawesome/free-brands-svg-icons"
import type { MetaFunction } from "@remix-run/node"
import Board from "~/components/Board";
import NavBar from "~/components/NavBar";

export const meta: MetaFunction = () => {
    return [
        { title: "Four in Line" },
        { name: "description", content: "Four in Line" },
    ]
}

export default function Index() {

    const currentYear = new Date().getFullYear()

    return (
        <div className="flex flex-col">

            <div className="container flex h-14 max-w-screen-2xl items-center gap-4 mt-2">
            <NavBar/>
            </div>

            <div className="flex flex-col items-center justify-center gap-10 flex-1 mt-8">
            <Board/>
            </div>

            <footer className="text-center text-gray-500 text-xs mb-8 mt-16 flex items-center justify-center gap-2 sm:text-sm">
                <p>🄯 {currentYear} Four in Line</p> |
                <p>Created by <a href="https://twitter.com/jmgutn" target="_blank" rel="noopener noreferrer" className="text-blue-500">@jmgutn</a></p> |
                <p><FontAwesomeIcon style={{width: 16}} icon={faGithub} size="lg" /> <a href="https://github.com/jmg/4enraya" target="_blank" rel="noopener noreferrer" className="text-blue-500 ml-1">GitHub</a></p>
            </footer>

        </div>
    )
}
