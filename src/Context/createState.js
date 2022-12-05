import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../Firebase/firebase-config";
import CreateContext from "./createContext";

const CreateState = (props) => {
  const [usersData, setUsersData] = useState([]);
  const [productsData, setProductsData] = useState([]);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const storeRef = query(collection(db, "users"), orderBy("created", "asc"));
    onSnapshot(storeRef, (snapshot) => {
      setUsersData(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });

    const cartRef = query(collection(db, "cart"), orderBy("created", "asc"));
    onSnapshot(cartRef, (snapshot) => {
      setCartData(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });

    const productRef = query(
      collection(db, "products"),
      orderBy("created", "asc")
    );
    onSnapshot(productRef, (snapshot) => {
      setProductsData(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      );
    });
  }, []);

  return (
    <CreateContext.Provider value={{ usersData, productsData, cartData }}>
      {props.children}
    </CreateContext.Provider>
  );
};

export default CreateState;
