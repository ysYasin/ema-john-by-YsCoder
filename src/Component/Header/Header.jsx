import React from "react";
import "./Header.css";
import logo from "../../images/Logo.svg";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="header">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <div className="navigator">
        <Link to="/"> Home</Link>
        <Link to="/orders">Ordes</Link>
        <Link to="/inventory">Inventory</Link>
        <Link to="/login">Login</Link>
      </div>
    </nav>
  );
};

export default Header;
