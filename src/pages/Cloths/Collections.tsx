import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Loader2, RefreshCcw } from "lucide-react";

import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { IClothItem } from "@/types/clothState";
import { GetCollections } from "@/redux/slices/clothSlice";
import { FilterDrawer } from "./Drawer";
import { ClothCard } from "@/helper/card";

export  default function Collections() {
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState(false);
  const [filteredCollections, setFilteredCollections] = useState<IClothItem[]>(
    []
  );
  const { collections, isLoading } = useAppSelector((state) => state.cloth);

  useEffect(() => {
    dispatch(GetCollections())
      .unwrap()
      .then(() => {
        toast({ title: "Successfully fetched your collections." });
      })
      .catch(() => {
        toast({
          title: "Failed to fetch collections.",
          variant: "destructive",
        });
      });
  }, [dispatch, toast]);

  useEffect(() => {
    setFilteredCollections(collections);
  }, [collections]);

  const handleRefresh = () => {
    setLoading(true);
    dispatch(GetCollections()).finally(() => setLoading(false));
  };

  const handleFilter = (filteredItems: IClothItem[]) => {
    setFilteredCollections(filteredItems);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-pink-100 dark:from-gray-900 dark:to-gray-800">
        <Loader2 className="animate-spin h-32 w-32 text-blue-500 dark:text-blue-300" />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4 lg:p-8 dark:bg-black ">
      <motion.h1
        className="text-4xl font-bold text-center mb-8 text-purple-700 dark:text-purple-400"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Your Wardrobe Collections
      </motion.h1>

      <div className="flex justify-center mb-6 space-x-4">
        <FilterDrawer collections={collections} onFilter={handleFilter} />
        <Button
          onClick={handleRefresh}
          className="bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-2 px-4 rounded-md shadow-md hover:shadow-lg transition duration-300"
        >
          Refresh
          <RefreshCcw
            className={`ml-2 h-4 w-4 ${loading ? "animate-spin" : ""}`}
          />
        </Button>
      </div>

      <AnimatePresence>
        {filteredCollections.length === 0 ? (
          <motion.div
            className="text-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <p className="text-2xl font-semibold text-gray-600 dark:text-gray-400 mb-4">
              No items found in your collection.
            </p>
            <Button
              onClick={handleRefresh}
              className="bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-2 px-4 rounded-md shadow-md hover:shadow-lg transition duration-300"
            >
              Refresh Collection
            </Button>
          </motion.div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCollections.map((cloth) => (
              <motion.div
                key={cloth._id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
              >
                <ClothCard cloth={cloth} />
              </motion.div>
            ))}
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
