import React from "react";
import { Link } from "react-router-dom";
import Register from "./Register";
import Login from "./Login";

export default function Header(props) {
  return (
    <header className="headerContainer">
      <h1>Game Library</h1>
      <Link to={'/'}>Home</Link>
      <Link to={'/'}>About Us</Link>
	  <Link to={'/Register'}>Register</Link>
	  <Link to={'/Login'}>Login</Link>
    </header>
  );
}
