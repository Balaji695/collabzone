
import React from "react";
import { useTheme } from "@/context/ThemeContext";
import Navigation from "@/components/Navigation";
import { useAuth } from "@/context/AuthContext";

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const { theme } = useTheme();
  const { isAuthenticated } = useAuth();

  return (
    <div className={`min-h-screen transition-colors duration-300 theme-${theme}`}>
      {isAuthenticated && <Navigation />}
      <main className={`${isAuthenticated ? 'md:ml-20 lg:ml-64' : ''} transition-all duration-300`}>
        <div className="container mx-auto px-4 py-4 md:py-8">
          {children}
        </div>
      </main>
      <div className="fixed inset-0 pointer-events-none -z-10">
        {theme === "quantum" && (
          <div className="w-full h-full quantum-grid-bg opacity-30" />
        )}
        {theme === "prism" && (
          <div className="w-full h-full bg-gradient-to-br from-prism-secondary/5 via-prism-primary/5 to-prism-accent/5" />
        )}
        {theme === "eclipse" && (
          <div className="w-full h-full bg-eclipse-metal opacity-40" />
        )}
      </div>
    </div>
  );
};

export default MainLayout;
