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
    <div className="  py-4 mb-4 sticky top-0 bg-white shadow-md z-50">
      <div className="w-5/6 flex mx-auto justify-between items-center">
        <div className="heading flex items-center"><Link to="/"><img src="https://cdn.iconscout.com/icon/free/png-256/free-swiggy-1613371-1369418.png" alt="logo" className="w-16 h-16 object-fill hover:transform hover:scale-110 hover:duration-500 hover:ease-in-out" /></Link>
          <h2 className="p-4 font-bold text-[#3D4152] hover:text-[#fc8019] underline underline-offset-8">Bhopal</h2>
          <p className="text-gray-500 text-sm font-normal">Madhya Pradesh, India</p>
        </div>

        <div className="nav-items">
          <ul className="flex font-semibold text-[#3D4152]">
            <li className="px-10 hover:text-[#fc8019]">
              <Link to="/search" className="flex items-center"><img src="https://cdn3.iconfinder.com/data/icons/feather-5/24/search-512.png" className="w-4 h-4 me-2" />Search</Link>
            </li>
            {/* <li className="px-10">
            <Link to="/about">About Us</Link>
          </li> */}
            {/* <li className="px-10 hover:text-[#fc8019]">
              <Link to="/offers" className="flex items-center"><img src="https://cdn-icons-png.flaticon.com/512/2956/2956869.png" className="w-5 h-5 me-2" />Offers</Link>
            </li> */}
            <li className="px-10 hover:text-[#fc8019]">
              <Link to="/cart"><span className="border-2 hover:text-[#fc8019] border-[#3D4152] px-1">{cartItems.length}</span> Cart</Link>
            </li>
            {/* <button
            className="login px-4"
            onClick={() => {
              changeBtn === "Login" ?
                setChangeBtn("Logout") : setChangeBtn("Login");
            }}
          >
            {changeBtn}
          </button> */}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Header;
