
import { Card, CardContent } from "@/components/ui/card";

const StockCardSkeleton = () => {
  return (
    <Card className="h-full">
      <CardContent className="p-4 flex flex-col h-full">
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full skeleton" />
            <div className="ml-3">
              <div className="h-5 w-16 skeleton mb-1" />
              <div className="h-4 w-24 skeleton" />
            </div>
          </div>
          <div className="h-6 w-6 skeleton rounded-full" />
        </div>
        <div className="mt-auto">
          <div className="h-6 w-24 skeleton mb-1" />
          <div className="h-5 w-16 skeleton" />
        </div>
      </CardContent>
    </Card>
  );
};

export default StockCardSkeleton;
