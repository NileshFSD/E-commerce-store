import { Link } from "react-router-dom";
import shop from "../asset/shop.png";
import { FaUsers } from "react-icons/fa";

function Home() {
  return (
    <div className="home-container">
      <Link to="/users">
        <FaUsers className="users-icon" />
      </Link>
      <div className="home">
        <div className="home-2">
          <img src={shop} alt="" />
        </div>
        <div className="home-1">
          <h2>STAY HOME</h2>
          <h4>Shop Online</h4>
          <Link to="/products" className="link">
            <div className="see-Products"> See products</div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
