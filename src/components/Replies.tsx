import type { ReplyType } from "@/context/ThreadContext";
import { useThreads } from "@/hooks/useThreads";
import type { QueryParams } from "@/services/api";
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
    <div className="flex flex-col gap-2">
      {reply?.map((r) => {
        return <h1>{r.content}</h1>;
      })}
    </div>
  );
}

export default Replies;
