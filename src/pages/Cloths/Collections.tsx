import { useToast } from "@/components/ui/use-toast";
import CardComponent from "@/helper/card";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { GetCollections } from "@/redux/slices/clothSlice";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";

const Collections: React.FunctionComponent = () => {
  const { toast } = useToast();

  const dispatch = useAppDispatch();
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
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="animate-spin h-32 w-32" />
      </div>
    );
  }
  return (
    <div className="min-h-screen flex flex-col gap-2 p-5">
      <h1 className="text-2xl font-bold text-red-500 text-center">
        Recommanded Cloths According To Weather
      </h1>
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
