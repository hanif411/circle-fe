import type React from "react";
import { ThreadContext } from "./ThreadContext";
import { useEffect, useState } from "react";
// import { io, Socket } from "socket.io-client";
import type {
  LikeType,
  QueryParams,
  ReplyType,
  ThreadType,
} from "@/types/types";
import { getAllThreads, getThreadById } from "@/services/threads/api";
import { getRepliesByThreadId, postReply } from "@/services/reply/api";
import { like } from "@/services/like/api";

export function ThreadProvider({ children }: { children: React.ReactNode }) {
  const [thread, setThread] = useState<ThreadType[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [reply, setReply] = useState<ReplyType>();

  reply;
  // useEffect(() => {
  //   getThreads();
  //   const socket: Socket = io("https://be-circle-theta.vercel.app");

  //   socket.on("connect", () => {
  //     console.log("ThreadProvider: Socket.IO connected.");
  //   });

  //   socket.on(
  //     "new_thread",
  //     (eventData: { data: ThreadType; message: string }) => {
  //       console.log("ThreadProvider: Received new thread via Socket.IO.");
  //       setThread((prev) => [eventData.data, ...prev]);
  //     }
  //   );

  //   socket.on(
  //     "like_update",
  //     (eventData: { data: LikeEventData; message: string }) => {
  //       console.log("like: Received new thread via Socket.IO.");
  //       const { tweet_id, status } = eventData.data;
  //       updateThreadLikeStatus(tweet_id, status);
  //     }
  //   );

  //   return () => {
  //     socket.disconnect();
  //   };
  // }, []);

  // const updateThreadLikeStatus = (
  //   threadId: number,
  //   status: "like" | "unlike"
  // ) => {
  //   setThread((prevThreads) =>
  //     prevThreads.map((t) => {
  //       if (t.id === threadId) {
  //         const isLiking = status === "like";
  //         return {
  //           ...t,
  //           likes: Math.max(0, t.likes! + (isLiking ? 1 : -1)),
  //           islike: isLiking,
  //         };
  //       }
  //       return t;
  //     })
  //   );
  // };

  useEffect(() => {
    getThreads();
  }, []);

  const getThreadId = async (id: number) => {
    try {
      setLoading(true);
      const result = await getThreadById(id);
      console.log(result);

      setThread(result);
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
