import type { LoginType, RegisterType } from "@/services/api";
import { createContext } from "react";

export interface User {
  id: number;
  full_name: string;
  email: string;
  token: string;
}

export interface AuthContextType {
  user: User | null;
  register: (data: RegisterType) => void;
  login: (data: LoginType) => void;
  loading: boolean;
  logout: () => void;
  error: string | null;
}
export const AuthContext = createContext<AuthContextType | null>(null);
