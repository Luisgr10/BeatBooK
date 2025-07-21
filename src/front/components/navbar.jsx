import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { Search } from "./navbar/search";
import { Login } from "./navbar/login";
import "./navbar/buttonJoin.css";
import "./navbar/modern-navbar.css";
import LogoHorizontalBlanco from "./navbar/beatBoxHorizontalBlanco.png";
import "./navbar/logo.css";
import { Context } from "../store/appContext";
import { Menu, MenuItem, Button, Hidden } from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

export const AppNavbar = () => {
  const { store, actions } = useContext(Context);
  const [anchorEl, setAnchorEl] = useState(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    actions.checkUser();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className={`modern-navbar ${scrolled ? "scrolled" : ""}`}>
      <div className="navbar-container">
        <nav className="navbar-content">
          {/* Logo Section */}
          <div className="navbar-brand">
            <Link to="/home" className="logo-link">
              <img
                src={LogoHorizontalBlanco}
                alt="BeatBooK"
                className="navbar-logo"
              />
            </Link>
          </div>

          {/* Navigation Links - Desktop */}
          <Hidden lgUp>
            <Button
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleClick}
              className="mobile-menu-btn"
            >
              <MenuIcon />
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
              className="mobile-menu"
            >
              <MenuItem onClick={handleClose}>
                <Link to="/categorias" className="mobile-menu-link">
                  Categorías
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link to="/eventos" className="mobile-menu-link">
                  Eventos
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link to="/grupos" className="mobile-menu-link">
                  Grupos
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Link to="/lugares" className="mobile-menu-link">
                  Lugares
                </Link>
              </MenuItem>
              <MenuItem onClick={handleClose}>
                <Search />
              </MenuItem>
            </Menu>
          </Hidden>

          <Hidden mdDown className="navbar-links">
            <Link to="/categorias" className="nav-link">
              Categorías
            </Link>
            <div className="nav-separator"></div>
            <Link to="/eventos" className="nav-link">
              Eventos
            </Link>
            <div className="nav-separator"></div>
            <Link to="/grupos" className="nav-link">
              Grupos
            </Link>
            <div className="nav-separator"></div>
            <Link to="/lugares" className="nav-link">
              Lugares
            </Link>
            <div className="nav-separator"></div>
            <Search />
          </Hidden>

          {/* User Actions */}
          <div className="navbar-actions">
            <Login />
          </div>
        </nav>
      </div>
    </div>
  );
};
