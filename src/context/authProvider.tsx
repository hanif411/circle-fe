import { useState } from "react";
import { AuthContext, type User } from "./authContext";
import {
  loginUser,
  registerUser,
  type LoginType,
  type RegisterType,
} from "@/services/api";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = async (data: RegisterType) => {
    try {
      setLoading(true);
      const response = await registerUser(data);
      if (!response) {
        throw new Error("invalid register");
      }
      setUser(response.data);
      localStorage.setItem("token", response.data.token);
    } catch (error) {
      setError(error as string);
    } finally {
      setLoading(false);
    }
  };

  const login = async (data: LoginType) => {
    try {
      setLoading(true);
      const response = await loginUser(data);
      if (!response) {
        setError("Invalid credentials or server error.");
        throw new Error("invalid login");
      }

      setUser(response.data);
      localStorage.setItem("token", response.data.token);
    } catch (e) {
      const errormessage = (e as Error).message;
      setError(errormessage);
      throw e;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    try {
      setLoading(true);
      localStorage.removeItem("token");
      setUser(null);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{ register, user, login, loading, error, logout }}>
      {children}
    </AuthContext.Provider>
  );
}
