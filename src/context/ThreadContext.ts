import type { QueryParams } from "@/services/api";
import { createContext } from "react";

export interface UserType {
  id: number;
  username: string;
  name: string;
  profile_picture: string;
}
export interface ReplyType {
  id: number;
  content: string;
  user: UserType;
}
export interface ThreadType {
  id: number;
  content: string;
  image: string;
  likes: number;
  replies: number;
  user: UserType;
}

export interface ThreadContextType {
  thread: ThreadType[];
  getThreads: () => Promise<ThreadType[]>;
  getThreadId: (id: number) => Promise<ThreadType>;
  error: string | null;
  loading: boolean;
  getReplies: (queryparams: QueryParams) => Promise<ReplyType[]>;
}
export const ThreadContext = createContext<ThreadContextType | null>(null);
