import { Button } from "@/components/ui/button";
import type { User } from "@/context/authContext";
import { useAuth } from "@/hooks/useAuth";
import {
  followUnfollow,
  getFollowers,
  getFollowings,
} from "@/services/follows/api";
import { io, Socket } from "socket.io-client";
import { useCallback, useEffect, useState } from "react";
import Suggested from "@/components/Suggested";

function FollowDetail() {
  const { user } = useAuth();
  const [followers, setFollowers] = useState<User[]>([]);
  const [followings, setFollowings] = useState<User[]>([]);
  const [follower, setFollower] = useState<boolean>(true);
  const [following, setFollowing] = useState<boolean>(false);

  const fetchFollowers = useCallback(async () => {
    const response = await getFollowers();
    setFollowers(response);
  }, [user]);

  const fetchFollowings = useCallback(async () => {
    const response = await getFollowings();
    setFollowings(response);
  }, [user]);

  useEffect(() => {
    const socket: Socket = io("http://localhost:3000");

    const updateFollow = (event: {
      data: { follower_id: number; following_id: number; isFollowing: boolean };
    }) => {
      const { follower_id, following_id } = event.data;

      if (follower_id === user?.id) {
        fetchFollowers();
      }

      if (following_id === user?.id) {
        fetchFollowings();
      }
    };

    socket.on("follow", updateFollow);
    socket.on("unfollow", updateFollow);

    return () => {
      socket.off("follow", updateFollow);
      socket.off("unfollow", updateFollow);
    };
  }, [user, fetchFollowers, fetchFollowings]);

  useEffect(() => {
    fetchFollowers();
    fetchFollowings();
  }, [fetchFollowers, fetchFollowings, user]);

  const handleFollowUnfollow = async (
    e: React.MouseEvent<HTMLButtonElement>,
    target_follow: number,
    targetUser: User
  ) => {
    e.preventDefault();
    const dataFollow = {
      target_follow,
    };
    const result = await followUnfollow(dataFollow);

    if (result) {
      fetchFollowers();

      const { isFollowing } = result;
      if (isFollowing) {
        setFollowings((prev) => [...prev, targetUser]);
      } else {
        setFollowings((prev) => prev.filter((u) => u.id !== target_follow));
      }
    }
  };

  return (
    <>
      {!user && <Suggested />}

      {user && (
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
                const isMeFollowingThem = followings.some((u) => u.id === f.id);
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
                      <p className="border-2 rounded-xl ">
                        <Button
                          onClick={(e) => handleFollowUnfollow(e, f.id, f)}>
                          {isMeFollowingThem ? "Following" : "Follow"}
                        </Button>
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
                      <p className="border-2 rounded-xl">
                        <Button
                          onClick={(e) => handleFollowUnfollow(e, f.id, f)}>
                          Following
                        </Button>
                      </p>
                    </div>
                  </>
                );
              })}
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default FollowDetail;
