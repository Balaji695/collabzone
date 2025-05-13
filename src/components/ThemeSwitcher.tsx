
import React from "react";
import { useTheme } from "@/context/ThemeContext";
import { Button } from "@/components/ui/button";
import { Sparkles, Gem, Flame } from "lucide-react";

const ThemeSwitcher = () => {
  const { theme, setTheme } = useTheme();
  
  return (
    <div className="flex flex-wrap gap-3 mb-8 justify-center">
      <Button 
        onClick={() => setTheme("quantum")}
        variant={theme === "quantum" ? "default" : "outline"}
        className={`
          ${theme === "quantum" ? "quantum-button" : "border border-quantum-border hover:bg-quantum-primary/10 text-quantum-primary"}
          flex items-center gap-2
        `}
      >
        <Sparkles size={18} />
        <span>Quantum Flux</span>
      </Button>
      
      <Button 
        onClick={() => setTheme("prism")}
        variant={theme === "prism" ? "default" : "outline"}
        className={`
          ${theme === "prism" ? "prism-button" : "border border-prism-border hover:bg-prism-primary/10 text-prism-primary"}
          flex items-center gap-2
        `}
      >
        <Gem size={18} />
        <span>Prism Pulse</span>
      </Button>
      
      <Button 
        onClick={() => setTheme("eclipse")}
        variant={theme === "eclipse" ? "default" : "outline"}
        className={`
          ${theme === "eclipse" ? "eclipse-button" : "border border-eclipse-border hover:bg-eclipse-primary/10 text-eclipse-primary"}
          flex items-center gap-2
        `}
      >
        <Flame size={18} />
        <span>Eclipse Forge</span>
      </Button>
    </div>
  );
};

export default ThemeSwitcher;
