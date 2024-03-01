import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Switch } from "@/components/ui/switch"
import { Theme, useTheme } from "remix-themes"
import { Label } from "@/components/ui/label";


export default function ThemeSwitcher() {
  const [, setTheme] = useTheme()

  return (
    <div className="flex items-center space-x-2">
        <Switch style={{width: 100}} onClick={() => setTheme(Theme === "dark" ? "light" : "dark")} checked={Theme === "dark"}></Switch>
        <Label>
            <FontAwesomeIcon style={{color: "#006FEE", width: 16}} icon={Theme == "dark" ? faMoon : faSun} ></FontAwesomeIcon>
        </Label>
    </div>
  )
}