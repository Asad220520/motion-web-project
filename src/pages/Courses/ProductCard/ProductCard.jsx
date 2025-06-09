import React from "react";
import Button from "@/components/Button";
import "./ProductCard.scss";
import { FaChevronRight } from "react-icons/fa";
import { Link } from "react-router-dom";
const ProductCard = ({ el }) => {
  
  return (
    <div id="productCard" key={el.id}>
      <img src={el.img} alt={el.title} />
      <div className="productCard">
        <h3>{el.title}</h3>
        <p>{el.desc}</p>
        <div className="productCard--info">
          {el.info.map((el,id) => (
            <div key={id} className="productCard--info__text">
              <img src={el.img} alt="img" />
              <span>{el.text}</span>
            </div>
          ))}
        </div>
      <Link to={`/detail/${el.id}`}>
          Узнать больше <FaChevronRight />
      </Link>
      </div>
    </div>
  );
};

export default ProductCard;
