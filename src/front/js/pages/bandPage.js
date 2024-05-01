import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Importa useParams y useNavigate
import { ProfileBanner } from "../component/profile/profileBanner";
import { ProfileBody } from "../component/profile/profileBody";
import { Context } from "../store/appContext";
import { BandBanner } from "../component/band/bandBanner";
import "../../styles/paginasEspecificas.css";


export const BandPage = () => {
  const navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem("jwt-token");

    if (!token) {
      navigate("/");
    }
  }, []);


  return (
    <div>
      <BandBanner />
    </div>
  );
};
