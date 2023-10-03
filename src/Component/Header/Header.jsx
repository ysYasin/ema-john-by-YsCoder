import React, { useState } from "react";
import "./Header.css";
import { Bars3CenterLeftIcon, XMarkIcon } from "@heroicons/react/24/solid";

import logo from "../../images/Logo.svg";
import { Link } from "react-router-dom";

const Header = () => {
  const [state, setState] = useState(false);
  return (
    <nav className="header">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <div className={`navigator ${state ? "mbl-nav-false" : "mbl-nav-trure"}`}>
        <Link to="/"> Home</Link>
        <Link to="/orders">Ordes</Link>
        <Link to="/inventory">Inventory</Link>
        <Link to="/login">Login</Link>
      </div>
      <button
        className="bg-transparent transition-all outline-none border-none md:hidden"
        onClick={() => setState(!state)}
      >
        {" "}
        {state ? (
          <XMarkIcon className="w-9 h9 font-semibold text-white"></XMarkIcon>
        ) : (
          <Bars3CenterLeftIcon className="w-9 h9 font-semibold text-white"></Bars3CenterLeftIcon>
        )}{" "}
      </button>
    </nav>
  );
};

export default Header;
