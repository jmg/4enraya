import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGamepad } from "@fortawesome/free-solid-svg-icons";
import ThemeSwitcher from "../components/ThemeSwitcher"


export default function NavBar() {

    return <>
        <div className="flex-1 text-lg font-bold text-blue-500">
            <FontAwesomeIcon style={{width: 16}} icon={faGamepad} className="mr-2" />
            Four in line
        </div>
        <div className="cursor-pointer">
            <ThemeSwitcher></ThemeSwitcher>
        </div>
    </>
}