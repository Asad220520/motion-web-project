import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home/Home";
<<<<<<< HEAD
import Header from "@/layouts/Header/Header";
import Footer from "@/layouts/Footer/Footer";
import AboutUs from "./pages/AboutUs/AboutUs";
import Courses from "./pages/Courses/Courses";
import Contacts from "./pages/Contacts/Contacts";
import Detail from "./pages/Detail/Detail";
import { useMatch } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
=======
import AboutUs from "@/pages/AboutUs/AboutUs";
import Courses from "@/pages/Courses/Courses";
import Contacts from "@/pages/Contacts/Contacts";
import Register from "@/auth/Register/Register";
import Login from "@/auth/Login/Login";
import Payment from "@/payment/PaymentForm/PaymentForm";

import MainLayout from "@/layouts/MainLayouts";
import AuthLayout from "@/layouts/AuthLayout";
import ProfileLayout from "@/layouts/ProfileLauout/ProfileLayout";

// Вложенные страницы профиля
import ProfileMain from "./pages/Profiles/ProfileMain/ProfileMain";
import Chat from "./pages/Profiles/Chat/Chat";
import Grades from "./pages/Profiles/Grades/Grades";
import Help from "./pages/Profiles/Help/Help";
import { Settings } from "lucide-react";
import CoursesProfile from "./pages/Profiles/CoursesProfile/CoursesProfile";
// import Chat from "@/pages/Profiles/Chat";
// import CoursesProfile from "@/pages/Profiles/Courses";
// import Grades from "@/pages/Profiles/Grades";
// import Settings from "@/pages/Profiles/Settings";
// import Help from "@/pages/Profiles/Help";
>>>>>>> main

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
<<<<<<< HEAD
      {shouldShowHeader && <Header />}
      <div className="main">
        <Routes>
=======
      <Routes>
        {/* Публичные маршруты */}
        <Route element={<MainLayout />}>
>>>>>>> main
          <Route path="/" element={<Home />} />
          <Route path="/онас" element={<AboutUs />} />
          <Route path="/курсы" element={<Courses />} />
          <Route path="/контакты" element={<Contacts />} />
<<<<<<< HEAD
          <Route path="/detail/:detailId" element={<Detail />} />
        </Routes>
      </div>
      <Footer />
=======
        </Route>

        {/* Авторизация и вход */}
        <Route element={<AuthLayout />}>
          <Route path="/регистрация" element={<Register />} />
          <Route path="/войти" element={<Login />} />
          <Route path="/оплата" element={<Payment />} />
        </Route>

        {/* Защищённые маршруты профиля с сайдбаром */}
        <Route path="/профиль" element={<ProfileLayout />}>
          <Route index element={<ProfileMain />} />
          <Route path="чат" element={<Chat />} />
          <Route path="курсы" element={<CoursesProfile />} />
          <Route path="оценки" element={<Grades />} />
          <Route path="настройки" element={<Settings />} />
          <Route path="помощь" element={<Help />} />
        </Route>
      </Routes>
>>>>>>> main
    </div>
  );
};

export default App;
