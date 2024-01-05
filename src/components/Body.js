import { useState, useEffect } from "react";
import { Link } from "react-router-dom"
import RestaurantCard from "./RestaurantCard";
import Shimmer from "./Shimmer";
// import useOnlineStatus from "../utils/useOnlinestatus";

const Body = () => {
  const [usingResList, setUsingResList] = useState([]);
  const [filteredRes, setFilteredRes] = useState([])
  const [foodCarousel, setFoodCarousel] = useState([])
  const [bestOffers, setBestOffers] = useState([])
  const [pureVeg, setPureVeg] = useState("Pure Veg")
  const [ratings, setRatings] = useState("Ratings 4.0+")
  const [priceList, setPriceList] = useState("Rs. 300-Rs. 600")
  const [lessPriceList, setLessPriceList] = useState("Less than Rs. 300")
  const RestaurantCardRating = RestaurantCard;
  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const data1 = await fetch(
      "https://www.swiggy.com/dapi/restaurants/list/v5?lat=23.2599333&lng=77.412615&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
    );

    const json = await data1.json();
    setUsingResList(
      json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    setFilteredRes(
      json?.data?.cards[2]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    setFoodCarousel(json?.data?.cards[1]?.card?.card);
    setBestOffers(json?.data?.cards[0]?.card?.card)
  };

  console.log(usingResList);
  // data.cards[0].card.card.gridElements.infoWithStyle.info

  const handlePureVeg = () => {
    if (pureVeg !== "Pure Veg") {
      setPureVeg("Pure Veg");
      setFilteredRes(usingResList); // Show all restaurants
    } else {
      const filteredPureVegList = usingResList.filter(
        (res) => res?.info?.veg === true
      );
      setFilteredRes(filteredPureVegList);
      setPureVeg("Pure Veg ✖");
    }
  }

  const handleRatings = () => {
    if (ratings !== "Ratings 4.0+") {
      setRatings("Ratings 4.0+");
      setFilteredRes(usingResList);
    } else {
      const filteredList = usingResList.filter(
        (res) => res.info.avgRating > 4
      );
      setFilteredRes(filteredList);
      setRatings("Ratings 4.0+ ✖")
    }
  }

  const handlePriceList = () => {
    if (priceList !== "Rs. 300-Rs. 600") {
      setPriceList("Rs. 300-Rs. 600");
      setFilteredRes(usingResList);
    } else {
      const filteredPriceList = usingResList.filter((res) => {
        const cost = parseInt(res?.info?.costForTwo.replace(/\D/g, ''), 10);
        return cost >= 300 && cost <= 600;
      });
      setFilteredRes(filteredPriceList);
      setPriceList("Rs. 300-Rs. 600 ✖")
    }
  }

  const handleLessPriceList = () => {
    if (lessPriceList !== "Less than Rs. 300") {
      setLessPriceList("Less than Rs. 300");
      setFilteredRes(usingResList);
    } else {
      const filteredLessPriceList = usingResList.filter((res) => {
        const cost = parseInt(res?.info?.costForTwo.replace(/\D/g, ''), 10);
        return cost < 300;
      });
      setFilteredRes(filteredLessPriceList);
      setLessPriceList("Less than Rs. 300 ✖")
    }
  }
  // const onlineStatus = useOnlineStatus();

  // if (onlineStatus === false) return <h1>You're Offline, Kindly Check your network and Try Again...</h1>

  // console.log(usingResList);

  return usingResList?.length === 0 ?
    <Shimmer />
    :
    <div className="mx-auto w-full sm:w-3/4 lg:w-3/4 xl:w-4/5">
      {bestOffers &&
        <div>
          <h2 className=" text-black font-bold text-2xl">Best offers for you</h2>
          <div className="overflow-x-auto whitespace-no-wrap custom-scrollbar">
            <div className="flex p-6">
              {bestOffers && bestOffers?.imageGridCards?.info?.map((best) => (
                <div key={best.id} className="flex-shrink-0">
                  <Link to={best.action.link} >
                    <img alt={best.accessibility.altText} src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/${best.imageId}`} className="p-3 h-64 w-[27rem]" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>}

      {foodCarousel &&
        <div className="border-b-2">
          <h2 className=" text-black font-bold text-2xl">{foodCarousel.header.title}</h2>
          <div className="overflow-x-auto whitespace-no-wrap custom-scrollbar">
            <div className="flex p-6">
              {foodCarousel && foodCarousel?.imageGridCards?.info?.map((food) => (
                <div key={food.id} className="flex-shrink-0">
                  <Link to={food.action.link}>
                    <img alt={food.accessibility.altText} src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/${food.imageId}`} className="w-44 h-52 p-4 object-cover" />
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      }

      <h2 className=" text-black font-bold text-2xl pt-6">Restaurants with online food delivery in Bhopal</h2>
      <div className="flex items-center gap-2">
        <div className="px-2 py-4 flex items-center">
          <button
            className={`px-4 py-2 rounded-3xl text-sm border font-medium shadow-sm  ${ratings !== "Ratings 4.0+" ? `text-gray-900 border-gray-900 bg-gray-200` : 'text-gray-600'}`}
            onClick={() => {
              handleRatings()
            }}
          >
            {ratings}
          </button>
        </div>
        <div className="px-2 py-4 flex items-center">
          <button
            className={`px-4 py-2 rounded-3xl text-sm border font-medium shadow-sm  ${pureVeg !== "Pure Veg" ? `text-gray-900 border-gray-900 bg-gray-200` : 'text-gray-600'}`}
            onClick={() => {
              handlePureVeg()
            }}
          >
            {pureVeg}
          </button>
        </div>
        <div className="px-2 py-4 flex items-center">
          <button
            className={`px-4 py-2 rounded-3xl text-sm border font-medium shadow-sm  ${priceList !== "Rs. 300-Rs. 600" ? `text-gray-900 border-gray-900 bg-gray-200` : 'text-gray-600'}`}
            onClick={() => {
              handlePriceList()
            }}
          >
            {priceList}
          </button>
        </div>
        <div className="px-2 py-4 flex items-center">
          <button
            className={`px-4 py-2 rounded-3xl text-sm border font-medium shadow-sm  ${lessPriceList !== "Less than Rs. 300" ? `text-gray-900 border-gray-900 bg-gray-200` : 'text-gray-600'}`}
            onClick={() => {
              handleLessPriceList()
            }}
          >
            {lessPriceList}
          </button>
        </div>
      </div>
      <div className="flex flex-wrap justify-start">
        {filteredRes?.map((res) => (
          <Link
            key={res.info.id} to={"restaurant/" + res.info.id}>

            {res.info.avgRating > 4 ? (
              <RestaurantCardRating resData={res} />
            ) : (
              <RestaurantCard resData={res} />
            )}
          </Link>
        ))}
      </div>
    </div>
};

export default Body;



// v1674029850/PC_Creative%20refresh/3D_bau/banners_new/Dosa.png
// https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_288,h_360/v1674029850/PC_Creative%20refresh/3D_bau/banners_new/Dosa.png