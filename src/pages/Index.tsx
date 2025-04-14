
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import MarketOverview from "@/components/MarketOverview";
import StockCard from "@/components/StockCard";
import StockCardSkeleton from "@/components/StockCardSkeleton";
import { useQuery } from "@tanstack/react-query";
import { fetchTopGainers, fetchTopLosers, fetchMarketIndices, MarketIndex } from "@/lib/api";
import { TrendingUp, TrendingDown, BarChart2, PieChart, LineChart } from "lucide-react";

export default function Index() {
  // Fetch top gainers
  const { 
    data: gainers = [], 
    isLoading: loadingGainers 
  } = useQuery({
    queryKey: ['topGainers'],
    queryFn: () => fetchTopGainers()
  });
  
  // Fetch top losers
  const { 
    data: losers = [], 
    isLoading: loadingLosers 
  } = useQuery({
    queryKey: ['topLosers'],
    queryFn: () => fetchTopLosers()
  });
  
  // Fetch market indices
  const { 
    data: marketIndices = [],
    isLoading: loadingMarketIndices
  } = useQuery({
    queryKey: ['marketIndices'],
    queryFn: () => fetchMarketIndices()
  });
  
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="py-10 md:py-16 rounded-lg bg-gradient-to-r from-primary/5 to-secondary/5 dark:from-primary/10 dark:to-secondary/10 mb-8">
        <div className="container px-4 mx-auto text-center">
          <div className="max-w-3xl mx-auto mb-8">
            <BarChart2 className="h-16 w-16 mx-auto text-financial-secondary mb-6" />
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Welcome to EquityWatch</h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              Your ultimate tool for tracking stocks, analyzing market trends, and making informed investment decisions.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/stocks">
              <Button size="lg" className="flex gap-2">
                <PieChart className="h-5 w-5" />
                Explore Stocks
              </Button>
            </Link>
            <Link to="/news">
              <Button size="lg" variant="outline" className="flex gap-2 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:hover:text-white">
                <LineChart className="h-5 w-5" />
                Market News
              </Button>
            </Link>
          </div>
        </div>
      </section>
      
      {/* Market Overview */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Market Overview</h2>
        <MarketOverview indices={marketIndices} isLoading={loadingMarketIndices} />
      </section>

      {/* Top Gainers & Losers - Responsive Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-8">
        {/* Top Gainers */}
        <section className="w-full">
          <div className="flex items-center mb-4">
            <TrendingUp className="h-5 w-5 text-stock-gain mr-2" />
            <h2 className="text-2xl font-bold">Top Gainers</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-4">
            {loadingGainers ? 
              Array(3).fill(0).map((_, i) => <StockCardSkeleton key={i} />) : 
              gainers.slice(0, 3).map(stock => (
                <StockCard 
                  key={stock.symbol}
                  symbol={stock.symbol}
                  name={stock.name}
                  price={stock.price}
                  change={stock.change}
                  changePercent={stock.changePercent}
                />
              ))
            }
          </div>
          
          <div className="mt-4">
            <Link to="/stocks">
              <Button variant="outline" size="sm" className="dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:hover:text-white">
                View All Stocks
              </Button>
            </Link>
          </div>
        </section>
        
        {/* Top Losers */}
        <section className="w-full">
          <div className="flex items-center mb-4">
            <TrendingDown className="h-5 w-5 text-stock-loss mr-2" />
            <h2 className="text-2xl font-bold">Top Losers</h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-1 xl:grid-cols-1 gap-4">
            {loadingLosers ? 
              Array(3).fill(0).map((_, i) => <StockCardSkeleton key={i} />) : 
              losers.slice(0, 3).map(stock => (
                <StockCard 
                  key={stock.symbol}
                  symbol={stock.symbol}
                  name={stock.name}
                  price={stock.price}
                  change={stock.change}
                  changePercent={stock.changePercent}
                />
              ))
            }
          </div>
          
          <div className="mt-4">
            <Link to="/stocks">
              <Button variant="outline" size="sm" className="dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:hover:text-white">
                View All Stocks
              </Button>
            </Link>
          </div>
        </section>
      </div>
      
      {/* Features Section */}
      <section className="py-12 my-8">
        <h2 className="text-2xl font-bold mb-8 text-center">Features</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="transition-all hover:shadow-lg dark:hover:border-gray-600">
            <CardContent className="pt-6">
              <div className="rounded-full bg-financial-secondary/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                <BarChart2 className="h-6 w-6 text-financial-secondary" />
              </div>
              <h3 className="text-lg font-bold mb-2">Real-time Stock Data</h3>
              <p className="text-muted-foreground">
                Track your favorite stocks with real-time price updates and market data.
              </p>
            </CardContent>
          </Card>
          
          <Card className="transition-all hover:shadow-lg dark:hover:border-gray-600">
            <CardContent className="pt-6">
              <div className="rounded-full bg-financial-secondary/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                <LineChart className="h-6 w-6 text-financial-secondary" />
              </div>
              <h3 className="text-lg font-bold mb-2">Advanced Charts</h3>
              <p className="text-muted-foreground">
                Analyze stock performance with interactive charts and various timeframes.
              </p>
            </CardContent>
          </Card>
          
          <Card className="transition-all hover:shadow-lg dark:hover:border-gray-600">
            <CardContent className="pt-6">
              <div className="rounded-full bg-financial-secondary/10 p-3 w-12 h-12 flex items-center justify-center mb-4">
                <PieChart className="h-6 w-6 text-financial-secondary" />
              </div>
              <h3 className="text-lg font-bold mb-2">Portfolio Tracking</h3>
              <p className="text-muted-foreground">
                Create and manage watchlists to monitor your investment portfolios.
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="rounded-lg bg-primary/5 dark:bg-primary/10 p-8 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to start investing?</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Create an account to unlock all features including portfolio tracking, customized watchlists, and real-time alerts.
        </p>
        <Link to="/login">
          <Button size="lg" className="dark:hover:bg-opacity-90">Get Started</Button>
        </Link>
      </section>
    </div>
  );
}
