import Sidebar from "@/components/Sidebar";
import Profile from "@/components/Profile";
import FollowDetail from "@/layouts/FollowDetail";
import ProfileDetail from "@/layouts/ProfileDetail";
import ProfileRight from "@/components/Suggested";

function ProfileDetailpage() {
  return (
    <>
      <div className="flex pt-5 ">
        <div className="w-1/5">
          <Sidebar />
        </div>
        <div className="w-4/7">
          <ProfileDetail />
        </div>
        <div className="w-2/7">
          <ProfileRight />
        </div>
      </div>
    </>
  );
}

export default ProfileDetailpage;
