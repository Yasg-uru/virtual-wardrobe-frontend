import { useAppSelector } from "@/redux/hook";
import { IClothItem } from "@/types/clothState";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SerachDetails: React.FunctionComponent = () => {
  const { clothId } = useParams();
  const [cloth, setCloth] = useState<IClothItem | null>(null);
  const { searchResults } = useAppSelector((state) => state.cloth);
  useEffect(() => {
    if (clothId && searchResults.length >= 0) {
      const clothsingle = searchResults.find(
        (cloth) => cloth._id.toString() === clothId.toString()
      );
      if (clothsingle) {
        setCloth(clothsingle);
      }
    }
  }, [searchResults, clothId]);
  if (!cloth) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center ">
        <h1 className="font-semibold text-xl text-red-500 ">
          Sorry , No results found
        </h1>
      </div>
    );
  }
  return (
    <div className="min-h-screen p-6 flex flex-col gap-6 lg:gap-8">
      <h1 className="text-center text-3xl font-extrabold text-red-600 mb-6">
        Cloth Detail
      </h1>
      <div className="flex justify-center mb-6">
        <img
          src={cloth.imageurl || "https://via.placeholder.com/300"}
          alt={cloth.category}
          className="w-full max-w-sm rounded-lg shadow-lg"
        />
      </div>
      <div className="flex flex-col gap-4 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <p className="font-semibold ">Condition</p>
          <p>{cloth.condition}</p>
          <p className="font-semibold ">Wear Count</p>
          <p>{cloth.wearcount}</p>
          <p className="font-semibold ">Last Worn</p>
          <p>{new Date(cloth.lastWorn).toDateString()}</p>
          <p className="font-semibold ">Favorite</p>
          <p>{cloth.isFavorite ? "Yes" : "No"}</p>
          <p className="font-semibold ">Archived</p>
          <p>{cloth.isArchived ? "Yes" : "No"}</p>
          <p className="font-semibold ">Category</p>
          <p>{cloth.category}</p>
          <p className="font-semibold ">Brand</p>
          <p>{cloth.brand}</p>
          <p className="font-semibold ">Size</p>
          <p>{cloth.size}</p>
          <p className="font-semibold ">Material</p>
          <p>{cloth.material}</p>
          <p className="font-semibold ">Purchase Date:</p>
          <p>{new Date(cloth.purchaseDate).toDateString()}</p>
        </div>

        {/* Season Suitability */}
        <div className="mt-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
            Season Suitability
          </h2>
          <ul className="list-disc pl-5">
            <li
              className={`text-${
                cloth.seasonSuitability.isWinter ? "green" : "red"
              }-500`}
            >
              Winter
            </li>
            <li
              className={`text-${
                cloth.seasonSuitability.isSummer ? "yellow" : "red"
              }-500`}
            >
              Summer
            </li>
            <li
              className={`text-${
                cloth.seasonSuitability.isSpring ? "green" : "red"
              }-500`}
            >
              Spring
            </li>
            <li
              className={`text-${
                cloth.seasonSuitability.isAutumn ? "orange" : "red"
              }-500`}
            >
              Autumn
            </li>
          </ul>
        </div>

        {/* Weather Suitability */}
        <div className="mt-4">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-2">
            Weather Suitability
          </h2>
          <ul className="list-disc pl-5">
            <li
              className={`text-${
                cloth.weatherSuitability.isWindSuitable ? "blue" : "red"
              }-500`}
            >
              Windy
            </li>
            <li
              className={`text-${
                cloth.weatherSuitability.isRainSuitable ? "blue" : "red"
              }-500`}
            >
              Rainy
            </li>
            <li
              className={`text-${
                cloth.weatherSuitability.isSnowySuitable ? "blue" : "red"
              }-500`}
            >
              Snowy
            </li>
            <li
              className={`text-${
                cloth.weatherSuitability.isCloudySuitable ? "blue" : "red"
              }-500`}
            >
              Cloudy
            </li>
            <li
              className={`text-${
                cloth.weatherSuitability.isSunnySuitable ? "yellow" : "red"
              }-500`}
            >
              Sunny
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
export default SerachDetails;
