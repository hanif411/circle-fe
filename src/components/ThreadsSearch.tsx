import { useEffect, useState } from "react";
import { Heart, MessageCircleMore } from "lucide-react";
import { useThreads } from "@/hooks/useThreads";
import { useAuth } from "@/hooks/useAuth";
import type { ThreadType } from "@/types/types";
import { getThreadByUserId } from "@/services/threads/api";
import { useNavigate, useParams } from "react-router-dom";

function ThreadSearch() {
  const { createLike, thread: globalThreads } = useThreads();
  const { id } = useParams();
  const navigate = useNavigate();
  const [allThreads, setAllThreads] = useState<ThreadType[]>([]);

  const { user } = useAuth();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (globalThreads.length > 0 && allThreads.length > 0) {
      setAllThreads((prevThreads) =>
        prevThreads.map((localT) => {
          const globalT = globalThreads.find((gt) => gt.id === localT.id);
          if (globalT) {
            return {
              ...localT,
              likes: globalT.likes,
              islike: globalT.islike,
            };
          }
          return localT;
        })
      );
    }
  }, [globalThreads]);

  useEffect(() => {
    const fetchThread = async () => {
      const result = await getThreadByUserId(parseInt(id!, 10));
      setAllThreads(result);
    };
    fetchThread();
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
              {t.image && t.media_type === "image" && (
                <img src={t.image} className="rounded-sm"></img>
              )}
              {t.image && t.media_type === "video" && (
                <video controls src={t.image} className="w-full h-96" />
              )}
              <h1 className="">{t.content}</h1>
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

export default ThreadSearch;
