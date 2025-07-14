import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import "../profile/profile.css";
import { Link } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";

export const ProfileBanner = () => {
  const [show, setShow] = useState(false);
  const navigate = useNavigate();
  const { store, actions } = useContext(Context);
  const { id } = useParams();
  const [isImageSelected, setIsImageSelected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    birthdate: "",
    description: "",
    gender: "",
    city: "",
    profile_image_url: "",
    banner_picture: "",
    instagram: "",
    tiktok: "",
  });

  const citySpain = [
    "A Coruña",
    "Álava",
    "Albacete",
    "Alicante",
    "Almería",
    "Asturias",
    "Ávila",
    "Badajoz",
    "Barcelona",
    "Burgos",
    "Cáceres",
    "Cádiz",
    "Cantabria",
    "Castellón",
    "Ciudad Real",
    "Córdoba",
    "Cuenca",
    "Girona",
    "Granada",
    "Guadalajara",
    "Guipúzcoa",
    "Huelva",
    "Huesca",
    "Illes Balears",
    "Jaén",
    "La Rioja",
    "Las Palmas",
    "León",
    "Lleida",
    "Lugo",
    "Madrid",
    "Málaga",
    "Murcia",
    "Navarra",
    "Ourense",
    "Palencia",
    "Pontevedra",
    "Salamanca",
    "Santa Cruz de Tenerife",
    "Segovia",
    "Sevilla",
    "Soria",
    "Tarragona",
    "Teruel",
    "Toledo",
    "Valencia",
    "Valladolid",
    "Vizcaya",
    "Zamora",
    "Zaragoza",
  ];

  const handleFileChange = async (e) => {
    setIsLoading(true);
    const file = e.target.files[0];
    const data = await actions.uploadUserPicture(file, id);

    if (data) {
      const imageUrl = data.url;
      setIsImageSelected(true);
      toast.success("Imagen subida con éxito");
    } else {
      console.error("Error uploading image");
      toast.error("Error al subir la imagen");
    }
    setIsLoading(false);
  };

  const handleBannerChange = async (e) => {
    setIsLoading(true);
    const file = e.target.files[0];
    const data = await actions.uploadBannerPicture(file, id);

    if (data) {
      const bannerUrl = data.url;
      setIsImageSelected(true);
      toast.success("Imagen subida con éxito");
    } else {
      console.error("Error uploading image");
      toast.error("Error al subir la imagen");
    }
    setIsLoading(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    try {
      const response = await fetch(
        `${process.env.BACKEND_URL}/api/users/${store.currentUser.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) {
        throw new Error("Error al enviar el formulario");
      }
      handleClose();

      const updatedUserResponse = await fetch(
        `${process.env.BACKEND_URL}/api/users/${store.currentUser.id}`
      );
      const updatedUserData = await updatedUserResponse.json();
      actions.getPrivateData(updatedUserData);

      toast.success("Cambios guardados con éxito");
    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      toast.error("Error al guardar los cambios");
    }
  };

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="profile-header">
      {/* Banner Section */}
      <div className="profile-banner">
        <div className="banner-image">
          <img
            src={store.currentUser?.banner_picture || "/default-banner.jpg"}
            alt="Banner"
            className="banner-img"
          />
          <div className="banner-overlay">
            <button className="edit-banner-btn" onClick={handleShow}>
              <i className="fas fa-camera"></i>
            </button>
          </div>
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
                  store.currentUser?.profile_image_url || "/default-avatar.jpg"
                }
                alt="Profile"
                className="profile-img"
              />
              <div className="profile-picture-overlay">
                <button className="edit-profile-btn" onClick={handleShow}>
                  <i className="fas fa-camera"></i>
                </button>
              </div>
            </div>
          </div>

          {/* Profile Name and Actions */}
          <div className="profile-details">
            <div className="profile-name-section">
              <h1 className="profile-name">
                {store.currentUser?.username || "Usuario"}
              </h1>
              <div className="profile-stats">
                <span className="stat-item">
                  <i className="fas fa-users"></i>
                  <span>0 amigos</span>
                </span>
                <span className="stat-item">
                  <i className="fas fa-calendar"></i>
                  <span>0 eventos</span>
                </span>
              </div>
            </div>

            <div className="profile-actions">
              <button className="action-btn primary" onClick={handleShow}>
                <i className="fas fa-edit"></i>
                Editar perfil
              </button>

              <div className="dropdown">
                <button
                  className="action-btn secondary dropdown-toggle"
                  type="button"
                  data-bs-toggle="dropdown"
                >
                  <i className="fas fa-plus"></i>
                  Crear
                </button>
                <ul className="dropdown-menu">
                  <li>
                    <a className="dropdown-item" href="/event/registre">
                      Crear evento
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/banda/registre">
                      Crear banda
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="/lugar/registre">
                      Crear local
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Edit Profile Modal */}
      <Modal show={show} onHide={handleClose} className="profile-modal">
        <Modal.Header closeButton>
          <Modal.Title>Editar perfil</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="edit-sections">
            {/* Profile Picture Edit */}
            <div className="edit-section">
              <h6>Foto de perfil</h6>
              <div className="image-edit-container">
                <img
                  src={
                    store.currentUser?.profile_image_url ||
                    "/default-avatar.jpg"
                  }
                  alt="Profile"
                  className="edit-preview-img"
                />
                <input
                  type="file"
                  onChange={handleFileChange}
                  accept="image/*"
                  className="file-input"
                />
                {isLoading && (
                  <div className="loading-spinner">Cargando...</div>
                )}
              </div>
            </div>

            {/* Banner Edit */}
            <div className="edit-section">
              <h6>Foto de portada</h6>
              <div className="banner-edit-container">
                <img
                  src={
                    store.currentUser?.banner_picture || "/default-banner.jpg"
                  }
                  alt="Banner"
                  className="edit-preview-banner"
                />
                <input
                  type="file"
                  onChange={handleBannerChange}
                  accept="image/*"
                  className="file-input"
                />
              </div>
            </div>

            {/* Profile Info Edit */}
            <form onSubmit={handleSubmit}>
              <div className="edit-section">
                <h6>Información personal</h6>
                <div className="form-group">
                  <label>Descripción</label>
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Cuéntanos sobre ti..."
                    className="form-control"
                  ></textarea>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Ciudad</label>
                    <select
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      className="form-control"
                    >
                      <option value="">Selecciona una ciudad</option>
                      {citySpain.map((city) => (
                        <option key={city} value={city}>
                          {city}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Género</label>
                    <select
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="form-control"
                    >
                      <option value="">Selecciona género</option>
                      <option value="Masculino">Masculino</option>
                      <option value="Femenino">Femenino</option>
                      <option value="No binario">No binario</option>
                      <option value="Prefiero no decir">
                        Prefiero no decir
                      </option>
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label>Fecha de nacimiento</label>
                  <input
                    type="date"
                    name="birthdate"
                    value={formData.birthdate}
                    onChange={handleChange}
                    className="form-control"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Instagram</label>
                    <input
                      type="url"
                      name="instagram"
                      value={formData.instagram}
                      onChange={handleChange}
                      placeholder="https://instagram.com/tu-usuario"
                      className="form-control"
                    />
                  </div>

                  <div className="form-group">
                    <label>TikTok</label>
                    <input
                      type="url"
                      name="tiktok"
                      value={formData.tiktok}
                      onChange={handleChange}
                      placeholder="https://tiktok.com/@tu-usuario"
                      className="form-control"
                    />
                  </div>
                </div>
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={handleClose}
                >
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  Guardar cambios
                </button>
              </div>
            </form>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};
