import type { ThreadType } from "@/context/ThreadContext";
import { useThreads } from "@/hooks/useThreads";
import { Heart, MessageCircleMore } from "lucide-react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Spinner } from "./ui/spinner";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useAuth } from "@/hooks/useAuth";
import Replies from "./Replies";

function ThreadDetail() {
  const { id } = useParams<{ id: string }>();
  const [thread, setThread] = useState<ThreadType | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { getThreadId } = useThreads();
  const { error, loading } = useThreads();
  const { user } = useAuth();

  if (!id) {
    throw new Error("id thread tidak ada");
  }

  useEffect(() => {
    const result = async () => {
      try {
        const result = await getThreadId(parseInt(id, 10));
        setThread(result as ThreadType);
        console.log(result);
      } catch (error) {
        console.log(error);
      }
    };
    result();
  }, []);

  return (
    <div className="p-4">
      <h1>Status</h1>
      <div className="flex gap-2 p-2 items-center">
        {thread?.user.profile_picture && (
          <img
            src={thread?.user.profile_picture}
            alt=""
            className="w-10 h-10 rounded-full"
          />
        )}
        <div>
          <p>{thread?.user.name}</p>
          <h1 className="text-gray-500">@{thread?.user.username}</h1>
        </div>
      </div>
      <h1>{thread?.content}</h1>
      <div className="flex gap-4 mt-5 text-gray-500">
        <Heart />
        <h1>{thread?.likes}</h1>
        <MessageCircleMore />
        <h1>{thread?.replies} Replies</h1>
      </div>

      {error && <p>{error}</p>}
      {loading && <Spinner className="w-20 h-20 items-center" />}
      {user && (
        <div className="flex w-full gap-4 m-4 ">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild className="h-15 w-full">
              <button className="w-full">
                <div className="flex gap-4">
                  <img
                    src="https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png"
                    alt=""
                    className="w-8 h-8 rounded-full "
                  />
                  <div className="flex justify-end">
                    <p className="text-center">Type Your Reply</p>
                    <p className="inline-flex items-center justify-center h-7 p-2 bg-primary text-primary-foreground rounded-md">
                      Reply
                    </p>
                  </div>
                </div>
              </button>
            </DialogTrigger>
            <DialogContent className="">
              <DialogTitle></DialogTitle>
              <form>
                <div className="grid gap-4 mt-5">
                  <div className="flex gap-4">
                    <img
                      src="https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png"
                      alt=""
                      className="w-10 h-10 rounded-full"
                    />
                    <Textarea
                      id="content"
                      name="content"
                      placeholder="Type Your Reply"
                      rows={5}
                      //   value={content}
                      //   onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                      //     setContent(e.target.value)
                      //   }
                    />
                  </div>
                </div>
                <div className="flex mt-4 justify-between">
                  <Input
                    type="file"
                    // onChange={handleSelectFile}
                    className="mr-50"
                  />
                  <Button type="submit">Reply</Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      )}
      <div>
        <Replies />
      </div>
    </div>
  );
}

export default ThreadDetail;
