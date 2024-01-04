import { useEffect, useState } from "react";
import { Link } from "react-router-dom"

const Search = () => {

	const [searchText, setSearchText] = useState("");
	const [cuisines, setCuisines] = useState([])
	const [searchResult, setSearchResult] = useState([])

	useEffect(() => {
		fetchData()
		if (searchText !== '') {
			fetchSearchResults()
		} else {
			setSearchResult([])
		}
	}, [searchText])
	const fetchData = async () => {
		const searchData = await fetch(
			"https://www.swiggy.com/dapi/landing/PRE_SEARCH?lat=23.2599333&lng=77.412615"
		);
		const jsonData = await searchData.json();
		setCuisines(jsonData.data.cards[1].card.card.gridElements.infoWithStyle)
	}
	const fetchSearchResults = async () => {
		const apiData = await fetch(`https://www.swiggy.com/dapi/restaurants/search/suggest?lat=23.2599333&lng=77.412615&str=${searchText}&trackingId=null`);
		const data = await apiData.json();
		setSearchResult(data)
		console.log(data);
	}

	return (
		<div className="w-6/12 mx-auto mt-10">

			<input
				type="text"
				className="border py-2 pl-4 pr-10 font-semibold font-sans border-gray-300 text-gray-700 w-full rounded-sm focus:outline-none"
				placeholder="Search for restaurants and food"
				value={searchText}
				onChange={(e) => setSearchText(e.target.value)}
			/>

			{searchText === "" ?
				<div className="pt-10">
					<h2 className="ps-1 py-2 font-extrabold text-[#3D4152] text-xl">Popular Cuisines</h2>
					<div className="overflow-x-auto whitespace-no-wrap custom-scrollbar">
						<div className="flex">
							{cuisines && cuisines.info?.map((dishes) => (
								<div key={dishes.id} className="flex-shrink-0">
									<Link to={dishes.action.link}>
										<img alt={dishes.accessibility.altText} src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/${dishes.imageId}`} className="w-20 h-28 m-1 object-cover" />
									</Link>
								</div>
							))}
						</div>
					</div>
				</div>
				:
				<div>
					{searchResult && searchResult?.data?.suggestions?.map((item) => (
						<div className="flex items-center">
							<img src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_112,h_112,c_fill/${item.cloudinaryId}`} className="w-24 h-24 p-4" />
							<div>
								<h2 className="text-[#3D4152] font-semibold">{item.text}</h2>
								<h3 className="text-gray-400 text-sm">{item.subCategory}</h3>
							</div>
						</div>
					))}
				</div>}
		</div>
	)
}

export default Search;