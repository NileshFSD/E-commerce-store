import React from "react";
import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div>
      <footer>
        <div className="foot-box">
          <h2>S-Cart</h2>
          <div>
            <h5>Address</h5>
            <div>Lorem ipsum, dolor sit amet consectetur adipisicing.</div>
          </div>
        </div>
        <div className="foot-box">
          <ul className="foot-li">
            <li>About</li>
            <li>Career</li>
            <li>Docs</li>
          </ul>
        </div>
        <div className="foot-box">
          <ul className="foot-li">
            <li>Terms & condition</li>
            <li>Privacy Policy</li>
            <li>Cookie Policy</li>
          </ul>
        </div>
        <div className="foot-box" id="social-media">
          <Link to="/">
            <FaFacebook />
          </Link>
          <Link to="/">
            <FaInstagram />
          </Link>
          <Link to="/">
            <FaTwitter />
          </Link>
        </div>
      </footer>
    </div>
  );
};

export default Footer;
