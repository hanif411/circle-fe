import type React from "react";
import { ThreadContext, type ThreadType } from "./ThreadContext";
import { useState } from "react";
import {
  getThreadById,
  getAllThreads,
  getRepliesByThreadId,
  type QueryParams,
} from "@/services/api";

export function ThreadProvider({ children }: { children: React.ReactNode }) {
  const [thread, setThread] = useState<ThreadType[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const getThreadId = async (id: number) => {
    try {
      setLoading(true);
      const result = await getThreadById(id);
      console.log(result);

      setThread(result);
      return result;
    } catch (error) {
      throw new Error("invalid get thread");
    } finally {
      setLoading(false);
    }
  };

  const getThreads = async (): Promise<ThreadType[]> => {
    try {
      setLoading(true);
      const result = await getAllThreads();
      setThread(result);
      return result as ThreadType[];
    } catch (error) {
      const errormessage = (error as Error).message;
      setError(errormessage);
      throw new Error("invalid get thread");
    } finally {
      setLoading(false);
    }
  };

  const getReplies = async (queryparams: QueryParams) => {
    try {
      setLoading(true);
      const result = await getRepliesByThreadId(queryparams);
      console.log(result);

      setThread(result);
      return result;
    } catch (error) {
      throw new Error("invalid get thread");
    } finally {
      setLoading(false);
    }
  };

  return (
    <ThreadContext.Provider
      value={{
        thread,
        getThreads,
        loading,
        error,
        getThreadId,
        getReplies,
      }}>
      {children}
    </ThreadContext.Provider>
  );
}
