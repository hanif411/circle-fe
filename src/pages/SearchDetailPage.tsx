import Profile from "@/components/Profile";
import Sidebar from "@/components/Sidebar";
import SearchDetail from "@/layouts/SearchDetail";

function SearchDetailPage() {
  return (
    <div className="flex pt-5 ">
      <div className="w-1/5">
        <Sidebar />
      </div>
      <div className="w-4/7">
        <SearchDetail />
      </div>
      <div className="w-2/7">
        <Profile />
      </div>
    </div>
  );
}

export default SearchDetailPage;
