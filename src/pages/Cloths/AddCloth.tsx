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
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { AddUserCloth } from "@/redux/slices/clothSlice";
import { useToast } from "@/components/ui/use-toast";

import { Label } from "@/components/ui/label"; // Import Label from Shadcn
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

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
  const { isLoading } = useAppSelector((state) => state.cloth);
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
  const validateForm = () => {
    const errors: string[] = [];
    if (!formData.imageurl) {
      errors.push("Image is required.");
    }
    if (!formData.purchaseDate) {
      errors.push("Purchase date is required.");
    }
    if (!formData.brand) {
      errors.push("Brand is required.");
    }
    if (!formData.category) {
      errors.push("category is required.");
    }
    if (!formData.size) {
      errors.push("Size is required.");
    }
    if (!formData.material) {
      errors.push("Material is required.");
    }
    if (!formData.color) {
      errors.push("Color is required.");
    }
    if (formData.cost <= 0) {
      errors.push("Cost must be greater than zero.");
    }
    if (!Object.values(formData.seasonSuitability).some((v) => v)) {
      errors.push("At least one season suitability must be selected.");
    }
    if (!Object.values(formData.weatherSuitability).some((v) => v)) {
      errors.push("At least one weather suitability must be selected.");
    }
    return errors;
  };
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const error = validateForm();
    if (error.length > 0) {
      toast({
        title: "Form validation error",
        description: error.join("\n"),
      });
      return;
    }
    console.log("this is a form data :", formData);
    dispatch(AddUserCloth(formData))
      .unwrap()
      .then(() => {
        toast({
          title: "Successfully added your cloths to the wardrobe",
        });
        setFormData({
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
        navigate("/collections");
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
        className="space-y-8 m-8 shadow-2xl shadow-slate-600 p-5 rounded-md w-96 max-w-sm"
      >
        <h1 className="text-center text-2xl font-bold italic">
          Add Cloth Form
        </h1>
        {imagePreviewUrl && (
          <div className="w-48 h-32 mx-auto">
            <img src={imagePreviewUrl} alt="No Image" className="rounded-lg" />
          </div>
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
            <div className="form-control">
              <label className="cursor-pointer label">
                <span className="label-text dark:text-white ">Winter</span>
                <input
                  type="checkbox"
                  name="seasonSuitability.isWinter"
                  checked={formData.seasonSuitability.isWinter}
                  onChange={handleChange}
                  className="checkbox checkbox-accent"
                />
              </label>
            </div>
            <div className="form-control">
              <label className="cursor-pointer label">
                <span className="label-text dark:text-white ">Summer</span>
                <input
                  type="checkbox"
                  name="seasonSuitability.isSummer"
                  checked={formData.seasonSuitability.isSummer}
                  onChange={handleChange}
                  className="checkbox checkbox-accent"
                />
              </label>
            </div>
            <div className="form-control">
              <label className="cursor-pointer label">
                <span className="label-text dark:text-white ">Spring</span>
                <input
                  type="checkbox"
                  name="seasonSuitability.isSpring"
                  checked={formData.seasonSuitability.isSpring}
                  onChange={handleChange}
                  className="checkbox checkbox-accent"
                />
              </label>
            </div>
            <div className="form-control">
              <label className="cursor-pointer label">
                <span className="label-text dark:text-white ">Autumn</span>
                <input
                  type="checkbox"
                  name="weatherSuitability.isAutumn"
                  checked={formData.seasonSuitability.isAutumn}
                  onChange={handleChange}
                  className="checkbox checkbox-accent"
                />
              </label>
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-4">
          <Label>Weather Suitability</Label>
          <div className="space-y-2 flex flex-col">
            <div className="form-control">
              <label className="cursor-pointer label">
                <span className="label-text dark:text-white ">
                  Rain Suitable
                </span>
                <input
                  type="checkbox"
                  name="weatherSuitability.isRainSuitable"
                  checked={formData.weatherSuitability.isRainSuitable}
                  onChange={handleChange}
                  className="checkbox checkbox-accent"
                />
              </label>
            </div>
            <div className="form-control">
              <label className="cursor-pointer label">
                <span className="label-text dark:text-white ">
                  Sunny Suitable
                </span>
                <input
                  type="checkbox"
                  name="weatherSuitability.isSunnySuitable"
                  checked={formData.weatherSuitability.isSunnySuitable}
                  onChange={handleChange}
                  className="checkbox checkbox-accent"
                />
              </label>
            </div>
            <div className="form-control">
              <label className="cursor-pointer label">
                <span className="label-text dark:text-white ">
                  Wind Suitable
                </span>
                <input
                  type="checkbox"
                  name="weatherSuitability.isWindSuitable"
                  checked={formData.weatherSuitability.isWindSuitable}
                  onChange={handleChange}
                  className="checkbox checkbox-accent"
                />
              </label>
            </div>
            <div className="form-control">
              <label className="cursor-pointer label">
                <span className="label-text dark:text-white ">
                  Cloudy Suitable
                </span>
                <input
                  type="checkbox"
                  name="weatherSuitability.isCloudySuitable"
                  checked={formData.weatherSuitability.isCloudySuitable}
                  onChange={handleChange}
                  className="checkbox checkbox-accent"
                />
              </label>
            </div>
            <div className="form-control">
              <label className="cursor-pointer label">
                <span className="label-text dark:text-white ">
                  Snowy Suitable
                </span>
                <input
                  type="checkbox"
                  name="weatherSuitability.isSnowySuitable"
                  checked={formData.weatherSuitability.isSnowySuitable}
                  onChange={handleChange}
                  className="checkbox checkbox-accent"
                />
              </label>
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

        <Button
          className=" w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-3 px-6 rounded-md shadow-md hover:scale-105 transition duration-300  "
          type="submit"
        >
          {isLoading ? <Loader2 className=" animate-spin h-5 w-5" /> : "Save"}
        </Button>
      </form>
    </div>
  );
};

export default AddCloth;
