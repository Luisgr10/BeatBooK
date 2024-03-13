import React from "react";
import { Navbar, Nav, Container } from "react-bootstrap";
import { Search } from "./navbar/searchBar";
import { Login } from "./navbar/login";
import "./navbar/buttonJoin.css";

export const AppNavbar = () => {
  return (
    <Container className="mb-3 mt-3">
      <Navbar
        bg="light"
        expand="lg"
        className="rounded p-3"
        style={{ boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}
      >
        {/* Logo o nombre de la aplicación */}
        <Navbar.Brand href="/">BeatBooK</Navbar.Brand>

        {/* Botón para colapsar el menú en dispositivos pequeños */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Contenido del menú */}
        <Navbar.Collapse id="basic-navbar-nav" className="align-items-center">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            {/* Vistas de la página */}
            <Nav.Link href="/">Inicio</Nav.Link>
            <Nav.Link href="/recomendados">Recomendados</Nav.Link>
          </Nav>

          {/* Barra de búsqueda */}
          <div style={{ flex: 1, justifyContent: "center", display: "flex" }}>
            <Search />
          </div>

          {/* Botones de registro e inicio de sesión */}

          <Nav className="ml-auto ps-2 pe-0 m-0">
            <button className="buttonSpecial">Registro</button>

            <Login />
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
};
