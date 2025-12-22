import { useThreads } from "@/hooks/useThreads";
import { CircleArrowLeft, Heart, ImagePlus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import {  useParams } from "react-router-dom";
import { Spinner } from "../components/ui/spinner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../components/ui/dialog";
import { Textarea } from "../components/ui/textarea";
import { Input } from "../components/ui/input";
import { Button } from "../components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import Replies from "../features/reply/components/Replies";
import type { QueryParams, ReplyType, ThreadType } from "@/types/types";
import BottomNavigation from "@/components/BottomNavigation";

function ThreadDetail() {
  const [thread, setThread] = useState<ThreadType | null>(null);
  const [replies, setReplies] = useState<ReplyType | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { getThreadId } = useThreads();
  const { error, loading } = useThreads();
  const { user } = useAuth();
  const { createReply } = useThreads();
  const [isReplies, setIsReplies] = useState(false);
  const { id } = useParams<{ id: string }>();
  const thread_id = parseInt(id!, 10);
  const input = useRef<HTMLInputElement>(null);

  const repli = {replies, isReplies}
  repli

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
    <div className="">
      <button
        className="flex gap-2 mb-2 p-2"
        onClick={() => window.history.back()}>
        <CircleArrowLeft />
      </button>
      <div className=" p-4">
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
            {thread?.user.username && (
              <h1 className="text-gray-500">@{thread?.user.username}</h1>
            )}
          </div>
        </div>
        {thread?.image && thread?.media_type === "image" && (
          <img src={thread?.image} className="rounded-sm"></img>
        )}
        {thread?.image && thread?.media_type === "video" && (
          <video controls src={thread?.image} className="w-full h-96" />
        )}{" "}
        <h1>{thread?.content}</h1>
        <div className="flex gap-4 mt-5 text-gray-500">
          <Heart />
          <h1>{thread?.likes}</h1>
        </div>
      </div>

      {error && <p>{error}</p>}
      {loading && <Spinner className="w-20 h-20 items-center" />}
      {user && (
        <div className="flex w-full gap-4 px-4">
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild className="h-15 w-full">
              <button className="w-full">
                <div className="flex">
                  <img
                    src="https://e7.pngegg.com/pngimages/799/987/png-clipart-computer-icons-avatar-icon-design-avatar-heroes-computer-wallpaper-thumbnail.png"
                    alt=""
                    className="w-8 h-8 rounded-full "
                  />
                  <div className="flex w-full items-center">
                    <p className="w-full text-start px-2">Type Your Reply</p>
                    <p className="inline-flex items-center justify-center h-7 p-2 bg-primary text-primary-foreground rounded-md">
                      Reply
                    </p>
                  </div>
                </div>
              </button>
            </DialogTrigger>
            <DialogContent className="">
              <DialogHeader>
                <DialogTitle>Post Reply</DialogTitle>
              </DialogHeader>
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
      <h1 className=" p-5">
        Comments <span>{thread?.replies}</span>
      </h1>
      <div>
        <Replies />
      </div>

      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
        <BottomNavigation />
      </div>
    </div>
  );
}

export default ThreadDetail;
