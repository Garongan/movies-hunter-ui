/**
 * this component is for change the mode by light or dark
 */
import { Moon, Sun } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTheme } from "@/components/theme-provider";

// Component for toggling between light, dark, and system themes
export default function ModeToggle() {
  const { setTheme } = useTheme();

  return (
    <DropdownMenu>
      {/* Dropdown menu trigger */}
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="hover:bg">
          {/* Sun icon for light theme */}
          <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          {/* Moon icon for dark theme */}
          <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      {/* Dropdown menu content */}
      <DropdownMenuContent align="end">
        {/* Menu item to switch to light theme */}
        <DropdownMenuItem onClick={() => setTheme("light")}>
          Light
        </DropdownMenuItem>
        {/* Menu item to switch to dark theme */}
        <DropdownMenuItem onClick={() => setTheme("dark")}>
          Dark
        </DropdownMenuItem>
        {/* Menu item to switch to system theme */}
        <DropdownMenuItem onClick={() => setTheme("system")}>
          System
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
