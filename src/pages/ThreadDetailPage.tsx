import ThreadDetail from "@/layouts/ThreadDetail";
import Sidebar from "@/components/Sidebar";
import Profile from "@/components/Profile";

function ThreadDetailPage() {
  return (
    <div className="flex pt-5 ">
      <div className="md:w-1/5 hidden md:flex">
        <Sidebar />
      </div>
      <div className="xl:w-4/7 w-full">
        <ThreadDetail />
      </div>
      <div className="xl:w-2/7 hidden xl:flex">
        <Profile />
      </div>
    </div>
  );
}

export default ThreadDetailPage;
