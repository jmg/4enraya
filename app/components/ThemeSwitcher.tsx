import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Switch } from "@/components/ui/switch"
import { Theme, useTheme } from "remix-themes"
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button"


export default function ThemeSwitcher() {
  const [theme, setTheme] = useTheme()

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === Theme.LIGHT ? Theme.DARK : Theme.LIGHT));
  }

  return (
    <div className="flex items-center space-x-2">
        <Button onClick={toggleTheme} variant="ghost"><FontAwesomeIcon style={{color: "#006FEE", width: 16}} icon={theme == "light" ? faMoon : faSun} /></Button>
    </div>
  )
}