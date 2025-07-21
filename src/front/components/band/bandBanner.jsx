import React, { useRef, useState, useContext, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Context } from "../../store/appContext";
import { useNavigate } from "react-router-dom";
import "../band/Bandstyle.css";
import "../profile/profile.css";
import { makeStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    "& > *": {
      margin: theme.spacing(0.2),
    },
  },
}));

export const BandBanner = (props) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { actions, store } = useContext(Context);
  const [bandData, setbandData] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isImageSelected, setIsImageSelected] = useState(false);

  const [formData, setFormData] = useState({
    description: "",
    profile_picture: "",
    banner_picture: "",
    instagram: "",
    tiktok: "",
  });

  useEffect(() => {
    let isMounted = true;
    actions.getBand(id).then((data) => {
      if (isMounted) setbandData(data);
    });
    return () => {
      isMounted = false;
    };
  }, [id]);

  // Handlers para mostrar y ocultar los modales respectivos
  const handleShowEditModal = () => setShowEditModal(true);
  const handleCloseEditModal = () => setShowEditModal(false);
  const handleShowDeleteModal = () => setShowDeleteModal(true);
  const handleCloseDeleteModal = () => setShowDeleteModal(false);

  const handleBannerChange = async (e) => {
    setIsLoading(true);
    const file = e.target.files[0];

    // Pasa el ID del evento al método uploadEventPicture
    const data = await actions.uploadBannerBand(file, id);

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

  const handleFileChange = async (e) => {
    setIsLoading(true);
    const file = e.target.files[0];

    // Pasa el ID del evento al método uploadEventPicture
    const data = await actions.uploadBandPicture(file, id);

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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        `${process.env.BACKEND_URL}/api/bands/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      handleCloseEditModal(); // Cierra el modal después de enviar el formulario

      // Actualizar datos de usuario en el estado de la aplicación
      const updatedBandResponse = await fetch(
        `${process.env.BACKEND_URL}/api/bands/${id}`
      );
      const updatedBandData = await updatedBandResponse.json();
      actions.getBand(id);
      toast.success("Cambios guardados con éxito");
    } catch (error) {
      // Manejar errores de solicitud
      console.error("Error al enviar el formulario:", error);
      toast.error("Error al guardar los cambios");
    }
  };

  const handleDeleteBand = async () => {
    try {
      const response = await fetch(
        `${process.env.BACKEND_URL}/api/bands/${id}`,
        {
          method: "DELETE",
        }
      );

      if (response.ok) {
        navigate("/home");
        toast.error("Banda Eliminada!");
      } else {
        // Si la eliminación falla (por ejemplo, si la banda no se encuentra),
        // puedes mostrar un mensaje de error al usuario.
        toast.error("Error al eliminar la banda");
      }
    } catch (error) {
      console.error("Error al eliminar la banda:", error);
      toast.error("Error al eliminar la banda");
    }
  };

  const classes = useStyles();

  return (
    <div className="profile-container">
      {/* Banner y header */}
      <div className="profile-header">
        <div className="profile-banner">
          <img
            src={store.band.banner_picture}
            className="banner-img"
            alt="Banner"
          />
        </div>
      </div>
      {/* Info principal */}
      <div className="profile-info-section">
        <div className="profile-info-container">
          <div className="profile-picture-container">
            <div className="profile-picture">
              <img
                className="profile-img"
                src={store.band.profile_picture}
                alt="Perfil"
              />
            </div>
          </div>
          <div className="profile-details">
            <div className="profile-name-section">
              <h1 className="profile-name">{store.band.name}</h1>
            </div>
            <div className="profile-actions">
              <button
                className="action-btn primary"
                onClick={handleShowEditModal}
              >
                <i className="fa-solid fa-user-pen"></i> Editar
              </button>
            </div>
          </div>
        </div>
      </div>
      {/* Cards de detalles, miembros, categorías y eventos */}
      <div className="profile-body">
        <div className="profile-left-column">
          <div className="profile-card">
            <h3>Detalles</h3>
            <p>{store.band.description}</p>
            <h3>Redes sociales</h3>
            <div className="profile-social-icons">
              <a
                href={store.band.instagram}
                className="profile-social-btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-instagram"></i>
              </a>
              <a
                href={store.band.tiktok}
                className="profile-social-btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-tiktok"></i>
              </a>
            </div>
          </div>
          <div className="profile-card">
            <h3>Miembros</h3>
            <div className="d-flex flex-row justify-content-center align-items-center flex-wrap">
              {store.band.members &&
                store.band.members.map((member, index) => (
                  <div className={classes.root} key={index}>
                    <Link to={`/profile/${member.id}`}>
                      <Avatar
                        className="avatar"
                        alt={member.username}
                        src={member.profile_image_url}
                      />
                    </Link>
                  </div>
                ))}
            </div>
          </div>
          <div className="profile-card">
            <h3>Categoría musical</h3>
            <div className="music-categories">
              {store.band.musical_categories &&
                store.band.musical_categories.map((category) => (
                  <span className="category-tag" key={category.id}>
                    {category.name}
                  </span>
                ))}
            </div>
          </div>
        </div>
        <div className="profile-right-column">
          <div className="profile-card">
            <h3>Próximos Eventos</h3>
            {store.band.events &&
              store.band.events.map((event, index) => (
                <div className="event-card" key={index}>
                  <Link to={`/events/${event.id}`}>
                    <img
                      src={event.picture_url}
                      alt="img"
                      draggable="false"
                      className="event-image"
                    />
                  </Link>
                  <div className="event-content">
                    <h4 className="event-title">{event.name}</h4>
                    <p className="event-description">{event.description}</p>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
      {/* Modal para editar Información */}
      <Modal
        show={showEditModal}
        onHide={handleCloseEditModal}
        onSubmit={handleSubmit}
        className="profile-modal"
      >
        <Modal.Header closeButton className="modal-bg">
          <Modal.Title className="modal-title">
            Editar perfil de banda
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-bg">
          <div className="edit-image">
            <div className="image-title">
              <h6>Foto de perfil</h6>
              <input type="file" onChange={handleFileChange} accept="image/*" />
            </div>
            <div className="modal-img">
              <img
                className="img"
                src={store.band.profile_picture}
                alt="perfil"
              />
            </div>
            {isLoading && (
              <div className="text-center pt-2">
                <div
                  className="spinner-border"
                  style={{ width: "2rem", height: "2rem" }}
                  role="status"
                >
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            )}
          </div>
          <div className="edit-banner">
            <div className="image-title">
              <h6>Foto de portada</h6>
              <input
                type="file"
                onChange={handleBannerChange}
                accept="image/*"
              />
            </div>
            <div className="banner-img">
              <img
                src={store.band.banner_picture}
                className="img-fluid"
                alt="fotoBanner"
              />
            </div>
          </div>
          <form onSubmit={(e) => handleSubmit(e)}>
            <div className="edit-info">
              <div className="edit-detail">
                <div className="image-title">
                  <h6>Detalles</h6>
                </div>
                <div className="modal-detail">
                  <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                  ></textarea>
                </div>
              </div>
              <div className="image-title">
                <h6>Información</h6>
              </div>
              <div className="modal-info">
                <div className="inputGroup">
                  <input
                    placeholder="Instagram"
                    className="input"
                    name="instagram"
                    type="text"
                    value={formData.instagram}
                    onChange={handleChange}
                  />
                  <input
                    placeholder="Tiktok"
                    className="input"
                    name="tiktok"
                    type="text"
                    value={formData.tiktok}
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <Modal.Footer>
              <Button className="action-btn primary" type="submit">
                Guardar cambios
              </Button>
              <Button
                className="action-btn danger"
                onClick={handleShowDeleteModal}
              >
                Eliminar Banda
              </Button>
            </Modal.Footer>
          </form>
        </Modal.Body>
      </Modal>

      {/* Modal para confirmar eliminación */}
      <Modal
        show={showDeleteModal}
        onHide={handleCloseDeleteModal}
        className="profile-modal"
      >
        <Modal.Header closeButton className="modal-bg">
          <Modal.Title>Confirmar Eliminación</Modal.Title>
        </Modal.Header>
        <Modal.Body className="modal-bg">
          ¿Estás seguro de que deseas eliminar esta banda?
        </Modal.Body>
        <Modal.Footer className="modal-bg">
          <Button
            className="action-btn secondary"
            onClick={handleCloseDeleteModal}
          >
            Cancelar
          </Button>
          <Button className="action-btn danger" onClick={handleDeleteBand}>
            Eliminar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
