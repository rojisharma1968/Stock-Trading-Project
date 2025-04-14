
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { MarketIndex } from "@/lib/api";
import { StyledAreaChart } from "@/components/ui/chart";

interface MarketOverviewProps {
  indices?: MarketIndex[];
  isLoading?: boolean;
}

const MarketOverview = ({ indices = [], isLoading = false }: MarketOverviewProps) => {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {Array(4).fill(0).map((_, i) => (
          <Card key={i} className="overflow-hidden dark:bg-gray-900 dark:border-gray-800">
            <CardContent className="p-6">
              <Skeleton className="h-6 w-24 mb-4" />
              <Skeleton className="h-8 w-32 mb-2" />
              <Skeleton className="h-4 w-20" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {indices.map((index) => (
        <Card 
          key={index.name}
          className="overflow-hidden transition-all hover:shadow-md dark:bg-gray-900 dark:border-gray-800"
        >
          <CardContent className="p-6">
            <h3 className="text-lg font-medium text-muted-foreground mb-2">{index.name}</h3>
            <p className="text-2xl font-bold mb-1">{index.value.toLocaleString()}</p>
            <p className={cn(
              "flex items-center text-sm font-medium",
              index.change >= 0 ? "text-stock-gain" : "text-stock-loss"
            )}>
              {index.change >= 0 ? "+" : ""}
              {index.change.toFixed(2)} ({index.change >= 0 ? "+" : ""}
              {index.changePercent.toFixed(2)}%)
            </p>
            
            {/* Add a small chart visualization for each index */}
            <div className="h-12 mt-3">
              <StyledAreaChart
                data={Array(24).fill(0).map((_, i) => ({
                  hour: i,
                  value: index.value - index.change * Math.sin(i / 8) + (Math.random() * index.change / 2)
                }))}
                dataKey={index.name}
                valueKey="value"
                height="100%"
                showXAxis={false}
                showYAxis={false}
                showGrid={false}
                showTooltip={false}
                colors={{
                  stroke: index.change >= 0 ? "#10b981" : "#ef4444",
                  fill: "url(#colorGradient)"  
                }}
              />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default MarketOverview;
