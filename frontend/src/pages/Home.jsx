import "../styles/Home.css";
import React, { useState, useEffect } from "react";
import { Link } from "react-router";

import Nav from "../components/Nav";

import shipBeige_manned from "../assets/characters/shipBeige_manned.png";
import shipYellow_manned from "../assets/characters/shipYellow_manned.png";


function Home() {
  const [data, setData] = useState({});

  useEffect(() => {
    fetch("/api")
      .then((response) => response.json())
      .then((data) => {
        setData(data);
      });
  }, []);

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
          <Link to="/levels">
            <button className="gameButton">Start Game</button>
          </Link>

          <Link to="/note">
            <button className="gameButton">Note</button>
          </Link>

        </div>
      </div>
    </div>
  );
}

export default Home;