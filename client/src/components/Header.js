import React from "react";
import { Link } from "react-router-dom";

export default function Header(props) {
  return (
    <header className="headerContainer">
      <h1>Game Library</h1>
      <Link to={'/'}>Home</Link>
      <Link to={'/mini'}>Mini Games</Link>
    </header>
  );
}
