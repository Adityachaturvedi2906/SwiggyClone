import { IMG_URL } from "../utils/constants";

const RestaurantCard = (props) => {
	const { resData } = props;
	const {
		cloudinaryImageId,
		name,
		areaName,
		avgRating,
		cuisines,
		aggregatedDiscountInfoV3,
		sla,
	} = resData?.info;

	return (
		<div className="m-4 rounded-lg hover:transform hover:scale-95 hover:duration-300 font-sans sm:w-[13.5rem] md:w-[15rem] lg:w-[11rem] xl:w-[17rem]">
			<div className="relative">
				<div className="absolute h-3/6 w-full bg-gradient-to-t from-black rounded-b-xl bottom-0 left-0 right-0 text-[#FFFFFFEB] items-baseline pt-[51px] ps-4 tracking-tight">
					{aggregatedDiscountInfoV3 &&
						<h2 className="font-extrabold text-xl">
							{aggregatedDiscountInfoV3.header + " " + aggregatedDiscountInfoV3.subHeader}
						</h2>}
				</div>
				<img
					className="rounded-2xl shadow-xl object-cover h-[13rem] md:h-[9rem] lg:h-[11rem]  w-full"
					alt="res-logo"
					src={IMG_URL + cloudinaryImageId}
				/>
			</div>
			<h2 className="px-2 pt-2 font-semibold text-base whitespace-nowrap overflow-hidden text-ellipsis text-[#02060cbf]">{name}</h2>
			<div className="flex items-center">
				<h2 className="flex items-center px-2 py-1 font-semibold text-base text-[#02060cbf]">
					{avgRating &&
						<>
							<img
								src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ_7Fr5mvXOExMGPyl7cZmCC1xNata89iCo05VYiUf75g&s"
								className="w-4 h-4 object-cover rounded-lg mr-1"
								alt="Rating"
							/>
							{avgRating} stars
							<span className="font-extrabold mx-1">·</span>
						</>
					}
					{sla.deliveryTime} mins
				</h2>
			</div>
			<h4 className="text-sm px-2 py-1 text-gray-600 whitespace-nowrap overflow-hidden text-ellipsis">{cuisines.join(", ")}</h4>
			<h3 className="px-2 text-sm text-gray-600 whitespace-nowrap overflow-hidden text-ellipsis">{areaName}</h3>
		</div>
	)
}

export default RestaurantCard
