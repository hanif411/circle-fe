import { useEffect, useState } from "react";
import { AuthContext, type User } from "./authContext";
import {
  getusers,
  loginUser,
  registerUser,
  type LoginType,
  type RegisterType,
} from "@/services/api";

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [users, setUsers] = useState<User[] | null>(null);

  useEffect(() => {
    const loadUserFromStorage = () => {
      const storedToken = localStorage.getItem("token");
      const storedUser = localStorage.getItem("user");

      if (storedToken && storedUser) {
        try {
          const userData = JSON.parse(storedUser) as User;
          setUser(userData);
        } catch (e) {
          console.error("Gagal parse user dari localStorage", e);
          localStorage.removeItem("token");
          localStorage.removeItem("user");
        }
      }
    };

    loadUserFromStorage();
  }, []);

  const register = async (data: RegisterType) => {
    try {
      setLoading(true);
      const response = await registerUser(data);
      if (!response) {
        throw new Error("invalid register");
      }
      setUser(response.data);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data));
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
      localStorage.setItem("user", JSON.stringify(response.data));
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
      localStorage.removeItem("user");
      setUser(null);
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const getUsers = async () => {
    try {
      setLoading(true);
      const result = await getusers();
      setUsers(result);
      return result;
    } catch (error) {
      const errormessage = (error as Error).message;
      setError(errormessage);
      throw new Error("invalid get thread");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        register,
        user,
        login,
        loading,
        error,
        logout,
        getUsers,
        users,
      }}>
      {children}
    </AuthContext.Provider>
  );
}
