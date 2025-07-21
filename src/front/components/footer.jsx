import React from "react";
import "../styles/footer.css";
import beatBoxHorizontalBlanco from "./navbar/beatBoxHorizontalBlanco.png";
import Logo_Facebook from "../img/Logo_Facebook.png";
import Logo_Twitter from "../img/Logo_Twitter.png";
import Logo_Instagram from "../img/Logo_Instagram.png";
import LinkedInIcon from "@material-ui/icons/LinkedIn";
import GitHubIcon from "@material-ui/icons/GitHub";

export const Footer = () => {
  return (
    <footer className="modern-footer minimal-footer">
      <div className="footer-container minimal-footer-container">
        <div className="footer-content minimal-footer-content">
          {/* Logo & Social */}
          <div className="footer-brand minimal-footer-brand">
            <a href="/" className="footer-logo-link">
              <img
                src={beatBoxHorizontalBlanco}
                alt="BeatBooK"
                className="footer-logo minimal-footer-logo"
              />
            </a>
            <div className="footer-social-icons">
              <a
                href="https://www.facebook.com/"
                className="footer-social-btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-facebook-f"></i>
              </a>
              <a
                href="https://www.twitter.com/"
                className="footer-social-btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="https://www.instagram.com/"
                className="footer-social-btn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <i className="fab fa-instagram"></i>
              </a>
            </div>
          </div>

          {/* Links */}
          <div className="footer-links minimal-footer-links">
            <a href="/paginafalsa" className="footer-link">
              Quiénes somos
            </a>
            <a href="/paginafalsa" className="footer-link">
              Soporte
            </a>
            <a href="/paginafalsa" className="footer-link">
              Legal
            </a>
            <a href="/paginafalsa" className="footer-link">
              Blog
            </a>
          </div>

          {/* Team */}
          <div className="footer-team minimal-footer-team">
            <div className="team-members minimal-team-members">
              <div className="team-member minimal-team-member">
                <span className="member-name">Luis Guilarte</span>
                <div className="member-links">
                  <a
                    href="https://www.linkedin.com/in/luisgr10/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="member-link"
                  >
                    <LinkedInIcon className="member-icon" />
                  </a>
                  <a
                    href="https://github.com/Luisgr10"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="member-link"
                  >
                    <GitHubIcon className="member-icon" />
                  </a>
                </div>
              </div>
              <div className="team-member minimal-team-member">
                <span className="member-name">Miriam Asencio</span>
                <div className="member-links">
                  <a
                    href="https://www.linkedin.com/in/miriam-asencio/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="member-link"
                  >
                    <LinkedInIcon className="member-icon" />
                  </a>
                  <a
                    href="https://github.com/Miritzila"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="member-link"
                  >
                    <GitHubIcon className="member-icon" />
                  </a>
                </div>
              </div>
              <div className="team-member minimal-team-member">
                <span className="member-name">Heyson Betancourt</span>
                <div className="member-links">
                  <a
                    href="https://www.linkedin.com/in/heyson-betancourt-9b266a299/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="member-link"
                  >
                    <LinkedInIcon className="member-icon" />
                  </a>
                  <a
                    href="https://github.com/heysonbr"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="member-link"
                  >
                    <GitHubIcon className="member-icon" />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="footer-bottom minimal-footer-bottom">
          <p className="copyright minimal-copyright">
            © 2024 BeatBooK. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
};
