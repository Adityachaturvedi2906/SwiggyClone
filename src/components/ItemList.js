import { useDispatch } from "react-redux";
import { IMG_URL } from "../utils/constants";
import { addItem } from "../utils/cartSlice"

const ItemList = ({ items }) => {
	const dispatch = useDispatch();

	const handleAddItem = (item) => {
		dispatch(addItem(item));
	}

	// console.log(items);

	return (
		<div>
			{items.map((item, key) => (
				<div key={item.card.info.id} className="flex justify-between py-2 my-2 border-gray-200 border-b-[1px] font-sans">
					<div className="w-9/12">
						<div className="pb-2">
							<img src={`${item?.card?.info?.itemAttribute?.vegClassifier === "VEG" ? "https://www.clipartmax.com/png/small/299-2998556_vegetarian-food-symbol-icon-non-veg-symbol-png.png" : "https://www.vhv.rs/dpng/d/437-4370761_non-veg-icon-non-veg-logo-png-transparent.png"}`} className="w-[0.95rem] h-[0.95rem]" alt="veg" />
						</div>
						<h3 className="font-medium text-medium">{item.card.info.name}</h3>
						<h6 className="text-sm text-slate-900 font-medium">₹{item.card.info.price / 100 || item.card.info.defaultPrice / 100}</h6>
						<p className="text-[0.8rem] pt-2 text-slate-500 font-light me-10">{item.card.info.description}</p>
					</div>
					<div className="w-2/12 mb-5">
						<div className={`absolute shadow-2xl text-[0.7rem] font-bold bg-white border-[0.5px] border-gray-400 rounded-md mx-4 ${item.card.info.imageId && "mt-20"}`}>
							<button className="px-6 py-2 text-green-500" onClick={() => handleAddItem(item)}>ADD</button>
						</div>
						{item.card.info.imageId ? <img src={IMG_URL + item.card.info.imageId} className=" rounded-md object-cover w-28 h-28" /> : null}

					</div>
				</div>
			))}
		</div>
	)
}

export default ItemList;