import React, { useEffect, useState } from "react";
import "./Shop.css";
import Product from "../Product/Product";
import CartSummary from "../CartSummary/CartSummary";
import {
  addToDb,
  deleteShoppingCart,
  getShoppingCart,
} from "../../utilities/fakedb";
import { ArrowRightIcon, WindowIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

const Shop = () => {
  const [products, setProducts] = useState([]);
  useEffect(() => {
    fetch("products.json")
      .then((res) => res.json())
      .then((d) => setProducts(d));
  }, []);
  // function to get data from child component
  const [cart, setCart] = useState([]);

  function addToCard(product) {
    let newCart = [];
    const existingProduct = cart.find((pd) => pd === product.id);
    if (!existingProduct) {
      product.quantity = 1;
      newCart = [...cart, product];
    } else {
      existingProduct.quantity = existingProduct.quantity + 1;
      const remaininingPd = cart.filter((pd) => pd.id !== product.id);
      newCart = [...remaininingPd, existingProduct];
    }
    setCart(newCart);
    addToDb(product.id);
  }
  // get data from DB and set them on cart
  useEffect(() => {
    let savedCart = [];
    const storedCart = getShoppingCart();
    for (let id in storedCart) {
      const addedProduct = products.find((product) => product.id === id);
      if (addedProduct) {
        addedProduct.quantity = storedCart[id];
        savedCart.push(addedProduct);
      }
    }
    setCart(savedCart);
  }, [products]);
  //   console.log(cart);
  const handleClearCart = () => {
    setCart([]);
    deleteShoppingCart();
  };
  return (
    <div className="shopping-sector ">
      <div className="shoping-cards-container">
        {products.map((product) => (
          <Product
            key={product.id}
            product={product}
            addToCard={addToCard}
          ></Product>
        ))}
      </div>
      <div className="order-summary">
        <CartSummary cart={cart} handleClearCart={handleClearCart}>
          <Link to="/orders">
            <button
              style={{ background: "#F90" }}
              className="flex w-full mb-2 items-center rounded-md text-white justify-between"
            >
              Review Order <ArrowRightIcon className="h-6 w-6 text-white" />
            </button>
          </Link>
        </CartSummary>
      </div>
    </div>
  );
};

export default Shop;
