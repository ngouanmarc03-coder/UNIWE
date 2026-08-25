import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/client";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("uniwe_admin_token");
    if (!token) {
      setLoading(false);
      return;
    }
    api
      .get("/admin/auth/me")
      .then((res) => setAdmin(res.data))
      .catch(() => {
        localStorage.removeItem("uniwe_admin_token");
      })
      .finally(() => setLoading(false));
  }, []);

  async function login(email, password) {
    const res = await api.post("/admin/auth/login", { email, password });
    localStorage.setItem("uniwe_admin_token", res.data.token);
    setAdmin(res.data.admin);
    return res.data.admin;
  }

  function logout() {
    localStorage.removeItem("uniwe_admin_token");
    setAdmin(null);
  }

  return (
    <AuthContext.Provider value={{ admin, setAdmin, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
