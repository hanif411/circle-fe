import ThreadDetail from "@/components/ThreadDetail";
import Sidebar from "@/components/Sidebar";

function ThreadDetailPage() {
  return (
    <div className="flex pt-5">
      <div className="w-1/4">
        <Sidebar />
      </div>
      <div className="w-2/4">
        <ThreadDetail />
      </div>
      <div className="w-1/4">
        <h1>test profile</h1>
      </div>
    </div>
  );
}

export default ThreadDetailPage;
