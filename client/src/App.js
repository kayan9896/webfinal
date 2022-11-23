import React from "react";

import { Route, Routes } from "react-router-dom";
import Details from "./components/Details";
import Header from "./components/Header";

import Home from "./components/Home";
function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/game/:sid" element={<Details />} />

        <Route path="*" element={<p>Nothing to match this path. </p>} />
      </Routes>
    </div>
  );
}

export default App;
