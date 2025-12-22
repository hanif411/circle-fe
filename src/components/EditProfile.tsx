import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { User } from "@/context/authContext";
import { editUser, getUserByLogin } from "@/services/auth/api";
import { ImagePlus } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Spinner } from "./ui/spinner";

function EditProfile() {
  const [user, setUser] = useState<User>();
  const input = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [name, setName] = useState<string>();
  const [username, setUserName] = useState<string>();
  const [bio, setBio] = useState<string>();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const result = await getUserByLogin();
      setUser(result);
      if (result) {
        setName(result.full_name || "");
        setUserName(result.username || "");
        setBio(result.bio || "");
      }
    };
    fetchUser();
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setLoading(true);
      const formData = new FormData();
      if (file) {
        formData.append("image", file);
      }
      formData.append("full_name", name || "");
      formData.append("username", username || "");
      formData.append("bio", bio || "");
      const result = await editUser(formData);
      window.location.reload();
      console.log(result);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">Edit profile</Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit profile</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="bg-cyan-300 w-full h-25 rounded-2xl">
            <Input
              type="file"
              className="hidden"
              ref={input}
              onChange={(e) =>
                setFile(e.target.files === null ? null : e.target.files[0]!)
              }
            />
            <ImagePlus
              className="absolute top-37 left-17 bg-gray-600 rounded-full p-1"
              style={{ stroke: "white" }}
              onClick={() => input.current?.click()}
            />
            <img
              src={user?.avatar}
              alt=""
              className="w-20 h-20 rounded-full mt-15 ms-5"
              onClick={() => input.current?.click()}
            />
          </div>

          <div className="grid gap-4 mt-5">
            <div className="grid gap-3">
              <Label htmlFor="name-1">Name</Label>
              <Input
                id="name-1"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">Username</Label>
              <Input
                id="username-1"
                name="username"
                value={username}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">Bio</Label>
              <Input
                id="username-1"
                name="username"
                value={bio}
                onChange={(e) => setBio(e.target.value)}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">
              {loading ? <Spinner /> : "Save changes"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EditProfile;
