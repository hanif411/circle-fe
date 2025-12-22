import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CircleArrowLeft, CircleUserRound } from "lucide-react";
import type { User } from "@/context/authContext";
import { getUserById } from "@/services/auth/api";
import { io, type Socket } from "socket.io-client";
import { useParams } from "react-router-dom";
import ThreadSearch from "@/components/ThreadsSearch";
import GallerySearch from "@/components/GallerySearch";

function ProfileSearch() {
  const [user, setUser] = useState<User>();
  const [threads, setThreads] = useState<boolean>(true);
  const [gallery, setGallery] = useState<boolean>(false);
  const { id } = useParams<{ id: string }>();
  if (!id) {
    throw new Error("tidak ada id");
  }

  useEffect(() => {
    const fetchUser = async () => {
      const result = await getUserById(parseInt(id, 10));
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

  return (
    <div className="flex gap-2 flex-col mb-5">
      {user && (
        <div className=" ">
          <div className=" p-4 flex flex-col gap-2">
            <h1
              className="text-2xl font-bold"
              onClick={() => window.history.back()}>
              <CircleArrowLeft />
            </h1>
            <div className="bg-accent-foreground w-full h-30 rounded-2xl flex">
              {user.avatar ? (
                <img
                  className="w-30 h-30 mt-15 ms-5 rounded-full border-5 border-primary-foreground"
                  src={user.avatar}
                  alt=""
                />
              ) : (
                <CircleUserRound
                  className="w-30 h-30 mt-15 ms-5 rounded-full border-primary-foreground"
                  style={{ stroke: "grey" }}
                />
              )}
              <p className="w-full"></p>
              <div className="mt-35 mr-5">
                <Button>Follow</Button>
              </div>
            </div>
            <h1 className="mt-15 text-2xl font-bold">
              {user.name || user.full_name}
            </h1>
            {user.username && <p className="text-gray-500">@{user.username}</p>}
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
      )}
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
        {threads && <ThreadSearch />}
        {gallery && <GallerySearch />}
      </div>
    </div>
  );
}

export default ProfileSearch;
