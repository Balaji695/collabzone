
import React, { createContext, useState, useContext, ReactNode, useEffect } from "react";
import { User } from "@/types/user";
import { api } from "@/backend/api";

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (username: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  loading: boolean;
  updateProfile: (userData: Partial<User>) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Check for saved user on mount
  useEffect(() => {
    const checkUser = async () => {
      try {
        const currentUser = await api.user.getCurrentUser();
        setUser(currentUser);
      } catch (error) {
        console.error("Error checking user:", error);
      } finally {
        setLoading(false);
      }
    };
    
    checkUser();
  }, []);

  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      const loggedInUser = await api.user.login(email, password);
      setUser(loggedInUser);
    } catch (error) {
      console.error("Login error:", error);
      throw new Error("Failed to login. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  };

  const signup = async (username: string, email: string, password: string) => {
    setLoading(true);
    try {
      const newUser = await api.user.signup(username, email, password);
      setUser(newUser);
    } catch (error) {
      console.error("Signup error:", error);
      throw new Error("Failed to sign up. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    api.user.logout();
    setUser(null);
  };

  const updateProfile = async (userData: Partial<User>) => {
    if (!user) {
      throw new Error("No user is logged in");
    }
    
    setLoading(true);
    try {
      const updatedUser = await api.user.updateProfile(user.id, userData);
      setUser(updatedUser);
    } catch (error) {
      console.error("Profile update error:", error);
      throw new Error("Failed to update profile. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        login,
        signup,
        logout,
        loading,
        updateProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
