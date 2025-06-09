import React from "react";
import Reviews from "./Reviews/Reviews";
import Search from "@/components/Search/Search";
const Home = () => {
  return (
    <div className="home">
      <Reviews />
      <Search />
    </div>
  );
};

export default Home;
