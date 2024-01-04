import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom"

// import useOnlineStatus from "../utils/useOnlinestatus";
const Header = () => {
  const [changeBtn, setChangeBtn] = useState("Login");
  // const onlineStatus = useOnlineStatus();

  const cartItems = useSelector((store) => store.cart.items);
  console.log(cartItems);
  return (
    <div className="flex items-center justify-around py-4 mb-4 sticky shadow-md">

      <div className="heading"><Link to="/"><img src="https://cdn.iconscout.com/icon/free/png-256/free-swiggy-1613371-1369418.png" alt="logo" className="w-16 h-16 object-fill hover:transform hover:scale-110 hover:duration-500 hover:ease-in-out" /></Link></div>
      <div className="nav-items">
        <ul className="flex">
          <li className="px-4">
            <Link to="/search">Search</Link>
          </li>
          <li className="px-4">
            <Link to="/about">About Us</Link>
          </li>
          <li className="px-4">
            <Link to="/contact">Help</Link>
          </li>
          <li className="px-4">
            <Link to="/cart">{cartItems.length} Cart</Link>
          </li>
          <button
            className="login px-4"
            onClick={() => {
              changeBtn === "Login" ?
                setChangeBtn("Logout") : setChangeBtn("Login");
            }}
          >
            {changeBtn}
          </button>
        </ul>
      </div>
    </div>
  );
};

export default Header;
