import Sidebar from "@/components/Sidebar";
import Profile from "@/components/Profile";
import FollowDetail from "@/layouts/FollowDetail";
import BottomNavigation from "@/components/BottomNavigation";

function FollowsDetailPage() {
  return (
    <div className="flex pt-5 ">
      <div className="hidden md:flex w-1/5">
        <Sidebar />
      </div>
      <div className="xl:w-4/7 w-full">
        <FollowDetail />
      </div>
      <div className="w-2/7 hidden xl:flex">
        <Profile />
      </div>

      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
        <BottomNavigation />
      </div>
    </div>
  );
}

export default FollowsDetailPage;
