import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { CircleUserRound, House, Heart, UserRoundSearch } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { ModeToggle } from "./ModeToggle";

function Sidebar() {
  const { logout, user } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="flex flex-col xl:w-60 w-fit xl:px-10 md:ps-3 py-10 h-screen justify-between fixed border-r">
      <div className="flex flex-col gap-6">
        <h1 className="text-4xl text-accent-foreground">Circle</h1>
        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.preventDefault(), navigate("/");
            }}
            className="flex gap-2 focus:bg-accent-foreground focus:text-white rounded-2xl p-2">
            <House />
            <h1>Home</h1>
          </button>
        </div>
        <div className="flex gap-2">
          <button
            className="flex gap-2 focus:bg-accent-foreground focus:text-white rounded-2xl p-2"
            onClick={(e) => {
              e.preventDefault(), navigate("/search");
            }}>
            <UserRoundSearch />
            <h1>Search</h1>
          </button>
        </div>
        <div className="flex gap-2">
          <button
            className="flex gap-2 focus:bg-accent-foreground focus:text-white rounded-2xl p-2"
            onClick={() => navigate("/follows")}>
            <Heart />
            <h1>Follow</h1>
          </button>
        </div>
        <div className="flex gap-2">
          <button
            className="flex gap-2 focus:bg-accent-foreground focus:text-white rounded-2xl p-2"
            onClick={() => navigate("/profile")}>
            <CircleUserRound />
            <h1>Profile</h1>
          </button>
        </div>
      </div>
      <div className="justify-end">
        {user ? (
          <>
            <div className="flex gap-1">
              <ModeToggle />
              <Button variant={"outline"} onClick={handleLogout}>
                Log Out
              </Button>
            </div>
          </>
        ) : (
          <>
            <div className="flex gap-1">
              <ModeToggle />
              <Button variant={"outline"}>
                <Link to={"/login"}>Login</Link>
              </Button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Sidebar;
