import React from "react";
import "./AboutUs.scss";
import Rac from "./Rac/Rac";
import Text from "./Text/Text";
import Imag from "./Imag/Imag";
import Search from "@/components/Search/Search";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import API_BASE_URL from "../../config/api";

const AboutUs = () => {
  const [about, setAbout] = useState([]);

  useEffect(() => {
    async function getAbout() {
      try {
        const res = await axios.get(`${API_BASE_URL}/aboutus/`);
        setAbout(res.data);
      } catch (error) {
        console.error("Ошибка при получении About:", error);
      }
    }

    getAbout();
  }, []);

  return (

    <div className="AboutUs">
      <Rac  el={about} />
      <Imag el={about} />
      <Text el={about} />
      <Search el={about}/>
    </div>
  );
};

export default AboutUs;
