
import React, { useState } from "react";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import ThemeSwitcher from "@/components/ThemeSwitcher";
import { LogIn } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Login = () => {
  const { theme } = useTheme();
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await login(email, password);
      toast({
        title: "Login successful",
        description: "Welcome back to Collab Zone!",
      });
      navigate("/");
    } catch (error) {
      toast({
        title: "Login failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const formClass = () => {
    switch (theme) {
      case "quantum":
        return "quantum-card";
      case "prism":
        return "prism-card";
      case "eclipse":
        return "eclipse-card";
      default:
        return "quantum-card";
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

  return (
    <div className={`min-h-screen flex flex-col items-center justify-center p-4 theme-${theme}`}>
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
      
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <Link to="/">
            <h1 className={`text-4xl font-bold mb-2 font-exo
              ${theme === "quantum" ? "text-quantum-primary" : ""}
              ${theme === "prism" ? "text-prism-primary" : ""}
              ${theme === "eclipse" ? "text-eclipse-primary" : ""}
            `}>
              Collab<span className="font-rajdhani">Zone</span>
            </h1>
          </Link>
          <p className="text-lg">Sign in to your account</p>
        </div>
        
        <ThemeSwitcher />
        
        <div className={`${formClass()} p-6 md:p-8`}>
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label htmlFor="email" className="block mb-2 font-medium">
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className={`w-full p-3 rounded border
                  ${theme === "quantum" ? "bg-quantum-background border-quantum-border" : ""}
                  ${theme === "prism" ? "bg-prism-background border-prism-border" : ""}
                  ${theme === "eclipse" ? "bg-eclipse-background border-eclipse-border" : ""}
                `}
              />
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 font-medium">
                Password
              </label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className={`w-full p-3 rounded border
                  ${theme === "quantum" ? "bg-quantum-background border-quantum-border" : ""}
                  ${theme === "prism" ? "bg-prism-background border-prism-border" : ""}
                  ${theme === "eclipse" ? "bg-eclipse-background border-eclipse-border" : ""}
                `}
              />
            </div>
            <div className="flex items-center justify-between text-sm">
              <div className="flex items-center">
                <input
                  id="remember"
                  type="checkbox"
                  className="mr-2"
                />
                <label htmlFor="remember">Remember me</label>
              </div>
              <a href="#" className={`
                ${theme === "quantum" ? "text-quantum-primary" : ""}
                ${theme === "prism" ? "text-prism-primary" : ""}
                ${theme === "eclipse" ? "text-eclipse-primary" : ""}
              `}>
                Forgot password?
              </a>
            </div>
            <Button 
              type="submit"
              disabled={isLoading}
              className={`${buttonClass()} w-full mt-6`}
            >
              {isLoading ? "Signing in..." : (
                <>
                  <LogIn className="mr-2" size={18} />
                  Sign In
                </>
              )}
            </Button>
          </form>
          
          <div className="mt-6 text-center">
            <p>
              Don't have an account?{" "}
              <Link to="/signup" className={`
                font-medium
                ${theme === "quantum" ? "text-quantum-primary" : ""}
                ${theme === "prism" ? "text-prism-primary" : ""}
                ${theme === "eclipse" ? "text-eclipse-primary" : ""}
              `}>
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
