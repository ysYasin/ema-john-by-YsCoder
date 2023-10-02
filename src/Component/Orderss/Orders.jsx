import React, { useState } from "react";
import CartSummary from "../CartSummary/CartSummary";
import "./Order.css";
import { useLoaderData } from "react-router-dom";
import CartItem from "./CartItem/CartItem";
import { removeFromDb } from "../../utilities/fakedb";
import NotFoundCartItem from "./CartItem/NotFoundCartItem";

const Orders = () => {
  const storedCarts = useLoaderData();
  const [carts, setCarts] = useState(storedCarts);

  const removeCartItem = (id) => {
    const remainingItems = carts.filter((cart) => cart.id !== id);
    setCarts([...remainingItems]);
    removeFromDb(id);
  };

  return (
    <div className="shopping-sector ss-inOp" style={{}}>
      <div className="">
        {carts.length !== 0 ? (
          carts.map((cart) => (
            <CartItem
              key={cart.id}
              cart={cart}
              removeCartItem={removeCartItem}
            ></CartItem>
          ))
        ) : (
          <NotFoundCartItem></NotFoundCartItem>
        )}
      </div>
      <div className="order-summary-inOp">
        <CartSummary key={carts.id} cart={carts}></CartSummary>
      </div>
    </div>
  );
};

export default Orders;
