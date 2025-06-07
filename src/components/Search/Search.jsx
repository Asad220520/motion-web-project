import React from "react";
import "./Search.scss";

const Search = () => {
  return (
    <div id="search">
      <div className="container">
        <div className="search">
          <center>
            <h1>Присоединяйся к нам </h1>
            <h2>
              Мы предоставляем множество функций, которые вы можете <br />
              использовать. Постепенное накопление информация{" "}
            </h2>
            <div className="search--input">
              <input type="text" placeholder="Твой Email" />
              <button>Подписка</button>
            </div>
          </center>
        </div>
      </div>
    </div>
  );
};

export default Search;
