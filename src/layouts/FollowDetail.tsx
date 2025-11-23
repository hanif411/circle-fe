import { Button } from "@/components/ui/button";
import type { User } from "@/context/authContext";
import { useAuth } from "@/hooks/useAuth";
import { getFollowers, getFollowings } from "@/services/follows/api";

import { useEffect, useState } from "react";

function FollowDetail() {
  const { user } = useAuth();
  const [followers, setFollowers] = useState<User[]>([]);
  const [follower, setFollower] = useState<boolean>(true);
  useEffect(() => {
    const fetchFollowers = async () => {
      const response = await getFollowers();
      setFollowers(response);
      console.log(response);
    };
    fetchFollowers();
  }, [user]);

  const [followings, setFollowings] = useState<User[]>([]);
  const [following, setFollowing] = useState<boolean>(false);
  useEffect(() => {
    const fetchFollowers = async () => {
      const response = await getFollowings();
      setFollowings(response);
      console.log(response);
    };
    fetchFollowers();
  }, [user]);
  return (
    <>
      <div className="p-5 flex gap-2 flex-col">
        <div className="flex">
          <Button
            variant={"link"}
            className={`w-1/2 text-center text-xl ${
              follower ? "border-b-2 border-primary" : ""
            }`}
            onClick={() => {
              setFollower(true), setFollowing(false);
            }}>
            Followers
          </Button>
          <Button
            variant={"link"}
            className={`w-1/2 text-center text-xl ${
              following ? "border-b-2 border-primary" : ""
            }`}
            onClick={() => {
              setFollowing(true), setFollower(false);
            }}>
            Following
          </Button>
        </div>
        {follower && (
          <div>
            {followers?.map((f) => {
              return (
                <>
                  <div className="flex items-center gap-1 my-2">
                    <img
                      className="w-15 h-15 rounded-full border-5 border-primary-foreground"
                      src={f.avatar}
                      alt=""
                    />
                    <div className="flex flex-col w-full">
                      <p className=" w-full">{f.name}</p>
                      <p className="text-gray-500">@{f.username}</p>
                      <p>{f.bio}</p>
                    </div>
                    <p className="border-2 rounded-xl p-1 px-3 border-white">
                      Follow
                    </p>
                  </div>
                </>
              );
            })}
          </div>
        )}

        {following && (
          <div>
            {followings?.map((f) => {
              return (
                <>
                  <div className="flex items-center gap-1 my-2">
                    <img
                      className="w-15 h-15 rounded-full border-5 border-primary-foreground"
                      src={f.avatar}
                      alt=""
                    />
                    <div className="flex flex-col w-full">
                      <p className=" w-full">{f.name}</p>
                      <p className="text-gray-500">@{f.username}</p>
                      <p>{f.bio}</p>
                    </div>
                    <p className="border-2 rounded-xl p-1 px-3 border-white">
                      Following
                    </p>
                  </div>
                </>
              );
            })}
          </div>
        )}
      </div>
    </>
  );
}

export default FollowDetail;
