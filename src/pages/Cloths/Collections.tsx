// import { useToast } from "@/components/ui/use-toast";
// import CardComponent from "@/helper/card";
// import { useAppDispatch, useAppSelector } from "@/redux/hook";
// import { GetCollections } from "@/redux/slices/clothSlice";
// import { Loader2, RefreshCcw } from "lucide-react";
// import { useEffect, useState } from "react";
// import FilterCompo from "./Drawer";
// import { Button } from "@/components/ui/button";

// const Collections: React.FunctionComponent = () => {
//   const { toast } = useToast();
//   const dispatch = useAppDispatch();
//   const [loading, setLoading] = useState<boolean>(false);
//   const { collections, isLoading } = useAppSelector((state) => state.cloth);
//   useEffect(() => {
//     dispatch(GetCollections())
//       .then(() => {
//         toast({
//           title: "Successfully fetched your collections",
//         });
//       })
//       .catch((error: any) => {
//         toast({
//           title: "failed to fetch",
//         });
//       });
//   }, []);
//   const Handlerefresh = () => {
//     setLoading(true);
//     window.location.reload();
//     setLoading(false);
//   };
//   if (isLoading) {
//     return (
//       <div className="min-h-screen flex items-center justify-center">
//         <Loader2 className="animate-spin h-32 w-32" />
//       </div>
//     );
//   }
//   if (collections.length === 0) {
//     return (
//       <div className="min-h-screen flex justify-center items-center flex-col ">
//         <h1 className="font-bold text-2xl text-red-500">
//           Sorry No results found
//         </h1>
//         <Button
//           onClick={Handlerefresh}
//           className="bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-3 px-6 rounded-md shadow-md hover:scale-105 transition duration-300"
//         >
//           Refresh
//           <RefreshCcw className={`${isLoading ? "animate-spin" : ""}`} />
//         </Button>
//       </div>
//     );
//   }
//   return (
//     <div className="min-h-screen flex flex-col gap-2 p-5">
//       <h1 className="text-2xl font-bold text-red-500 text-center">
//         Your wardrobe collections
//       </h1>
//       <FilterCompo collections={collections} />
//       <div className="flex flex-wrap gap-2 mx-auto ">
//         {collections.length > 0 &&
//           collections.map((cloth) => (
//             <CardComponent key={cloth._id} cloth={cloth} />
//           ))}
//       </div>
//     </div>
//   );
// };
// export default Collections;
import { useToast } from "@/components/ui/use-toast";
import CardComponent from "@/helper/card";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { GetCollections } from "@/redux/slices/clothSlice";
import { Loader2, RefreshCcw } from "lucide-react";
import { useEffect, useState } from "react";
import FilterCompo from "./Drawer";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const Collections: React.FunctionComponent = () => {
  const { toast } = useToast();
  const dispatch = useAppDispatch();
  const [loading, setLoading] = useState<boolean>(false);
  const { collections, isLoading } = useAppSelector((state) => state.cloth);

  useEffect(() => {
    dispatch(GetCollections())
      .then(() => {
        toast({
          title: "Successfully fetched your collections.",
        });
      })
      .catch(() => {
        toast({
          title: "Failed to fetch collections.",
          variant: "destructive",
        });
      });
  }, [dispatch, toast]);

  const handleRefresh = ():void => {
    setLoading(true);
    dispatch(GetCollections()).finally(() => setLoading(false));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-blue-100 to-pink-100 dark:from-gray-900 dark:to-gray-800">
        <Loader2 className="animate-spin h-32 w-32 text-blue-500 dark:text-blue-300" />
      </div>
    );
  }

  if (collections.length === 0) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-r from-blue-100 to-pink-100 dark:from-gray-900 dark:to-gray-800">
        <motion.h1
          className="text-3xl font-bold text-red-500 dark:text-red-400 mb-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Sorry, No Results Found
        </motion.h1>
        <Button
          onClick={handleRefresh}
          className="bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-3 px-6 rounded-md shadow-md hover:scale-105 transition duration-300"
        >
          Refresh
          <RefreshCcw   className={`ml-2 ${loading ? "animate-spin" : ""}`} />
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col gap-4 p-5 bg-gradient-to-r from-blue-100 to-pink-100 dark:from-gray-900 dark:to-gray-800">
      <motion.h1
        className="text-3xl font-bold text-red-500 dark:text-red-400 text-center mb-4 italic"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Your Wardrobe Collections
      </motion.h1>
      <FilterCompo loading={loading} handleRefresh={handleRefresh} collections={collections} />
      <div className="flex flex-wrap gap-2 mx-auto ">
        {collections.length > 0 ? (
          collections.map((cloth) => (
            <motion.div
              key={cloth._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex-shrink-0"
            >
              <CardComponent cloth={cloth} />
            </motion.div>
          ))
        ) : (
          <p className="text-center text-lg text-gray-500 dark:text-gray-300">
            No items found in your collection.
          </p>
        )}
      </div>
    </div>
  );
};

export default Collections;
