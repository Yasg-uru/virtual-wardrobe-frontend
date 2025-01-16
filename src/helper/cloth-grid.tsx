import { useState, useEffect } from "react";

import { IClothItem } from "@/types/clothState";
import { useAppSelector, useAppDispatch } from "@/redux/hook";
import { ClothCardSkeleton } from "./skeleton";
import { ClothCard } from "./card";
import { GetCollections } from "@/redux/slices/clothSlice";

export function ClothGrid() {
  const [isLoading, setIsLoading] = useState(true);
  const clothes = useAppSelector((state) => state.cloth.collections);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(GetCollections())
      .unwrap()
      .finally(() => setIsLoading(false));
  }, [dispatch]);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
      {isLoading
        ? Array.from({ length: 8 }).map((_, index) => (
            <ClothCardSkeleton key={index} />
          ))
        : clothes.map((cloth: IClothItem) => (
            <ClothCard key={cloth._id} cloth={cloth} />
          ))}
    </div>
  );
}
