
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { fetchStocksBySymbols } from "@/lib/api";
import { getFavorites, toggleFavorite } from "@/lib/favorites";
import StockCard from "@/components/StockCard";
import StockCardSkeleton from "@/components/StockCardSkeleton";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { Link } from "react-router-dom";
import { Bookmark } from "lucide-react";

export default function Favorites() {
  const [favoriteSymbols, setFavoriteSymbols] = useState<string[]>([]);
  const { toast } = useToast();
  
  // Load favorites on initial render
  useEffect(() => {
    const favorites = getFavorites();
    setFavoriteSymbols(favorites);
  }, []);
  
  // Fetch favorite stocks
  const { data: favoriteStocks, isLoading } = useQuery({
    queryKey: ['favoriteStocks', favoriteSymbols],
    queryFn: () => fetchStocksBySymbols(favoriteSymbols),
    enabled: favoriteSymbols.length > 0
  });
  
  // Handle toggle favorite
  const handleToggleFavorite = (symbol: string) => {
    const updatedFavorites = toggleFavorite(symbol);
    setFavoriteSymbols(updatedFavorites);
    
    toast({
      title: "Removed from Favorites",
      description: `${symbol} has been removed from your favorites.`,
    });
  };
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">My Favorite Stocks</h1>
      
      {favoriteSymbols.length === 0 ? (
        <div className="text-center py-12 border rounded-md">
          <Bookmark className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <h3 className="font-medium text-lg mb-2">No favorite stocks yet</h3>
          <p className="text-gray-500 mb-6">
            Add stocks to your favorites to track them easily
          </p>
          <Link to="/stocks">
            <Button>Browse Stocks</Button>
          </Link>
        </div>
      ) : isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array(favoriteSymbols.length).fill(0).map((_, i) => (
            <StockCardSkeleton key={i} />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {favoriteStocks?.map(stock => (
            <StockCard
              key={stock.symbol}
              symbol={stock.symbol}
              name={stock.name}
              price={stock.price}
              change={stock.change}
              changePercent={stock.changePercent}
              onToggleFavorite={handleToggleFavorite}
              isFavorite={true}
            />
          ))}
        </div>
      )}
    </div>
  );
}
