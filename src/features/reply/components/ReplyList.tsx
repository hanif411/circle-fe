import type { ReplyType } from "@/types/types";
import { Heart, MessageCircleMore } from "lucide-react";
import React from "react";

interface ReplyListProps {
  replies: ReplyType[];
}

export const ReplyList: React.FC<ReplyListProps> = ({ replies }) => {
  return (
    <div className="flex flex-col gap-2 px-10 py-5">
      {replies?.map((r) => (
        <div className=" flex flex-col border-b p-5 gap-2" key={r.id}>
          <div className="flex gap-2 items-center">
            {r.user.profile_picture && (
              <img
                src={r.user.profile_picture}
                alt={r.user.username || r.user.name}
                className="w-8 h-8 rounded-full bg-primary-foreground"
              />
            )}
            <h1>{r.user.name}</h1>
            {r.user.username && (
              <p className=" text-gray-500">@{r.user.username}</p>
            )}
          </div>
          <div>
            <h1 className="">{r.content}</h1>
            {r.image && <img src={r.image} alt="Reply image"></img>}
          </div>
          <div className="flex gap-4">
            <Heart />
            <h1>{r.likes}</h1>
            <MessageCircleMore />
            <h1>{r.replies} Replies</h1>
          </div>
        </div>
      ))}
      {replies.length === 0 && (
        <p className="text-center text-gray-500 mt-5">Belum ada balasan.</p>
      )}
    </div>
  );
};
