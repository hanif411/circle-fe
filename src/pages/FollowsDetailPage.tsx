import Sidebar from "@/components/Sidebar";
import Profile from "@/components/Profile";
import FollowDetail from "@/layouts/FollowDetail";

function FollowsDetailPage() {
  return (
    <div className="flex pt-5 ">
      <div className="w-1/5">
        <Sidebar />
      </div>
      <div className="w-4/7">
        <FollowDetail />
      </div>
      <div className="w-2/7">
        <Profile />
      </div>
    </div>
  );
}

export default FollowsDetailPage;
