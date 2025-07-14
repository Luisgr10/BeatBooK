import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/landingPage.css";
import beatBoxHorizontalBlanco from "../img/beatBoxHorizontalBlanco.png";

export const LandingPage = () => {
  const [videoUrl] = useState(
    "https://videos.pexels.com/video-files/7722744/7722744-uhd_3840_2160_25fps.mp4"
  );
  return (
    <div className="landing-bg">
      <div className="landing-video-container">
        <video autoPlay muted loop className="landing-video">
          <source src={videoUrl} type="video/mp4" />
        </video>
        <div className="landing-logo-overlay">
          <Link to="/home">
            <img
              className="image-landing"
              src={beatBoxHorizontalBlanco}
              alt="Beatbook logo"
            />
          </Link>
        </div>
      </div>
      <main className="landing-main">
        <h1 className="title-l">
          Beatbook te permite crear una comunidad fácilmente
        </h1>
        <div className="landing-cards">
          <div className="card-l">
            <img
              src="https://images.pexels.com/photos/4353618/pexels-photo-4353618.jpeg?auto=compress&cs=tinysrgb&w=800"
              className="card-img-l"
              alt="Comunidad"
            />
            <div className="card-body">
              <h5>Llega a personas nuevas</h5>
              <p>
                Conecta con personas de tu zona que sientan pasión por la
                música.
              </p>
            </div>
          </div>
          <div className="card-l">
            <img
              src="https://images.pexels.com/photos/2883051/pexels-photo-2883051.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              className="card-img-l"
              alt="Eventos"
            />
            <div className="card-body">
              <h5>Una aplicación para organizar</h5>
              <p>Gestiona la asistencia y actualiza tus eventos.</p>
            </div>
          </div>
          <div className="card-l">
            <img
              src="https://images.pexels.com/photos/976866/pexels-photo-976866.jpeg?auto=compress&cs=tinysrgb&w=800"
              className="card-img-l"
              alt="Crecimiento"
            />
            <div className="card-body">
              <h5>Crecimiento continuo</h5>
              <p>
                Impulsa la visibilidad de tu grupo en nuestra red, fomentando su
                crecimiento.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
