import "../styles/Home.css";
import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router";
import {useAuth} from "../contexts/AuthContext";

import Nav from "../components/Nav";

const shipBeige_manned = "/assets/characters/shipBeige_manned.png";
const shipYellow_manned = "/assets/characters/shipYellow_manned.png";


function Home() {
  const {isLoggedIn, logout} = useAuth();

  return (
    <div className="homePage">
      <Nav />
      <div className="container">
        <div className="header">
          <img
            className="alien-beige"
            src={shipBeige_manned}
            alt="Beige spaceship"
          />

          <h1 id="title">Code Reaction</h1>

          <img
            className="alien-yellow"
            src={shipYellow_manned}
            alt="Yellow spaceship"
          />
        </div>

        <div className="buttons">

          {isLoggedIn? (
              <>
            <Link to="/Learn" className="gameButton">
              Start Game
            </Link>

            <Link to="/UserProgress" className="gameButton">
              Home
            </Link>

            <Link to="/note" className="gameButton">
              Note
            </Link>
              </>
          ):
            <>
            <Link to="/login" className="gameButton">
              Login
            </Link>

            <Link to="/levels" className="gameButton">
              Continue as a gust
            </Link>
            </>
          }

        </div>
      </div>
    </div>
  );
}

export default Home;