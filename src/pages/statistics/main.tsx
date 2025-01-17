// import { IClothItem } from "@/types/clothState";
import VirtualWardrobeRadarChart from "./radar-chart";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { useEffect } from "react";
import { GetCollections } from "@/redux/slices/clothSlice";
import { toast } from "@/components/ui/use-toast";

export default function WardrobeAnalysisPage() {
  const dispatch = useAppDispatch();
  const { collections, isLoading } = useAppSelector((state) => state.cloth);
  useEffect(() => {
    dispatch(GetCollections())
      .unwrap()
      .then(() => {
        toast({
          title: "fetched collections successfully",
        });
      })
      .catch((error) => {
        toast({
          title: error,
          variant: "destructive",
        });
      });
  }, []);
  if (isLoading) {
    return <div>...Loading</div>;
  }

  return (
    <div className="min-h-screen justify-center items-center flex flex-col p-4 dark:bg-black">
      <h1 className="text-3xl font-bold mb-8">Wardrobe Analysis</h1>
      <VirtualWardrobeRadarChart items={collections} />
    </div>
  );
}
