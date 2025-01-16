import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export function ClothCardSkeleton() {
  return (
    <Card className="w-full max-w-sm mx-auto overflow-hidden">
      <Skeleton className="aspect-square w-full" />
      <CardContent className="p-4">
        <Skeleton className="h-6 w-2/3 mb-2" />
        <Skeleton className="h-4 w-1/3 mb-4" />
        <Skeleton className="h-4 w-full mb-4" />
        <Skeleton className="h-10 w-full" />
      </CardContent>
      <CardFooter className="p-4 bg-muted/50">
        <div className="flex flex-wrap gap-2 mb-4 w-full">
          <Skeleton className="h-6 w-16" />
          <Skeleton className="h-6 w-20" />
          <Skeleton className="h-6 w-24" />
        </div>
        <div className="flex justify-between items-center w-full">
          <Skeleton className="h-9 w-28" />
          <Skeleton className="h-9 w-9 rounded-full" />
        </div>
      </CardFooter>
    </Card>
  )
}

