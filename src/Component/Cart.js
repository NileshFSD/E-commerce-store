import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import CreateContext from "../Context/createContext";
import { AiTwotoneDelete, AiTwotoneStar } from "react-icons/ai";
import { TbArrowsSort } from "react-icons/tb";
import { auth, db } from "../Firebase/firebase-config";
import Checkout from "./Checkout";
import { Link } from "react-router-dom";

const Cart = () => {
  const contextData = useContext(CreateContext);
  const { cartData } = contextData;
  const [show, setShow] = useState(true);
  const [ratingSort, setRatingSort] = useState();
  const [search, setSearch] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [user, setUser] = useState();

  useEffect(() => {
    auth.onAuthStateChanged((u) => {
      setUser(u?.email);
    });
  });

  const userCart = cartData.filter((items) => {
    return items?.data.user === user;
  });

  console.log(userCart);

  const handleIncrement = async (id, qty) => {
    const cartRef = doc(db, "cart", id);

    try {
      await updateDoc(cartRef, {
        qty: qty + 1,
      });
    } catch (error) {
      alert(error);
    }
  };
  const handleDecrement = async (id, qty) => {
    const cartRef = doc(db, "cart", id);

    try {
      await updateDoc(cartRef, {
        qty: qty - 1,
      });
    } catch (error) {
      alert(error);
    }
  };

  const handleDelete = async (id) => {
    const deleteCartItem = doc(db, "cart", id);

    try {
      await deleteDoc(deleteCartItem);
    } catch (error) {
      alert(error);
    }
  };

  const totalQty = userCart.reduce((acc, prod) => {
    return acc + prod.data.qty;
  }, 0);

  const totalPrice = userCart.reduce((total, prod) => {
    return total + prod.data.price * prod.data.qty;
  }, 0);

  const sortByRate = (e) => {
    // setSort("");
    !ratingSort ? setRatingSort(true) : setRatingSort(false);
  };

  if (ratingSort === true) {
    userCart.sort((a, b) => a.data.rate - b.data.rate);
  } else if (ratingSort === false) {
    userCart.sort((a, b) => b.data.rate - a.data.rate);
  }

  return (
    <>
      {userCart.length === 0 ? (
        <div className="empty-cart">
          <div>
            <h2>Your cart is empty</h2>
            <button className="view-products">
              {" "}
              <Link to="/products" className="link">
                Add Product
              </Link>{" "}
            </button>
          </div>
        </div>
      ) : (
        <>
          {" "}
          {show ? (
            <div className="cart-container">
              <div className="sort-container">
                {/* <div onClick={handleSort} className="sortById">
                  <FaSort /> By ID{" "}
                </div> */}
                <div onClick={sortByRate} className="sortByRate">
                  {" "}
                  <TbArrowsSort />
                  By Rating
                </div>
              </div>

              <div className="search-bar">
                <input
                  type="text"
                  name="search"
                  id="search"
                  placeholder="Search"
                  onChange={(e) => setSearchValue(e.target.value)}
                  autoComplete="off"
                />
                <select
                  name="search"
                  id="choose-opt"
                  onChange={(e) => setSearch(e.target.value)}
                >
                  <option>Relevance</option>
                  <option value="name">By name</option>
                  <option value="category">Category</option>
                  <option value="description">Description</option>
                </select>
                {/* <span>
            <FaSearch className="search-icon" />
          </span> */}
              </div>
              {userCart
                .filter((item) => {
                  if (search === "name") {
                    return item?.data.title
                      .toLowerCase()
                      .includes(searchValue.toLowerCase());
                  } else if (search === "category") {
                    return item?.data.category
                      .toLowerCase()
                      .includes(searchValue.toLowerCase());
                  } else if (search === "description") {
                    return item?.data.description
                      .toLowerCase()
                      .includes(searchValue.toLowerCase());
                  } else {
                    return item?.data;
                  }
                })
                .map((product) => {
                  return (
                    <div className="cart-card" key={product?.id}>
                      <div className="cart-box-1">
                        <div className="cart-img">
                          <Link
                            className="link"
                            to={`/products/ ${product?.data.id}`}
                          >
                            <img src={product.data.image} alt="product-pic" />
                          </Link>
                        </div>
                        <div className="cart-box1a">
                          <div className="cart-box1aa">{`${product?.data.title}`}</div>
                          <div className="cart-box1bb">
                            <div>${product?.data.price}</div>
                            <div style={{ verticalAlign: "middle" }}>
                              {(product?.data.rate).toFixed(1)}{" "}
                              <AiTwotoneStar
                                style={{
                                  marginTop: "-.2rem",
                                }}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="cart-box-2">
                        <div className="cart-box2a">
                          <div className="cart-button">
                            <div>
                              <button
                                disabled={product.data.qty <= 1 ? true : false}
                                onClick={() =>
                                  handleDecrement(product.id, product.data.qty)
                                }
                              >
                                -
                              </button>
                            </div>
                            <div>{product.data.qty} </div>
                            <div>
                              <button
                                onClick={() =>
                                  handleIncrement(product.id, product.data.qty)
                                }
                              >
                                +
                              </button>
                            </div>
                          </div>
                          <div>
                            Total: ${product.data.price * product.data.qty}{" "}
                          </div>
                          <div>
                            <AiTwotoneDelete
                              className="cart-delete"
                              onClick={() => handleDelete(product.id)}
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}

              <button className="view-products">
                <Link to="/products" className="link">
                  Continue Shopping
                </Link>
              </button>
              <div className="proceed">
                <div>
                  <b> Total quantity : </b>
                  {totalQty}
                </div>
                <div>
                  {" "}
                  <b> Order Price : </b> $ {totalPrice.toFixed(2)}
                </div>
                <button onClick={() => setShow(false)}>Proceed </button>
              </div>
            </div>
          ) : (
            <Checkout setShow={setShow} userCart={userCart} />
          )}
        </>
      )}
    </>
  );
};

export default Cart;
