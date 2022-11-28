import React, { useEffect } from "react";

import { Route, Routes } from "react-router-dom";
import Details from "./components/Details";
import Header from "./components/Header";
import Mini from "./components/Mini";
import Home from "./components/Home";
import MiniDetails from "./components/MiniDetails";
import Login from "./components/Login";
import Register from "./components/Register";
function App() {
  useEffect(() => {
    document.title = "NEU WebFinal Games"
  }, [])
  return (
    <div className="App">
      {/* <Header /> */}
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
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<p>Nothing to match this path. </p>} />
      </Routes>
    </div>
  );
}

export default App;
