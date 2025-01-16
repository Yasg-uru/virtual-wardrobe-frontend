import { useEffect, useState } from "react";

import { useToast } from "@/components/ui/use-toast";
import {
  Loader2,
  Heart,
  Archive,
  Sun,
  Cloud,
  Umbrella,
  Wind,
  Snowflake,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { IClothItem } from "@/types/clothState";
import { useAppDispatch, useAppSelector, useAppStore } from "@/redux/hook";
import { GetClothDetails } from "@/redux/slices/clothSlice";
import { useParams } from "react-router-dom";

export default function ClothDetail() {
  const { toast } = useToast();
  const { ClothInfo: cloth, isLoading } = useAppSelector(
    (state) => state.cloth
  );
  const dispatch = useAppDispatch();

  const [isFavorite, setIsFavorite] = useState<boolean>(false);
  const [isArchived, setIsArchived] = useState<boolean>(false);
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      dispatch(GetClothDetails({ id }))
        .unwrap()
        .then(() => {
          toast({
            title: "fetched successfully",
          });
        })
        .catch((error) => {
          toast({
            title: error,
            variant: "destructive",
          });
        });
    }
  }, [id]);
  useEffect(() => {
    if (cloth) {
      setIsArchived(cloth.isArchived);
      setIsFavorite(cloth.isFavorite);
    }
  }, [cloth]);
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }

  if (!cloth) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <p className="text-muted-foreground text-lg font-semibold">
          No results found
        </p>
      </div>
    );
  }

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    toast({
      title: isFavorite ? "Removed from favorites" : "Added to favorites",
      duration: 2000,
    });
  };

  const toggleArchive = () => {
    setIsArchived(!isArchived);
    toast({
      title: isArchived ? "Unarchived" : "Archived",
      duration: 2000,
    });
  };

  return (
    <div className="min-h-screen mx-auto px-4 py-8 dark:bg-black">
      <Card className="overflow-hidden dark:bg-black">
        <CardHeader className="pb-0">
          <CardTitle className="text-3xl font-bold text-center">
            {cloth.category}
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="w-full md:w-1/2">
              <div className="relative aspect-square overflow-hidden rounded-lg">
                <img
                  src={cloth.imageurl || "/placeholder.svg"}
                  alt={cloth.category}
                  // objectFit="cover"
                  className="transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="flex justify-center mt-4 space-x-4">
                <Button
                  variant={isFavorite ? "default" : "outline"}
                  size="sm"
                  onClick={toggleFavorite}
                >
                  <Heart
                    className={`mr-2 h-4 w-4 ${
                      isFavorite ? "fill-current" : ""
                    }`}
                  />
                  {isFavorite ? "Favorited" : "Add to Favorites"}
                </Button>
                <Button
                  variant={isArchived ? "default" : "outline"}
                  size="sm"
                  onClick={toggleArchive}
                >
                  <Archive className="mr-2 h-4 w-4" />
                  {isArchived ? "Archived" : "Archive"}
                </Button>
              </div>
            </div>
            <div className="w-full md:w-1/2">
              <Tabs defaultValue="details">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="details">Details</TabsTrigger>
                  <TabsTrigger value="seasons">Seasons</TabsTrigger>
                  <TabsTrigger value="weather">Weather</TabsTrigger>
                </TabsList>
                <TabsContent value="details" className="mt-4">
                  <dl className="grid grid-cols-2 gap-4">
                    <DetailItem label="Brand" value={cloth.brand} />
                    <DetailItem label="Size" value={cloth.size} />
                    <DetailItem label="Color" value={cloth.color} />
                    <DetailItem label="Material" value={cloth.material} />
                    <DetailItem label="Condition" value={cloth.condition} />
                    <DetailItem
                      label="Wear Count"
                      value={cloth.wearcount.toString()}
                    />
                    <DetailItem
                      label="Last Worn"
                      value={new Date(cloth.lastWorn).toLocaleDateString()}
                    />
                    <DetailItem
                      label="Purchase Date"
                      value={new Date(cloth.purchaseDate).toLocaleDateString()}
                    />
                    <DetailItem
                      label="Cost"
                      value={`$${cloth.cost.toFixed(2)}`}
                    />
                  </dl>
                </TabsContent>
                <TabsContent value="seasons" className="mt-4">
                  <div className="grid grid-cols-2 gap-4">
                    <SeasonBadge
                      season="Winter"
                      suitable={cloth.seasonSuitability.isWinter}
                    />
                    <SeasonBadge
                      season="Summer"
                      suitable={cloth.seasonSuitability.isSummer}
                    />
                    <SeasonBadge
                      season="Spring"
                      suitable={cloth.seasonSuitability.isSpring}
                    />
                    <SeasonBadge
                      season="Autumn"
                      suitable={cloth.seasonSuitability.isAutumn}
                    />
                  </div>
                </TabsContent>
                <TabsContent value="weather" className="mt-4">
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <WeatherBadge
                      weather="Windy"
                      suitable={cloth.weatherSuitability.isWindSuitable}
                      icon={Wind}
                    />
                    <WeatherBadge
                      weather="Rainy"
                      suitable={cloth.weatherSuitability.isRainSuitable}
                      icon={Umbrella}
                    />
                    <WeatherBadge
                      weather="Snowy"
                      suitable={cloth.weatherSuitability.isSnowySuitable}
                      icon={Snowflake}
                    />
                    <WeatherBadge
                      weather="Cloudy"
                      suitable={cloth.weatherSuitability.isCloudySuitable}
                      icon={Cloud}
                    />
                    <WeatherBadge
                      weather="Sunny"
                      suitable={cloth.weatherSuitability.isSunnySuitable}
                      icon={Sun}
                    />
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="font-medium text-muted-foreground">{label}</dt>
      <dd className="mt-1">{value}</dd>
    </div>
  );
}

function SeasonBadge({
  season,
  suitable,
}: {
  season: string;
  suitable: boolean;
}) {
  return (
    <Badge
      variant={suitable ? "default" : "secondary"}
      className="w-full justify-center py-2"
    >
      {season}
    </Badge>
  );
}

function WeatherBadge({
  weather,
  suitable,
  icon: Icon,
}: {
  weather: string;
  suitable: boolean;
  icon: React.ElementType;
}) {
  return (
    <Badge
      variant={suitable ? "default" : "secondary"}
      className="w-full justify-center py-2"
    >
      <Icon className="mr-2 h-4 w-4" />
      {weather}
    </Badge>
  );
}
