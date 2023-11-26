import React, { useContext, useState } from "react";
import "./Header.css";
import { Bars3CenterLeftIcon, XMarkIcon } from "@heroicons/react/24/solid";

import logo from "../../images/Logo.svg";
import { Link } from "react-router-dom";
import { UserContext } from "../../AuthProvider/AuthProvider";

const Header = () => {
  const [state, setState] = useState(false);
  const { user, logout } = useContext(UserContext);

  // handle sign out
  function handleSignOut() {
    logout()
      .then(() => {})
      .catch((err) => {
        console.log(err);
      });
  }
  return (
    <nav className="header">
      <div className="logo">
        <img src={logo} alt="logo" />
      </div>
      <div className={`navigator ${state ? "mbl-nav-false" : "mbl-nav-trure"}`}>
        <Link to="/"> Home</Link>
        {user && <Link to="/orders">Ordes</Link>}
        <Link to="/inventory">Inventory</Link>

        {user && <Link>wellcome {user.displayName}</Link>}
        {(user && (
          <button
            onClick={handleSignOut}
            className="bg-slate-600 text-white mx-3"
          >
            signOut
          </button>
        )) || <Link to="/login">Login</Link>}     
      </div>
      <button
        className="toggle-button bg-transparent transition-all outline-none border-none"
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
