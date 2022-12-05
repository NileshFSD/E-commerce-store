import React, { useContext, useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../Firebase/firebase-config";
import { Link, useNavigate } from "react-router-dom";
import CreateContext from "../Context/createContext";
import { ToastContainer, toast } from "react-toastify";

const Login = () => {
  const contextData = useContext(CreateContext);
  const { usersData } = contextData;
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const findUser = usersData.find((user) => {
      return user?.data.email === loginEmail;
    });

    if (findUser === undefined) {
      toast.info(
        "You have deleted your data, kindly register with another email"
      );
    } else {
      try {
        await signInWithEmailAndPassword(auth, loginEmail, loginPassword);

        toast.success("Login Successfully");
      } catch (error) {
        toast.error(error);
      }
    }

    setTimeout(() => {
      navigate("/");
    }, 2000);
  };

  return (
    <div className="signin-container">
      <ToastContainer position="top-left" />
      <form className="signin-form" onSubmit={handleLogin}>
        <br />
        <label htmlFor="email">Email </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          onChange={(e) => setLoginEmail(e.target.value)}
          autoComplete="off"
        />

        <br />
        <label htmlFor="password">Password </label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="*********"
          onChange={(e) => setLoginPassword(e.target.value)}
          required
        />
        <br />
        <br />
        <button type="submit" className="signIn-btn">
          Sign-In
        </button>

        <hr />
        <Link to="/register">Click here to Register</Link>
      </form>
    </div>
  );
};

export default Login;
