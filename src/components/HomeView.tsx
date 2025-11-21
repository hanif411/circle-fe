import React, { useRef, useState } from "react";
import Threads from "./Threads";
import { Button } from "./ui/button";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "./ui/dialog";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { postThread } from "@/services/api";
import { useAuth } from "@/hooks/useAuth";
import { useThreads } from "@/hooks/useThreads";
import { Spinner } from "./ui/spinner";
import { House, ImagePlus } from "lucide-react";

function HomeView() {
  const [selectFile, setSelectFile] = useState<File | null>(null);
  const [content, setContent] = useState<string>("");
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const { user } = useAuth();
  const { loading, error } = useThreads();
  const [isPosting, setIsPosting] = useState(false);
  const input = useRef<HTMLInputElement>(null);

  const handleSelectFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files === null) {
      setSelectFile(null);
      return;
    }
    setSelectFile(e.target.files[0]!);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsPosting(true);
      const formData = new FormData();

      formData.append("content", content);
      if (selectFile) {
        formData.append("image", selectFile);
      }

      const result = await postThread(formData);
      setIsDialogOpen(false);
      setContent("");
      setSelectFile(null);
      console.log(result);
    } catch (error) {
      console.error("Error posting thread:", error);
    } finally {
      setIsPosting(false);
    }
  };
  return (
    <main className=" w-full p-10">
      <h1 className="flex gap-2 mb-2">
        <House />
        Home
      </h1>
      {error && <p>{error}</p>}
      {loading && <Spinner className="w-20 h-20 items-center" />}
      {user && (
        <div className="flex w-full gap-4 p-4 border">
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
                    <p className="text-center mr-70">What Happening?!</p>
                    <p className="inline-flex items-center justify-center h-7 p-2 bg-primary text-primary-foreground rounded-md">
                      Post
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
                      placeholder="What Happening?!"
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
                  <Button type="submit" disabled={isPosting}>
                    {isPosting ? <Spinner /> : "Post"}
                  </Button>
                </div>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      )}
      <div>
        <Threads />
      </div>
    </main>
  );
}

export default HomeView;
