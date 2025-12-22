import Sidebar from "@/components/Sidebar";
import ProfileDetail from "@/layouts/ProfileDetail";
import ProfileRight from "@/components/Suggested";
import BottomNavigation from "@/components/BottomNavigation";
import ProfileSearch from "@/layouts/ProfileSearch";

function ProfileSearchpage() {
  return (
    <>
      <div className="flex pt-5 ">
        <div className="md:w-1/5 hidden md:flex">
          <Sidebar />
        </div>
        <div className="xl:w-4/7 w-full">
          <ProfileSearch />
        </div>
        <div className="xl:w-2/7 hidden xl:flex">
          <ProfileRight />
        </div>

        <div className="md:hidden fixed bottom-0 left-0 right-0 z-50">
          <BottomNavigation />
        </div>
      </div>
    </>
  );
}

export default ProfileSearchpage;
