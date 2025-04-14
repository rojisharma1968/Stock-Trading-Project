import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { 
  fetchStockDetails, 
  fetchHistoricalData,
  fetchNewsBySymbol 
} from "@/lib/api";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { StyledAreaChart } from "@/components/ui/chart";
import { Heart, ArrowLeft, Globe, Info, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";
import { getFavorites, toggleFavorite } from "@/lib/favorites";
import { useToast } from "@/components/ui/use-toast";
import { useAuth } from "@/lib/authContext";
import BuyStockModal from "@/components/BuyStockModal";

export default function StockDetail() {
  const { symbol = "" } = useParams<{ symbol: string }>();
  const [timeframe, setTimeframe] = useState<'day' | 'week' | 'month' | 'year'>('month');
  const [favoriteSymbols, setFavoriteSymbols] = useState<Set<string>>(new Set());
  const [buyModalOpen, setBuyModalOpen] = useState(false);
  const { toast } = useToast();
  const { isAuthenticated } = useAuth();
  
  useEffect(() => {
    const favorites = getFavorites();
    setFavoriteSymbols(new Set(favorites));
  }, []);
  
  const { data: stock, isLoading: loadingStock } = useQuery({
    queryKey: ['stockDetail', symbol],
    queryFn: () => fetchStockDetails(symbol)
  });
  
  const { data: historicalData, isLoading: loadingHistory } = useQuery({
    queryKey: ['historicalData', symbol, timeframe],
    queryFn: () => fetchHistoricalData(symbol, timeframe)
  });
  
  const { data: stockNews, isLoading: loadingNews } = useQuery({
    queryKey: ['stockNews', symbol],
    queryFn: () => fetchNewsBySymbol(symbol)
  });
  
  const handleToggleFavorite = () => {
    if (!stock) return;
    
    const updatedFavorites = toggleFavorite(stock.symbol);
    setFavoriteSymbols(new Set(updatedFavorites));
    
    if (updatedFavorites.includes(stock.symbol)) {
      toast({
        title: "Added to Favorites",
        description: `${stock.symbol} has been added to your favorites.`,
      });
    } else {
      toast({
        title: "Removed from Favorites",
        description: `${stock.symbol} has been removed from your favorites.`,
      });
    }
  };

  const handleBuyClick = () => {
    if (isAuthenticated) {
      setBuyModalOpen(true);
    } else {
      toast({
        title: "Authentication Required",
        description: "Please log in to buy stocks.",
        variant: "destructive",
      });
    }
  };
  
  const formatLargeNumber = (num: number): string => {
    if (num >= 1e12) return (num / 1e12).toFixed(2) + 'T';
    if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(2) + 'K';
    return num.toString();
  };
  
  const isPositive = stock && stock.change >= 0;
  const isFavorite = stock && favoriteSymbols.has(stock.symbol);
  
  if (loadingStock) {
    return (
      <div className="h-96 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-t-financial-secondary border-gray-200 rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading stock data...</p>
        </div>
      </div>
    );
  }
  
  if (!stock) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold mb-4">Stock Not Found</h2>
        <p className="mb-6">We couldn't find the stock with symbol: {symbol}</p>
        <Link to="/stocks">
          <Button>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Stocks
          </Button>
        </Link>
      </div>
    );
  }
  
  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center">
          <Link to="/stocks" className="mr-4">
            <Button variant="outline" size="sm">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back
            </Button>
          </Link>
          <div>
            <h1 className="text-2xl font-bold flex items-center">
              {stock.symbol}
              <Button
                variant="ghost"
                size="sm"
                className="ml-2 p-1 h-auto"
                onClick={handleToggleFavorite}
              >
                <Heart
                  className={cn(
                    "h-5 w-5",
                    isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"
                  )}
                />
              </Button>
            </h1>
            <p className="text-lg text-muted-foreground">{stock.name}</p>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-3xl font-bold">${stock.price.toFixed(2)}</div>
          <div
            className={cn(
              "text-lg font-medium flex items-center justify-end",
              isPositive ? "text-stock-gain" : "text-stock-loss"
            )}
          >
            {isPositive ? "+" : ""}
            {stock.change.toFixed(2)} ({isPositive ? "+" : ""})
            {stock.changePercent.toFixed(2)}%
          </div>
        </div>
      </div>
      
      <div className="flex justify-end">
        {isAuthenticated ? (
          <Button 
            onClick={handleBuyClick}
            className="flex items-center gap-2"
          >
            <ShoppingCart className="h-4 w-4" />
            Buy Stock
          </Button>
        ) : (
          <Button 
            variant="outline" 
            disabled 
            className="flex items-center gap-2 opacity-70"
          >
            <ShoppingCart className="h-4 w-4" />
            Login to Buy
          </Button>
        )}
      </div>
      
      <Card className="dark:bg-gray-900 dark:border-gray-800 overflow-hidden">
        <CardHeader className="pb-2">
          <CardTitle className="flex justify-between items-center">
            <span>Price History</span>
            <Tabs defaultValue="month" value={timeframe} onValueChange={(value) => setTimeframe(value as any)} className="mr-0">
              <TabsList className="bg-gray-100 dark:bg-gray-800">
                <TabsTrigger value="day">1D</TabsTrigger>
                <TabsTrigger value="week">1W</TabsTrigger>
                <TabsTrigger value="month">1M</TabsTrigger>
                <TabsTrigger value="year">1Y</TabsTrigger>
              </TabsList>
            </Tabs>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-[400px]">
            {loadingHistory ? (
              <div className="h-full flex items-center justify-center">
                <div className="text-center">
                  <div className="w-8 h-8 border-4 border-t-financial-secondary border-gray-200 rounded-full animate-spin mx-auto mb-4"></div>
                  <p>Loading chart data...</p>
                </div>
              </div>
            ) : (
              <StyledAreaChart 
                data={historicalData}
                dataKey={stock.symbol}
                valueKey="price"
                height={400}
                colors={{
                  stroke: isPositive ? "#10b981" : "#ef4444",
                  fill: "url(#colorGradient)"
                }}
                tooltipLabelFormatter={(label) => `Date: ${label}`}
              />
            )}
          </div>
        </CardContent>
      </Card>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Price Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Open</p>
                <p className="font-medium">${stock.open.toFixed(2)}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Close</p>
                <p className="font-medium">${stock.close.toFixed(2)}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500">High</p>
                <p className="font-medium">${stock.high.toFixed(2)}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Low</p>
                <p className="font-medium">${stock.low.toFixed(2)}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Day Range</p>
                <p className="font-medium">{stock.dayRange}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500">52-Week Range</p>
                <p className="font-medium">{stock.yearRange}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Volume</p>
                <p className="font-medium">{formatLargeNumber(stock.volume)}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Avg. Volume</p>
                <p className="font-medium">{formatLargeNumber(stock.avgVolume)}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Key Statistics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Market Cap</p>
                <p className="font-medium">${formatLargeNumber(stock.marketCap)}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500">P/E Ratio</p>
                <p className="font-medium">{stock.pe.toFixed(2)}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500">EPS</p>
                <p className="font-medium">${stock.eps.toFixed(2)}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Dividend</p>
                <p className="font-medium">${stock.dividend.toFixed(2)}</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Dividend Yield</p>
                <p className="font-medium">{stock.dividendYield.toFixed(2)}%</p>
              </div>
              <div className="space-y-1">
                <p className="text-sm text-gray-500">Exchange</p>
                <p className="font-medium">{stock.exchange}</p>
              </div>
              <div className="space-y-1 col-span-2">
                <p className="text-sm text-gray-500">Sector / Industry</p>
                <p className="font-medium">{stock.sector} / {stock.industry}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Card>
        <CardHeader>
          <CardTitle>Company Overview</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-gray-700 dark:text-gray-300">{stock.description}</p>
          
          <Separator />
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <div className="flex items-center">
                <Globe className="h-4 w-4 mr-2 text-gray-500" />
                <p className="text-sm text-gray-500">Website</p>
              </div>
              <a 
                href={stock.website} 
                target="_blank"
                rel="noopener noreferrer"
                className="font-medium text-financial-secondary hover:underline"
              >
                {stock.website.replace(/^https?:\/\//, '')}
              </a>
            </div>
            <div className="space-y-1">
              <div className="flex items-center">
                <Info className="h-4 w-4 mr-2 text-gray-500" />
                <p className="text-sm text-gray-500">CEO</p>
              </div>
              <p className="font-medium">{stock.ceo}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Employees</p>
              <p className="font-medium">{stock.employees.toLocaleString()}</p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-500">Founded</p>
              <p className="font-medium">{stock.founded}</p>
            </div>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader>
          <CardTitle>Related News</CardTitle>
        </CardHeader>
        <CardContent>
          {loadingNews ? (
            <div className="flex flex-col gap-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex gap-4">
                  <div className="h-24 w-24 skeleton rounded" />
                  <div className="flex-1">
                    <div className="h-5 w-3/4 skeleton mb-2" />
                    <div className="h-4 w-1/4 skeleton mb-4" />
                    <div className="h-4 w-full skeleton mb-1" />
                    <div className="h-4 w-2/3 skeleton" />
                  </div>
                </div>
              ))}
            </div>
          ) : stockNews && stockNews.length > 0 ? (
            <div className="space-y-6">
              {stockNews.map((news) => (
                <div key={news.id} className="flex gap-4">
                  <div className="h-24 w-24 md:h-32 md:w-32 bg-gray-100 flex-shrink-0 rounded overflow-hidden">
                    <img
                      src={news.image}
                      alt={news.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-1">{news.title}</h3>
                    <p className="text-sm text-gray-500 mb-2">
                      {news.source} • {new Date(news.date).toLocaleDateString()}
                    </p>
                    <p className="text-sm line-clamp-2 md:line-clamp-3 dark:text-gray-300">
                      {news.summary}
                    </p>
                    <div className="mt-2">
                      <a
                        href={news.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-financial-secondary hover:underline text-sm font-medium"
                      >
                        Read full article
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <p>No news available for {stock.symbol}</p>
            </div>
          )}
        </CardContent>
      </Card>
      
      {stock && (
        <BuyStockModal
          stock={{
            symbol: stock.symbol,
            name: stock.name,
            price: stock.price,
            change: stock.change,
            changePercent: stock.changePercent
          }}
          isOpen={buyModalOpen}
          onClose={() => setBuyModalOpen(false)}
        />
      )}
    </div>
  );
}
