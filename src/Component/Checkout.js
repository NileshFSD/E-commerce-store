import { deleteDoc, doc } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../Firebase/firebase-config";
import { IoMdArrowRoundBack } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { ToastContainer, toast } from "react-toastify";

const Checkout = ({ setShow, userCart }) => {
  const [paymentMethod, setPaymentMethod] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const navigate = useNavigate();

  const confirmOrder = async (e) => {
    e.preventDefault();

    for (let i = 0; i < userCart.length; i++) {
      const id = userCart[i].id;

      const deleteCartItem = doc(db, "cart", id);

      try {
        await deleteDoc(deleteCartItem);

        alert("Order place successfully");
        if (userCart.length === 0) {
          toast.success("Order place successfully");
          navigate("/cart");
        }
      } catch (error) {
        toast.error(error);
      }
    }
  };

  return (
    <div className="checkout-container">
      <ToastContainer position="top-left" />
      <div className="back-arrow">
        <Link to="/cart" className="back">
          <IoMdArrowRoundBack onClick={() => setShow(true)} />
        </Link>
      </div>
      <form className="checkout" onSubmit={confirmOrder}>
        <label htmlFor="payment-method">Select payment method</label>
        <br />
        <select
          name="payment-method"
          id="payment-method"
          required
          onChange={(e) => setPaymentMethod(e.target.value)}
        >
          <option value=""></option>
          <option value="cod">Cash On Delivery</option>
          <option value="card">Via card</option>
        </select>
        <br />
        {paymentMethod === "card" ? (
          <>
            {" "}
            <label htmlFor="cardholder">Cardholder Name</label>
            <input
              type="text"
              name="cardholder"
              id="cardholder"
              placeholder="Cardholder name"
              required
            />
            <label htmlFor="card-number">Card Number</label>
            <input
              type="number"
              name="card-number"
              maxLength={16}
              placeholder="0000-0000-0000-0000"
              id="card-number"
            />
            <div>
              <div>
                {" "}
                CVV <br />
                <input
                  type="password"
                  maxLength={3}
                  required
                  placeholder="***"
                />
              </div>
              <div>
                MM/YY <br />
                <input
                  type="text"
                  name="mmyy"
                  id="mmyy"
                  placeholder="mm/yy"
                  required
                  maxLength={5}
                />
              </div>
            </div>
          </>
        ) : null}

        <label htmlFor="address">Address</label>
        <textarea
          type="text"
          name="address"
          id="address"
          required
          placeholder="plot no, street no, society/ building name, area, city, state - pincode"
        />

        <label htmlFor="datePicker">Choose delivery date </label>
        <DatePicker
          id="datePicker"
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          dateFormat="dd/MM/yy"
          placeholderText={"dd/mm/yyyy"}
          filterDate={(date) => date.getDay() !== 6 && date.getDay() !== 0} // weekends cancel
          showYearDropdown
        />
        <label htmlFor="contact">Contact No</label>
        <input type="number" name="contact" id="contact" required />
        <button className="place-order-btn" type="submit">
          Place Order
        </button>
      </form>
    </div>
  );
};

export default Checkout;
