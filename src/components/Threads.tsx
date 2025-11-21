import { useEffect, useState } from "react";
import { Heart, MessageCircleMore } from "lucide-react";
import { useThreads } from "@/hooks/useThreads";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

function Threads() {
  const navigate = useNavigate();
  const { getThreads, createLike, thread: allThreads } = useThreads();
  const { user } = useAuth();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {}, [user]);

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

    try {
      const result = await createLike(dataLike);

      if (result) {
        getThreads();
      }
    } catch (error) {
      setError("invalid like");
    }
  };

  return (
    <div className="flex flex-col gap-2">
      {allThreads?.map((t) => {
        return (
          <div
            className=" flex flex-col border p-5 gap-2"
            key={t.id}
            onClick={() => {
              navigate(`/thread/${t.id}`);
            }}>
            <div className="flex gap-2 items-center">
              {t.user.profile_picture && (
                <img
                  src={t.user.profile_picture}
                  alt=""
                  className="w-8 h-8 rounded-full bg-primary-foreground"
                />
              )}
              <h1>{t.user.name}</h1>
              {t.user.username && (
                <p className=" text-gray-500">@{t.user.username}</p>
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

export default Threads;
