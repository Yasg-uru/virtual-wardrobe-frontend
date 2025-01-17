import React, { useState } from "react";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/components/ui/use-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon, Loader2 } from "lucide-react";
import { useAppDispatch } from "@/redux/hook";
import { AddUserCloth } from "@/redux/slices/clothSlice";

export const formSchema = z.object({
  imageUrl: z.instanceof(File).optional(),
  purchaseDate: z.date(),
  category: z.string(),
  color: z.string(),
  tags: z.string(),
  size: z.string(),
  brand: z.string(),
  material: z.string(),
  seasonSuitability: z.object({
    isSummer: z.boolean(),
    isWinter: z.boolean(),
    isSpring: z.boolean(),
    isAutumn: z.boolean(),
  }),
  weatherSuitability: z.object({
    isRainSuitable: z.boolean(),
    isWindSuitable: z.boolean(),
    isSunnySuitable: z.boolean(),
    isCloudySuitable: z.boolean(),
    isSnowySuitable: z.boolean(),
  }),
  cost: z.number().min(0),
  isFavorite: z.boolean(),
  isArchived: z.boolean(),
});

export function AddClothForm() {
  const [step, setStep] = useState(1);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      purchaseDate: new Date(),
      category: "",
      color: "",
      tags: "",
      size: "",
      brand: "",
      material: "",
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
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    setIsLoading(true);
    
      dispatch(AddUserCloth(values)).unwrap().then(()=>{
        
        toast({
          title: "Cloth added successfully",
          description: "Your new item has been added to your virtual wardrobe.",
        });
        form.reset();
        setImagePreview(null);
        setStep(1);
      }).catch((error)=>{
        toast({
          title: error,
          description: "There was a problem adding your cloth. Please try again.",
          variant: "destructive",
        });
      }).finally(()=>{
        setIsLoading(false);
      })
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      form.setValue("imageUrl", file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  return (
    <div className="min-h-screen justify-center items-center pt-11 dark:bg-black">
      <Card className="w-full max-w-2xl mx-auto dark:bg-black">
        <CardHeader>
          <CardTitle className="text-3xl font-bold text-center">
            Add New Cloth
          </CardTitle>
          <CardDescription className="text-center">
            Expand your virtual wardrobe
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <Tabs
              value={`step${step}`}
              onValueChange={(value) =>
                setStep(parseInt(value.replace("step", "")))
              }
            >
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="step1">Basic Info</TabsTrigger>
                <TabsTrigger value="step2">Details</TabsTrigger>
                <TabsTrigger value="step3">Suitability</TabsTrigger>
              </TabsList>
              <TabsContent value="step1">
                <div className="space-y-4">
                  <div className="flex justify-center">
                    <div className="w-40 h-40 border-2 border-dashed rounded-lg flex items-center justify-center overflow-hidden">
                      {imagePreview ? (
                        <img
                          src={imagePreview || "/placeholder.svg"}
                          alt="Preview"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <Label
                          htmlFor="imageUrl"
                          className="cursor-pointer text-center"
                        >
                          <span className="text-sm">Click to upload image</span>
                          <Input
                            id="imageUrl"
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageChange}
                          />
                        </Label>
                      )}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="category">Category</Label>
                      <Select
                        onValueChange={(value) =>
                          form.setValue("category", value)
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
                    <div className="space-y-2">
                      <Label htmlFor="color">Color</Label>
                      <Input id="color" {...form.register("color")} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tags">Tags</Label>
                    <Input
                      id="tags"
                      {...form.register("tags")}
                      placeholder="e.g. casual, summer"
                    />
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="step2">
                <div className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="size">Size</Label>
                      <Input id="size" {...form.register("size")} />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="brand">Brand</Label>
                      <Input id="brand" {...form.register("brand")} />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="material">Material</Label>
                    <Input id="material" {...form.register("material")} />
                  </div>
                  <div className="space-y-2">
                    <Label>Purchase Date</Label>
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full justify-start text-left font-normal",
                            !form.watch("purchaseDate") &&
                              "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon className="mr-2 h-4 w-4" />
                          {form.watch("purchaseDate") ? (
                            format(form.watch("purchaseDate"), "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={form.watch("purchaseDate")}
                          onSelect={(date) =>
                            date && form.setValue("purchaseDate", date)
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                  <div className="space-y-2">
                    <Label>Cost</Label>
                    <div className="flex items-center space-x-4">
                      <Slider
                        min={0}
                        max={1000}
                        step={1}
                        value={[form.watch("cost")]}
                        onValueChange={(value) =>
                          form.setValue("cost", value[0])
                        }
                      />
                      <span className="w-12 text-center">
                        ${form.watch("cost")}
                      </span>
                    </div>
                  </div>
                </div>
              </TabsContent>
              <TabsContent value="step3">
                <div className="space-y-6">
                  <div className="space-y-2">
                    <Label>Season Suitability</Label>
                    <div className="grid grid-cols-2 gap-4">
                      {["Summer", "Winter", "Spring", "Autumn"].map(
                        (season) => (
                          <div
                            key={season}
                            className="flex items-center space-x-2"
                          >
                            <Switch
                              id={`season${season}`}
                              checked={form.watch(
                                `seasonSuitability.is${season}` as any
                              )}
                              onCheckedChange={(checked) =>
                                form.setValue(
                                  `seasonSuitability.is${season}` as any,
                                  checked
                                )
                              }
                            />
                            <Label htmlFor={`season${season}`}>{season}</Label>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Weather Suitability</Label>
                    <div className="grid grid-cols-2 gap-4">
                      {["Rain", "Wind", "Sunny", "Cloudy", "Snowy"].map(
                        (weather) => (
                          <div
                            key={weather}
                            className="flex items-center space-x-2"
                          >
                            <Switch
                              id={`weather${weather}`}
                              checked={form.watch(
                                `weatherSuitability.is${weather}Suitable` as any
                              )}
                              onCheckedChange={(checked) =>
                                form.setValue(
                                  `weatherSuitability.is${weather}Suitable` as any,
                                  checked
                                )
                              }
                            />
                            <Label htmlFor={`weather${weather}`}>
                              {weather}
                            </Label>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="isFavorite"
                        checked={form.watch("isFavorite")}
                        onCheckedChange={(checked) =>
                          form.setValue("isFavorite", checked)
                        }
                      />
                      <Label htmlFor="isFavorite">Favorite</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Switch
                        id="isArchived"
                        checked={form.watch("isArchived")}
                        onCheckedChange={(checked) =>
                          form.setValue("isArchived", checked)
                        }
                      />
                      <Label htmlFor="isArchived">Archived</Label>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
          <Button
            variant="outline"
            onClick={() => setStep(Math.max(1, step - 1))}
            disabled={step === 1}
          >
            Previous
          </Button>
          {step < 3 ? (
            <Button onClick={() => setStep(Math.min(3, step + 1))}>Next</Button>
          ) : (
            <Button onClick={form.handleSubmit(onSubmit)} disabled={isLoading}>
              {isLoading ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                "Submit"
              )}
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}
