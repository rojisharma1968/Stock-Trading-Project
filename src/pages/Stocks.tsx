
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchStocks } from "@/lib/api";
import { StockData } from "@/components/StockTable";
import StockTable from "@/components/StockTable";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getFavorites, toggleFavorite } from "@/lib/favorites";
import { useToast } from "@/components/ui/use-toast";
import { Search } from "lucide-react";

export default function Stocks() {
  const [searchQuery, setSearchQuery] = useState("");
  const [sector, setSector] = useState("all");
  const [sortBy, setSortBy] = useState("marketCap");
  const [favoriteSymbols, setFavoriteSymbols] = useState<Set<string>>(new Set());
  const { toast } = useToast();
  const location = useLocation();
  const navigate = useNavigate();
  
  // Load favorites on initial render
  useEffect(() => {
    const favorites = getFavorites();
    setFavoriteSymbols(new Set(favorites));
    
    // Check for filter param in URL
    const params = new URLSearchParams(location.search);
    const filter = params.get("filter");
    if (filter) {
      setSortBy(filter === "gainers" ? "changePercent" : filter === "losers" ? "changePercent" : "volume");
    }
  }, [location.search]);
  
  // Fetch all stocks
  const { data: stocks, isLoading } = useQuery({
    queryKey: ['allStocks'],
    queryFn: fetchStocks
  });
  
  // Filter and sort stocks based on current filters
  const filteredStocks = stocks?.filter(stock => {
    const matchesSearch = searchQuery === "" || 
      stock.symbol.toLowerCase().includes(searchQuery.toLowerCase()) || 
      stock.name.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSector = sector === "all" || stock.sector === sector;
    
    return matchesSearch && matchesSector;
  }) || [];
  
  // Handle toggle favorite
  const handleToggleFavorite = (symbol: string) => {
    const updatedFavorites = toggleFavorite(symbol);
    setFavoriteSymbols(new Set(updatedFavorites));
    
    if (updatedFavorites.includes(symbol)) {
      toast({
        title: "Added to Favorites",
        description: `${symbol} has been added to your favorites.`,
      });
    } else {
      toast({
        title: "Removed from Favorites",
        description: `${symbol} has been removed from your favorites.`,
      });
    }
  };
  
  // Get unique sectors from stocks
  const sectors = stocks ? [...new Set(stocks.map(stock => stock.sector))].sort() : [];
  
  // Handle filter change
  const handleFilterChange = (value: string) => {
    // Update URL params
    const params = new URLSearchParams(location.search);
    params.set("filter", value);
    navigate(`/stocks?${params.toString()}`);
    
    // Set sort based on filter value
    if (value === "gainers") {
      setSortBy("changePercent");
    } else if (value === "losers") {
      setSortBy("changePercent");
    } else if (value === "active") {
      setSortBy("volume");
    }
  };
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Stock Market</h1>
      
      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            placeholder="Search by symbol or name..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>
        
        <div className="w-full md:w-48">
          <Select value={sector} onValueChange={setSector}>
            <SelectTrigger>
              <SelectValue placeholder="Sector" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value="all">All Sectors</SelectItem>
                {sectors.map((sector) => (
                  <SelectItem key={sector} value={sector}>{sector}</SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        
        <div className="w-full md:w-auto">
          <Tabs defaultValue="all" onValueChange={handleFilterChange}>
            <TabsList>
              <TabsTrigger value="all">All</TabsTrigger>
              <TabsTrigger value="gainers">Gainers</TabsTrigger>
              <TabsTrigger value="losers">Losers</TabsTrigger>
              <TabsTrigger value="active">Most Active</TabsTrigger>
            </TabsList>
          </Tabs>
        </div>
      </div>
      
      {/* Table */}
      <div>
        {isLoading ? (
          <div className="h-96 flex items-center justify-center">
            <div className="text-center">
              <div className="w-8 h-8 border-4 border-t-financial-secondary border-gray-200 rounded-full animate-spin mx-auto mb-4"></div>
              <p>Loading stock data...</p>
            </div>
          </div>
        ) : filteredStocks.length > 0 ? (
          <StockTable 
            stocks={filteredStocks} 
            onToggleFavorite={handleToggleFavorite} 
            favoriteSymbols={favoriteSymbols}
          />
        ) : (
          <div className="text-center py-12 border rounded-md">
            <h3 className="font-medium text-lg">No stocks found</h3>
            <p className="text-gray-500">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}
