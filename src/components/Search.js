import { useEffect, useState } from "react";

const Search = () => {

	const [searchText, setSearchText] = useState(" ");

	useEffect(() => {
		fetchData()
	}, [])
	const fetchData = async () => {
		const searchData = await fetch(
			"https://www.swiggy.com/dapi/landing/PRE_SEARCH?lat=23.2599333&lng=77.412615"
		);
		const jsonData = await searchData.json();
		console.log(jsonData);
	}

	return (
		<div className="w-6/12 mx-auto mt-10">
			<div>
				<input
					type="text"
					className="m-0 border-[1px] py-3 focus:ring-2 px-4 font-semibold font-sans border-gray-400 text-gray-700 w-full"
					placeholder="Search for restaurants and food"
					value={searchText}
					onChange={(e) => setSearchText(e.target.value)}
				/>
			</div>
		</div>
	)
}

export default Search;