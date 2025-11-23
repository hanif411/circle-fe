import type { likeReturn, LikeType, QueryParams, ReplyType, ThreadType } from "@/types/types";
import { createContext } from "react";

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
