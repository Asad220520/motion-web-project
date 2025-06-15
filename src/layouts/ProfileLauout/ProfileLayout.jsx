import Sidebar from "../../pages/Profiles/components/Sidebar/Sidebar";
import { Outlet, useLocation } from "react-router-dom";
import "./profileLayout.scss";
import ProfileHeader from "../Header/ProfileHeader/ProfileHeader";
import { useEffect } from "react";

const ProfileLayout = () => {
    const location = useLocation();

  useEffect(() => {
    const content = document.querySelector(".profile-content");
    if (content) content.scrollTop = 0;
  }, [location.pathname]);

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
