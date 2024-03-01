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

    return (
        <div className="flex flex-col">

            <NavBar/>

            <div className="flex flex-col items-center justify-center gap-10 flex-1 mt-12">
            <Board/>
            </div>

        </div>
    )
}
