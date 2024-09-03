import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import { useAppDispatch, useAppSelector } from "@/redux/hook";
import { GetNotification } from "@/redux/slices/clothSlice";

import { IoMdNotifications } from "react-icons/io";
const Notification: React.FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const { toast } = useToast();

  const { isLoading, Notification } = useAppSelector((state) => state.cloth);
  const HandleNotificationClick = () => {
    dispatch(GetNotification({ ex: "" }))
      .then(() => {
        toast({
          title: "fetched Notification Successfully",
        });
      })
      .catch((error: string) => {
        toast({
          title: error,
          variant: "destructive",
        });
      });
  };
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          onClick={HandleNotificationClick}
          className="dark:bg-gray-800  bg-white"
        >
          <IoMdNotifications
            size={30}
            className="dark:text-white text-green-500 cursor-pointer animate-bounce hover:animate-none"
          />
        </Button>
      </PopoverTrigger>
      {isLoading && !Notification ? (
        <PopoverContent className="w-80 flex justify-center items-center flex-col gap-2 p-5">
          <Skeleton className="h-6 w-3/4 rounded-md animate-pulse" />
          <Skeleton className="h-4 w-2/3 rounded-md animate-pulse" />
        </PopoverContent>
      ) : (
        <PopoverContent className="w-80 flex justify-center items-center flex-col gap-2 p-5 ">
          <p
            className={`font-semibold ${
              Notification?.title === "Seasonal Clothing Update"
                ? "text-green-600"
                : "text-red-600"
            } text-xl animate-pulse`}
          >
            {Notification?.title}
          </p>
          <p
            className={`text-sm font-semibold ${
              Notification?.title === "Seasonal Clothing Update"
                ? "text-green-600"
                : "text-red-600"
            } animate-pulse`}
          >
            {Notification?.reminder}
          </p>
        </PopoverContent>
      )}
    </Popover>
  );
};
export default Notification;
