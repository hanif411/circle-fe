import ThreadUser from "../components/ThreadUser";
import { useEffect, useState } from "react";
import Gallery from "@/components/Gallery";
import { Button } from "@/components/ui/button";
import { CircleUserRound, EllipsisVertical } from "lucide-react";
import type { User } from "@/context/authContext";
import { getUserByLogin } from "@/services/auth/api";
import EditProfile from "@/components/EditProfile";
import { io, type Socket } from "socket.io-client";
import {
  DropdownMenu,
  DropdownMenuGroup,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { useAuth } from "@/hooks/useAuth";
import { useNavigate } from "react-router-dom";
import { ModeToggle } from "@/components/ModeToggle";

function ProfileDetail() {
  const [user, setUser] = useState<User>();
  const [threads, setThreads] = useState<boolean>(true);
  const [gallery, setGallery] = useState<boolean>(false);

  useEffect(() => {
    const fetchUser = async () => {
      const result = await getUserByLogin();
      setUser(result);
    };
    fetchUser();
  }, []);

  useEffect(() => {
    const socket: Socket = io("http://localhost:3000");

    const handleSocketUpdate = (event: {
      data: { follower_id: number; following_id: number; isFollowing: boolean };
    }) => {
      const { follower_id, following_id, isFollowing } = event.data;

      setUser((prevUser) => {
        if (!prevUser) return prevUser;
        if (prevUser.id === follower_id) {
          return {
            ...prevUser,
            following: isFollowing
              ? prevUser.following + 1
              : prevUser.following - 1,
          };
        }
        if (prevUser.id === following_id) {
          return {
            ...prevUser,
            followers: isFollowing
              ? prevUser.followers + 1
              : prevUser.followers - 1,
          };
        }
        return prevUser;
      });
    };

    socket.on("follow", handleSocketUpdate);
    socket.on("unfollow", handleSocketUpdate);
    return () => {
      socket.off("follow");
      socket.off("unfollow");
      socket.disconnect();
    };
  }, []);

  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  return (
    <>
      {!user && (
        <h1 className="text-center justify-center items-center flex">
          Kamu belum login silahkan login dahulu
        </h1>
      )}
      {user && (
        <div className="flex gap-2 flex-col mb-5">
          <div className=" ">
            <div className=" p-4 flex flex-col gap-2">
              <div className="flex justify-between">
                <h1 className="text-2xl font-bold">My Profile</h1>
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <EllipsisVertical />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="flex flex-col items-center gap-2">
                    <DropdownMenuGroup>
                      <DropdownMenuItem>
                        <ModeToggle />
                      </DropdownMenuItem>
                      <DropdownMenuItem>
                        <p
                          className="text-red-600 border-red-600"
                          onClick={handleLogout}>
                          Log out
                        </p>
                      </DropdownMenuItem>
                    </DropdownMenuGroup>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              <div className="bg-accent-foreground w-full h-30 rounded-2xl flex">
                {user.avatar ? (
                  <img
                    className="w-30 h-30 mt-15 ms-5 rounded-full border-5 border-primary-foreground"
                    src={user.avatar}
                    alt=""
                  />
                ) : (
                  <CircleUserRound
                    className="w-30 h-30 mt-15 ms-5 rounded-full"
                    style={{ stroke: "grey" }}
                  />
                )}
                <p className="w-full"></p>
                <div className="mt-35 mr-5">{user && <EditProfile />}</div>
              </div>
              <h1 className="mt-15 text-2xl font-bold">
                {user.name || user.full_name}
              </h1>
              {user.username && (
                <p className="text-gray-500">@{user.username}</p>
              )}
              <p>{user.bio}</p>
              <div className="flex gap-4">
                <p>
                  <span className="font-bold text-xl">{user.followers}</span>{" "}
                  Followers
                </p>
                <p>
                  <span className="font-bold text-xl">{user.following}</span>{" "}
                  Following
                </p>
              </div>
            </div>
          </div>

          <div>
            <div className="flex w-full my-2">
              <Button
                variant={"link"}
                className={`w-1/2 text-center text-xl ${
                  threads ? "border-b-2 border-primary" : ""
                } `}
                onClick={() => {
                  setThreads(true), setGallery(false);
                }}>
                All Post
              </Button>
              <Button
                variant={"link"}
                className={`w-1/2 text-center text-xl ${
                  gallery ? "border-b-2 border-primary" : ""
                }`}
                onClick={() => {
                  setGallery(true), setThreads(false);
                }}>
                Gallery
              </Button>
            </div>
            {threads && <ThreadUser />}
            {gallery && <Gallery />}
          </div>
        </div>
      )}
    </>
  );
}

export default ProfileDetail;
