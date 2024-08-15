import { Button } from "@/components/ui/button";
import CardComponent from "@/helper/card";
import { useAppSelector } from "@/redux/hook";
import React, { useEffect, useRef, useState } from "react";
import { AiOutlineArrowUp, AiOutlineWarning } from "react-icons/ai";

const WearAnalysis: React.FunctionComponent = () => {
  const { leastWorn, mostworn, underUtilizedCloths } = useAppSelector(
    (state) => state.cloth
  );
  const MostWornRef = useRef<HTMLDivElement>(null);
  const LeastWornRef = useRef<HTMLDivElement>(null);
  const underutilizedRef = useRef<HTMLDivElement>(null);
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);

  const scrollToSection = (ref: React.RefObject<HTMLDivElement>) => {
    if (ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  };
  const scrollToTop = () => {
    window.scroll({ top: 0, behavior: "smooth" });
  };
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  return (
    <div className="min-h-screen flex flex-col gap-16 p-8 bg-gradient-to-br from-gray-100 via-gray-200 to-gray-300 dark:from-gray-800 dark:via-gray-900 dark:to-black">
      <div className="flex gap-3">
        <button
          type="button"
          className="btn btn-outline btn-accent animate-pulse shadow-2xl "
          onClick={() => scrollToSection(MostWornRef)}
        >
          Most Worn
        </button>
        <button
          type="button"
          className="btn btn-outline btn-accent animate-pulse shadow-2xl "
          onClick={() => scrollToSection(LeastWornRef)}
        >
          Least Worn
        </button>
        <button
          type="button"
          className="btn btn-outline btn-accent animate-pulse shadow-2xl "
          onClick={() => scrollToSection(underutilizedRef)}
        >
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
      {showBackToTop && (
        <button
          type="button"
          onClick={scrollToTop}
          className="fixed animate-bounce bottom-4 right-4 p-3 bg-accent text-white rounded-full shadow-lg hover:bg-accent-focus focus:outline-none"
        >
          <AiOutlineArrowUp
            size={34}
            className="dark:text-white font-bold text-red-500 animate-pulse"
          />
        </button>
      )}
    </div>
  );
};

export default WearAnalysis;
