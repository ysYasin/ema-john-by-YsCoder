import React from "react";
import "./CartSummary.css";

const CartSummary = ({ cart }) => {
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
      <h2 style={{ textAlign: "center" }}>Product Summary</h2>
      <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <p>Selected Items : {quantity}</p>
        <p>Total price : ${totalPrice.toFixed(2)}</p>
        <p>Total Shipping Charge : ${totalShipping.toFixed(2)}</p>
        <p>Tax: ${tax.toFixed(2)}</p>
        <h4>Grand Total: ${grandTotal.toFixed(2)}</h4>
      </div>
    </div>
  );
};

export default CartSummary;
