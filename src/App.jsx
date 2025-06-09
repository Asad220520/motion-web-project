import { Routes, Route } from "react-router-dom";
import Home from "@/pages/Home/Home";
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

const App = () => {
  return (
    <div className="App">
      <Routes>
        {/* Публичные маршруты */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/онас" element={<AboutUs />} />
          <Route path="/курсы" element={<Courses />} />
          <Route path="/контакты" element={<Contacts />} />
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
    </div>
  );
};

export default App;
