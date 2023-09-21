import React, { useEffect, useState } from "react";
import "./Shop.css";
import Product from "../Product/Product";
import CartSummary from "../CartSummary/CartSummary";
import { addToDb, getShoppingCart } from "../../utilities/fakedb";

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
      newCart = [...cart, product];
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
  return (
    <div className="shopping-sector">
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
        <CartSummary cart={cart}></CartSummary>
      </div>
    </div>
  );
};

export default Shop;
