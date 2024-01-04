import ItemList from "./ItemList";
import { useState } from "react"

const RestaurantCategories = ({ data, showItems, setShowIndex }) => {

	const handleClick = () => {
		setShowIndex();
	}
	// console.log(data);

	return (
		<div>
			{/* Header */}
			<div className="py-4 my-4 border-gray-100 border-b-[15px]">
				<div className="flex justify-between cursor-pointer" onClick={handleClick}>
					<span className="font-extrabold text-[16px] text-gray-600">{data.title} ({data?.itemCards?.length})</span>
					{showItems ? <span>▼</span> : <span>▲</span>}
					{/* <span>▼</span> */}
				</div>

				{showItems && <ItemList items={data?.itemCards || (data?.categories[0]?.itemCards || [])} />}
			</div>
		</div>
	);
};

export default RestaurantCategories;