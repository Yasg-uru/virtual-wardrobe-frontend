import { useToast } from "@/components/ui/use-toast";
import CardComponent from "@/helper/card";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { GetRecommandedCloths } from "@/redux/slices/clothSlice";
import { Loader2 } from "lucide-react";
import { useEffect, useState } from "react";

const Home: React.FunctionComponent = () => {
  const [lat, setLat] = useState<number | null>(null);
  const [lon, setLon] = useState<number | null>(null);
  const [isLocationSet, setIsLocationSet] = useState<boolean>(false);
  const dispatch = useAppDispatch();
  const { recommandedCloths, isLoading } = useAppSelector(
    (state) => state.cloth
  );
  const { toast } = useToast();

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setLat(position.coords.latitude);
        setLon(position.coords.longitude);
        setIsLocationSet(true);
      });
    }
    if (isLocationSet && lat && lon) {
      dispatch(GetRecommandedCloths({ lat, lon }))
        .then(() => {
          toast({
            title:
              "successfully fetched cloths according to the weather condition",
          });
        })
        .catch(() => {
          toast({
            title: "Sorry no cloths found",
            variant: "destructive",
          });
        });
    }
  }, [lat, lon, isLocationSet, toast, dispatch]);
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
        {recommandedCloths.length > 0 &&
          recommandedCloths.map((cloth) => (
            <CardComponent key={cloth._id} cloth={cloth} />
          ))}
      </div>
    </div>
  );
};
export default Home;
