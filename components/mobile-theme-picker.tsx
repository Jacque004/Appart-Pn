"use client"

import { useEffect, useState } from "react"
import { useTheme } from "next-themes"
import { Monitor, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

export function MobileThemePicker() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="h-10 border-t border-border pt-4" aria-hidden />
  }

  const current = theme ?? "system"

  return (
    <div className="pt-4 border-t border-border">
      <p className="text-xs font-medium text-muted-foreground mb-2">Thème d&apos;affichage</p>
      <div className="flex gap-2" role="group" aria-label={"Thème d'affichage"}>
        <Button
          type="button"
          variant={current === "light" ? "default" : "outline"}
          size="sm"
          className={cn("flex-1 gap-1.5", current !== "light" && "bg-transparent")}
          onClick={() => setTheme("light")}
        >
          <Sun className="h-4 w-4 shrink-0" aria-hidden />
          Clair
        </Button>
        <Button
          type="button"
          variant={current === "dark" ? "default" : "outline"}
          size="sm"
          className={cn("flex-1 gap-1.5", current !== "dark" && "bg-transparent")}
          onClick={() => setTheme("dark")}
        >
          <Moon className="h-4 w-4 shrink-0" aria-hidden />
          Sombre
        </Button>
        <Button
          type="button"
          variant={current === "system" ? "default" : "outline"}
          size="sm"
          className={cn("flex-1 gap-1.5 px-2", current !== "system" && "bg-transparent")}
          onClick={() => setTheme("system")}
        >
          <Monitor className="h-4 w-4 shrink-0" aria-hidden />
          Auto
        </Button>
      </div>
    </div>
  )
}
