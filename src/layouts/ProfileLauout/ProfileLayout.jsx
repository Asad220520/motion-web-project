import Sidebar from "../../pages/Profiles/components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import "./profileLayout.scss";
import ProfileHeader from "../Header/ProfileHeader/ProfileHeader";

const ProfileLayout = () => {
  return (
    <div>
      <ProfileHeader />
      <div className="profile-layout">
        <Sidebar />
        <main className="profile-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ProfileLayout;
