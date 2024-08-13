import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import axios from "axios";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IClothItem } from "@/types/clothState";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { ScrollArea } from "@/components/ui/scroll-area";
import { filterCloth } from "@/redux/slices/clothSlice";
import { Checkbox } from "@/components/ui/checkbox";
import { useAppDispatch } from "@/redux/hook";
import { useToast } from "@/components/ui/use-toast";

type Props = {
  collections: IClothItem[];
};

const FilterCompo: React.FunctionComponent<Props> = ({ collections }) => {
  const dispatch = useAppDispatch();

  const [brands, setBrands] = useState<string[]>([]);
  const [sizes, setSizes] = useState<string[]>([]);
  const [material, setMaterial] = useState<string[]>([]);
  const [maxcost, setMaxCost] = useState<number>(0);
  const [mincost, setMinCost] = useState<number>(0);
  const [minWearCount, setMinWearCount] = useState<number>(0);
  const [maxWearCount, setMaxWearCount] = useState<number>(0);
  const [colors, setColors] = useState<string[]>([]);
  const [includeCost, setIncludeCost] = useState<boolean>(false);
  const [includeWearCount, setIncludeWearCount] = useState<boolean>(false);

  const [filters, setFilters] = useState({
    category: "",
    color: "",
    size: "",
    brand: "",
    material: "",
    condition: "",
    isRainSuitable: false,
    isWindSuitable: false,
    isSunnySuitable: false,
    isCloudySuitable: false,
    isSnowySuitable: false,
    isSummer: false,
    isWinter: false,
    isSpring: false,
    isAutumn: false,
    isFavorite: false,
    isArchived: false,
    minCost: 0,
    maxCost: 0,
    maxWearCount: 0,
    minWearCount: 0,
  });

  useEffect(() => {
    if (collections.length > 0) {
      const uniqueBrands = [
        ...new Set(collections.map((collection) => collection.brand)),
      ];
      const UniqueSizes = [
        ...new Set(collections.map((collection) => collection.size)),
      ];
      const UniqueMaterials = [
        ...new Set(collections.map((collection) => collection.material)),
      ];
      const UniqueColors = [
        ...new Set(collections.map((collection) => collection.color)),
      ];
      let maxCost: number = Number.MIN_SAFE_INTEGER;
      let minCost: number = Number.MAX_SAFE_INTEGER;
      let maxWear: number = Number.MIN_SAFE_INTEGER;
      let minwear: number = Number.MAX_SAFE_INTEGER;
      collections.forEach((collection) => {
        maxCost = Math.max(collection.cost, maxcost);
        minCost = Math.min(minCost, collection.cost);
        minwear = Math.min(minwear, collection.wearcount);
        maxWear = Math.max(maxWear, collection.wearcount);
      });
      setColors(UniqueColors);

      setMaxWearCount(maxWear);
      setMinCost(minCost);
      setMinWearCount(minwear);
      setMaxCost(maxCost);
      setMaterial(UniqueMaterials);
      setSizes(UniqueSizes);
      setBrands(uniqueBrands);
    }
  }, [collections]);
  const { toast } = useToast();
  const handleSubmit = async () => {
    //now we need to filter the things
    const updatedFilters: any = { ...filters };
    if (!includeCost) {
      updatedFilters["minCost"] = undefined;
      updatedFilters["maxCost"] = undefined;
    }
    if (!includeWearCount) {
      updatedFilters["maxWearCount"] = undefined;
      updatedFilters["minWearCount"] = undefined;
    }
    updatedFilters.isSummer = filters.isSummer ? true : undefined;
    updatedFilters.isWinter = filters.isWinter ? true : undefined;
    updatedFilters.isSpring = filters.isSpring ? true : undefined;
    updatedFilters.isAutumn = filters.isAutumn ? true : undefined;
    updatedFilters.isRainSuitable = filters.isRainSuitable ? true : undefined;
    updatedFilters.isWindSuitable = filters.isWindSuitable ? true : undefined;
    updatedFilters.isSunnySuitable = filters.isSunnySuitable ? true : undefined;
    updatedFilters.isCloudySuitable = filters.isCloudySuitable
      ? true
      : undefined;
    updatedFilters.isSnowySuitable = filters.isSnowySuitable ? true : undefined;
    updatedFilters.isFavorite = filters.isFavorite ? true : undefined;
    updatedFilters.isArchived = filters.isArchived ? true : undefined;
    dispatch(filterCloth(updatedFilters))
      .then(() => {
        toast({
          title: "Filtered succcessfully",
        });
      })
      .catch(() => {
        toast({
          title: "failed to filter cloths ",
          variant: "destructive",
        });
      });
  };
  const HandleCheckBoxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = event.target;

    setFilters((prev) => ({ ...prev, [name]: checked }));

    console.log("this is a filters  in the archive andn favourate:", filters);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Apply Filter</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Filter</SheetTitle>
          <SheetDescription>
            Apply filters to find your cloth easily from your wardrobe.
          </SheetDescription>
        </SheetHeader>
        <ScrollArea className="h-[60vh] rounded-md border p-4">
          {/* Section for Category and Condition Filters */}
          <div className="w-full p-4 space-y-6">
            <div className="flex gap-2 flex-wrap justify-between">
              <Select
                onValueChange={(value) =>
                  setFilters((prev) => ({ ...prev, category: value }))
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Category</SelectLabel>
                    <SelectItem value="Top">Top</SelectItem>
                    <SelectItem value="Bottom">Bottom</SelectItem>
                    <SelectItem value="Accessory">Accessory</SelectItem>
                    <SelectItem value="Footwear">Footwear</SelectItem>
                    <SelectItem value="Outerwear">Outerwear</SelectItem>
                    <SelectItem value="Other">Other</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Select
                onValueChange={(value) =>
                  setFilters((prev) => ({ ...prev, condition: value }))
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Condition" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Condition</SelectLabel>
                    <SelectItem value="New">New</SelectItem>
                    <SelectItem value="Good">Good</SelectItem>
                    <SelectItem value="Worn">Worn</SelectItem>
                    <SelectItem value="Needs Repair">Needs Repair</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Horizontal line */}
            <hr className="border-t border-gray-300" />

            {/* Section for Brand and Size Filters */}
            <div className="flex gap-2 flex-wrap justify-between">
              <Select
                onValueChange={(value) =>
                  setFilters((prev) => ({ ...prev, brand: value }))
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Brand" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Brands</SelectLabel>
                    {brands.map((brand, index) => (
                      <SelectItem key={index} value={brand}>
                        {brand}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>

              <Select
                onValueChange={(value) =>
                  setFilters((prev) => ({ ...prev, size: value }))
                }
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Select Size" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Sizes</SelectLabel>
                    {sizes.length > 0 &&
                      sizes.map((size, index) => (
                        <SelectItem key={index} value={size}>
                          {size}
                        </SelectItem>
                      ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>

            {/* Horizontal line */}
            <hr className="border-t border-gray-300" />

            {/* Section for Material Filter */}
            <div className="flex flex-col space-y-2">
              <h2 className="text-sm font-semibold">Material</h2>
              <RadioGroup
                className="flex gap-2 flex-wrap"
                onValueChange={(value) =>
                  setFilters((prev) => ({ ...prev, material: value }))
                }
              >
                {material.length > 0 &&
                  material.map((material, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <RadioGroupItem
                        value={material}
                        id={`material${index}`}
                      />
                      <Label htmlFor={`material${index}`}>{material}</Label>
                    </div>
                  ))}
              </RadioGroup>
            </div>
            <hr className="border-t border-gray-300" />

            {/* Section for Material Filter */}
            <div className="flex flex-col space-y-2">
              <h2 className="text-sm font-semibold">Colors</h2>
              <RadioGroup
                className="flex flex-wrap gap-2"
                onValueChange={(value) =>
                  setFilters((prev) => ({ ...prev, color: value }))
                }
              >
                {colors.length > 0 &&
                  colors.map((color, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <RadioGroupItem value={color} id={`color${index}`} />
                      <Label htmlFor={`material${index}`}>{color}</Label>
                    </div>
                  ))}
              </RadioGroup>
            </div>

            {/* Horizontal line */}
            <hr className="border-t border-gray-300" />
            <div className="flex flex-col space-y-2">
              <h2 className="text-sm font-semibold">Season Sustainability</h2>
              <RadioGroup
                className="flex flex-wrap gap-2"
                onValueChange={(value) =>
                  setFilters((prev) => {
                    return {
                      ...prev,
                      isSummer: value === "Summer",
                      isWinter: value === "Winter",
                      isSpring: value === "Spring",
                      isAutumn: value === "Autumn",
                    };
                  })
                }
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Summer" id="season-summer" />
                  <Label htmlFor="season-summer">Summer</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Winter" id="season-winter" />
                  <Label htmlFor="season-winter">Winter</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Spring" id="season-spring" />
                  <Label htmlFor="season-spring">Spring</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Autumn" id="season-autumn" />
                  <Label htmlFor="season-autumn">Autumn</Label>
                </div>
              </RadioGroup>
            </div>
            <hr className="border-t border-gray-300" />
            <div className="flex flex-col w-full gap-2">
              <h1 className="text-sm font-semibold">By Preference</h1>
              <div className="flex gap-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isArchived"
                    name="isArchived"
                    checked={filters.isArchived}
                    onChange={HandleCheckBoxChange}
                  />
                  <label
                    htmlFor="isArchived"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    by Archive
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="isFavorite"
                    name="isFavorite"
                    checked={filters.isFavorite}
                    onChange={HandleCheckBoxChange}
                  />
                  <label
                    htmlFor="isFavorite"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    By Favourate
                  </label>
                </div>
              </div>
            </div>
            <hr className="border-t border-gray-300" />
            {/* Section for Weather Sustainability */}
            <div className="flex flex-col space-y-2">
              <h2 className="text-sm font-semibold">Weather Sustainability</h2>
              <RadioGroup
                className="flex flex-wrap gap-2"
                onValueChange={(value) =>
                  setFilters((prev) => {
                    return {
                      ...prev,
                      isRainSuitable: value === "Rainy",
                      isWindSuitable: value === "Windy",
                      isSunnySuitable: value === "Sunny",
                      isCloudySuitable: value === "Cloudy",
                      isSnowySuitable: value === "Snowy",
                    };
                  })
                }
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Rainy" id="weather-rainy" />
                  <Label htmlFor="weather-rainy">Rainy</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Windy" id="weather-windy" />
                  <Label htmlFor="weather-windy">Windy</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Sunny" id="weather-sunny" />
                  <Label htmlFor="weather-sunny">Sunny</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Cloudy" id="weather-cloudy" />
                  <Label htmlFor="weather-cloudy">Cloudy</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="Snowy" id="weather-snowy" />
                  <Label htmlFor="weather-snowy">Snowy</Label>
                </div>
              </RadioGroup>
            </div>
            <hr className="border-t border-gray-300" />
            <div className="flex flex-col space-y-2">
              <h2 className="text-sm font-semibold">Include Filters</h2>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="includeCost"
                  checked={includeCost}
                  onChange={(e) => setIncludeCost(e.target.checked)}
                />
                <Label htmlFor="includeCost">Include Cost</Label>
              </div>
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  id="includeWearCount"
                  checked={includeWearCount}
                  onChange={(e) => setIncludeWearCount(e.target.checked)}
                />
                <Label htmlFor="includeWearCount">Include Wear Count</Label>
              </div>
            </div>
            {/* Section for Cost and Wear Count Filters */}
            <div className="space-y-4">
              {includeCost && (
                <div className="flex flex-col space-y-2">
                  <h2 className="text-sm font-semibold">Cost</h2>
                  <div className="flex gap-2">
                    <div className="flex flex-col gap-3 w-1/2">
                      <Label>Min Cost</Label>
                      <Slider
                        defaultValue={[mincost]}
                        onValueChange={(value) =>
                          setFilters((prev) => ({ ...prev, minCost: value[0] }))
                        }
                        max={maxcost}
                        step={1}
                      />
                      <p className="text-xs">
                        ₹{filters.minCost === 0 ? mincost : filters.minCost}
                      </p>
                    </div>
                    <div className="flex flex-col gap-3 w-1/2">
                      <Label>Max Cost</Label>
                      <Slider
                        defaultValue={[maxcost]}
                        onValueChange={(value) =>
                          setFilters((prev) => ({ ...prev, maxCost: value[0] }))
                        }
                        max={maxcost}
                        step={1}
                      />
                      <p className="text-xs">
                        ₹{filters.maxCost === 0 ? maxcost : filters.maxCost}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Horizontal line */}
              {includeWearCount && (
                <>
                  <hr className="border-t border-gray-300" />

                  <div className="flex flex-col space-y-2">
                    <h2 className="text-sm font-semibold">Wear Count</h2>
                    <div className="flex gap-2">
                      <div className="flex flex-col gap-3 w-1/2">
                        <Label>Min Wear</Label>
                        <Slider
                          defaultValue={[minWearCount]}
                          onValueChange={(value) =>
                            setFilters((prev) => ({
                              ...prev,
                              minWearCount: value[0],
                            }))
                          }
                          max={maxWearCount}
                          step={1}
                        />
                        <p className="text-xs">
                          {filters.minWearCount === 0
                            ? minWearCount
                            : filters.minWearCount}{" "}
                          times
                        </p>
                      </div>
                      <div className="flex flex-col gap-3 w-1/2">
                        <Label>Max Wear</Label>
                        <Slider
                          defaultValue={[maxWearCount]}
                          onValueChange={(value) =>
                            setFilters((prev) => ({
                              ...prev,
                              maxWearCount: value[0],
                            }))
                          }
                          max={maxWearCount}
                          step={1}
                        />
                        <p className="text-xs">
                          {filters.maxWearCount === 0
                            ? maxWearCount
                            : filters.maxWearCount}{" "}
                          times
                        </p>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </ScrollArea>
        <SheetFooter className="p-2">
          <SheetClose asChild>
            <Button
              variant="outline"
              className=" w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-3 px-6 rounded-md shadow-md hover:scale-105 transition duration-300"
              onClick={handleSubmit}
            >
              Apply
            </Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};

export default FilterCompo;
