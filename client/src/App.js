import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import Details from "./components/Details";
import Header from "./components/Header";
import Mini from "./components/Mini";
import Home from "./components/Home";
import MiniDetails from "./components/MiniDetails"; 
import Profile from "./components/Profile";
import UserComments from "./components/UserComments";

function App() {
 
  useEffect(() => {
    document.title = "NEU WebFinal Games"
	
  }, [])
  
  return (
    <div className="App">
     
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
        <Route path="/profile" element={<><Header /><Profile/><UserComments/></>}/>
        <Route path="*" element={<p>Nothing to match this path. </p>} />
		
		
      </Routes>
    </div>
  );
}

export default App;
