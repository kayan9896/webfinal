import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Details from "./components/Details";
import Header from "./components/Header";
import Mini from "./components/Mini";
import Home from "./components/Home";
import MiniDetails from "./components/MiniDetails";
import Login from "./components/Login";
import Register from "./components/Register";
import { useAuth0 } from "@auth0/auth0-react";
import LoginButton from "./components/LoginButton";
import LogoutButton from "./components/LogoutButton";

function App() {
  const { isAuthenticated, isLoading } = useAuth0();
  useEffect(() => {
    document.title = "NEU WebFinal Games"
	
  }, [])
  
  return (
    <div className="App">
      {/* <Header /> */}
	  <nav>
	  	{isAuthenticated ? <LogoutButton /> : <LoginButton />}
	  </nav>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Header />
              <Home />
            </>
          }
        />
        <Route
          path="/game/:sid"
          element={
            <>
              <Header />
              <Details />{" "}
            </>
          }
        />
        <Route
          path="/mini"
          element={
            <>
              <Header />
              <Mini />
            </>
          }
        />
        <Route
          path="/mini/:gameId"
          element={
            <>
              <Header />
              <MiniDetails />
            </>
          }
        />
        {/* <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} /> */}
        <Route path="*" element={<p>Nothing to match this path. </p>} />
		
      </Routes>
    </div>
  );
}

export default App;
