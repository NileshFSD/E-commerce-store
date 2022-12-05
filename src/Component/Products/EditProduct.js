import { doc, updateDoc } from "firebase/firestore";
import React, { useState } from "react";
import { db } from "../../Firebase/firebase-config";
import { AiOutlineCloseCircle } from "react-icons/ai";

const EditProduct = ({
  id,
  toTitle,
  toDescription,
  toRate,
  toPrice,
  toCategory,
  toImage,
  setShow,
}) => {
  const [title, setTitle] = useState(toTitle);
  const [price, setPrice] = useState(toPrice);
  const [description, setDescription] = useState(toDescription);
  const [category, setCategory] = useState(toCategory);
  const [image, setImage] = useState(toImage);
  const [rating, setRating] = useState(toRate);

  const handleUpdate = async (e) => {
    e.preventDefault();

    const productRef = doc(db, "products", id);

    try {
      await updateDoc(productRef, {
        title,
        price,
        description,
        category,
        image,
        rating,
      });

      alert("Product updated");
      setShow(true);
    } catch (error) {
      alert(error);
    }
  };

  return (
    <div className="product-edit-container">
      <div className="close-container">
        <AiOutlineCloseCircle className="close" onClick={() => setShow(true)} />
      </div>
      <form className="product-edit-form" onSubmit={handleUpdate}>
        <label htmlFor="name">Title </label>
        <input
          type="text"
          name="title"
          placeholder="Title"
          id="title"
          onChange={(e) => setTitle(e.target.value)}
          required
          value={title}
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
          value={price}
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
          value={category}
        />
        <label htmlFor="description"> Description</label>
        <textarea
          name="description"
          id="description"
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description"
          value={description}
        />
        <label htmlFor="image">Image </label>
        <input
          type="text"
          name="image"
          id="image"
          placeholder="Image url"
          onChange={(e) => setImage(e.target.value)}
          required
          value={image}
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
          value={rating}
        />{" "}
        <br />
        <br />
        <button type="submit" className="add-products-btn">
          Save
        </button>
        <div></div>
      </form>
    </div>
  );
};

export default EditProduct;
