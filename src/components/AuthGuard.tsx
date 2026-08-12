"use client";

import { useEffect, useState } from "react";
import { LoginScreen } from "./LoginScreen";

export function AuthGuard({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

  useEffect(() => {
    const session = localStorage.getItem("flashdrop_session");
    if (session) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleLogin = (data: { name?: string; phone?: string; role: "customer" | "admin" }) => {
    localStorage.setItem("flashdrop_session", JSON.stringify(data));
    setIsAuthenticated(true);
    
    if (data.role === "admin") {
      window.location.href = "/admin"; // Force a hard redirect to the admin page
    }
  };

  // Prevent flicker during initial load check
  if (isAuthenticated === null) return null;

  return (
    <>
      {!isAuthenticated && <LoginScreen onLogin={handleLogin} />}
      {isAuthenticated && children}
    </>
  );
}
