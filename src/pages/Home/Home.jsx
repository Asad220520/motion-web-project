import React from "react";
import Button from "@/components/Button";
import Search from "../../components/Search/Search";
import AboutUs from "../AboutUs/AboutUs";
import Reviews from "./Reviews/Reviews";
import Search from "@/components/Search/Search";
const Home = () => {
  return (
    <div className="home">
      <div className="container">
        <div className="home__inner">
          <h1 className="h6">--color-text</h1>
          <Button label="fdsf" />
          <AboutUs />
          <Reviews />
          <Search />
        </div>
      </div>
    </div>
  );
};

export default Home;
