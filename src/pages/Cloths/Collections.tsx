import { useToast } from "@/components/ui/use-toast";
import CardComponent from "@/helper/card";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { GetCollections } from "@/redux/slices/clothSlice";
import { Loader2, RefreshCcw } from "lucide-react";
import { useEffect, useState } from "react";
import FilterCompo from "./Drawer";
import { Button } from "@/components/ui/button";

const Collections: React.FunctionComponent = () => {
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const { collections, isLoading } = useAppSelector((state) => state.cloth);
  useEffect(() => {
    dispatch(GetCollections())
      .then(() => {
        toast({
          title: "Successfully fetched your collections",
        });
      })
      .catch((error: any) => {
        toast({
          title: "failed to fetch",
        });
      });
  }, []);
  const Handlerefresh = () => {
    setLoading(true);
    window.location.reload();
    setLoading(false);
  };
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin h-32 w-32" />
      </div>
    );
  }
  if (collections.length === 0) {
    return (
      <div className="min-h-screen flex justify-center items-center flex-col ">
        <h1 className="font-bold text-2xl text-red-500">
          Sorry No results found
        </h1>
        <Button
          onClick={Handlerefresh}
          className="bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-3 px-6 rounded-md shadow-md hover:scale-105 transition duration-300"
        >
          Refresh
          <RefreshCcw className={`${isLoading ? "animate-spin" : ""}`} />
        </Button>
      </div>
    );
  }
  return (
    <div className="min-h-screen flex flex-col gap-2 p-5">
      <h1 className="text-2xl font-bold text-red-500 text-center">
        Your wardrobe collections
      </h1>
      <FilterCompo collections={collections} />
      <div className="flex flex-wrap gap-2 mx-auto ">
        {collections.length > 0 &&
          collections.map((cloth) => (
            <CardComponent key={cloth._id} cloth={cloth} />
          ))}
      </div>
    </div>
  );
};
export default Collections;
