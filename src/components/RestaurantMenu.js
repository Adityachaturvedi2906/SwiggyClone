import { useParams } from "react-router-dom"
import Shimmer from "./Shimmer";
import useRestaurantMenu from "../utils/useRestaurantMenu";
import RestaurantCategories from "./RestaurantCategories";
import pieImage from "../../public/images/pie.png"
import leaf from "../../public/images/leaf.png"
import ruppeeImage from "../../public/images/ruppee.png"
import { IMG_URL } from "../utils/constants";
import { useState } from "react";
const RestaurantMenu = () => {

	const { resId } = useParams();

	const [showIndex, setShowIndex] = useState(null)
	const resInfo = useRestaurantMenu(resId);


	if (resInfo === null || resInfo.length < 1) return <Shimmer />;

	const { name, cuisines, costForTwoMessage, areaName, avgRating, sla, totalRatingsString } = resInfo?.data?.cards[0]?.card?.card?.info;
	// const {itemCards} = resInfo?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card;

	const categories = resInfo?.data?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR.cards.filter(
		(c) => c?.card?.card["@type"] === "type.googleapis.com/swiggy.presentation.food.v2.ItemCategory" && "type.googleapis.com/swiggy.presentation.food.v2.NestedItemCategory"
	)

	// data.cards[2].groupedCard.cardGroupMap.REGULAR.cards[1].card.card.itemCards[0].card.info

	// data.cards[2].groupedCard.cardGroupMap.REGULAR.cards[2].card.card.categories[0].itemCards[0].card.info

	const offers = resInfo?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.offers
	const vegNonVeg = resInfo?.data.cards[2].groupedCard.cardGroupMap.REGULAR.cards[0].card.card


	console.log(vegNonVeg);
	return (
		<div className="text-start mx-auto w-6/12">
			<div className="flex justify-between rounded-lg border-b-[1px] border-dashed pb-3">
				<div>
					<h1 className="font-semibold text-xl my-3">{name}</h1>
					<h3 className="my-1 text-sm text-gray-400">{cuisines.join(", ")}</h3>
					<h3 className="my-1 text-sm text-gray-400">{areaName}, {sla.lastMileTravel}km</h3>
				</div>
				<div className="border border-gray-200 shadow-sm w-[74px] h-[78px] rounded-lg m-2 mt-5">
					<div className="px-2">
						<div className="border-b-[1px] ps-2 py-2">
							<h3 className="text-[14px] flex flex-wrap text-green-700 font-bold"><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPhxeUfqLB9gY-d_SAElTomXNV2gt_vR2jPqkyBM47gg&s" className="w-4 h-4" />{avgRating}
							</h3>
						</div>
					</div>
					<div>
						<h2 className="text-[9px] font-extrabold text-gray-500 px-2 py-2 ">
							{totalRatingsString}
						</h2>
					</div>
				</div>
			</div>
			<div className="flex flex-wrap">
				<div className="flex pt-2 ps-2 flex-wrap items-center">
					<img src={pieImage} alt="pie-chart" className="w-4 h-4" />
					<h2 className="ms-2 font-bold text-gray-700"> {sla.deliveryTime} MINS</h2>
				</div>
				<div className="flex pt-2 ps-5 flex-wrap items-center">
					<img src={ruppeeImage} alt="pie-chart" className="w-4 h-4" />
					<h2 className="ms-2 font-bold text-gray-700"> {costForTwoMessage}</h2>
				</div>
			</div>
			<div className="overflow-x-auto whitespace-no-wrap custom-scrollbar">
				<div className="flex py-4">
					{offers && offers.map((offer) => (
						<div className="pe-4" key={offer.id}>
							<button className="border flex flex-wrap flex-shrink-0 border-gray-200 w-56 rounded-xl p-3 ">
								<div className="pe-2">
									<img src={IMG_URL + offer?.info?.offerLogo} className="w-5 h-5" />
								</div>
								<div>
									<h2 className="text-sm font-bold text-gray-500">{offer.info.header}</h2>
								</div>
								<h2 className="text-[11px] font-bold text-gray-400">{offer.info.couponCode} | {offer.info.description}</h2>
							</button>
						</div>
					))}
				</div>
			</div>
			<div className="py-5">
				{vegNonVeg.isPureVeg && vegNonVeg.isPureVeg === true ?
					<div className="flex items-center">
						<img src={leaf} className="w-5 h-5" alt="leaf" />
						<p className="text-sm uppercase text-gray-600 ps-2 font-mono">Pure Veg</p>
					</div>
					:
					null
				}
			</div>
			{/* categories accordions */}
			<div className="border-t-[1px]">
				{categories && categories.length > 0 && categories.map((category, index) => (
					<RestaurantCategories
						key={category?.card?.card?.title}
						data={category?.card?.card}
						showItems={index === showIndex ? true : false}
						setShowIndex={() => setShowIndex(index)}
					/>
				))}
			</div>
		</div>
	)
}

export default RestaurantMenu