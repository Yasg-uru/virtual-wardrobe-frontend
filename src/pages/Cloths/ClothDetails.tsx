import { useToast } from "@/components/ui/use-toast";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { GetClothDetails } from "@/redux/slices/clothSlice";

import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

const ClothDetail: React.FunctionComponent = () => {
  const cloth = useAppSelector((state) => state.cloth.ClothInfo);
  const { isLoading } = useAppSelector((state) => state.cloth);
  const { id } = useParams();
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  useEffect(() => {
    if (id) {
      dispatch(GetClothDetails({ id }))
        .unwrap()
        .then(() => {
          toast({
            title: "Successfully fetched cloth details",
          });
        })
        .catch((error: any) => {
          toast({
            title: error,
          });
        });
    }
  }, [id, dispatch, toast]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Loader2 className="h-10 w-10 animate-spin text-purple-600 dark:text-purple-400" />
      </div>
    );
  }

  if (!cloth) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <p className="text-gray-600 dark:text-gray-300 text-lg font-semibold">
          No results found
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 lg:p-8 flex flex-col gap-8 bg-gradient-to-b from-gray-100 to-gray-300 dark:from-gray-900 dark:to-gray-800">
      <h1 className="text-center text-4xl font-extrabold text-purple-700 dark:text-purple-500 mb-6">
        Cloth Detail
      </h1>
      <div className="flex justify-center mb-6">
        <img
          src={cloth.imageurl || "https://via.placeholder.com/300"}
          alt={cloth.category}
          className="w-full max-w-xs sm:max-w-sm md:max-w-md lg:max-w-lg rounded-xl shadow-2xl transform hover:scale-105 transition duration-500"
        />
      </div>
      <div className="flex flex-col gap-6 bg-white dark:bg-gray-900 p-6 lg:p-8 rounded-lg shadow-lg transform hover:-translate-y-2 transition duration-500">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="font-semibold text-gray-700 dark:text-gray-300">
              Condition
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              {cloth.condition}
            </p>
          </div>
          <div>
            <p className="font-semibold text-gray-700 dark:text-gray-300">
              Wear Count
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              {cloth.wearcount}
            </p>
          </div>
          <div>
            <p className="font-semibold text-gray-700 dark:text-gray-300">
              Last Worn
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              {new Date(cloth.lastWorn).toDateString()}
            </p>
          </div>
          <div>
            <p className="font-semibold text-gray-700 dark:text-gray-300">
              Favorite
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              {cloth.isFavorite ? "Yes" : "No"}
            </p>
          </div>
          <div>
            <p className="font-semibold text-gray-700 dark:text-gray-300">
              Archived
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              {cloth.isArchived ? "Yes" : "No"}
            </p>
          </div>
          <div>
            <p className="font-semibold text-gray-700 dark:text-gray-300">
              Category
            </p>
            <p className="text-gray-600 dark:text-gray-400">{cloth.category}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-700 dark:text-gray-300">
              Brand
            </p>
            <p className="text-gray-600 dark:text-gray-400">{cloth.brand}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-700 dark:text-gray-300">
              Size
            </p>
            <p className="text-gray-600 dark:text-gray-400">{cloth.size}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-700 dark:text-gray-300">
              Material
            </p>
            <p className="text-gray-600 dark:text-gray-400">{cloth.material}</p>
          </div>
          <div>
            <p className="font-semibold text-gray-700 dark:text-gray-300">
              Purchase Date
            </p>
            <p className="text-gray-600 dark:text-gray-400">
              {new Date(cloth.purchaseDate).toDateString()}
            </p>
          </div>
        </div>

        {/* Season Suitability */}
        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-purple-700 dark:text-purple-500 mb-3">
            Season Suitability
          </h2>
          <ul className="list-disc pl-5">
            <li
              className={`${
                cloth.seasonSuitability.isWinter
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              } font-semibold`}
            >
              Winter
            </li>
            <li
              className={`${
                cloth.seasonSuitability.isSummer
                  ? "text-yellow-600 dark:text-yellow-400"
                  : "text-red-600 dark:text-red-400"
              } font-semibold`}
            >
              Summer
            </li>
            <li
              className={`${
                cloth.seasonSuitability.isSpring
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              } font-semibold`}
            >
              Spring
            </li>
            <li
              className={`${
                cloth.seasonSuitability.isAutumn
                  ? "text-orange-600 dark:text-orange-400"
                  : "text-red-600 dark:text-red-400"
              } font-semibold`}
            >
              Autumn
            </li>
          </ul>
        </div>

        {/* Weather Suitability */}
        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-purple-700 dark:text-purple-500 mb-3">
            Weather Suitability
          </h2>
          <ul className="list-disc pl-5">
            <li
              className={`${
                cloth.weatherSuitability.isWindSuitable
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-red-600 dark:text-red-400"
              } font-semibold`}
            >
              Windy
            </li>
            <li
              className={`${
                cloth.weatherSuitability.isRainSuitable
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-red-600 dark:text-red-400"
              } font-semibold`}
            >
              Rainy
            </li>
            <li
              className={`${
                cloth.weatherSuitability.isSnowySuitable
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-red-600 dark:text-red-400"
              } font-semibold`}
            >
              Snowy
            </li>
            <li
              className={`${
                cloth.weatherSuitability.isCloudySuitable
                  ? "text-blue-600 dark:text-blue-400"
                  : "text-red-600 dark:text-red-400"
              } font-semibold`}
            >
              Cloudy
            </li>
            <li
              className={`${
                cloth.weatherSuitability.isSunnySuitable
                  ? "text-yellow-600 dark:text-yellow-400"
                  : "text-red-600 dark:text-red-400"
              } font-semibold`}
            >
              Sunny
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ClothDetail;
