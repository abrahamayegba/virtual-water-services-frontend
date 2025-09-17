import React, { createContext, useContext, useState, useEffect } from "react";
import { AuthContextType, User } from "@/types/types";
import authService, { setAccessToken } from "@/services/authService";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");
    const storedToken = localStorage.getItem("accessToken");

    if (storedUser) setUser(JSON.parse(storedUser));
    if (storedToken) setAccessToken(storedToken); // restore token

    setLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const res = await authService.loginUser(email, password);
      if (res.success && res.user) {
        setUser(res.user);
        localStorage.setItem("currentUser", JSON.stringify(res.user));
        return true;
      }
      return false;
    } catch (err) {
      console.error("Login failed", err);
      return false;
    }
  };

  const register = async (userData: {
    name: string;
    email: string;
    password: string;
    companyId: string;
    roleId: string;
  }): Promise<boolean> => {
    try {
      const res = await authService.registerUser(userData);
      if (res.success && res.user) {
        setUser(res.user);
        localStorage.setItem("currentUser", JSON.stringify(res.user));
        return true;
      }
      return false;
    } catch (err) {
      console.error("Registration failed", err);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("currentUser");
    authService.logoutUser(); // optional: call your backend to revoke refresh tokens
  };

  return (
    <AuthContext.Provider
      value={{ user, setUser, loading, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
}
