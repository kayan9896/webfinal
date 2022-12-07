import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Link } from "react-router-dom";
import LoginButton from "./LoginButton";
import LogoutButton from "./LogoutButton";

export default function Header(props) {
  const { isAuthenticated } = useAuth0();
  return (
    <header className="headerContainer">
      <h1>Game Library</h1>
      <Link to={'/'}>Home</Link>
      <Link to={'/mini'}>Mini Games</Link>
      <Link to={'/profile'}>User Profile</Link>
      {isAuthenticated ? <LogoutButton /> : <LoginButton />}
    </header>
  );
}
