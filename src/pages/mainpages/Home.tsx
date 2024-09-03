
import { useToast } from "@/components/ui/use-toast";
import CardComponent from "@/helper/card";
import SkeletonCard from "@/helper/SkeletonCard";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { GetRecommandedCloths } from "@/redux/slices/clothSlice";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

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
              "Successfully fetched clothes according to the weather conditions.",
          });
        })
        .catch(() => {
          toast({
            title: "Sorry, no clothes found.",
            variant: "destructive",
          });
        });
    }
  }, [lat, lon, isLocationSet, toast, dispatch]);

  return (
    <div className="min-h-screen flex flex-col gap-4 p-5 bg-gradient-to-r from-blue-100 to-pink-100 dark:from-gray-900 dark:to-gray-800">
      <motion.h1
        className="text-3xl font-bold text-red-600 text-center mb-4 dark:text-red-400"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Recommended Clothes According to Weather
      </motion.h1>
      {isLoading ? (
        <div className="flex flex-wrap gap-2 mx-auto ">
          {Array.from({ length: 6 }).map((_, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
              className="flex-shrink-0"
            >
              <SkeletonCard />
            </motion.div>
          ))}
        </div>
      ) : (
        <div className="flex flex-wrap gap-2 mx-auto ">
          {recommandedCloths.length > 0 &&
            recommandedCloths.map((cloth) => (
              <motion.div
                key={cloth._id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="flex-shrink-0"
              >
                <CardComponent cloth={cloth} />
              </motion.div>
            ))}
        </div>
      )}
    </div>
  );
};

export default Home;
