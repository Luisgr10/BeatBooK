import React, { useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import { useParams } from "react-router-dom";
import "../profile/profile.css";

export const ProfileGuestBanner = () => {
  const { store, actions } = useContext(Context);
  const { id } = useParams();

  useEffect(() => {
    actions.getUser(id);
  }, []);

  return (
    <div className="profile-header">
      {/* Banner Section */}
      <div className="profile-banner">
        <div className="banner-image">
          <img
            src={store.singleUser?.banner_picture || "/default-banner.jpg"}
            alt="Banner"
            className="banner-img"
          />
        </div>
      </div>
      {/* Profile Info Section */}
      <div className="profile-info-section">
        <div className="profile-info-container">
          {/* Profile Picture */}
          <div className="profile-picture-container">
            <div className="profile-picture">
              <img
                src={
                  store.singleUser?.profile_image_url || "/default-avatar.jpg"
                }
                alt="Profile"
                className="profile-img"
              />
            </div>
          </div>
          {/* Profile Name */}
          <div className="profile-details">
            <div className="profile-name-section">
              <h1 className="profile-name">
                {store.singleUser?.username || "Usuario"}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
