import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Importa useParams y useNavigate
import { ProfileBanner } from "../component/profile/profileBanner";
import { ProfileBody } from "../component/profile/profileBody";
import { Context } from "../store/appContext";

export const Profile = () => {
    const { actions, store } = useContext(Context);
    const params = useParams();
    const navigate = useNavigate();
  
    useEffect(() => {
        const token = localStorage.getItem("jwt-token");

        if (!token) {
            navigate("/");
        }
        if(!store.currentUser) {
            actions.getPrivateData()
        }
    }, []);

    return (
        <div className="container">
            <div>
                <ProfileBanner/>
            </div>
            <div className="">
                <ProfileBody/>
            </div>
        </div>
    );
};
