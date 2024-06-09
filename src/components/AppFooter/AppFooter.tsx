import React from "react";
import "./AppFooter.scss";
import logo from "../../assets/images/logo4.png";
import { routes } from "../../routes";
import { NavLink } from "react-router-dom";
import { FaFacebook } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

export const AppFooter = () => {
  return (
    <footer className="app-footer full main-container">
      <div className="flex g30 space-between">
        <div>
          <div className="footer__logo">
            <span>Jurassic Jungle</span>
          </div>
          <div className="footer__details flex column g30">
            <div>
              <h5>Address:</h5>
              <span className="footer__details__text">
                123 Main Street, Anytown, USA
              </span>
            </div>
            <div>
              <h5>Contact:</h5>
              <span className="footer__details__text">
                JurassicJungle@gmail.com
              </span>
            </div>
            <div className="footer__icons flex g10">
              <FaFacebook />
              <FaInstagram />
              <FaXTwitter />
              <FaLinkedin />
              <FaYoutube />
            </div>
          </div>
        </div>
        <div className="flex column g20 footer__links">
          {routes.map((route) => {
            return route.showInNavBar ? (
              <NavLink key={route.path} to={route.path}>
                {route.label}
              </NavLink>
            ) : null;
          })}
        </div>
      </div>
    </footer>
  );
};
