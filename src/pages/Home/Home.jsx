import React from "react";
import Reviews from "./Reviews/Reviews";
import Search from "@/components/Search/Search";
const Home = () => {
  return (
    <div className="home">
      <div className="container">
        <div className="home__inner">
          <Reviews />
          <Search />
        </div>
      </div>
    </div>
  );
};

export default Home;
