import { Routes, Route } from "react-router-dom";

import Home from "@/pages/Home/Home";
import AboutUs from "@/pages/AboutUs/AboutUs";
import Courses from "@/pages/Courses/Courses";
import Contacts from "@/pages/Contacts/Contacts";
import Detail from "@/pages/Detail/Detail";

import Register from "@/auth/Register/Register";
import Login from "@/auth/Login/Login";
import Payment from "@/payment/PaymentForm/PaymentForm";

// import Header from "@/layouts/Header/Header";
// import Footer from "@/layouts/Footer/Footer";
import MainLayout from "@/layouts/MainLayouts";
import AuthLayout from "@/layouts/AuthLayout";
import ProfileLayout from "@/layouts/ProfileLauout/ProfileLayout";

import ProfileMain from "./pages/Profiles/ProfileMain/ProfileMain";
import Chat from "./pages/Profiles/Chat/Chat";
import Grades from "./pages/Profiles/Grades/Grades";
import Help from "./pages/Profiles/Help/Help";
import CoursesProfile from "./pages/Profiles/CoursesProfile/CoursesProfile";
import { Settings } from "lucide-react";

const App = () => {

  return (
    <div className="App">
      <div className="main">
        <Routes>
          {/* Публичные маршруты */}
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/онас" element={<AboutUs />} />
            <Route path="/курсы" element={<Courses />} />
            <Route path="/контакты" element={<Contacts />} />
            <Route path="/detail/:detailId" element={<Detail />} />
          </Route>

          {/* Detail страница без MainLayout */}

          {/* Авторизация */}
          <Route element={<AuthLayout />}>
            <Route path="/регистрация" element={<Register />} />
            <Route path="/войти" element={<Login />} />
            <Route path="/оплата" element={<Payment />} />
          </Route>

          {/* Профиль с сайдбаром */}
          <Route path="/профиль" element={<ProfileLayout />}>
            <Route index element={<ProfileMain />} />
            <Route path="чат" element={<Chat />} />
            <Route path="курсы" element={<CoursesProfile />} />
            <Route path="оценки" element={<Grades />} />
            <Route path="настройки" element={<Settings />} />
            <Route path="помощь" element={<Help />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
};

export default App;
