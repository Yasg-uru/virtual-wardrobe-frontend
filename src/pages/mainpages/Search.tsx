import { Input } from "@/components/ui/input";
import { useEffect, useRef, useState } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { SearchCloths } from "@/redux/slices/clothSlice";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
const SearchBar: React.FunctionComponent = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isResultVisible, setIsResultVisible] = useState<boolean>(false);
  const [isNotResultFound, setIsNotResultFound] = useState<boolean>(false);
  const searchBarRef = useRef<HTMLDivElement>(null);
  const debounceSearchTerm = useDebounce(searchTerm, 2000);
  const dispatch = useAppDispatch();
  const { searchResults } = useAppSelector((state) => state.cloth);
  const { toast } = useToast();
  const navigate = useNavigate();

  const HandleNavigate = (clothId: string) => {
    navigate(`/searchDetail/${clothId}`);
  };
  useEffect(() => {
    if (debounceSearchTerm) {
      dispatch(SearchCloths({ searchQuery: debounceSearchTerm })).catch(
        (error: any) => {
          console.log("this is a error", error);
          setIsNotResultFound(true);
          toast({
            title: error,
          });
        }
      );
    }
  }, [debounceSearchTerm]);
  useEffect(() => {
    if (searchResults.length === 0) {
      setIsNotResultFound(true);
      toast({
        title: "Sorry, no results found",
      });
    } else {
      setIsNotResultFound(false);
      setIsResultVisible(true);
      toast({
        title: "Searched successfully",
      });
    }
  }, [searchResults]);
  const handleClickOutSide = (event: MouseEvent) => {
    if (
      searchBarRef.current &&
      !searchBarRef.current.contains(event.target as Node)
    ) {
      setIsResultVisible(false);
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutSide);
    return () => {
      document.removeEventListener("mousedown", handleClickOutSide);
      setIsResultVisible(true);
    };
  }, [debounceSearchTerm]);
  return (
    <div ref={searchBarRef} className="relative w-64">
      <Input
        type="text"
        placeholder="Search Product by title"
        className="appearance-none bg-white border md:w-96 w-64 border-gray-300 rounded-md py-2 px-4 text-gray-900 placeholder-gray-500 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-400 dark:focus:ring-blue-400"
        onChange={(e) => {
          setSearchTerm(e.target.value);
        }}
      />{" "}
      {searchResults.length > 0 && isResultVisible ? (
        <ul className="absolute mt-1 bg-white border border-gray-300 rounded shadow-lg w-96 dark:bg-gray-800 dark:border-gray-600 dark:shadow-gray-700 z-10">
          {searchResults.map((result) => (
            <li
              key={result._id}
              className="p-2 hover:bg-gray-200 cursor-pointer dark:hover:bg-gray-700"
              onClick={() => HandleNavigate(result._id)}
            >
              <div className="flex items-center">
                <img
                  src={
                    result.imageurl
                      ? result.imageurl
                      : "https://m.media-amazon.com/images/I/51sheCOwk3L._SY879_.jpg"
                  }
                  alt={result.brand}
                  className="w-12 h-12 mr-4 rounded"
                />
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {result.brand}
                  </h3>
                  <p className="text-sm font-semibold  text-gray-600 dark:text-red-500">
                    {result.category} | {result.color}
                  </p>
                  <p className="text-sm font-semibold  text-gray-600 dark:text-red-500">
                    Worn: {result.wearcount} times | Last worn:{" "}
                    {new Date(result.lastWorn).toDateString()}
                  </p>
                  <p className="text-sm font-semibold  text-gray-600 dark:text-red-500">
                    Purchased on: {new Date(result.purchaseDate).toDateString()}
                  </p>

                  <p className="text-sm font-semibold  text-gray-600 dark:text-red-500">
                    Favorite:
                    <span
                      className={`${
                        result.isFavorite ? "text-green-500" : "text-red-500"
                      }`}
                    >
                      {" "}
                      {result.isFavorite ? "Yes" : "No"}
                    </span>
                  </p>
                </div>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        isNotResultFound &&
        isResultVisible && (
          <div className="flex flex-col items-center justify-center absolute mt-1 bg-white border border-gray-300 rounded shadow-lg w-96 h-auto p-4 dark:bg-gray-800 dark:border-gray-600 dark:shadow-gray-700 z-10">
            <img
              className="h-32 w-32"
              src="https://www.ikbenik-kindercoaching.nl/wp-content/uploads/2019/07/sorry-3905517_1920.png"
              alt=""
            />
            <p className="mx-auto">Sorry, No Course Found</p>
          </div>
        )
      )}
    </div>
  );
};
export default SearchBar;
