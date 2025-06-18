import { Routes, Route } from "react-router-dom";

import Home from "@/pages/Home/Home";
import AboutUs from "@/pages/AboutUs/AboutUs";
import Courses from "@/pages/Courses/Courses";
import Contacts from "@/pages/Contacts/Contacts";
import Detail from "./pages/Detail/DatilCard/Detail";
import Register from "@/auth/Register/Register";
import Login from "@/auth/Login/Login";
import Payment from "@/payment/PaymentForm/PaymentForm";

import ProfileMain from "@/pages/Profiles/ProfileMain/ProfileMain";
import Chat from "@/pages/Profiles/Chat/Chat";
import Help from "@/pages/Profiles/Help/Help";
import CoursesProfile from "@/pages/Profiles/CoursesProfile/CoursesProfile";
import Settings from "@/pages/Profiles/Settings/Settings";
import MainLayout from "./layouts/MainLayouts";
import AuthLayout from "./layouts/AuthLayout";
import ProfileLayout from "./layouts/ProfileLauout/ProfileLayout";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "./redux/features/profile/profileSlice";
import CourseRatingModal from "@/pages/Profiles/Grades/CourseRatingModal";
import LessonPage from "./pages/LessonPage/LessonPage";

import ForgotPassword from "./auth/ForgotPassword/ForgotPassword";
import ResetPasswordConfirm from "./auth/ResetPasswordConfirm/ResetPasswordConfirm";

const App = () => {
  const dispatch = useDispatch();
  const tokens = useSelector((state) => state.auth.tokens);

  useEffect(() => {
    if (tokens?.access) {
      dispatch(fetchUserProfile());
    }
  }, [tokens, dispatch]);

  // ...
  return (
    <Routes>
      {/* Публичная часть */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/онас" element={<AboutUs />} />
        <Route path="/курсы" element={<Courses />} />
        <Route path="/контакты" element={<Contacts />} />
        <Route path="/detail/:detailId" element={<Detail />} />
      </Route>

      {/* Авторизация */}
      <Route element={<AuthLayout />}>
        <Route path="/регистрация" element={<Register />} />
        <Route path="/войти" element={<Login />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route
          path="/reset-password-confirm"
          element={<ResetPasswordConfirm />}
        />
        <Route path="/оплата" element={<Payment />} />
      </Route>

      {/* Профиль */}
      <Route element={<ProfileLayout />}>
        <Route path="/профиль" element={<ProfileMain />} />
        <Route path="/профиль/чат" element={<Chat />} />
        <Route path="/профиль/курсы" element={<CoursesProfile />} />
        <Route path="/профиль/оценки" element={<CourseRatingModal />} />
        <Route path="/профиль/настройки" element={<Settings />} />
        <Route path="/профиль/помощь" element={<Help />} />
        <Route path="/lesson/:id" element={<LessonPage />} />
      </Route>
    </Routes>
  );
};

export default App;
