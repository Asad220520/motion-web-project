import React from "react";
import "./Search.scss";
import { useState } from "react";
import axios from "axios";
import API_BASE_URL from "../../config/api";
import { useEffect } from "react";

const Search = () => {
  const [search, setSearch] = useState([]);
  async function getTitle() {
    let res = await axios(`${API_BASE_URL}/titleemail/`);
    const { data } = res;
    setSearch(data);
  }
  useEffect(() => {
    getTitle();
  }, []);
    if (!search || search.length === 0) {
    return <div>Загрузка...</div>; // или любой fallback
  }
  const {title,description} = search[0]
  return (
    <div id="search">
      <div className="container">
        <div className="search">
          <h1>{title} </h1>
          <h2>
            {description}
          </h2>
          <div className="search--input">
            <input type="text" placeholder="Твой Email" />
            <button>Подписка</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Search;
