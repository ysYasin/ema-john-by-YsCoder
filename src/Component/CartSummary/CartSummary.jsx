import React from "react";
import "./CartSummary.css";
import { TrashIcon, WindowIcon } from "@heroicons/react/24/solid";

const CartSummary = ({ cart, handleClearCart, children }) => {
  let quantity = 0;
  let totalPrice = 0;
  let totalShipping = 0;
  for (let product of cart) {
    quantity = quantity + product.quantity;
    totalPrice = totalPrice + product.price * product.quantity;
    totalShipping = totalShipping + product.shipping;
  }
  const tax = ((totalPrice + totalShipping) * 7) / 100;

  const grandTotal = totalPrice + totalShipping + tax;
  return (
    <div className="cartSammary">
      <h2 style={{ textAlign: "center" }} className="text-3xl font-semibold">
        Product Summary
      </h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <p>Selected Items : {quantity}</p>
        <p>Total price : ${totalPrice.toFixed(2)}</p>
        <p>Total Shipping Charge : ${totalShipping.toFixed(2)}</p>
        <p>Tax: ${tax.toFixed(2)}</p>
        <h4>Grand Total: ${grandTotal.toFixed(2)}</h4>
      </div>
      <div>
        <button
          onClick={handleClearCart}
          style={{ background: "#FF3030" }}
          className="flex w-full mb-2 items-center rounded-md text-white justify-between"
        >
          Clear Cart <TrashIcon className="h-6 w-6 text-white" />
        </button>

        {children}
      </div>
    </div>
  );
};

export default CartSummary;
