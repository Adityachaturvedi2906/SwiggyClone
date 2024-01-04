import { useDispatch, useSelector } from "react-redux";
import { clearCart } from "../utils/cartSlice";
import { Link } from "react-router-dom";
import dustbinImage from "../../public/images/dustbin.png"

const Cart = () => {
	const cartItems = useSelector((store) => store.cart.items);
	console.log(cartItems)
	const dispatch = useDispatch();

	const handleClearCart = () => {
		dispatch(clearCart())
	}
	const calculateTotal = () => {
		let totalPrice = 0;
		cartItems.forEach((item) => {
			totalPrice += item.card.info.defaultPrice / 100 || item.card.info.price / 100;
		});
		return totalPrice;
	};
	const toPay = 105

	return (
		<div className="bg-[#e9ecee] flex justify-center h-[670px] p-2">
			{cartItems.length > 0 ?
				<div className="bg-white w-3/12 h-fit">
					<div className="flex justify-end pe-2 border-b">
						<button className="p-1 m-1 w-25 h-8 text-base text-black flex flex-wrap" onClick={handleClearCart}>
							Clear Cart <img src={dustbinImage} className="w-5 h-5" />
						</button>
					</div>
					<div className="flex flex-col max-h-[65vh] overflow-y-auto">
						{cartItems.map((item) => (
							<div key={item.id} className="flex flex-wrap justify-between items-center px-6 py-2">
								<div className="flex flex-wrap items-center">
									<div>
										<img src={`${item?.card?.info?.itemAttribute?.vegClassifier === "VEG" ? "https://www.clipartmax.com/png/small/299-2998556_vegetarian-food-symbol-icon-non-veg-symbol-png.png" : "https://www.vhv.rs/dpng/d/437-4370761_non-veg-icon-non-veg-logo-png-transparent.png"}`} className="w-3 h-3" alt="veg" />
									</div>
									<h2 className="ms-2 w-48 text-[15px]">{item?.card?.info?.name}</h2>
								</div>
								<h2 className="w-11 text-gray-500 text-sm">₹{item?.card?.info?.defaultPrice / 100 || item.card.info.price / 100}</h2>
							</div>
						))}
						<div className="p-3 flex justify-center">
							<span>
								“<input className="p-3 focus:ring-0 ring-0 text-sm bg-gray-50 w-80" placeholder="Any suggestions? We will pass it on..." />
							</span>
						</div>
						<div className="px-8">
							<h3 className="text-[13px] font-semibold">Bill Details</h3>
							<div className="text-sm text-gray-500 mt-3 flex flex-wrap justify-between">
								<h4>Item Total</h4>
								<h4>₹{calculateTotal()}</h4>
							</div>
							<div className="text-sm text-gray-500 my-3 flex flex-wrap justify-between pb-4 border-b-[1px]">
								<h4>Delivery Fee</h4>
								<h4>₹40</h4>
							</div>
							<div className="text-sm text-gray-500 my-3 flex flex-wrap justify-between">
								<h4>Platform fee</h4>
								<h4><span className="line-through text-gray-300">₹5</span> 3</h4>
							</div>
							<div className="text-sm text-gray-500 mt-3 flex flex-wrap justify-between pb-4 border-b-[3px] border-gray-700">
								<h4>GST and Restaurant Charges</h4>
								<h4>₹62</h4>
							</div>
						</div>
					</div>
					<div className="my-3 p-2 font-mono flex flex-wrap justify-between px-9 text-base font-semibold">
						<h2>TO PAY</h2>
						<h2>₹{calculateTotal() + toPay}</h2>
					</div>
				</div>
				:
				<div className="flex flex-col items-center m-16">
					<img src="https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto/2xempty_cart_yfxml0" alt="Image" className="w-64 h-64" />
					<h2 className="text-2xl text-gray-500 font-semibold m-4">Your cart is empty</h2>
					<h3 className="text-sm m-1 text-gray-500">You can go to home page to view more restaurants</h3>
					<button className="bg-[#fc8019] text-white font-bold m-8 p-2 px-5">
						<Link to="/">SEE RESTAURANTS NEAR YOU</Link>
					</button>
				</div>
			}
		</div>
	)
}

export default Cart;


