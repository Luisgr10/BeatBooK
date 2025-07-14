import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ProfileBanner } from "../components/profile/profileBanner";
import { ProfileBody } from "../components/profile/profileBody";
import { Context } from "../store/appContext";

export const Profile = () => {
  const { actions, store } = useContext(Context);
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("jwt-token");

    if (token) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
      navigate("/");
    }
  }, []);

  return (
    <div className="profile-container">
      {isLoggedIn && (
        <>
          <ProfileBanner />
          <ProfileBody />
        </>
      )}
    </div>
  );
};
