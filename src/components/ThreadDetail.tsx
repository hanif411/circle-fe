import type { ReplyType, ThreadType } from "@/context/ThreadContext";
import { useThreads } from "@/hooks/useThreads";
import {
  CircleArrowLeft,
  Heart,
  ImagePlus,
  MessageCircleMore,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Spinner } from "./ui/spinner";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Textarea } from "./ui/textarea";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useAuth } from "@/hooks/useAuth";
import Replies from "./Replies";
import type { QueryParams } from "@/services/api";

function ThreadDetail() {
  const [thread, setThread] = useState<ThreadType | null>(null);
  const [replies, setReplies] = useState<ReplyType | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { getThreadId } = useThreads();
  const { error, loading } = useThreads();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { createReply } = useThreads();
  const [isReplies, setIsReplies] = useState(false);
  const { id } = useParams<{ id: string }>();
  const thread_id = parseInt(id!, 10);
  const input = useRef<HTMLInputElement>(null);

  const [content, setContent] = useState<string>("");
  const [selectFile, setSelectFile] = useState<File | null>(null);

  const handleSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) {
      setSelectFile(null);
      return;
    }
    setSelectFile(e.target.files[0]!);
  };

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsReplies(true);
      const formData = new FormData();

      formData.append("content", content);
      if (selectFile) {
        formData.append("image", selectFile);
      }
      const params: QueryParams = {
        thread_id,
      };

      const result = await createReply(params, formData);
      setIsDialogOpen(false);
      setContent("");
      setSelectFile(null);
      console.log(result);
      setReplies(result);
    } catch (error) {
    } finally {
      setIsReplies(false);
    }
  };

  return (
    <div className="p-4">
      <button className="flex gap-2 mb-2" onClick={() => navigate("/")}>
        <CircleArrowLeft /> <p> Status</p>
      </button>
      <div className="border p-4">
        <div className="flex gap-2 items-center">
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
        {thread?.image && <img src={thread.image} />}
        <div className="flex gap-4 mt-5 text-gray-500">
          <Heart />
          <h1>{thread?.likes}</h1>
          <MessageCircleMore />
          <h1>{thread?.replies} Replies</h1>
        </div>
      </div>

      {error && <p>{error}</p>}
      {loading && <Spinner className="w-20 h-20 items-center" />}
      {user && (
        <div className="flex w-full gap-4 px-4 border">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild className="h-15 w-full">
              <button className="w-full">
                <div className="flex gap-4">
                  <img
                    src="https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png"
                    alt=""
                    className="w-8 h-8 rounded-full "
                  />
                  <div className="flex justify-end items-center">
                    <p className="text-center mr-85 ">Type Your Reply</p>
                    <p className="inline-flex items-center justify-center h-7 p-2 bg-primary text-primary-foreground rounded-md">
                      Reply
                    </p>
                  </div>
                </div>
              </button>
            </DialogTrigger>
            <DialogContent className="">
              <DialogTitle></DialogTitle>
              <form onSubmit={handleSubmit}>
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
                      value={content}
                      onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                        setContent(e.target.value)
                      }
                    />
                  </div>
                </div>
                <div className="flex mt-4 justify-end items-center gap-4">
                  <ImagePlus onClick={() => input.current?.click()} />
                  <Input
                    type="file"
                    onChange={handleSelectFile}
                    className="mr-50 hidden"
                    ref={input}
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
