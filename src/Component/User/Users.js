import React, { useEffect, useState } from "react";
import { Link, useOutletContext } from "react-router-dom";
import { FaSort } from "react-icons/fa";
import { auth } from "../../Firebase/firebase-config";
import Spinner from "../Spinner";

const Users = () => {
  const users = useOutletContext();
  const [sort, setSort] = useState();
  const [loggedInUser, setLoggedInUser] = useState();
  const [loading, setLoading] = useState(true);

  setTimeout(() => {
    setLoading(false);
  }, 1000);

  useEffect(() => {
    auth.onAuthStateChanged((u) => {
      setLoggedInUser(u?.email);
    });
  }, []);

  const handleSort = (e) => {
    !sort ? setSort(true) : setSort(false);
  };

  if (sort === true) {
    users.sort((a, b) => a.id - b.id);
  } else if (sort === false) {
    users.sort((a, b) => b.id - a.id);
  }

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <div className="users-container">
          {loggedInUser === undefined ? (
            <div>
              {" "}
              <Link to="/register">
                <div className="become-user link"> Become user </div>
              </Link>
            </div>
          ) : null}
          <div className="users">
            <table>
              <thead>
                <tr>
                  <th>
                    Sr No. <FaSort onClick={handleSort} />
                  </th>
                  <th>First Name</th>
                  <th>City</th>
                  <th>More Details</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => {
                  return (
                    <tr key={user.id}>
                      <td>{user.id}</td>
                      <td>{user?.firstname}</td>

                      <td>{user?.city}</td>
                      <td>
                        <Link className="link" to={`/users/${user?.id}`}>
                          View
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </>
  );
};

export default Users;
