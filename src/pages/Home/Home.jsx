import React from "react";
import Button from "@/components/Button";
import Reviews from "./Reviews/Reviews";
const Home = () => {
  return (
    <div className="home">
      <div className="container">
        <div className="home__inner">
          <h1 className="h6">--color-text</h1>
          <Button label="fdsf" />
          <Reviews />
        </div>
      </div>
    </div>
  );
};

export default Home;
