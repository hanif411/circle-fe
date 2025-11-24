import Suggested from "./Suggested";
import { CircleUserRound } from "lucide-react";
import { useEffect, useState } from "react";
import type { User } from "@/context/authContext";
import { getUserById } from "@/services/auth/api";
import EditProfile from "./EditProfile";

function Profile() {
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const fetchUser = async () => {
      const result = await getUserById();
      setUser(result);
    };
    fetchUser();
  }, [user]);

  return (
    <>
      <div className="fixed w-82 min-h-screen border-l">
        {user && (
          <div className=" ">
            <div className=" p-4 flex flex-col gap-2">
              <h1>My Profile</h1>
              <div className="bg-cyan-300 w-full h-20 rounded-2xl flex">
                {user.avatar ? (
                  <img
                    className="w-20 h-20 mt-10 ms-5 rounded-full border-5 border-primary-foreground"
                    src={user.avatar}
                    alt=""
                  />
                ) : (
                  <CircleUserRound
                    className="w-30 h-30 mt-5 ms-5 rounded-full"
                    style={{ stroke: "grey" }}
                  />
                )}
                <p className="w-full"></p>
                <div className="mt-25 mr-3">
                  <EditProfile />
                </div>
              </div>
              <h1 className="mt-10 text-2xl font-bold"> {user.name}</h1>
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
        )}
        <div className=" p-4 w-full">
          <Suggested />
        </div>
      </div>
    </>
  );
}

export default Profile;
