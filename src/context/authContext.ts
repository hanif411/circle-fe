import type { LoginType, RegisterType } from "@/services/api";
import { createContext } from "react";

export interface User {
  id: number;
  full_name: string;
  email: string;
  token: string;
  name: string;
  bio: string;
  username: string;
  followers: number;
  following: number;
}

export interface AuthContextType {
  user: User | null;
  users: User[] | null;
  register: (data: RegisterType) => void;
  login: (data: LoginType) => void;
  loading: boolean;
  logout: () => void;
  error: string | null;
  getUsers: () => void;
}
export const AuthContext = createContext<AuthContextType | null>(null);
