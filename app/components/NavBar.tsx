import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGamepad } from "@fortawesome/free-solid-svg-icons";
import ThemeSwitcher from "../components/ThemeSwitcher"


export default function NavBar() {

    return <div className="container flex h-14 max-w-screen-2xl items-center gap-4 mt-2">
        <div className="mr-4 flex items-center flex-1">
            <div className="flex-1 mr-10 text-lg font-bold text-blue-500">
                <FontAwesomeIcon style={{width: 16}} icon={faGamepad} className="mr-2" />
                Four in line
            </div>
            <div className="cursor-pointer">
                <ThemeSwitcher></ThemeSwitcher>
            </div>
        </div>
    </div>
}