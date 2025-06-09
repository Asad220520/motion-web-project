import React from "react";
import "./AboutUs.scss";
import Rac from "./Rac/Rac";
import Text from "./Text/Text";
import Imag from "./Imag/Imag";
import Search from "@/components/Search/Search";

const AboutUs = () => {
  return (
    <div className="AboutUs">
      <Rac />
      <Imag />
      <Text />
      <Search/>
    </div>
  );
};

export default AboutUs;
