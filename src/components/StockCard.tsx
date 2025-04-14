
import { useState } from "react";
import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface StockCardProps {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  logo?: string;
  onToggleFavorite?: (symbol: string) => void;
  isFavorite?: boolean;
}

const StockCard = ({ 
  symbol, 
  name, 
  price, 
  change, 
  changePercent, 
  logo,
  onToggleFavorite,
  isFavorite = false
}: StockCardProps) => {
  const [favorite, setFavorite] = useState(isFavorite);
  const isPositive = change >= 0;
  
  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setFavorite(!favorite);
    onToggleFavorite?.(symbol);
  };
  
  return (
    <Link to={`/stocks/${symbol}`}>
      <Card className="hover:shadow-md transition-shadow duration-300 h-full dark:hover:border-gray-600">
        <CardContent className="p-4 flex flex-col h-full">
          <div className="flex items-start justify-between mb-2">
            <div className="flex items-center">
              <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center overflow-hidden">
                {logo ? (
                  <img src={logo} alt={name} className="w-full h-full object-cover" />
                ) : (
                  <span className="font-bold text-lg text-gray-400 dark:text-gray-300">{symbol.charAt(0)}</span>
                )}
              </div>
              <div className="ml-3">
                <h3 className="font-medium text-base text-foreground">{symbol}</h3>
                <p className="text-sm text-muted-foreground truncate w-full max-w-[180px] md:max-w-[120px] lg:max-w-[180px]">{name}</p>
              </div>
            </div>
            <Button 
              variant="ghost" 
              size="sm" 
              className="p-1 h-auto dark:hover:bg-gray-700 dark:hover:text-white"
              onClick={handleFavoriteClick}
            >
              <Heart 
                className={cn(
                  "h-5 w-5", 
                  favorite ? "fill-red-500 text-red-500" : "text-gray-400 dark:text-gray-300"
                )} 
              />
            </Button>
          </div>
          
          <div className="mt-auto">
            <div className="text-lg font-semibold">${price.toFixed(2)}</div>
            <div className={cn(
              "flex items-center text-sm",
              isPositive ? "text-stock-gain" : "text-stock-loss"
            )}>
              <span>{isPositive ? "+" : ""}{change.toFixed(2)}</span>
              <span className="ml-2">({isPositive ? "+" : ""}{changePercent.toFixed(2)}%)</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
};

export default StockCard;
