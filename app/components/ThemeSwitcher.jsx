import { faMoon, faSun } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Switch } from "@nextui-org/react";
import {useTheme} from "next-themes";
import { useEffect, useState } from "react";

export default function ThemeSwitcher() {
  const [mounted, setMounted] = useState(false)
  const { theme, setTheme } = useTheme()

  useEffect(() => {
    setMounted(true)
  }, [])

  if(!mounted) return null

  return (
    <div className="flex flex-row gap-3 items-center">
      <FontAwesomeIcon style={{color: "#006FEE", width: 16}} icon={theme == "dark" ? faMoon : faSun} ></FontAwesomeIcon>
      <Switch color="primary" onClick={() => setTheme(theme === "dark" ? "light" : "dark")} />
    </div>
  )
};
