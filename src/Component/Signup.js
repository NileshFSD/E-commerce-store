import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { db, auth } from "../Firebase/firebase-config";
import {} from "firebase/storage";
import { addDoc, collection, Timestamp } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [city, setCity] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [street, setStreet] = useState("");
  const [contact, setContact] = useState("");
  const navigate = useNavigate();

  const id = Number(Math.random().toString().slice(3, 7));

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);

      await addDoc(collection(db, "users"), {
        firstname: name,
        lastname: lastName,
        email: email,
        phone: contact,
        street: street,
        city: city,
        zipcode: zipCode,
        id: id,
        created: Timestamp.now(),
      });
      toast.success("Registration done");

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="signup-container">
      <form className="signup-form" onSubmit={handleSubmit}>
        <label htmlFor="name">First Name </label>
        <input
          type="text"
          name="name"
          placeholder="Name"
          id="name"
          onChange={(e) => setName(e.target.value)}
          required
          autoComplete="off"
        />
        <br />
        <label htmlFor="lastname">Last Name </label>
        <input
          type="text"
          name="lastname"
          placeholder="Last name"
          id="lastname"
          onChange={(e) => setLastName(e.target.value)}
          required
          autoComplete="off"
        />{" "}
        <br />
        <label htmlFor="email">Email </label>
        <input
          type="email"
          name="email"
          id="email"
          placeholder="Email"
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="off"
        />
        <label htmlFor="contact">Contact </label>
        <input
          type="number"
          name="contact"
          id="contact"
          placeholder="Mobile Number"
          onChange={(e) => setContact(e.target.value)}
          required
        />
        <br />
        <label htmlFor="street">Street </label>
        <input
          type="text"
          name="street"
          placeholder="Street"
          id="street"
          onChange={(e) => setStreet(e.target.value)}
          required
          autoComplete="off"
        />{" "}
        <br />
        <label htmlFor="city">City </label>
        <input
          type="text"
          name="city"
          id="city"
          placeholder="City"
          onChange={(e) => setCity(e.target.value)}
          autoComplete="off"
        />
        <label htmlFor="zipcode">Zipcode </label>
        <input
          type="number"
          name="zipcode"
          id="zipcode"
          placeholder="Zipcode"
          onChange={(e) => setZipCode(e.target.value)}
          autoComplete="off"
        />
        <label htmlFor="password">Password </label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="*********"
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <br />
        <br />
        <button type="submit" className="signup-btn">
          Register
        </button>
        <div>
          <hr />
          <br />
          <span>Already have an account?</span>

          <Link to="/login">
            <strong> Login</strong>
          </Link>
        </div>
      </form>
      <ToastContainer position="top-left" />
    </div>
  );
};

export default Signup;
