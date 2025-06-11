import React from "react";
import { Outlet } from "react-router-dom";
// import Header from "./Header/MainHeader/Header";
import Footer from "./Footer/Footer";
import MainHeader from "./Header/MainHeader/Header";

const MainLayout = () => {
  return (
    <>
      {/* <Header /> */}
      <MainHeader />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;
