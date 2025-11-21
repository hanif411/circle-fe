import type { LikeType, QueryParams } from "@/services/api";
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
  image?: string;
  user: UserType;
  likes?: number;
  replies?: number;
}
export interface ThreadType {
  id: number;
  content: string;
  image?: string;
  likes?: number;
  replies?: number;
  user: UserType;
  islike: boolean;
}

export interface likeReturn {
  status: "like" | "unlike";
}

export interface ThreadContextType {
  thread: ThreadType[];
  getThreads: () => Promise<ThreadType[]>;
  getThreadId: (id: number) => Promise<ThreadType>;
  error: string | null;
  loading: boolean;
  getReplies: (queryparams: QueryParams) => Promise<ReplyType[]>;
  createReply: (
    queryparams: QueryParams,
    formdata: FormData
  ) => Promise<ReplyType>;
  createLike: (data: LikeType) => Promise<likeReturn>;
}
export const ThreadContext = createContext<ThreadContextType | null>(null);
