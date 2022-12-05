import React, { useContext, useEffect, useState } from "react";
import {
  Link,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import { IoMdArrowRoundBack, IoMdPricetag } from "react-icons/io";
import { MdAddShoppingCart } from "react-icons/md";
import { AiTwotoneDelete, AiTwotoneStar } from "react-icons/ai";
import { auth, db } from "../../Firebase/firebase-config";
import CreateContext from "../../Context/createContext";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  Timestamp,
} from "firebase/firestore";
import { BiEdit } from "react-icons/bi";
import EditProduct from "./EditProduct";
import Spinner from "../Spinner";
import { ToastContainer, toast } from "react-toastify";

const Product = () => {
  const data = useOutletContext();
  const [show, setShow] = useState(true);
  const navigate = useNavigate();
  const contextData = useContext(CreateContext);
  const { productsData, cartData } = contextData;
  const [loggedInUser, setLoggedInUser] = useState();
  const productId = useParams();
  const [loading, setLoading] = useState(true);

  setTimeout(() => {
    setLoading(false);
  }, 500);

  const product = data.find((prod) => {
    return prod.id === Number(Object.values(productId)[0]);
  });

  useEffect(() => {
    auth.onAuthStateChanged((u) => {
      setLoggedInUser(u?.email);
    });
  }, []);

  const userCart = cartData.filter((item) => {
    return item?.data.user === loggedInUser;
  });

  const id = productsData.find((prod) => {
    return prod?.data.id === product?.id;
  })?.id;

  const handleDelete = async (e) => {
    e.preventDefault();

    const deleteDocRef = doc(db, "products", id);

    try {
      await deleteDoc(deleteDocRef);
      navigate("/products");
      toast.success("Deleted");
    } catch (error) {
      alert(error);
    }
  };

  function handleEdit() {
    setShow(false);
  }

  const title = product?.title;
  const category = product?.category;
  const description = product?.description;
  const rate = product?.rate;
  const price = product?.price;
  const image = product?.image;

  const isAdded = userCart.find((item) => {
    return item?.data.title === title;
  });

  const handleAddToCart = async (id) => {
    const qty = 1;

    if (loggedInUser === undefined) {
      navigate("/login");
      toast.info("Please login");
    } else {
      if (isAdded === undefined) {
        try {
          await addDoc(collection(db, "cart"), {
            title: title,
            category: category,
            description: description,
            rate: rate,
            price: Number(price),
            image: image,
            id: id,
            qty: qty,
            user: loggedInUser,
            created: Timestamp.now(),
          });

          toast.success("added to cart");
        } catch (error) {
          toast.error(error);
        }
      } else {
        toast.info("Product already added to the cart");
        navigate("/cart");
      }
    }
  };

  return (
    <>
      <ToastContainer position="top-left" />
      {loading ? (
        <Spinner />
      ) : (
        <>
          {" "}
          {show ? (
            <div className="product-container">
              <div>
                <Link to="/products" className="back">
                  <IoMdArrowRoundBack />
                </Link>
              </div>
              <div className="product">
                <div className="product-pic">
                  <img src={product?.image} alt="product-pic" />
                </div>
                <div className="products-details">
                  <h2>
                    {" "}
                    <b> {product?.title} </b>
                  </h2>
                  <div>
                    Rating : {product?.rate}{" "}
                    <AiTwotoneStar style={{ marginTop: "-.2rem" }} />
                    <i className="fa-regular fa-star"></i>
                  </div>
                  <hr />
                  <div>
                    <b>
                      <IoMdPricetag /> ${product?.price}
                    </b>
                  </div>
                  <div>
                    <h3>
                      {`${
                        product?.category.slice(0, 1).toUpperCase() +
                        product?.category.slice(1)
                      } `}{" "}
                    </h3>
                  </div>
                  <div>
                    <b>Description </b> <br />
                    {product?.description}
                  </div>
                  <div>
                    <div className="product-update-delete">
                      {" "}
                      {loggedInUser === product?.user ? (
                        <>
                          <AiTwotoneDelete
                            onClick={handleDelete}
                            className="product-delete"
                          />

                          <BiEdit
                            className="product-edit"
                            onClick={handleEdit}
                          />
                        </>
                      ) : null}
                    </div>
                    <div className="addCart-container">
                      <button
                        type="submit"
                        onClick={() => handleAddToCart(product.id)}
                      >
                        {" "}
                        <MdAddShoppingCart className="addToCart" />
                        Add to cart
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <EditProduct
              setShow={setShow}
              id={id}
              toTitle={product?.title}
              toDescription={product?.description}
              toRate={product?.rate}
              toPrice={product?.price}
              toCategory={product?.category}
              toImage={product?.image}
            />
          )}
        </>
      )}
    </>
  );
};

export default Product;
