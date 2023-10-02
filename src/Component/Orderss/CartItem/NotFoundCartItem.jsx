import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../../../images/Logo.svg";

const NotFoundCartItem = () => {
  const navigate = useNavigate();
  const goToHome = () => {
    navigate("/");
  };
  return (
    <div className="flex flex-col gap-4 rounded-lg h-full bg-slate-300 items-center justify-center text-rose-500 font-semibold font-mono">
      <h1 className="text-4xl">Please Add some Card from </h1>

      <img src={logo} width={"300px"} alt="Home" />
      <button
        onClick={goToHome}
        className="text-3xl text-white px-5 py-2 block bg-rose-400 rounded-md"
      >
        Go..
      </button>
    </div>
  );
};

export default NotFoundCartItem;
