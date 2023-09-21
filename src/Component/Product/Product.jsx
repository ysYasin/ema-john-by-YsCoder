import React from "react";
import ReactDOM from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingBasket } from "@fortawesome/free-solid-svg-icons";
import "./Product.css";

const Product = (props) => {
  const { name, seller, ratings, price, img } = props.product;
  return (
    <div className="card">
      <div className="card-img">
        <img src={img} alt={name} />
      </div>
      <div className="card-body">
        <div>
          <h4>{name}</h4>
          <p>Price : ${price}</p>
        </div>
        <div>
          <p>Manufacturer : {seller}</p>
          <p>Ratings : {ratings}</p>
        </div>
      </div>
      <div className="card-footer">
        <button
          onClick={() => props.addToCard(props.product)}
          className="atc-btn"
        >
          Add To Cart <FontAwesomeIcon icon={faShoppingBasket} />
        </button>
      </div>
    </div>
  );
};

export default Product;
