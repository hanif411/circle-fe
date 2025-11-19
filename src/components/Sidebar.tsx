import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { CircleUserRound, House, Heart, UserRoundSearch } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

function Sidebar() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex flex-col px-10 pb-10 h-screen justify-between">
      <div className="flex flex-col gap-6">
        <h1 className="text-4xl text-green-600">circle</h1>
        <div className="flex gap-2">
          <button onClick={() => navigate("/")} className="flex gap-2">
            <House />
            <h1>Home</h1>
          </button>
        </div>
        <div className="flex gap-2">
          <UserRoundSearch />
          <h1>Search</h1>
        </div>
        <div className="flex gap-2">
          <Heart />
          <h1>Follow</h1>
        </div>
        <div className="flex gap-2">
          <CircleUserRound />
          <h1>Profile</h1>
        </div>
        <Button>Create Post</Button>
      </div>
      <div className="justify-end">
        {user ? (
          <Button variant={"outline"} onClick={handleLogout}>
            Log Out
          </Button>
        ) : (
          <Button variant={"outline"}>
            <Link to={"/login"}>Login</Link>
          </Button>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
