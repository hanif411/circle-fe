import type { ThreadType } from "@/context/ThreadContext";
import { useEffect, useState } from "react";
import { Heart, MessageCircleMore } from "lucide-react";
import { useThreads } from "@/hooks/useThreads";
import { useNavigate } from "react-router-dom";

function Threads() {
  const [thread, setThread] = useState<ThreadType[]>([]);
  const { getThreads } = useThreads();
  const navigate = useNavigate();

  useEffect(() => {
    const result = async () => {
      try {
        const result = await getThreads();
        setThread(result as ThreadType[]);
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    };

    result();

    const ws = new WebSocket("ws://localhost:3000");
    try {
      ws.onopen = () => {
        console.log("connect to web socket");
      };
      ws.onmessage = (event) => {
        const newthread = JSON.parse(event.data.toString());
        if (newthread && newthread.id) {
          console.log(newthread.id);
          setThread((prev) => [newthread as ThreadType, ...prev]);
        } else {
          console.warn("WebSocket: Received new Thread", newthread);
        }
      };
    } catch (error) {
      console.error("WebSocket: Error processing received message:", error);
    }
    return () => {
      if (ws.readyState === ws.OPEN) {
        ws.close();
      }
    };
  }, []);

  return (
    <div className="flex flex-col gap-2">
      {thread?.map((t) => {
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
              <p className=" text-gray-500">@{t.user.username}</p>
            </div>
            <div>
              <h1 className="">{t.content}</h1>
              {t.image && <img src={t.image}></img>}
            </div>
            <div className="flex gap-4">
              <Heart />
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
