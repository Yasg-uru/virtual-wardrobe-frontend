import { Button } from "@/components/ui/button";
import CardComponent from "@/helper/card";
import { useAppSelector } from "@/redux/hook";
import React, { useRef } from "react";
import { AiOutlineWarning } from "react-icons/ai";

const WearAnalysis: React.FunctionComponent = () => {
  const { leastWorn, mostworn, underUtilizedCloths } = useAppSelector(
    (state) => state.cloth
  );
const MostWornRef=useRef<HTMLDivElement>(null);
const LeastWornRef=useRef<HTMLDivElement>(null);
const underutilizedRef=useRef<HTMLDivElement>(null);
const scrollToSection=(ref:React.RefObject<HTMLDivElement>)=>{
if(ref.current){
  ref.current.scrollIntoView({behavior:"smooth"})
}
}
  return (
    <div className="min-h-screen flex flex-col gap-16 p-8 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 dark:from-gray-800 dark:via-gray-900 dark:to-black">
      <div className="flex gap-3">
        <button  type="button" className="btn btn-outline btn-accent" onClick={()=>scrollToSection(MostWornRef)}>
          Most Worn
        </button>
        <button type="button" className="btn btn-outline btn-accent"onClick={()=>scrollToSection(LeastWornRef)}>
          Least Worn
        </button>
        <button type="button" className="btn btn-outline btn-accent"onClick={()=>scrollToSection(underutilizedRef)}>
          underutilized cloths
        </button>
      </div>
      <div ref={MostWornRef}>
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6">
          Most Worn Clothes
        </h2>
        <div className="flex gap-6 flex-wrap justify-center">
          {mostworn.length > 0 ? (
            mostworn.map((worn) => (
              <CardComponent key={worn._id} cloth={worn} />
            ))
          ) : (
            <div className="flex items-center justify-center w-full p-6 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-lg shadow-lg">
              <AiOutlineWarning className="text-gray-600 dark:text-gray-400 text-3xl mr-3 animate-bounce" />
              <span className="text-gray-700 dark:text-gray-300 text-lg">
                No items found in this category.
              </span>
            </div>
          )}
        </div>
      </div>

      <hr className="border-t-2 border-gray-400 dark:border-gray-700" />

      <div ref={LeastWornRef}>
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6">
          Least Worn Clothes
        </h2>
        <div className="flex gap-6 flex-wrap justify-center">
          {leastWorn.length > 0 ? (
            leastWorn.map((worn) => (
              <CardComponent key={worn._id} cloth={worn} />
            ))
          ) : (
            <div className="flex items-center justify-center w-full p-6 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-lg shadow-lg">
              <AiOutlineWarning className="text-gray-600 dark:text-gray-400 text-3xl mr-3 animate-bounce" />
              <span className="text-gray-700 dark:text-gray-300 text-lg">
                No items found in this category.
              </span>
            </div>
          )}
        </div>
      </div>

      <hr className="border-t-2 border-gray-400 dark:border-gray-700" />

      <div ref={underutilizedRef}>
        <h2 className="text-3xl font-extrabold text-gray-900 dark:text-white mb-6">
          Underutilized Clothes
        </h2>
        <div className="flex gap-6 flex-wrap justify-center">
          {underUtilizedCloths.length > 0 ? (
            underUtilizedCloths.map((worn) => (
              <CardComponent key={worn._id} cloth={worn} />
            ))
          ) : (
            <div className="flex items-center justify-center w-full p-6 bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 rounded-lg shadow-lg">
              <AiOutlineWarning className="text-gray-600 dark:text-gray-400 text-3xl mr-3 animate-bounce" />
              <span className="text-gray-700 dark:text-gray-300 text-lg">
                No items found in this category.
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WearAnalysis;
