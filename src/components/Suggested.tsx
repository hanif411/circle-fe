import type { User } from "@/context/authContext";
import { useAuth } from "@/hooks/useAuth";
import { getusers } from "@/services/auth/api";
import { useEffect, useState } from "react";

function Suggested() {
  const { user } = useAuth();
  const [users, setUsers] = useState<User[] | null>(null);
  console.log(user);

  useEffect(() => {
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
      <div className="p-2 min-h-screen fixed w-78">
        <h1>Suggested For You</h1>
        {users?.map((user) => (
          <>
            <div className="flex items-center gap-1 my-2 w-full">
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
              <p className="border-2 rounded-xl p-1 px-3 border-white">
                Follow
              </p>
            </div>
          </>
        ))}
      </div>
    </>
  );
}

export default Suggested;
