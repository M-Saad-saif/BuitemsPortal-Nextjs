"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { useRouter, usePathname } from "next/navigation";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  // ======= Fetch full user from API =======
  const fetchUser = useCallback(async () => {
    const token = localStorage.getItem("auth-token");
    if (!token) {
      setLoading(false);
      return;
    }
    try {
      const res = await fetch("/api/auth/profile", {
        headers: { "auth-token": token },
        cache: "no-store",
      });
      const data = await res.json();
      if (data.success) setUser(data.user);
      else {
        localStorage.removeItem("auth-token");
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  const updateUserLocally = useCallback((patch) => {
    setUser((prev) => (prev ? { ...prev, ...patch } : prev));
  }, []);

  // ============= Login =============
  const login = async (email, password) => {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    if (data.success) {
      localStorage.setItem("auth-token", data.authToken);
      await fetchUser();
      return { success: true };
    }
    return { success: false, error: data.error };
  };

  // ============= Signup =============
  const signup = async (formData) => {
    const res = await fetch("/api/auth/createuser", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const data = await res.json();
    if (data.success) {
      localStorage.setItem("auth-token", data.authToken);
      await fetchUser();
      return { success: true };
    }
    return { success: false, error: data.error };
  };

  // ================ Logout ================
  const logout = () => {
    setIsLoggingOut(true);
    localStorage.removeItem("auth-token");
    setUser(null);
    router.push("/");
  };

  useEffect(() => {
    if (pathname !== "/portal" && isLoggingOut) {
      setIsLoggingOut(false);
    }
  }, [pathname, isLoggingOut]);

  const refreshUser = useCallback(() => fetchUser(), [fetchUser]);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        signup,
        logout,
        refreshUser,
        updateUserLocally,
        isLoggingOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
}
