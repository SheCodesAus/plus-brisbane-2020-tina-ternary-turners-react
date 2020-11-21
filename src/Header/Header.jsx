import React from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import Logo from "../images/Logo2.PNG";

function Header() {
  return (
    <div className="logo-header">
      <Link to="/">
        <a>
          <img className="logo" src={Logo} alt="logo" />
        </a>
      </Link>
    </div>
  );
}

export default Header;
