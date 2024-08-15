import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";

 function SkeletonCard() {
  return (
    <Card className="w-[400px] cursor-pointer">
      <CardHeader>
        <Skeleton className="h-96 w-full rounded-md" />
      </CardHeader>
      <CardContent className="flex flex-col gap-2 w-full">
        <div className="join w-full space-y-2">
          <Skeleton className="h-12 w-full rounded-md" />
          <Skeleton className="h-12 w-full rounded-md" />
        </div>
        <div className="flex gap-2 w-full items-center space-x-2">
          <Skeleton className="h-12 w-full rounded-md" />
          <Skeleton className="h-12 w-28 rounded-md" />
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>
        <Skeleton className="h-4 w-[70%] rounded-md" />
        <Skeleton className="h-4 w-[60%] rounded-md" />
        <Skeleton className="h-4 w-[50%] rounded-md" />
        <Skeleton className="h-4 w-[70%] rounded-md" />
      </CardContent>
      <CardFooter className="flex flex-col gap-1 space-y-2">
        <Skeleton className="h-4 w-[40%] rounded-md" />
        <div className="flex gap-1 flex-wrap ">
          {Array.from({ length: 3 }).map((_, index) => (
            <Skeleton key={index} className="h-6 w-[50px] rounded-full" />
          ))}
        </div>
        <Skeleton className="h-6 w-[100px] mt-10 rounded-md" />
      </CardFooter>
    </Card>
  );
}
export default SkeletonCard;