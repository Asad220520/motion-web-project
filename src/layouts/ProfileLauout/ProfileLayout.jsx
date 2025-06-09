import React from "react";
import Sidebar from "../../pages/Profiles/components/Sidebar/Sidebar";
import { Outlet } from "react-router-dom";
import "./profileLayout.scss";
const ProfileLayout = () => {
  return (
    <div className="profile-layout">
      <Sidebar />
      <main className="profile-content">
        <Outlet />
      </main>
    </div>
  );
};

export default ProfileLayout;
