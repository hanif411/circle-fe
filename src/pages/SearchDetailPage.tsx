import BottomNavigation from "@/components/BottomNavigation";
import Profile from "@/components/Profile";
import Sidebar from "@/components/Sidebar";
import SearchDetail from "@/layouts/SearchDetail";

function SearchDetailPage() {
  return (
    <div className="flex pt-5 ">
      <div className="w-1/5 hidden md:flex">
        <Sidebar />
      </div>
      <div className="xl:w-4/7 w-full">
        <SearchDetail />
      </div>
      <div className="xl:w-2/7 hidden xl:flex">
        <Profile />
      </div>

      <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
        <BottomNavigation />
      </div>
    </div>
  );
}

export default SearchDetailPage;
