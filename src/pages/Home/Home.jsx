import React from "react";
import Reviews from "./Reviews/Reviews";
import Search from "@/components/Search/Search";
import LotStudy from "./LotStudy/LotStudy";
import Prepod from "./Prepod/Prepod";
import WhyCursApi from "./WhyCurs/WhyCursApi";
import FreeCourses from "./FreeCourses/FreeCourses";
const Home = () => {
  return (
    <div className="home">
      <LotStudy />
      <Prepod />
      <WhyCursApi />
      <FreeCourses />
      <Reviews />
      <Search />
    </div>
  );
};

export default Home;
