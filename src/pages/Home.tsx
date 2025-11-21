import HomeView from "@/components/HomeView";
import Profile from "@/components/Profile";
import Sidebar from "@/components/Sidebar";

function Home() {
  return (
    <div className="flex pt-5">
      <div className="w-1/5">
        <Sidebar />
      </div>
      <div className="w-4/7">
        <HomeView />
      </div>
      <div className="w-2/7">
        <Profile />
      </div>
    </div>
  );
}

export default Home;
