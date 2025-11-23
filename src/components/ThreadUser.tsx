import { useEffect, useState } from "react";
import { Heart, MessageCircleMore } from "lucide-react";
import { useThreads } from "@/hooks/useThreads";
import { useAuth } from "@/hooks/useAuth";
import type { LikeEventData, ThreadType } from "@/types/types";
import { getThreadByUser } from "@/services/threads/api";
import { io, Socket } from "socket.io-client";
import { useNavigate } from "react-router-dom";

function ThreadUser() {
  const { createLike } = useThreads();
  const navigate = useNavigate();
  const [allThreads, setAllThreads] = useState<ThreadType[]>([]);

  const { user } = useAuth();
  const [error, setError] = useState<string | null>(null);

  const updateThreadLikeStatus = (
    threadId: number,
    status: "like" | "unlike"
  ) => {
    setAllThreads((prevThreads) =>
      prevThreads.map((t) => {
        if (t.id === threadId) {
          const isLiking = status === "like";
          return {
            ...t,
            likes: Math.max(0, t.likes! + (isLiking ? 1 : -1)),
            islike: isLiking,
          };
        }
        return t;
      })
    );
  };

  useEffect(() => {
    const fetchThread = async () => {
      const result = await getThreadByUser();
      setAllThreads(result);
    };
    fetchThread();

    const socket: Socket = io("http://localhost:3000");
    socket.on(
      "like_update",
      (eventData: { data: LikeEventData; message: string }) => {
        console.log("like: Received new thread via Socket.IO.");
        const { tweet_id, status } = eventData.data;
        updateThreadLikeStatus(tweet_id, status);
      }
    );
  }, []);

  const handleLike = async (
    e: React.MouseEvent<HTMLButtonElement>,
    threadId: number
  ) => {
    e.stopPropagation();
    e.preventDefault();

    if (!user) {
      setError("Kalu belom login jadi tidak bisa like");
      return;
    }

    const dataLike = {
      tweet_id: threadId,
    };

    await createLike(dataLike);
  };

  return (
    <div className="flex flex-col gap-2">
      {allThreads?.map((t) => {
        return (
          <div
            className=" flex flex-col border-t p-5 gap-2"
            key={t.id}
            onClick={() => {
              navigate(`/thread/${t.id}`);
            }}>
            <div className="flex gap-2 items-center">
              {user?.avatar && (
                <img
                  src={user.avatar}
                  alt=""
                  className="w-8 h-8 rounded-full bg-primary-foreground"
                />
              )}
              <h1>{user?.name}</h1>
              {user?.username && (
                <p className=" text-gray-500">@{user.username}</p>
              )}
            </div>
            <div>
              <h1 className="">{t.content}</h1>
              {t.image && <img src={t.image}></img>}
            </div>
            {error && <p>{error}</p>}
            <div className="flex gap-4">
              <button onClick={(e) => handleLike(e, t.id)} type="button">
                <Heart
                  style={{
                    fill: t.islike ? "red" : "none",
                    stroke: t.islike ? "red" : "currentColor",
                  }}
                />
              </button>
              <h1>{t.likes}</h1>
              <MessageCircleMore />
              <h1>{t.replies} Replies</h1>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ThreadUser;
