import { TrashIcon } from "@heroicons/react/24/solid";
import "./CartItems.css";

const CartItem = ({ cart, removeCartItem }) => {
  const { img, price, name, shipping, _id } = cart;

  return (
    <div className="cart-design">
      <div>
        <img src={img} alt="" />
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
        <h1 className="text-lg font-semibold"> {name} </h1>
        <p> Price: {price}</p>
        <p>Shipping cost: {shipping}</p>
      </div>
      <div className="trushIcon">
        <button
          onClick={() => removeCartItem(_id)}
          style={{
            padding: "0",
            margin: "0",
            background: "transparent",
            outline: "none",
            border: "none",
          }}
        >
          <TrashIcon className="h-9 w-9 text-rose-500" />
        </button>
      </div>
    </div>
  );
};

export default CartItem;
