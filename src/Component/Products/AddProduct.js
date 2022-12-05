import { addDoc, collection, Timestamp } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import CreateContext from "../../Context/createContext";
import { auth, db } from "../../Firebase/firebase-config";

const AddProduct = () => {
  const contextData = useContext(CreateContext);
  const { productsData } = contextData;
  const navigate = useNavigate();
  const [user, setUser] = useState();
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState("");
  const [rating, setRating] = useState("");

  const id = productsData[productsData.length - 1]?.data.id + 1;

  useEffect(() => {
    auth.onAuthStateChanged((u) => {
      setUser(u?.email);
    });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "products"), {
        title: title,
        price: Number(price),
        description: description,
        category: category,
        image: image,
        rate: Number(rating),
        id: id,
        user: user,
        created: Timestamp.now(),
      });
      alert("Added");
      navigate("/products");
    } catch (error) {
      alert(error);
    }
  };
  return (
    <div className="add-product-container">
      <form className="add-product-form" onSubmit={handleSubmit}>
        <label htmlFor="name">Title </label>
        <input
          type="text"
          name="title"
          placeholder="Title"
          id="title"
          onChange={(e) => setTitle(e.target.value)}
          required
          autoComplete="off"
        />
        <br />
        <label htmlFor="price">Price </label>
        <input
          type="number"
          name="price"
          placeholder="Price"
          id="price"
          onChange={(e) => setPrice(e.target.value)}
          required
          autoComplete="off"
        />{" "}
        <br />
        <label htmlFor="category">Category </label>
        <input
          type="text"
          name="category"
          id="category"
          placeholder="Category"
          onChange={(e) => setCategory(e.target.value)}
          autoComplete="off"
        />
        <label htmlFor="description"> Description</label>
        <textarea
          name="description"
          id="description"
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
        />
        <label htmlFor="image">Image </label>
        <input
          type="text"
          name="image"
          id="image"
          placeholder="Image url"
          onChange={(e) => setImage(e.target.value)}
          required
        />
        <br />
        <label htmlFor="rating">Rating </label>
        <input
          type="text"
          name="rating"
          placeholder="Rating"
          id="rating"
          onChange={(e) => setRating(e.target.value)}
          required
          autoComplete="off"
        />{" "}
        <br />
        <br />
        <button type="submit" className="add-products-btn">
          Add
        </button>
        <div></div>
      </form>
    </div>
  );
};

export default AddProduct;
