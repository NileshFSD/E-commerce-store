import "./App.css";
import "./style/style.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Component/Navbar";
import Home from "./Component/Home";
import Signup from "./Component/Signup";
import Login from "./Component/Login";
import Error from "./Component/Error";
import Cart from "./Component/Cart";
import Footer from "./Component/Footer";
import CreateState from "./Context/createState";
import Products from "./Component/Products/Products";
import Product from "./Component/Products/Product";
import ProductsData from "./Component/Products/ProductsData";
import Userdata from "./Component/User/Userdata";
import Users from "./Component/User/Users";
import User from "./Component/User/User";
import AddProduct from "./Component/Products/AddProduct";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <div className="App">
      <CreateState>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<ProductsData />}>
              <Route index element={<Products />} />
              <Route path=":productId" element={<Product />} />
            </Route>

            <Route path="add_product" element={<AddProduct />} />

            <Route path="/users" element={<Userdata />}>
              <Route index element={<Users />} />
              <Route path=":userId" element={<User />} />
            </Route>
            <Route path="/register" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<Error />} />
          </Routes>
          <Footer />
        </Router>
      </CreateState>
    </div>
  );
}

export default App;
