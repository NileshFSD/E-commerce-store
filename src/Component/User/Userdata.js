import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import CreateContext from "../../Context/createContext";

const Userdata = () => {
  const [apiUsers, setApiUsers] = useState([]);
  const contextData = useContext(CreateContext);
  const { usersData } = contextData;

  useEffect(() => {
    axios
      .get("https://fakestoreapi.com/users")
      .then((res) => setApiUsers(res.data))
      .catch((err) => alert(err));
  }, []);

  let apiData = [];

  for (let i = 0; i < apiUsers.length; i++) {
    apiData.push({
      id: apiUsers[i].id,
      city: apiUsers[i].address.city,
      street: apiUsers[i].address.street,
      zipcode: apiUsers[i].address.zipcode,
      firstname: apiUsers[i].name.firstname,
      lastname: apiUsers[i].name.lastname,
      email: apiUsers[i].email,
    });
  }

  const userValue = [];

  for (let i = 0; i < usersData.length; i++) {
    userValue.push(usersData[i].data);
  }

  const data = apiData.concat(userValue);
  //
  return (
    <div>
      <div>
        <Outlet context={data} />
      </div>
    </div>
  );
};

export default Userdata;
