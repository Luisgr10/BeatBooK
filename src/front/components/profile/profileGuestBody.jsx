import React, { useState, useContext, useEffect } from "react";
import { Context } from "../../store/appContext";
import { Link, useParams } from "react-router-dom";
import "../profile/profile.css";

export const ProfileGuestBody = () => {
  const { store, actions } = useContext(Context);
  const { id } = useParams();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [userBands, setUserBands] = useState([]);

  // Función para formatear la fecha en el formato deseado
  const birthdate = store.singleUser.birthdate;
  const formatBirthdate = (birthdate) => {
    if (!birthdate) return "";
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
    actions.getUser(id).then((userData) => {
      const userId = userData.id;
      actions.getAllBands().then((bandsData) => {
        const userBands = bandsData.filter((band) =>
          band.members.some((member) => member.id === userId)
        );
        setUserBands(userBands);
      });
    });
  }, []);

  useEffect(() => {
    actions.getAllEvents();
  }, [store.singleUser]);

  return (
    <div className="profile-body">
      {/* Left Column - Profile Info */}
      <div className="profile-left-column">
        {/* About Card */}
        <div className="profile-card">
          <h3>Sobre mí</h3>
          <p>
            {store.singleUser?.description || "No hay descripción disponible."}
          </p>
          {/* Social Links */}
          {(store.singleUser?.instagram || store.singleUser?.tiktok) && (
            <div className="profile-social-icons">
              {store.singleUser?.instagram && (
                <a
                  href={store.singleUser.instagram}
                  className="profile-social-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <i className="fab fa-instagram"></i>
                </a>
              )}
              {store.singleUser?.tiktok && (
                <a
                  href={store.singleUser.tiktok}
                  className="profile-social-btn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
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
            {store.singleUser?.city || "No especificada"}
          </p>
          <p>
            <strong>Género:</strong>{" "}
            {store.singleUser?.gender || "No especificado"}
          </p>
          <p>
            <strong>Cumpleaños:</strong>{" "}
            {formatBirthdate(birthdate) || "No especificado"}
          </p>
          {/* Band Link */}
          {userBands.length > 0 && (
            <div style={{ marginTop: "16px" }}>
              <p>
                <strong>Bandas:</strong>
              </p>
              {userBands.map((band) => (
                <Link to={`/banda/${band.id}`} key={band.id}>
                  <button className="action-btn primary">
                    <i className="fas fa-music"></i>
                    {band.name}
                  </button>
                </Link>
              ))}
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
          </div>
          {/* Music Categories */}
          <div className="music-categories">
            {store.singleUser?.user_categories &&
            store.singleUser.user_categories.length > 0 ? (
              store.singleUser.user_categories.map((category) => (
                <button
                  key={category.id}
                  className={`category-tag ${
                    selectedCategories.includes(category.id) ? "selected" : ""
                  }`}
                  // No onClick para invitados
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
          {(store.allEvents && store.allEvents.length > 0
            ? store.allEvents
            : []
          )
            .filter(
              (event) =>
                event.assistances &&
                event.assistances.some(
                  (assistance) =>
                    store.singleUser &&
                    assistance.user_id === store.singleUser.id
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
                    <p className="event-date">{formatEventDate(event.date)}</p>
                  </div>
                </Link>
              </div>
            ))}
          {(!store.allEvents || store.allEvents.length === 0) && (
            <p
              style={{
                color: "#65676b",
                textAlign: "center",
                fontStyle: "italic",
              }}
            >
              No tiene eventos próximos
            </p>
          )}
        </div>
      </div>
    </div>
  );
};
