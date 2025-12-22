import type { User } from "@/context/authContext";
import { getusers } from "@/services/auth/api";
import { useEffect, useState } from "react";
import { Button } from "./ui/button";
import { followUnfollow, getFollowings } from "@/services/follows/api";
import { useNavigate } from "react-router-dom";

function Suggested() {
  const navigate = useNavigate();
  const [users, setUsers] = useState<User[] | null>(null);
  useEffect(() => {
    const fetchUsers = async () => {
      const result = await getusers();
      console.log(result);
      setUsers(result);
      const followingsResult = await getFollowings();
      setFollowings(followingsResult || []);
      return result;
    };

    fetchUsers();
  }, []);

  const [Followings, setFollowings] = useState<User[]>([]);

  const handleFollow = async (
    e: React.MouseEvent<HTMLButtonElement>,
    target_follow: number,
    targetUser: User
  ) => {
    e.preventDefault();
    const follow = {
      target_follow,
    };

    const result = await followUnfollow(follow);
    if (result.isFollowing) {
      setFollowings((prev) => [...prev, targetUser]);
    } else {
      setFollowings((prev) => prev.filter((u) => u.id !== target_follow));
    }
  };
  return (
    <>
      <div className="p-2 min-h-screen  ">
        <h1>Suggested For You</h1>
        {users?.map((user) => {
          const isMeFollow = Followings.some((u) => u.id === user.id);
          return (
            <>
              <div className="flex items-center gap-1 my-2 w-full ">
                <h1
                  className="flex items-center gap-1 my-2 w-full"
                  onClick={() => navigate(`/profile/${user.id}`)}>
                  <img
                    className="w-10 h-10 rounded-full border-5 border-primary-foreground"
                    src={user.avatar}
                    alt=""
                  />
                  <div className="flex flex-col w-full">
                    <p className=" w-full">{user.name}</p>
                    {user.username && (
                      <p className="text-gray-500">@{user.username}</p>
                    )}
                  </div>
                </h1>
                <Button
                  className="border-2 rounded-xl p-1 px-3 border-white"
                  onClick={(e) => handleFollow(e, user.id, user)}>
                  {isMeFollow ? "Following" : "Follow"}
                </Button>
              </div>
            </>
          );
        })}
      </div>
    </>
  );
}

export default Suggested;
