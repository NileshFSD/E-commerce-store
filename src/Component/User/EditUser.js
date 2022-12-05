import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { db } from "../../Firebase/firebase-config";

const EditUser = ({
  toName,
  toLastname,
  toEmail,
  toStreet,
  toCity,
  toZip,
  setShow,
  id,
}) => {
  const [firstname, setFirstname] = useState(toName);
  const [email, setEmail] = useState(toEmail);
  const [lastname, setLastname] = useState(toLastname);
  const [city, setCity] = useState(toCity);
  const [zipcode, setZipcode] = useState(toZip);
  const [street, setStreet] = useState(toStreet);
  //   const [contact, setContact] = useState("");

  const handleUpdate = async (e) => {
    e.preventDefault();
    const storeRef = doc(db, "users", id);

    try {
      await updateDoc(storeRef, {
        firstname,
        lastname,
        email,
        street,
        city,
        zipcode,
      });

      alert("Updated successfully");
    } catch (error) {
      alert(error);
    }

    setShow(true);
  };
  return (
    <div className="signup-container">
      <div className="close-container">
        <AiOutlineCloseCircle className="close" onClick={() => setShow(true)} />
      </div>
      <form className="signup-form" onSubmit={handleUpdate}>
        <label htmlFor="name">First Name </label>
        <input
          type="text"
          name="name"
          placeholder="Name"
          id="name"
          onChange={(e) => setFirstname(e.target.value)}
          autoComplete="off"
          value={firstname}
        />
        <br />
        <label htmlFor="lastname">Last Name </label>
        <input
          type="text"
          name="lastname"
          placeholder="Last name"
          id="lastname"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
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
          value={email}
          autoComplete="off"
        />
        <label htmlFor="contact">Contact </label>
        {/* <input
          type="number"
          name="contact"
          id="contact"
          placeholder="Mobile Number"
          onChange={(e) => setContact(e.target.value)}
          
        />
        <br /> */}
        <label htmlFor="street">Street </label>
        <input
          type="text"
          name="street"
          placeholder="Street"
          id="street"
          onChange={(e) => setStreet(e.target.value)}
          value={street}
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
          value={city}
          autoComplete="off"
        />
        <label htmlFor="zipcode">Zipcode </label>
        <input
          type="number"
          name="zipcode"
          id="zipcode"
          placeholder="Zipcode"
          onChange={(e) => setZipcode(e.target.value)}
          value={zipcode}
          autoComplete="off"
        />
        {/* <label htmlFor="password">Password </label>
        <input
          type="password"
          name="password"
          id="password"
          placeholder="*********"
          onChange={(e) => setPassword(e.target.value)}
          
        />
        <br /> */}
        <br />
        <button type="submit" className="signup-btn">
          Save
        </button>
        <div></div>
      </form>
    </div>
  );
};

export default EditUser;
