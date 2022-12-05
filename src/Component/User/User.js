import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useOutletContext, useParams } from "react-router-dom";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { deleteDoc, doc } from "firebase/firestore";
import { auth, db } from "../../Firebase/firebase-config";
import EditUser from "./EditUser";
import CreateContext from "../../Context/createContext";
import { signOut } from "firebase/auth";
import Spinner from "../Spinner";
import { ToastContainer, toast } from "react-toastify";

const User = () => {
  const users = useOutletContext();
  const contextData = useContext(CreateContext);
  const { usersData } = contextData;
  const { userId } = useParams();
  const [show, setShow] = useState(true);
  const navigate = useNavigate();
  const [loggedInUser, setLoggedInUser] = useState();
  const [loading, setLoading] = useState(true);

  setTimeout(() => {
    setLoading(false);
  }, 500);

  const user = users.find((user) => {
    return user?.id === Number(userId);
  });

  useEffect(() => {
    auth.onAuthStateChanged((u) => {
      setLoggedInUser(u?.email);
    });
  }, []);

  const findUserDetails = usersData.find((item) => {
    return item?.data.email === loggedInUser;
  });

  const id = findUserDetails?.id;

  function handleClose(e) {
    e.preventDefault();
    navigate("/users");
  }

  function handleOpen(e) {
    e.preventDefault();
    setShow(false);
  }

  const handleDelete = async (e) => {
    e.preventDefault();

    const deleteDocRef = doc(db, "users", id);

    try {
      await deleteDoc(deleteDocRef);
      await signOut(auth);
      toast.success("Deleted");
      navigate("/");
      window.location.reload();
    } catch (error) {
      toast.error(error);
    }
  };
  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="user-page">
          {show ? (
            <div>
              <div className="close-container">
                <AiOutlineCloseCircle className="close" onClick={handleClose} />
              </div>
              <table className="user-table">
                <thead className="user-th">
                  <tr>
                    <th>First Name</th>
                    <td>{user?.firstname}</td>
                  </tr>
                  <tr>
                    <th>Last Name</th>
                    <td>{user?.lastname}</td>
                  </tr>

                  <tr>
                    <th>Email</th>
                    <td>{user?.email}</td>
                  </tr>

                  <tr>
                    <th>Street</th>
                    <td> {user?.street}</td>
                  </tr>
                  <tr>
                    <th>City</th>
                    <td> {user?.city}</td>
                  </tr>

                  <tr>
                    <th>Zip Code</th>
                    <td> {user?.zipcode}</td>
                  </tr>
                </thead>
              </table>
              {loggedInUser === user.email ? (
                <>
                  <div className="edit-delete-btn">
                    <button className="edit-btn" onClick={handleOpen}>
                      Edit
                    </button>
                    <button className="edit-btn" onClick={handleDelete}>
                      Delete
                    </button>
                  </div>
                </>
              ) : null}
            </div>
          ) : (
            <div>
              <EditUser
                id={id}
                setShow={setShow}
                show={show}
                toName={user?.firstname}
                toLastname={user?.lastname}
                toEmail={user?.email}
                toStreet={user?.street}
                toCity={user?.city}
                toZip={user?.zipcode}
              />
            </div>
          )}
          <ToastContainer position="top-left" />
        </div>
      )}
    </>
  );
};

export default User;
