import React, { useState, useEffect, useRef } from "react";
import { useDebounce } from "@uidotdev/usehooks";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { SearchCloths } from "@/redux/slices/clothSlice";
import { useToast } from "@/components/ui/use-toast";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Search, X } from "lucide-react";

const SearchBar: React.FunctionComponent = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isResultVisible, setIsResultVisible] = useState<boolean>(false);
  const [isNotResultFound, setIsNotResultFound] = useState<boolean>(false);
  const searchBarRef = useRef<HTMLDivElement>(null);
  const debounceSearchTerm = useDebounce(searchTerm, 500);
  const dispatch = useAppDispatch();
  const { searchResults } = useAppSelector((state) => state.cloth);
  const { toast } = useToast();
  const navigate = useNavigate();

  const HandleNavigate = (clothId: string) => {
    navigate(`/searchDetail/${clothId}`);
    setIsResultVisible(false);
  };

  useEffect(() => {
    if (debounceSearchTerm) {
      dispatch(SearchCloths({ searchQuery: debounceSearchTerm })).catch(
        (error: any) => {
          console.log("this is a error", error);
          setIsNotResultFound(true);
          toast({
            title: error,
            variant: "destructive",
          });
        }
      );
    }
  }, [debounceSearchTerm, dispatch, toast]);

  useEffect(() => {
    if (searchResults.length === 0 && debounceSearchTerm) {
      setIsNotResultFound(true);
      setIsResultVisible(true);
    } else if (searchResults.length > 0) {
      setIsNotResultFound(false);
      setIsResultVisible(true);
    } else {
      setIsResultVisible(false);
      setIsNotResultFound(false);
    }
  }, [searchResults, debounceSearchTerm]);

  const handleClickOutside = (event: MouseEvent) => {
    if (
      searchBarRef.current &&
      !searchBarRef.current.contains(event.target as Node)
    ) {
      setIsResultVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div ref={searchBarRef} className="relative w-full max-w-md">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500" />
        <Input
          type="text"
          placeholder="Search Product by title"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10 pr-10 w-full bg-background border-input hover:bg-accent hover:text-accent-foreground"
        />
        {searchTerm && (
          <button
            onClick={() => setSearchTerm("")}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:text-gray-500 dark:hover:text-gray-300"
          >
            <X size={18} />
          </button>
        )}
      </div>
      {isResultVisible && (
        <div className="absolute mt-1 w-full bg-popover text-popover-foreground rounded-md shadow-lg z-50 max-h-96 overflow-y-auto">
          {searchResults.length > 0 ? (
            <ul className="py-2">
              {searchResults.map((result) => (
                <li
                  key={result._id}
                  className="px-4 py-2 hover:bg-accent hover:text-accent-foreground cursor-pointer transition-colors duration-200"
                  onClick={() => HandleNavigate(result._id)}
                >
                  <div className="flex items-center space-x-4">
                    <img
                      src={
                        result.imageurl ||
                        "https://m.media-amazon.com/images/I/51sheCOwk3L._SY879_.jpg" ||
                        "/placeholder.svg"
                      }
                      alt={result.brand}
                      className="w-12 h-12 rounded-md object-cover"
                    />
                    <div>
                      <h3 className="font-semibold">{result.brand}</h3>
                      <p className="text-sm text-muted-foreground">
                        {result.category} | {result.color}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Worn: {result.wearcount} times | Last worn:{" "}
                        {new Date(result.lastWorn).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            isNotResultFound && (
              <div className="flex flex-col items-center justify-center p-4">
                <img
                  className="h-24 w-24 mb-2"
                  src="https://www.ikbenik-kindercoaching.nl/wp-content/uploads/2019/07/sorry-3905517_1920.png"
                  alt="No results"
                />
                <p className="text-center text-muted-foreground">
                  Sorry, no results found
                </p>
              </div>
            )
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
