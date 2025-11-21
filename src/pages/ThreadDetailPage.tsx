import ThreadDetail from "@/components/ThreadDetail";
import Sidebar from "@/components/Sidebar";
import Profile from "@/components/Profile";

function ThreadDetailPage() {
  return (
    <div className="flex pt-5 ">
      <div className="w-1/5">
        <Sidebar />
      </div>
      <div className="w-4/7">
        <ThreadDetail />
      </div>
      <div className="w-2/7">
        <Profile />
      </div>
    </div>
  );
}

export default ThreadDetailPage;
