import React, { useRef, useState, useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import "../profile/profile.css";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { Link } from "react-router-dom";

export const ProfileBody = (props) => {
  const { store, actions } = useContext(Context);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    actions.getPrivateData();
  }, []);

  // Manejo del modal de agregar categorías
  const [showAddModal, setShowAddModal] = useState(false);
  const handleShowAddModal = () => setShowAddModal(true);
  const handleCloseAddModal = () => setShowAddModal(false);

  // Manejo del modal de eliminar categorías
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const handleShowDeleteModal = () => setShowDeleteModal(true);
  const handleCloseDeleteModal = () => setShowDeleteModal(false);

  const handleShow = () => {
    const defaultSelectedCategories = store.currentUser.user_categories.map(
      (category) => category.id
    );
    setSelectedCategories(defaultSelectedCategories);
    setShow(true);
  };
  const handleShowDelete = () => {
    const defaultSelectedCategories = store.currentUser.user_categories.map(
      (category) => category.id
    );
    setSelectedCategories(defaultSelectedCategories);
    setShow(true);
  };

  // Función para formatear la fecha en el formato deseado
  const birthdate = store.currentUser?.birthdate;
  const formatBirthdate = (birthdate) => {
    if (!birthdate) return ""; // Manejar el caso de que birthdate sea null o undefined
    const date = new Date(birthdate);
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatEventDate = (eventDate) => {
    if (!eventDate) return "";
    const date = new Date(eventDate);
    return date.toLocaleDateString("es-ES", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  useEffect(() => {
    actions.getAllEvents();
  }, [store.currentUser]);

  const handleCategoryClick = (categoryId) => {
    // Toggle de selección de categorías
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(
        selectedCategories.filter((id) => id !== categoryId)
      );
    } else {
      setSelectedCategories([categoryId]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(selectedCategories);
    try {
      const response = await fetch(
        `${process.env.BACKEND_URL}/api/user/${store.currentUser.id}/categories`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ category_id: selectedCategories }),
        }
      );
      if (!response.ok) {
        throw new Error("Error al enviar el formulario");
      }
      handleCloseAddModal();
      const updatedUserResponse = await fetch(
        `${process.env.BACKEND_URL}/api/users/${store.currentUser.id}`
      );
      const updatedUserData = await updatedUserResponse.json();
      actions.getPrivateData(updatedUserData);
    } catch (error) {
      // Manejar errores de solicitud
      console.error("Error al enviar el formulario:", error);
    }
  };

  const handleDeleteCategory = async (categoryId) => {
    try {
      const response = await fetch(
        `${process.env.BACKEND_URL}/api/user/${store.currentUser.id}/categories`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ category_id: categoryId }), // Usar categoryId en lugar de userId
        }
      );
      if (!response.ok) {
        throw new Error("Error al eliminar la categoría musical");
      }
      // Actualizar el estado o realizar cualquier acción adicional necesaria
      console.log("Categoría musical eliminada exitosamente");
      handleCloseDeleteModal();
      const updatedUserResponse = await fetch(
        `${process.env.BACKEND_URL}/api/users/${store.currentUser.id}`
      );
      const updatedUserData = await updatedUserResponse.json();
      actions.getPrivateData(updatedUserData);
    } catch (error) {
      // Manejar errores de solicitud
      console.error("Error al eliminar la categoría musical:", error);
    }
  };

  return (
    <div className="profile-body">
      {/* Left Column - Profile Info */}
      <div className="profile-left-column">
        {/* About Card */}
        <div className="profile-card">
          <h3>Sobre mí</h3>
          <p>
            {store.currentUser?.description || "No hay descripción disponible."}
          </p>

          {/* Social Links */}
          {(store.currentUser?.instagram || store.currentUser?.tiktok) && (
            <div className="profile-social-icons">
              {store.currentUser?.instagram && (
                <a href={store.currentUser.instagram} className="profile-social-btn" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-instagram"></i>
                </a>
              )}
              {store.currentUser?.tiktok && (
                <a href={store.currentUser.tiktok} className="profile-social-btn" target="_blank" rel="noopener noreferrer">
                  <i className="fab fa-tiktok"></i>
                </a>
              )}
            </div>
          )}
        </div>

        {/* Personal Info Card */}
        <div className="profile-card">
          <h3>Información personal</h3>
          <p>
            <strong>Ciudad:</strong>{" "}
            {store.currentUser?.city || "No especificada"}
          </p>
          <p>
            <strong>Género:</strong>{" "}
            {store.currentUser?.gender || "No especificado"}
          </p>
          <p>
            <strong>Cumpleaños:</strong>{" "}
            {formatBirthdate(birthdate) || "No especificado"}
          </p>

          {/* Band Link */}
          {store.currentUser && store.currentUser.created_band && (
            <div style={{ marginTop: "16px" }}>
              <p>
                <strong>Mi banda:</strong>
              </p>
              <Link to={`/banda/${store.currentUser.created_band.id}`}>
                <button className="action-btn primary">
                  <i className="fas fa-music"></i>
                  {store.currentUser.created_band.name}
                </button>
              </Link>
            </div>
          )}
        </div>

        {/* Music Interests Card */}
        <div className="profile-card">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: "16px",
            }}
          >
            <h3>Intereses musicales</h3>
            <div style={{ display: "flex", gap: "8px" }}>
              <button
                className="action-btn secondary"
                onClick={handleShowAddModal}
              >
                <i className="fas fa-plus"></i>
              </button>
              <button
                className="action-btn secondary"
                onClick={handleShowDeleteModal}
              >
                <i className="fas fa-minus"></i>
              </button>
            </div>
          </div>

          {/* Music Categories */}
          <div className="music-categories">
            {store.currentUser?.user_categories &&
            store.currentUser.user_categories.length > 0 ? (
              store.currentUser.user_categories.map((category) => (
                <button
                  key={category.id}
                  className={`category-tag ${
                    selectedCategories.includes(category.id) ? "selected" : ""
                  }`}
                  onClick={() => handleCategoryClick(category.id)}
                >
                  <i className="fas fa-music"></i> {category.name}
                </button>
              ))
            ) : (
              <p style={{ color: "#65676b", fontStyle: "italic" }}>
                No hay categorías seleccionadas
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Right Column - Events */}
      <div className="profile-right-column">
        <div className="profile-card">
          <h3>Próximos eventos</h3>

          {store.allEvents && store.allEvents.length > 0 ? (
            store.allEvents
              .filter((event) =>
                event.assistances.some(
                  (assistance) =>
                    store.currentUser &&
                    assistance.user_id === store.currentUser.id
                )
              )
              .sort((a, b) => new Date(a.date) - new Date(b.date))
              .map((event, index) => (
                <div className="event-card" key={index}>
                  <Link
                    to={`/events/${event.id}`}
                    style={{ textDecoration: "none", color: "inherit" }}
                  >
                    <img
                      src={event.picture_url || "/default-event.jpg"}
                      alt={event.name}
                      className="event-image"
                    />
                    <div className="event-content">
                      <h4 className="event-title">{event.name}</h4>
                      <p className="event-description">{event.description}</p>
                      <p className="event-date">
                        {formatEventDate(event.date)}
                      </p>
                    </div>
                  </Link>
                </div>
              ))
          ) : (
            <p
              style={{
                color: "#65676b",
                textAlign: "center",
                fontStyle: "italic",
              }}
            >
              No tienes eventos próximos
            </p>
          )}
        </div>
      </div>

      {/* Add Categories Modal */}
      <Modal
        show={showAddModal}
        onHide={handleCloseAddModal}
        className="profile-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Agregar categorías musicales</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div
              style={{ display: "flex", flexDirection: "column", gap: "12px" }}
            >
              {store.allCategories &&
                store.allCategories.map((category) => (
                  <div
                    key={category.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >
                    <input
                      type="radio"
                      id={`add-${category.id}`}
                      name="category"
                      value={category.id}
                      checked={selectedCategories.includes(category.id)}
                      onChange={() => handleCategoryClick(category.id)}
                    />
                    <label
                      htmlFor={`add-${category.id}`}
                      style={{ margin: 0, cursor: "pointer" }}
                    >
                      {category.name}
                    </label>
                  </div>
                ))}
            </div>
            <div className="modal-actions">
              <button
                type="button"
                className="btn btn-secondary"
                onClick={handleCloseAddModal}
              >
                Cancelar
              </button>
              <button type="submit" className="btn btn-primary">
                Agregar
              </button>
            </div>
          </form>
        </Modal.Body>
      </Modal>

      {/* Delete Categories Modal */}
      <Modal
        show={showDeleteModal}
        onHide={handleCloseDeleteModal}
        className="profile-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title>Eliminar categorías musicales</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div
            style={{ display: "flex", flexDirection: "column", gap: "12px" }}
          >
            {store.allCategories &&
              store.allCategories.map((category) => (
                <div
                  key={category.id}
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    padding: "12px",
                    border: "1px solid #e4e6eb",
                    borderRadius: "6px",
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "12px",
                    }}
                  >
                    <input
                      type="radio"
                      id={`delete-${category.id}`}
                      name="deleteCategory"
                      value={category.id}
                      checked={selectedCategories.includes(category.id)}
                      onChange={() => handleCategoryClick(category.id)}
                    />
                    <label
                      htmlFor={`delete-${category.id}`}
                      style={{ margin: 0, cursor: "pointer" }}
                    >
                      {category.name}
                    </label>
                  </div>
                  <button
                    className="btn btn-secondary"
                    onClick={() => handleDeleteCategory(category.id)}
                    style={{ fontSize: "12px", padding: "4px 8px" }}
                  >
                    Eliminar
                  </button>
                </div>
              ))}
          </div>
          <div className="modal-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleCloseDeleteModal}
            >
              Cerrar
            </button>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};
