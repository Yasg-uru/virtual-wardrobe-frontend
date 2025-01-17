import React, { useEffect, useState } from "react";
import SkeletonCard from "@/helper/SkeletonCard";
import { useToast } from "@/components/ui/use-toast";
import { ClothCard } from "@/helper/card";
import { axiosInstance } from "@/helper/axiosInstance";
import { motion } from "framer-motion";
import { IClothItem } from "@/types/clothState";

const GetArchive: React.FunctionComponent = () => {
  const [archives, setArchives] = useState<IClothItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const fetchArchives = async () => {
      try {
        const response = await axiosInstance.get(`/cloth/archive`, {
          withCredentials: true,
        });

        console.log("API Response:", response.data); // Log full response

        // ✅ Fix: Ensure correct data structure
        const clothData = response.data.Cloths || response.data || [];

        if (!Array.isArray(clothData)) {
          throw new Error("Invalid response format");
        }

        setArchives(clothData);

        toast({
          title: "Successfully fetched your archived clothes",
        });
      } catch (error: any) {
        console.error("Error fetching archives:", error);
        toast({
          title: "Failed to fetch archives",
          description: error.response?.data?.message || error.message,
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchArchives();
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

  if (archives.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1>No Archived Clothes</h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-4">
      <h1 className="text-2xl text-center text-red-600 italic font-bold">
        Archives
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {archives.map((cloth) => (
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
    </div>
  );
};

export default GetArchive;
