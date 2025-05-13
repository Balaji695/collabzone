
import React from "react";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import MainLayout from "@/layouts/MainLayout";
import CollabCard from "@/components/CollabCard";
import { mockCollabs } from "@/data/mockData";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

const Home = () => {
  const { theme } = useTheme();
  const { isAuthenticated } = useAuth();
  
  const headerClass = () => {
    switch (theme) {
      case "quantum":
        return "text-quantum-primary";
      case "prism":
        return "text-prism-primary";
      case "eclipse":
        return "text-eclipse-primary";
      default:
        return "text-quantum-primary";
    }
  };

  const buttonClass = () => {
    switch (theme) {
      case "quantum":
        return "quantum-button";
      case "prism":
        return "prism-button";
      case "eclipse":
        return "eclipse-button";
      default:
        return "quantum-button";
    }
  };

  const renderFeaturedCollabs = () => {
    return (
      <div>
        <h2 className="font-exo font-bold text-2xl mb-6 mt-10">Featured Collabs</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mockCollabs.map(collab => (
            <CollabCard key={collab.id} {...collab} />
          ))}
        </div>
      </div>
    );
  };

  const renderLandingPage = () => {
    return (
      <div className="flex flex-col items-center justify-center min-h-[80vh] text-center py-16">
        <div className={`text-6xl md:text-8xl font-bold mb-8 font-exo ${headerClass()}`}>
          <span className="block">Collab</span>
          <span className="font-rajdhani">Zone</span>
        </div>
        
        <p className="text-xl md:text-2xl max-w-2xl mb-12 leading-relaxed">
          The revolutionary platform for collaborative creativity. Connect, create, and innovate together on projects that matter.
        </p>
        
        <ThemeSwitcher />
        
        <div className="flex flex-wrap gap-4 justify-center mt-8">
          <Link to="/login">
            <Button className={`${buttonClass()} text-lg px-8 py-6`}>
              <Sparkles className="mr-2" />
              Get Started
            </Button>
          </Link>
          <Link to="/explore">
            <Button variant="outline" className="text-lg px-8 py-6">
              Explore Collabs
            </Button>
          </Link>
        </div>
        
        <div className="mt-20 max-w-4xl">
          <h2 className="font-exo font-bold text-3xl mb-8">Redefining Creative Collaboration</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className={`p-6 rounded-lg ${theme === "quantum" ? "quantum-card" : ""} ${theme === "prism" ? "prism-card" : ""} ${theme === "eclipse" ? "eclipse-card" : ""}`}>
              <h3 className="font-bold text-xl mb-3 font-exo">Connect</h3>
              <p>Find like-minded creators from around the world who share your passion and vision.</p>
            </div>
            <div className={`p-6 rounded-lg ${theme === "quantum" ? "quantum-card" : ""} ${theme === "prism" ? "prism-card" : ""} ${theme === "eclipse" ? "eclipse-card" : ""}`}>
              <h3 className="font-bold text-xl mb-3 font-exo">Create</h3>
              <p>Use our innovative tools to bring your collaborative ideas to life in real-time.</p>
            </div>
            <div className={`p-6 rounded-lg ${theme === "quantum" ? "quantum-card" : ""} ${theme === "prism" ? "prism-card" : ""} ${theme === "eclipse" ? "eclipse-card" : ""}`}>
              <h3 className="font-bold text-xl mb-3 font-exo">Showcase</h3>
              <p>Present your finished projects to a global audience and build your creative portfolio.</p>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  const renderDashboard = () => {
    return (
      <div className="py-12 md:py-16">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="font-exo font-bold text-3xl md:text-4xl mb-2">Your Collab Zone</h1>
            <p className="text-lg opacity-80">Welcome back! Ready to collaborate?</p>
          </div>
          <ThemeSwitcher />
        </div>
        
        {renderFeaturedCollabs()}
      </div>
    );
  };

  return (
    <MainLayout>
      {isAuthenticated ? renderDashboard() : renderLandingPage()}
    </MainLayout>
  );
};

export default Home;
