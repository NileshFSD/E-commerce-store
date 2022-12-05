import React, { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiMenu } from "react-icons/fi";
import { FaUserAlt } from "react-icons/fa";
import { BsCart } from "react-icons/bs";
import { FiLogIn } from "react-icons/fi";
import { auth } from "../Firebase/firebase-config";
import { signOut } from "firebase/auth";

const Navbar = () => {
  const [loggedInUser, setLoggedInUser] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      setLoggedInUser(user);
    });
  }, []);

  const handleLogout = async (e) => {
    e.preventDefault();
    await signOut(auth);
    alert("SignOut Done");
    navigate("/");
  };

  return (
    <nav
      id="nav"
      className="navbar navbar-expand-lg navbar-light  bg-primary py-1"
    >
      <Link className="link navbar-brand" to="/">
        S-Cart
      </Link>
      <button
        className="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarSupportedContent"
        aria-controls="navbarSupportedContent"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <FiMenu className="menubar" />
      </button>

      <div className="collapse navbar-collapse" id="navbarSupportedContent">
        <ul className="navbar-nav mr-auto">
          <li className="nav-item active">
            <Link className="link nav-link" to="/cart">
              <BsCart className="nav-icons" id="cart" />{" "}
            </Link>
          </li>
          {loggedInUser?.email ? (
            <>
              <li className="nav-item">
                <div className="dropdown">
                  <button
                    className="btn btn-secondary dropdown-toggle"
                    type="button"
                    id="dropdownMenu2"
                    data-toggle="dropdown"
                    aria-haspopup="true"
                    aria-expanded="false"
                  >
                    <FaUserAlt className="nav-icons" />
                    Profile
                  </button>
                  <div
                    className="dropdown-menu"
                    aria-labelledby="dropdownMenu2"
                  >
                    {/* <button className="dropdown-item" type="button">
                      Action
                    </button>
                    <button className="dropdown-item" type="button">
                      Another action
                    </button> */}
                    {/* <button className="dropdown-item" type="button">
                      Change Password
                    </button> */}

                    <button
                      className="dropdown-item"
                      type="button"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  </div>
                </div>
              </li>
            </>
          ) : (
            <li className="nav-item active">
              <Link className="link nav-link" to="/login">
                <FiLogIn className="nav-icons" />
                Login
              </Link>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
