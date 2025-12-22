import { CircleUserRound, Heart, Home, UserRoundSearch } from "lucide-react";
import { useNavigate } from "react-router-dom";

function BottomNavigation() {
  const navigate = useNavigate();
  return (
    <div className="bg-background w-full p-1 flex justify-around items-center">
      <button className="focus:bg-accent-foreground focus:text-white p-2 rounded-full">
        <Home
          onClick={(e) => {
            e.preventDefault(), navigate("/");
          }}
        />
      </button>
      <button className="focus:bg-accent-foreground focus:text-white p-2 rounded-full">
        <UserRoundSearch
          onClick={(e) => {
            e.preventDefault(), navigate("/search");
          }}
        />
      </button>
      <button className="focus:bg-accent-foreground focus:text-white p-2 rounded-full">
        <Heart
          onClick={(e) => {
            e.preventDefault(), navigate("/follows");
          }}
        />
      </button>
      <button className="focus:bg-accent-foreground focus:text-white p-2 rounded-full">
        <CircleUserRound
          onClick={(e) => {
            e.preventDefault(), navigate("/profile");
          }}
        />
      </button>
    </div>
  );
}

export default BottomNavigation;
