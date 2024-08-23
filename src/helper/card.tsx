// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { MdDelete } from "react-icons/md";
// import { IClothItem } from "@/types/clothState";
// type props = {
//   cloth: IClothItem;
// };
// import { Badge } from "@/components/ui/badge";
// import { Link, useNavigate } from "react-router-dom";
// import { useState } from "react";
// import { Input } from "@/components/ui/input";
// import { X } from "lucide-react";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { useAppDispatch } from "@/redux/hook";
// import { WearCloth } from "@/redux/slices/clothSlice";
// import { useToast } from "@/components/ui/use-toast";
// import DeleteDialog from "./DeleteDialog";
// const CardComponent: React.FunctionComponent<props> = ({ cloth }) => {
//   const [isWear, setIsWear] = useState<boolean>(false);
//   const [condition, setCondition] = useState<string>(cloth.condition);
//   const navigate = useNavigate();
//   const { toast } = useToast();

//   const handleConditionChange = (condition: string) => {
//     setCondition(condition);
//   };
//   const dispatch = useAppDispatch();

//   const wearCloth = () => {
//     dispatch(WearCloth({ condition, id: cloth._id }))
//       .then(() => {
//         toast({
//           title: "weared successfully ",
//         });
//       })
//       .catch((error: any) => {
//         toast({
//           title: error,
//         });
//       });
//   };
//   return (
//     <Card className="w-[400px] cursor-pointer relative">
//       <CardHeader>
//         <img
//           className="h-96"
//           src={
//             cloth.imageurl ||
//             "https://m.media-amazon.com/images/I/51sheCOwk3L._SY879_.jpg"
//           }
//           alt=""
//         />
//       </CardHeader>
//       <CardContent className="flex flex-col gap-2 w-full">
//         {isWear === false ? (
//           <div className="join w-full">
//             <Button
//               onClick={wearCloth}
//               className="w-full join-item bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-3 px-6 rounded-md shadow-md hover:scale-105 transition duration-300"
//             >
//               Wear
//             </Button>
//             <Button
//               onClick={() => setIsWear(true)}
//               className="w-full join-item bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-3 px-6 rounded-md shadow-md hover:scale-105 transition duration-300"
//             >
//               Wear with Change Condition
//             </Button>
//           </div>
//         ) : (
//           <div className="flex gap-2 w-full items-center">
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button className="w-full bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-3 px-6 rounded-md shadow-md hover:scale-105 transition duration-300">
//                   {condition}
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent className="w-56">
//                 <DropdownMenuLabel>Condition</DropdownMenuLabel>
//                 <DropdownMenuItem onClick={() => handleConditionChange("New")}>
//                   New
//                 </DropdownMenuItem>
//                 <DropdownMenuItem onClick={() => handleConditionChange("Good")}>
//                   Good
//                 </DropdownMenuItem>
//                 <DropdownMenuItem onClick={() => handleConditionChange("Worn")}>
//                   Worn
//                 </DropdownMenuItem>
//                 <DropdownMenuItem
//                   onClick={() => handleConditionChange("Needs Repair")}
//                 >
//                   Needs Repair
//                 </DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//             <Button
//               size="sm"
//               onClick={wearCloth}
//               className="bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold py-3 px-6 rounded-md shadow-md hover:scale-105 transition duration-300"
//             >
//               change and Wear
//             </Button>
//             <X
//               className="w-10 h-10 cursor-pointer"
//               onClick={() => setIsWear(false)}
//             />
//           </div>
//         )}

//         <p className="font-semibold text-red-500 ">Brand : {cloth.brand}</p>
//         <p className="font-semibold text-red-500 ">Color : {cloth.color}</p>
//         <p className="font-semibold text-red-500 ">
//           Wearcount : {cloth.wearcount}
//         </p>
//         <p className="font-semibold text-green-500 ">
//           Lastworn : {new Date(cloth.lastWorn).toDateString()}
//         </p>
//       </CardContent>
//       <CardFooter className=" flex flex-col gap-1 relative">
//         {cloth.isFavorite && (
//           <p className="font-semibold text-green-500">Favourate</p>
//         )}
//         <br />
//         <div className="flex gap-1 flex-wrap ">
//           {cloth.tags.length > 0 &&
//             cloth.tags.map((tag) => <Badge variant="outline">{tag}</Badge>)}
//         </div>

//         <Link className="mt-10" to={`/detail/${cloth._id}`}>
//           View Detail
//         </Link>
//       </CardFooter>
//       <DeleteDialog Brand={cloth.brand} clothId={cloth._id} />
//     </Card>
//   );
// };
// export default CardComponent;
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { MdDelete } from "react-icons/md";
import { IClothItem } from "@/types/clothState";
type props = {
  cloth: IClothItem;
};
import { Badge } from "@/components/ui/badge";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAppDispatch } from "@/redux/hook";
import { WearCloth } from "@/redux/slices/clothSlice";
import { useToast } from "@/components/ui/use-toast";
import DeleteDialog from "./DeleteDialog";

const CardComponent: React.FunctionComponent<props> = ({ cloth }) => {
  const [isWear, setIsWear] = useState<boolean>(false);
  const [condition, setCondition] = useState<string>(cloth.condition);
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleConditionChange = (condition: string) => {
    setCondition(condition);
  };
  const dispatch = useAppDispatch();

  const wearCloth = () => {
    dispatch(WearCloth({ condition, id: cloth._id }))
      .then(() => {
        toast({
          title: "Worn successfully!",
        });
      })
      .catch((error: any) => {
        toast({
          title: "Error",
          description: error.message,
          variant: "destructive",
        });
      });
  };

  return (
    <Card className="w-[400px] cursor-pointer relative shadow-lg hover:shadow-2xl transition-shadow duration-300 rounded-xl overflow-hidden">
      <CardHeader className="p-0">
        <img
          className="h-96 w-full object-cover"
          src={
            cloth.imageurl ||
            "https://m.media-amazon.com/images/I/51sheCOwk3L._SY879_.jpg"
          }
          alt=""
        />
      </CardHeader>
      <CardContent className="flex flex-col gap-4 p-4">
        {isWear === false ? (
          <div className="w-full flex items-center justify-center">
            <button
              type="button"
              onClick={wearCloth}
              className="w-full join-item bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white font-bold  shadow-md hover:scale-105 transition transform duration-300 mt-2 rounded-bl-2xl rounded-tr-2xl h-10"
            >
              Wear Now
            </button>
            <button
              type="button"
              onClick={() => setIsWear(true)}
              className="w-full join-item bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white font-bold  shadow-md hover:scale-105 transition transform duration-300 mt-2 rounded-tr-2xl rounded-bl-2xl text-sm h-10"
            >
              Wear & Change Condition
            </button>
          </div>
        ) : (
          <div className="flex gap-2 w-full items-center">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button className="w-full bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:scale-105 transition transform duration-300">
                  {condition}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Condition</DropdownMenuLabel>
                <DropdownMenuItem onClick={() => handleConditionChange("New")}>
                  New
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleConditionChange("Good")}>
                  Good
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => handleConditionChange("Worn")}>
                  Worn
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => handleConditionChange("Needs Repair")}
                >
                  Needs Repair
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Button
              size="sm"
              onClick={wearCloth}
              className="bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 text-white font-bold py-3 px-6 rounded-lg shadow-md hover:scale-105 transition transform duration-300"
            >
              Change & Wear
            </Button>
            <X
              className="w-10 h-10 cursor-pointer text-gray-500 hover:text-gray-700 transition duration-300"
              onClick={() => setIsWear(false)}
            />
          </div>
        )}
        <div className="text-center">
          <p className="font-semibold text-purple-600">Brand: {cloth.brand}</p>
          <p className="font-semibold text-purple-600">Color: {cloth.color}</p>
          <p className="font-semibold text-purple-600">
            Wear Count: {cloth.wearcount}
          </p>
          <p className="font-semibold text-green-500">
            Last Worn: {new Date(cloth.lastWorn).toDateString()}
          </p>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col gap-1 p-4">
        {cloth.isFavorite && (
          <p className="font-semibold text-green-500">Favorite</p>
        )}
        <div className="flex gap-2 flex-wrap mt-4">
          {cloth.tags.length > 0 &&
            cloth.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="text-purple-600">
                {tag}
              </Badge>
            ))}
        </div>
        <Link
          className="mt-4 inline-block bg-purple-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-purple-700 transition duration-300 text-center"
          to={`/detail/${cloth._id}`}
        >
          View Detail
        </Link>
      </CardFooter>
      <DeleteDialog Brand={cloth.brand} clothId={cloth._id} />
    </Card>
  );
};

export default CardComponent;
