import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectContent,
  SelectValue,
} from "@/components/ui/select";
import { DatePickerDemo } from "@/components/ui/Date-picker";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAppDispatch } from "@/redux/hook";
import { AddUserCloth } from "@/redux/slices/clothSlice";
import { useToast } from "@/components/ui/use-toast";

import { Label } from "@/components/ui/label"; // Import Label from Shadcn

export interface SeasonSuitability {
  isSummer: boolean;
  isWinter: boolean;
  isSpring: boolean;
  isAutumn: boolean;
}

export interface WeatherSuitability {
  isRainSuitable: boolean;
  isWindSuitable: boolean;
  isSunnySuitable: boolean;
  isCloudySuitable: boolean;
  isSnowySuitable: boolean;
}

export interface Formdata {
  imageurl: File | null;
  purchaseDate: Date | undefined;
  category: string;
  color: string;
  tags: string;
  size: string;
  brand: string;
  material: string;
  seasonSuitability: SeasonSuitability;
  weatherSuitability: WeatherSuitability;
  cost: number;
  isFavorite: boolean;
  isArchived: boolean;
}

const AddCloth: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  const [formData, setFormData] = useState<Formdata>({
    imageurl: null,
    purchaseDate: undefined,
    category: "",
    color: "",
    tags: "",
    material: "",
    size: "",
    brand: "",
    seasonSuitability: {
      isSummer: false,
      isWinter: false,
      isSpring: false,
      isAutumn: false,
    },
    weatherSuitability: {
      isRainSuitable: false,
      isWindSuitable: false,
      isSunnySuitable: false,
      isCloudySuitable: false,
      isSnowySuitable: false,
    },
    cost: 0,
    isFavorite: false,
    isArchived: false,
  });

  const [imagePreviewUrl, setImagePreviewUrl] = useState<string | null>(null);

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    if (file) {
      setFormData({ ...formData, imageurl: file });
      setImagePreviewUrl(URL.createObjectURL(file));
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement> | any
  ) => {
    const { name, value, type, checked } = e.target;
    console.log("this is a event target:", e.target);
    if (type === "checkbox" && name !== "isFavorite" && name !== "isArchived") {
      const [category, key] = name.split(".");
      setFormData((prevData: any) => ({
        ...prevData,
        [category]: {
          ...prevData[category],
          [key]: checked,
        },
      }));
    } else if (name === "isFavorite" || name === "isArchived") {
      setFormData((prevData: any) => ({
        ...prevData,
        [name]: checked,
      }));
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("this is a form data :", formData);
    dispatch(AddUserCloth(formData))
      .unwrap()
      .then(() => {
        toast({
          title: "Successfully added your cloths to the wardrobe",
        });
      })
      .catch((error: any) => {
        toast({
          title: error.message || "An error occurred",
          variant: "destructive",
        });
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form
        onSubmit={onSubmit}
        className="space-y-8 m-8 shadow-2xl shadow-slate-600 p-5 rounded-md"
      >
        <h1 className="text-center text-2xl font-bold italic">
          Add Cloth Form
        </h1>
        {imagePreviewUrl && (
          <Avatar className="mx-auto h-10 w-10">
            <AvatarImage src={imagePreviewUrl} />
            <AvatarFallback>Selected</AvatarFallback>
          </Avatar>
        )}
        <div className="flex flex-col space-y-4">
          <Label>Image</Label>
          <Input
            type="file"
            accept="image/*"
            name="imageurl"
            onChange={onImageChange}
          />
        </div>

        <div className="flex flex-col space-y-4">
          <Label>Purchase Date</Label>
          <DatePickerDemo
            value={formData?.purchaseDate}
            onChange={(date) =>
              setFormData({ ...formData, purchaseDate: date })
            }
          />
        </div>

        <div className="flex flex-col space-y-4">
          <Label>Category</Label>
          <Select
            name="category"
            value={formData.category}
            onValueChange={(value) =>
              setFormData({ ...formData, category: value })
            }
          >
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Top">Top</SelectItem>
              <SelectItem value="Bottom">Bottom</SelectItem>
              <SelectItem value="Accessory">Accessory</SelectItem>
              <SelectItem value="Footwear">Footwear</SelectItem>
              <SelectItem value="Outerwear">Outerwear</SelectItem>
              <SelectItem value="Other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex flex-col space-y-4">
          <Label>Color</Label>
          <Input
            placeholder="Brown"
            name="color"
            value={formData.color}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col space-y-4">
          <Label>Size</Label>
          <Input
            placeholder="Brown"
            name="size"
            value={formData.size}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col space-y-4">
          <Label>Brand</Label>
          <Input
            placeholder="Brand"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
          />
        </div>
        <div className="flex flex-col space-y-4">
          <Label>Material</Label>
          <Input
            placeholder="Brand"
            name="material"
            value={formData.material}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col space-y-4">
          <Label>Tags</Label>
          <Input
            placeholder="e.g. casual, summer"
            name="tags"
            value={formData.tags}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col space-y-4">
          <Label>Season Suitability</Label>
          <div className="space-y-2 flex flex-col">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="seasonSuitability.isSummer"
                checked={formData.seasonSuitability.isSummer}
                onChange={handleChange}
              />
              <Label className="text-sm font-medium leading-none">Summer</Label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="seasonSuitability.isWinter"
                checked={formData.seasonSuitability.isWinter}
                onChange={handleChange}
              />
              <Label className="text-sm font-medium leading-none">Winter</Label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="seasonSuitability.isSpring"
                checked={formData.seasonSuitability.isSpring}
                onChange={handleChange}
              />
              <Label className="text-sm font-medium leading-none">Spring</Label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="seasonSuitability.isAutumn"
                checked={formData.seasonSuitability.isAutumn}
                onChange={handleChange}
              />
              <Label className="text-sm font-medium leading-none">Autumn</Label>
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-4">
          <Label>Weather Suitability</Label>
          <div className="space-y-2 flex flex-col">
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="weatherSuitability.isRainSuitable"
                checked={formData.weatherSuitability.isRainSuitable}
                onChange={handleChange}
              />
              <Label className="text-sm font-medium leading-none">
                Rain Suitable
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="weatherSuitability.isWindSuitable"
                checked={formData.weatherSuitability.isWindSuitable}
                onChange={handleChange}
              />
              <Label className="text-sm font-medium leading-none">
                Wind Suitable
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="weatherSuitability.isSunnySuitable"
                checked={formData.weatherSuitability.isSunnySuitable}
                onChange={handleChange}
              />
              <Label className="text-sm font-medium leading-none">
                Sunny Suitable
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="weatherSuitability.isCloudySuitable"
                checked={formData.weatherSuitability.isCloudySuitable}
                onChange={handleChange}
              />
              <Label className="text-sm font-medium leading-none">
                Cloudy Suitable
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="weatherSuitability.isSnowySuitable"
                checked={formData.weatherSuitability.isSnowySuitable}
                onChange={handleChange}
              />
              <Label className="text-sm font-medium leading-none">
                Snowy Suitable
              </Label>
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-4">
          <Label>Cost</Label>
          <Input
            type="number"
            placeholder="e.g. 50"
            name="cost"
            value={formData.cost}
            onChange={handleChange}
          />
        </div>

        <div className="form-control">
          <label className="cursor-pointer label">
            <span className="label-text dark:text-white">isFavourate</span>
            <input
              type="checkbox"
              name="isFavorite"
              checked={formData.isFavorite}
              onChange={handleChange}
              className="checkbox checkbox-accent"
            />
          </label>
        </div>

        <div className="form-control">
          <label className="cursor-pointer label">
            <span className="label-text dark:text-white ">isArchive</span>
            <input
              type="checkbox"
              name="isArchived"
              checked={formData.isArchived}
              onChange={handleChange}
              className="checkbox checkbox-accent"
            />
          </label>
        </div>

        <Button className="bg-slate-900 w-full" type="submit">
          Submit
        </Button>
      </form>
    </div>
  );
};

export default AddCloth;
