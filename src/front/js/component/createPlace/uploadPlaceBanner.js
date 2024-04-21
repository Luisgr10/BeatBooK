import React from "react";
import { useContext, useState } from "react";
import { Context } from "../../store/appContext";
import { useParams } from "react-router-dom";
import "../createEvent/createEvent.css";
import { toast } from "react-toastify";

export const UploadPlaceBanner = ({ onUpload }) => {
  const { actions } = useContext(Context);
  const { id } = useParams();
  const [isImageSelected, setIsImageSelected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = async (e) => {
    setIsLoading(true);
    const file = e.target.files[0];

    const data = await actions.uploadBannerPlace(file, id);

    if (data) {
      const bannerUrl = data.url;
      onUpload(bannerUrl);
      setIsImageSelected(true);
      toast.success("Imagen subida con éxito");
    } else {
      console.error("Error uploading image");
      toast.error("Error al subir la imagen");
    }
    setIsLoading(false);
  };

  return (
    <div className=" ">
      <p className="p_upload">Portada del lugar</p>
      <input
        className="upload_selector"
        type="file"
        onChange={handleFileChange}
        required
        accept="image/*"
        disabled={isImageSelected}
      />
      {isLoading && <div className="text-center pt-2">
        <div className="spinner-border" style={{ width: '2rem', height: '2rem' }} role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>}
    </div>
  );
};