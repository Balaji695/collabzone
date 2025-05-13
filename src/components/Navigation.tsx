
import React from "react";
import { Link } from "react-router-dom";
import { useTheme } from "@/context/ThemeContext";
import { Home, Search, Users, PlusSquare, User, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/AuthContext";

const Navigation = () => {
  const { theme } = useTheme();
  const { user, logout } = useAuth();
  
  const navItems = [
    { icon: <Home size={24} />, label: "Home", path: "/" },
    { icon: <Search size={24} />, label: "Explore", path: "/explore" },
    { icon: <Users size={24} />, label: "Collabs", path: "/collabs" },
    { icon: <PlusSquare size={24} />, label: "Create", path: "/create" },
    { icon: <User size={24} />, label: "Profile", path: "/profile" },
  ];

  const getThemeStyles = () => {
    switch (theme) {
      case "quantum":
        return {
          container: "bg-quantum-background/90 border-r border-quantum-border/50 shadow-lg shadow-quantum-primary/10",
          button: "bg-quantum-muted/40 hover:bg-quantum-primary/30 text-quantum-foreground",
          active: "ring-2 ring-quantum-primary/50 bg-quantum-primary/20",
          logo: "text-quantum-primary",
          settings: "hover:bg-quantum-primary/20 border-quantum-border"
        };
      case "prism":
        return {
          container: "bg-prism-background/90 border-r border-prism-border/50 shadow-lg shadow-prism-primary/10",
          button: "bg-prism-muted/40 hover:bg-prism-primary/30 text-prism-foreground",
          active: "ring-2 ring-prism-primary/50 bg-prism-primary/20",
          logo: "text-prism-primary",
          settings: "hover:bg-prism-primary/20 border-prism-border"
        };
      case "eclipse":
        return {
          container: "bg-eclipse-background/90 border-r border-eclipse-border/50 shadow-lg shadow-eclipse-primary/10",
          button: "bg-eclipse-muted/40 hover:bg-eclipse-primary/30 text-eclipse-foreground",
          active: "ring-2 ring-eclipse-primary/50 bg-eclipse-primary/20",
          logo: "text-eclipse-primary",
          settings: "hover:bg-eclipse-primary/20 border-eclipse-border"
        };
      default:
        return {
          container: "bg-background/90 border-r border-border/50 shadow-lg",
          button: "bg-muted/30 hover:bg-primary/20 text-foreground",
          active: "ring-2 ring-primary/50 bg-primary/20",
          logo: "text-primary",
          settings: "hover:bg-primary/20 border-border"
        };
    }
  };

  const styles = getThemeStyles();

  const renderNavButton = (item: any, index: number) => {
    const isActive = window.location.pathname === item.path;
    
    return (
      <Link to={item.path} key={item.label} className="group">
        <div className={`flex flex-col items-center p-2 rounded-lg transition-all duration-300 ${styles.button} ${isActive ? styles.active : ''}`}>
          <div className="relative">
            {item.icon}
            <div className="absolute -inset-1 rounded-full bg-current opacity-0 group-hover:opacity-20 blur-sm transition-opacity"></div>
          </div>
          <span className="text-xs mt-1">{item.label}</span>
        </div>
      </Link>
    );
  };

  return (
    <div className="fixed bottom-0 w-full z-50 px-2 py-2 md:py-0 md:top-0 md:left-0 md:w-20 md:h-full lg:w-64">
      <div className={`
        flex md:flex-col items-center justify-between md:justify-start md:h-full md:space-y-8 p-4 rounded-xl md:rounded-none md:rounded-r-xl backdrop-blur-md
        ${styles.container}
      `}>
        <div className="hidden md:flex md:items-center md:justify-center lg:justify-start mb-6 w-full">
          <Link to="/" className="block">
            <h1 className={`font-bold text-xl font-exo text-center lg:text-left ${styles.logo}`}>
              Collab<span className="font-rajdhani">Zone</span>
            </h1>
          </Link>
        </div>

        <div className="flex w-full md:flex-col md:space-y-6 justify-between">
          {navItems.map(renderNavButton)}
        </div>

        <div className="hidden md:block mt-auto">
          <Button 
            variant="outline" 
            onClick={logout} 
            className={`w-full mt-6 ${styles.settings}`}
          >
            <Settings size={18} className="mr-2" />
            <span className="hidden lg:inline">Settings</span>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Navigation;
