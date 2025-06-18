import Sidebar from "../../pages/Profiles/components/Sidebar/Sidebar";
import { Outlet, useLocation, useMatch } from "react-router-dom";
import "./profileLayout.scss";
import ProfileHeader from "../Header/ProfileHeader/ProfileHeader";
import { useEffect, useState } from "react";

const ProfileLayout = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    const content = document.querySelector(".profile-content");
    if (content) content.scrollTop = 0;
  }, [location.pathname]);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };
    const match = useMatch("/lesson/:id");
 



  return (
    <div>
      <ProfileHeader onBurgerClick={toggleSidebar} />
      <div className={`profile-layout ${isSidebarOpen ? "sidebar-open" : ""}`}>
       {!match && <Sidebar onClose={closeSidebar} />}
        <main className="profile-content" onClick={closeSidebar}>
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default ProfileLayout;
