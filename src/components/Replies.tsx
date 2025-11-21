import type { ReplyType } from "@/context/ThreadContext";
import { useThreads } from "@/hooks/useThreads";
import type { QueryParams } from "@/services/api";
import { Heart, MessageCircleMore } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function Replies() {
  const [reply, setReply] = useState<ReplyType[]>();
  const { getReplies } = useThreads();
  const { id } = useParams<{ id: string }>();
  const thread_id = parseInt(id!, 10);

  useEffect(() => {
    const result = async () => {
      const params: QueryParams = {
        thread_id,
      };
      try {
        const result = await getReplies(params);
        setReply(result as ReplyType[]);
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    };

    result();
  }, []);

  return (
    <div className="flex flex-col gap-2 p-5 border">
      {reply?.map((r) => {
        return (
          <div className=" flex flex-col border  p-5 gap-2" key={r.id}>
            <div className="flex gap-2 items-center">
              {r.user.profile_picture && (
                <img
                  src={r.user.profile_picture}
                  alt=""
                  className="w-8 h-8 rounded-full bg-primary-foreground"
                />
              )}
              <h1>{r.user.name}</h1>
              <p className=" text-gray-500">@{r.user.username}</p>
            </div>
            <div>
              <h1 className="">{r.content}</h1>
              {r.image && <img src={r.image}></img>}
            </div>
            <div className="flex gap-4">
              <Heart />
              <h1>{r.likes}</h1>
              <MessageCircleMore />
              <h1>{r.replies} Replies</h1>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default Replies;
