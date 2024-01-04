import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom"

// import useOnlineStatus from "../utils/useOnlinestatus";
const CartHeader = () => {
  const [changeBtn, setChangeBtn] = useState("Login");
  // const onlineStatus = useOnlineStatus();

  const cartItems = useSelector((store) => store.cart.items);
  console.log(cartItems);
  return (
    <div className="flex items-center justify-around py-5 shadow-md">

      <div className="heading"><Link to="/"><img src="https://play-lh.googleusercontent.com/u6-paKZtyWMZZcUYULr1iRekwvL3lZ7OS_uBLG65v9Qz5dLDEcLttg5GX5O7884H_Q=w240-h480-rw" alt="logo" className="w-14 h-14 object-fill" /></Link>
	  <h3>Securely Checkout</h3>
	  </div>
      <div className="nav-items">
        <ul className="flex">
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

export default CartHeader;
