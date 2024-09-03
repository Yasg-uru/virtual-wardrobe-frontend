import { useAppDispatch, useAppSelector } from "@/redux/hook";
import React, { useEffect } from "react";

import SkeletonCard from "@/helper/SkeletonCard";
import { GetArchives } from "@/redux/slices/clothSlice"; // Replace with your actual import path
import { useToast } from "@/components/ui/use-toast";
import CardComponent from "@/helper/card";

const GetArchive: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const { Archives, isLoading } = useAppSelector((state) => state.cloth);
  console.log("this is archives :", Archives);
  const { toast } = useToast();
  useEffect(() => {
    dispatch(GetArchives({ ex: "" }))
      .unwrap()
      .then(() => {
        toast({
          title: "Successfully fetched your archived",
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
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="flex flex-wrap gap-4 mx-auto justify-center">
          {Array.from({ length: 6 }).map((_, index) => (
            <SkeletonCard key={index} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col gap-2 p-4">
      <h1 className="text-2xl text-center text-red-600 italic font-bold ">
        Archives
      </h1>
      <div className="flex flex-wrap gap-2 mx-auto ">
        {Archives.length > 0 &&
          Archives.map((cloth, index) => (
            <CardComponent key={index} cloth={cloth} />
          ))}
      </div>
    </div>
  );
};

export default GetArchive;
