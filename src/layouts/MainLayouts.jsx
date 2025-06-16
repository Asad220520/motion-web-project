import React, { useEffect, useState } from "react";
import { Outlet, useMatch } from "react-router-dom";
// import Header from "./Header/MainHeader/Header";
import Footer from "./Footer/Footer";
import MainHeader from "./Header/MainHeader/Header";

const MainLayout = () => {
   const match = useMatch("/detail/:detailId");
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsTablet(window.innerWidth <= 1024);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const shouldShowHeader = !match || isTablet;

  return (
    <>
      {/* <Header /> */}
      {shouldShowHeader && <MainHeader />}
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
