import { useAuth } from "@/hooks/useAuth";
import ThreadUser from "../components/ThreadUser";
import { useEffect, useState } from "react";
import Gallery from "@/components/Gallery";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Underline } from "lucide-react";

function ProfileDetail() {
  const { user } = useAuth();
  const [threads, setThreads] = useState<boolean>(false);
  const [gallery, setGallery] = useState<boolean>(true);

  return (
    <div className="flex gap-2 flex-col">
      {user && (
        <div className=" ">
          <div className=" p-4 flex flex-col gap-2">
            <h1 className="text-2xl font-bold">My Profile</h1>
            <div className="bg-cyan-300 w-full h-30 rounded-2xl flex">
              <img
                className="w-30 h-30 mt-15 ms-5 rounded-full border-5 border-primary-foreground"
                src={user.avatar}
                alt=""
              />
              <p className="w-full"></p>
              <button className="mt-35 bg-amber-300 rounded-xl mr-10 min-w-fit">
                Edit Profile
              </button>
            </div>
            <h1 className="mt-15 text-2xl font-bold"> {user.name}</h1>
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
        {threads && <ThreadUser />}
        {gallery && <Gallery />}
      </div>
    </div>
  );
}

export default ProfileDetail;
