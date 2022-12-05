import React, { useEffect, useState } from "react";
import { Link, useNavigate, useOutletContext } from "react-router-dom";
import { auth } from "../../Firebase/firebase-config";
import { FaSort } from "react-icons/fa";
import { TbArrowsSort } from "react-icons/tb";
import ReactPaginate from "react-paginate";
import Spinner from "../Spinner";
import { ToastContainer, toast } from "react-toastify";

const Products = () => {
  const data = useOutletContext();
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState();
  const [search, setSearch] = useState("");
  const [searchValue, setSearchValue] = useState("");
  const [sort, setSort] = useState();
  const [ratingSort, setRatingSort] = useState();
  const [pageNumber, setPageNumber] = useState(0);
  const productPerPage = 12;
  const pageVisited = pageNumber * productPerPage;
  const [loading, setLoading] = useState(true);

  setTimeout(() => {
    setLoading(false);
  }, 800);

  const addProduct = (e) => {
    e.preventDefault();
    if (loggedInUser === undefined) {
      toast.info("Please login");
      navigate("/login");
    } else {
      navigate("/add_product");
    }
  };

  useEffect(() => {
    auth.onAuthStateChanged((u) => {
      setLoggedInUser(u?.email);
    });
  }, []);

  const sortByRate = (e) => {
    setSort("");
    !ratingSort ? setRatingSort(true) : setRatingSort(false);
  };

  if (ratingSort === true) {
    data.sort((a, b) => a.rate - b.rate);
  } else if (ratingSort === false) {
    data.sort((a, b) => b.rate - a.rate);
  }

  const handleSort = (e) => {
    !sort ? setSort(true) : setSort(false);
  };

  if (sort === true) {
    data.sort((a, b) => a.id - b.id);
  } else if (sort === false) {
    data.sort((a, b) => b.id - a.id);
  }

  const pageCount = Math.ceil(data.length / productPerPage);
  const changePage = ({ selected }) => {
    setPageNumber(selected);
  };

  return (
    <>
      <div className="products-container">
        <ToastContainer position="top-left" />
        {loading ? (
          <Spinner />
        ) : (
          <>
            <div>
              <button onClick={addProduct}> + Add product </button>
            </div>
            <div className="sort-container">
              <div onClick={handleSort} className="sortById">
                <FaSort /> By ID{" "}
              </div>
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
            </div>
            <br />
            <div className="products">
              {data
                .filter((item) => {
                  switch (search) {
                    case "name":
                      return item?.title
                        .toLowerCase()
                        .includes(searchValue.toLowerCase());
                    case "category":
                      return item?.category
                        .toLowerCase()
                        .includes(searchValue.toLowerCase());
                    case "description":
                      return item?.description
                        .toLowerCase()
                        .includes(searchValue.toLowerCase());
                    default:
                      return item;
                  }
                })
                .slice(pageVisited, pageVisited + productPerPage)
                .map((prod) => {
                  return (
                    <div key={prod?.id} className="product-card">
                      <div>
                        <img src={prod?.image} alt="product" />
                      </div>
                      <div>
                        <b> {prod?.title}</b>
                      </div>
                      <div>
                        <Link className="link" to={`/products/ ${prod?.id}`}>
                          <div className="view">View</div>
                        </Link>
                      </div>
                    </div>
                  );
                })}
            </div>
            <div>
              <br />
              <ReactPaginate
                previousLabel={`Previous`}
                nextLabel={`Next`}
                breakLabel={`...`}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                onPageChange={changePage}
                containerClassName="pagination justify-content-center margin-bottom"
                pageClassName="page-items"
                pageLinkClassName="page-link"
                previousClassName="page-item"
                previousLinkClassName="page-link"
                nextClassName="page-item"
                nextLinkClassName="page-link"
                breakClassName="page-item"
                breakLinkClassName="page-link"
                activeClassName="active"
              />
            </div>{" "}
          </>
        )}
      </div>
    </>
  );
};

export default Products;
