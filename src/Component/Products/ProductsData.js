import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Outlet } from "react-router-dom";
import CreateContext from "../../Context/createContext";

const Data = () => {
  const [products, setProducts] = useState([]);
  const contextData = useContext(CreateContext);
  const { productsData } = contextData;

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/products")
      .then((res) => setProducts(res.data));
  }, []);

  const apiProducts = [];

  for (let i = 0; i < products.length; i++) {
    apiProducts.push({
      category: products[i]?.category,
      description: products[i]?.description,
      id: products[i]?.id,
      image: products[i]?.image,
      price: products[i]?.price,
      title: products[i]?.title,
      rate: products[i]?.rating?.rate,
    });
  }

  const addedProducts = [];

  for (let i = 0; i < productsData.length; i++) {
    addedProducts.push({
      category: productsData[i]?.data.category,
      description: productsData[i]?.data.description,
      id: productsData[i]?.data.id,
      image: productsData[i]?.data.image,
      price: productsData[i]?.data.price,
      title: productsData[i]?.data.title,
      rate: productsData[i]?.data.rate,
      user: productsData[i]?.data.user,
    });
  }

  const data = apiProducts.concat(addedProducts);

  return (
    <div className="home-container">
      <Outlet context={data} />
    </div>
  );
};

export default Data;
