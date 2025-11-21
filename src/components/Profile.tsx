import type { User } from "@/context/authContext";
import { useAuth } from "@/hooks/useAuth";
import { getusers } from "@/services/api";
import { useEffect, useState } from "react";

function Profile() {
  const { user } = useAuth();
  const [users, setUsers] = useState<User[] | null>(null);
  console.log(user);

  useEffect(() => {
    // const { getUsers, loading, error } = useAuth();
    const fetchUsers = async () => {
      const result = await getusers();
      console.log(result);
      setUsers(result);
      return result;
    };

    fetchUsers();
  }, [user]);

  return (
    <>
      <div className="fixed w-82">
        {user && (
          <div className=" ">
            <div className="border p-4 flex flex-col gap-2">
              <h1>My Profile</h1>
              <div className="bg-cyan-300 w-full h-20 rounded-2xl flex">
                <img
                  className="w-20 h-20 mt-10 ms-5 rounded-full border-5 border-primary-foreground"
                  src="https://img.freepik.com/premium-vector/man-avatar-profile-picture-isolated-background-avatar-profile-picture-man_1293239-4855.jpg"
                  alt=""
                />
                <h1 className="mt-25 ms-25 border-white rounded-xl">
                  Edit Profile
                </h1>
              </div>
              <h1 className="mt-10 text-2xl font-bold"> {user.name}</h1>
              <p className="text-gray-500">
                @{user.full_name || user.username}
              </p>
              <p>{user.bio}</p>
              <div className="flex gap-4">
                <p>
                  <span className="font-bold text-xl">{user.followers}</span>{" "}
                  Following
                </p>
                <p>
                  <span className="font-bold text-xl">{user.following}</span>{" "}
                  Followers
                </p>
              </div>
            </div>
          </div>
        )}
        <div className="border p-4 w-full">
          <h1>Suggested For You</h1>
          {users?.map((user) => (
            <>
              <div className="flex items-center gap-4">
                <img
                  className="w-10 h-10 rounded-full border-5 border-primary-foreground"
                  src="https://img.freepik.com/premium-vector/man-avatar-profile-picture-isolated-background-avatar-profile-picture-man_1293239-4855.jpg"
                  alt=""
                />
                <div className="flex flex-col w-full">
                  <p className=" w-full">{user.full_name}</p>
                  {user.username && (
                    <p className="text-gray-500">@{user.username}</p>
                  )}
                </div>
                <p className="border-2 rounded-xl p-1 px-3 border-white">
                  Follow
                </p>
              </div>
            </>
          ))}
        </div>
      </div>
    </>
  );
}

export default Profile;
