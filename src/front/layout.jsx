import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ScrollToTop from "./components/scrollToTop";
import { BackendURL } from "./components/backendURL";
import injectContext from "./store/appContext";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";

import { Event } from "./pages/event";
import { CreateEvent } from "./pages/createEvent";
import { CreateEventMedia } from "./pages/createEventMedia";
import { Private } from "./pages/private";
import { Profile } from "./pages/profile";
import { BandPage } from "./pages/bandPage";
import { BandPageGuest } from "./components/band/BandPageGuest";
import { Categorias } from "./pages/categorias/categorias";
import { CategoryEvents } from "./pages/categorias/categoryEvents";
import { Eventos } from "./pages/categorias/eventos";
import { Grupos } from "./pages/categorias/grupos";
import { Lugares } from "./pages/categorias/lugares";
import { PaginaFalsa } from "./pages/paginaFalsa";
import { LandingPage } from "./pages/landingPage";
import { Lugar } from "./pages/lugar";
import { CreateBand } from "./pages/createBand";
import { CreateBandMedia } from "./pages/createBandMedia";
import { ProfileGuest } from "./components/profile/profileGuest";
import { CreatePlace } from "./pages/createPlace";
import { CreatePlaceMedia } from "./pages/createPlaceMedia";

import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

import { AppNavbar } from "./components/navbar";

import Background from "./pages/background";

import { Footer } from "./components/footer";

//create your first component
const Layout = () => {
  //the basename is used when your project is published in a subdirectory and not in the root of the domain
  // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
  const basename = process.env.BASENAME || "";

  if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "")
    return <BackendURL />;

  return (
    <div className="app-layout">
      <BrowserRouter basename={basename}>
        <ToastContainer />
        <ScrollToTop>
          <AppNavbar />
          <main className="main-content">
            <Routes>
              <Route element={<LandingPage />} path="/" />
              <Route element={<Home />} path="/home" />
              <Route element={<Profile />} path="/profile" />

              <Route element={<Event />} path="/events/:id" />
              <Route element={<BandPage />} path="/grupos/:id" />
              <Route element={<Lugar />} path="/lugares/:place_id" />
              <Route
                element={<CategoryEvents />}
                path="/categoria/:category_id/eventos"
              />

              <Route element={<CreateEvent />} path="/event/registre" />
              <Route element={<CreateBand />} path="/banda/registre" />
              <Route element={<CreatePlace />} path="/lugar/registre" />

              <Route
                element={<CreateEventMedia />}
                path="/event/registre/media/:id"
              />
              <Route
                element={<CreateBandMedia />}
                path="/banda/registre/media/:id"
              />
              <Route
                element={<CreatePlaceMedia />}
                path="/lugar/registre/media/:id"
              />

              <Route element={<Demo />} path="/demo" />
              <Route element={<Single />} path="/single" />
              <Route element={<h1>Not found!</h1>} />
              <Route element={<Private />} path="/private" />
              <Route element={<ProfileGuest />} path="/profile/:id" />
              <Route element={<BandPageGuest />} path="/band/:id" />
              <Route element={<BandPage />} path="/banda/:id" />
              <Route element={<Categorias />} path="/categorias" />
              <Route element={<Eventos />} path="/eventos" />
              <Route element={<Grupos />} path="/grupos" />
              <Route element={<Lugares />} path="/lugares" />
              <Route element={<PaginaFalsa />} path="/paginafalsa" />
            </Routes>
          </main>
          <Footer />
        </ScrollToTop>
      </BrowserRouter>
    </div>
  );
};

export default injectContext(Layout);
