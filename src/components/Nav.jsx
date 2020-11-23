import React from "react";
import { Link } from "react-router-dom";
function Nav() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>
      <Link to="/contact">Contact</Link>
      <Link to="/login">Log In</Link>
      <Link to="/register">Register</Link>
    </nav>
  );
}
export default Nav;
