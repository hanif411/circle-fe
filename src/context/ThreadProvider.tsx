import type React from "react";
import {
  ThreadContext,
  type ReplyType,
  type ThreadType,
} from "./ThreadContext";
import { useCallback, useEffect, useState } from "react";
import {
  getThreadById,
  getAllThreads,
  getRepliesByThreadId,
  type QueryParams,
  postReply,
  type LikeType,
} from "@/services/api";
import { like } from "@/services/api";
import { io, Socket } from "socket.io-client";

export function ThreadProvider({ children }: { children: React.ReactNode }) {
  const [thread, setThread] = useState<ThreadType[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [reply, setReply] = useState<ReplyType>();

  useEffect(() => {
    getThreads();
    const socket: Socket = io("http://localhost:3000");

    socket.on("connect", () => {
      console.log("ThreadProvider: Socket.IO connected.");
    });

    socket.on(
      "new_thread",
      (eventData: { data: ThreadType; message: string }) => {
        console.log("ThreadProvider: Received new thread via Socket.IO.");
        setThread((prev) => [eventData.data, ...prev]);
      }
    );

    return () => {
      socket.disconnect();
    };
  }, []);

  const getThreadId = async (id: number) => {
    try {
      setLoading(true);
      const result = await getThreadById(id);
      console.log(result);

      // setThread(result);
      return result;
    } catch (error) {
      setError("invalid get thread id");
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

      return result;
    } catch (error) {
      setError("invalid get threads");
      throw new Error("invalid get thread");
    } finally {
      setLoading(false);
    }
  };

  const createReply = async (queryparams: QueryParams, formdata: FormData) => {
    try {
      setLoading(true);

      const result = await postReply(queryparams, formdata);
      console.log(result);
      setReply(result);
      return result;
    } catch (error) {
      setError("invalid reply");
      throw new Error("invalid podt reply");
    } finally {
      setLoading(false);
    }
  };

  const createLike = async (data: LikeType) => {
    try {
      setLoading(true);
      const result = await like(data);
      return result;
    } catch (error) {
      setError("invalid like");
      throw new Error("invalid like");
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
        createReply,
        createLike,
      }}>
      {children}
    </ThreadContext.Provider>
  );
}
