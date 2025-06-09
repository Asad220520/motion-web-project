import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home/Home";
import Header from "@/layouts/Header/Header";
import Footer from "@/layouts/Footer/Footer";
import AboutUs from "./pages/AboutUs/AboutUs";
import Courses from "./pages/Courses/Courses";
import Contacts from "./pages/Contacts/Contacts";
import Detail from "./pages/Detail/Detail";
import { useMatch } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";

const App = () => {
  const match = useMatch("/detail/:detaId");
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

  console.log(isTablet);

  return (
    <div className="App">
      {shouldShowHeader && <Header />}
      <div className="main">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/онас" element={<AboutUs />} />
          <Route path="/курсы" element={<Courses />} />
          <Route path="/контакты" element={<Contacts />} />
          <Route path="/detail/:detailId" element={<Detail />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;
