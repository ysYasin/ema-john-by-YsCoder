import React, { useState } from "react";
import CartSummary from "../CartSummary/CartSummary";
import "./Order.css";
import { Link, useLoaderData } from "react-router-dom";
import CartItem from "./CartItem/CartItem";
import { deleteShoppingCart, removeFromDb } from "../../utilities/fakedb";
import NotFoundCartItem from "./CartItem/NotFoundCartItem";
import { WindowIcon } from "@heroicons/react/24/solid";

const Orders = () => {
  const storedCarts = useLoaderData();
  const [carts, setCarts] = useState(storedCarts);

  const removeCartItem = (id) => {
    const remainingItems = carts.filter((cart) => cart._id !== id);
    console.log(id, remainingItems);
    setCarts([...remainingItems]);
    removeFromDb(id);
  };

  const handleClearCart = () => {
    setCarts([]);
    deleteShoppingCart();
  };
  return (
    <div className="shopping-sector ss-inOp" style={{}}>
      <div className="">
        {carts.length !== 0 ? (
          carts.map((cart) => (
            <CartItem
              key={cart._id}
              cart={cart}
              removeCartItem={removeCartItem}
            ></CartItem>
          ))
        ) : (
          <NotFoundCartItem></NotFoundCartItem>
        )}
      </div>
      <div className="order-summary-inOp">
        <CartSummary
          handleClearCart={handleClearCart}
          key={carts._id}
          cart={carts}
        >
          <Link to="/proceedCheckout">
            <button
              style={{ background: "#F90" }}
              className="flex w-full mb-2 items-center rounded-md text-white justify-between"
            >
              Proceed Checkout <WindowIcon className="h-6 w-6 text-white" />
            </button>
          </Link>
        </CartSummary>
      </div>
    </div>
  );
};

export default Orders;
