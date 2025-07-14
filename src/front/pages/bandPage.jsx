import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Importa useParams y useNavigate
import { ProfileBanner } from "../components/profile/profileBanner";
import { ProfileBody } from "../components/profile/profileBody";
import { Context } from "../store/appContext";
import { BandBanner } from "../components/band/bandBanner";

export const BandPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwt-token");

    if (!token) {
      navigate("/");
    }
  }, []);

  return (
    <div className="container">
      <div>
        <BandBanner />
      </div>
      <div className="container"></div>
    </div>
  );
};
