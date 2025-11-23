import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import type { User } from "@/context/authContext";
import { findUsers } from "@/services/auth/api";
import { Search } from "lucide-react";
import React, { useState } from "react";

function SearchDetail() {
  const [users, setUsers] = useState<User[]>([]);
  const [keyword, setKeyword] = useState<string>();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const queryParams = {
      keyword: keyword!,
    };
    if (keyword) {
      const result = await findUsers(queryParams);
      setUsers(result);
    }
  };

  return (
    <>
      <div className="p-5 flex gap-2 flex-col">
        <div className="flex gap-1">
          <form onSubmit={handleSubmit} className="flex gap-1 w-full">
            <Input
              placeholder="Find User"
              className="bg-primary-foreground"
              value={keyword}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setKeyword(e.target.value)
              }
            />
            <Button type="submit">
              <Search />
            </Button>
          </form>
        </div>
        <div>
          {users?.map((f) => {
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
      </div>
    </>
  );
}

export default SearchDetail;
