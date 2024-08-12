import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { IClothItem } from "@/types/clothState";
type props = {
  cloth: IClothItem;
};
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from "react-router-dom";
const CardComponent: React.FunctionComponent<props> = ({ cloth }) => {
  const navigate = useNavigate();
  return (
    <Card className="w-[400px] cursor-pointer">
      <CardHeader>
        <img
          className="h-96"
          src="https://m.media-amazon.com/images/I/51sheCOwk3L._SY879_.jpg"
          alt=""
        />
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <p className="font-semibold text-red-500 ">Brand : {cloth.brand}</p>
        <p className="font-semibold text-red-500 ">Color : {cloth.color}</p>
        <p className="font-semibold text-red-500 ">
          Wearcount : {cloth.wearcount}
        </p>
        <p className="font-semibold text-green-500 ">
          Lastworn : {new Date(cloth.lastWorn).toDateString()}
        </p>
      </CardContent>
      <CardFooter className="flex flex-col gap-1">
        {cloth.isFavorite && (
          <p className="font-semibold text-green-500">Favourate</p>
        )}
        <br />
        <div className="flex gap-1 flex-wrap ">
          {cloth.tags.length > 0 &&
            cloth.tags.map((tag) => <Badge variant="outline">{tag}</Badge>)}
        </div>

        <Link className="mt-10" to={`/detail/${cloth._id}`}>
          View Detail
        </Link>
      </CardFooter>
    </Card>
  );
};
export default CardComponent;
