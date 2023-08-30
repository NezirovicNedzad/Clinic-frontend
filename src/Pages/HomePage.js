import React from "react";
import { useNavigate } from "react-router";
import { axios } from "axios";

const HomePage = () => {
  const navigate = useNavigate();

  const go = () => {
    navigate("/odeljenja");
  };

  return (
    <div>
      <button onClick={() => go}>Go to odeljenja</button>
    </div>
  );
};

export default HomePage;
