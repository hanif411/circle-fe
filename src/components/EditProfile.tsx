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
import { getUserById } from "@/services/auth/api";
import { ImagePlus } from "lucide-react";
import { useEffect, useRef, useState } from "react";

function EditProfile() {
  const [user, setUser] = useState<User>();
  const input = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const result = await getUserById();
      setUser(result);
    };
    fetchUser();
  }, [user]);

  
  return (
    <Dialog>
      <form>
        <DialogTrigger asChild>
          <Button variant="outline">Edit profile</Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
          </DialogHeader>

          <div className="bg-cyan-300 w-full h-25 rounded-2xl">
            <Input type="file" className="hidden" ref={input} />
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
                defaultValue={user?.name || user?.full_name}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">Username</Label>
              <Input
                id="username-1"
                name="username"
                defaultValue={user?.username}
              />
            </div>
            <div className="grid gap-3">
              <Label htmlFor="username-1">Bio</Label>
              <Input id="username-1" name="username" defaultValue={user?.bio} />
            </div>
          </div>
          <DialogFooter>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
}

export default EditProfile;
