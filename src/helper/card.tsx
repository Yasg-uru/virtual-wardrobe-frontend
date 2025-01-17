
import { useState } from "react";

import {Link} from 'react-router-dom'
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Heart,  X, ChevronDown, Loader2 } from "lucide-react";
import { IClothItem } from "@/types/clothState";
import { useAppDispatch } from "@/redux/hook";
import { WearCloth } from "@/redux/slices/clothSlice";
import { DeleteDialog } from "./DeleteDialog";


interface ClothCardProps {
  cloth: IClothItem;
}

const conditions = ["New", "Good", "Worn", "Needs Repair"];

export function ClothCard({ cloth }: ClothCardProps) {
  const [isWear, setIsWear] = useState(false);
  const [condition, setCondition] = useState(cloth.condition);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const dispatch = useAppDispatch();

  const handleWear = async () => {
    if (condition === cloth.condition) {
      toast({
        title: "Please select a different condition",
        variant: "destructive",
      });
      return;
    }
    setIsLoading(true);
    try {
      await dispatch(WearCloth({ condition, id: cloth._id })).unwrap();
      toast({ title: "Worn successfully!" });
      setIsWear(false);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (cloth.isArchived) return null;

  return (
    <Card className="w-full max-w-sm mx-auto overflow-hidden transition-all duration-300 transform hover:scale-105 hover:shadow-xl dark:bg-black">
      <div className="relative aspect-square">
        <img
          src={cloth.imageurl || "/placeholder.svg"}
          alt={cloth.brand}
          // layout="fill"
          // objectFit="cover"
          className="transition-opacity duration-300 hover:opacity-90"
        />
        {cloth.isFavorite && (
          <div className="absolute top-2 right-2">
            <Badge variant="secondary" className="bg-white dark:bg-gray-700">
              <Heart className="w-4 h-4 text-red-500 mr-1" /> Favorite
            </Badge>
          </div>
        )}
      </div>
      <CardContent className="p-4 dark:bg-black">
        <h3 className="text-lg font-semibold mb-2 text-primary">
          {cloth.brand}
        </h3>
        <p className="text-sm text-muted-foreground mb-4">{cloth.color}</p>
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-medium">
            Worn {cloth.wearcount} times
          </span>
          <span className="text-sm text-muted-foreground">
            Last: {new Date(cloth.lastWorn).toLocaleDateString()}
          </span>
        </div>
        <AnimatePresence mode="wait">
          {isWear ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="flex gap-2 items-center"
            >
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="w-full">
                    {condition} <ChevronDown className="ml-2 h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  {conditions.map((c) => (
                    <DropdownMenuItem key={c} onSelect={() => setCondition(c)}>
                      {c}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <Button onClick={handleWear} disabled={isLoading}>
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  "Wear"
                )}
              </Button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsWear(false)}
              >
                <X className="h-4 w-4" />
              </Button>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
            >
              <Button onClick={() => setIsWear(true)} className="w-full">
                Wear Now
              </Button>
            </motion.div>
          )}
        </AnimatePresence>
      </CardContent>
      <CardFooter className="p-4 bg-muted/50 dark:bg-black">
        <div className="flex flex-wrap gap-2 mb-4">
          {cloth.tags.map((tag) => (
            <Badge key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex justify-between items-center w-full">
          <Link to={`/detail/${cloth._id}`} >
            <Button variant="link">View Details</Button>
          </Link>
          <DeleteDialog clothId={cloth._id} brand={cloth.brand} />
        </div>
      </CardFooter>
    </Card>
  );
}
