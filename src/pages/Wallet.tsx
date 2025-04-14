import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from '@/components/ui/table';
import { Skeleton } from '@/components/ui/skeleton';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { StyledAreaChart } from '@/components/ui/chart';
import { 
  ArrowDown, 
  ArrowUp, 
  DollarSign, 
  Wallet as WalletIcon, 
  TrendingUp, 
  TrendingDown, 
  BarChart3,
  Briefcase
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';
import { getWallet, calculatePortfolioValue, initializeWallet, resetWallet, OwnedStock } from '@/lib/wallet';
import { fetchStocksBySymbols } from '@/lib/api';
import SellStockModal from '@/components/SellStockModal';
import BuyStockModal from '@/components/BuyStockModal';
import { StockData } from '@/components/StockTable';
import { cn } from '@/lib/utils';

interface TransactionChartData {
  date: string;
  value: number;
}

export default function WalletPage() {
  const [wallet, setWallet] = useState(initializeWallet());
  const [sellModalOpen, setSellModalOpen] = useState(false);
  const [buyModalOpen, setBuyModalOpen] = useState(false);
  const [selectedStock, setSelectedStock] = useState<OwnedStock & { currentPrice: number } | null>(null);
  const [buyStock, setBuyStock] = useState<StockData | null>(null);
  
  const { data: stocksData, isLoading, refetch } = useQuery({
    queryKey: ['walletStocks', wallet.ownedStocks.map(s => s.symbol)],
    queryFn: () => fetchStocksBySymbols(wallet.ownedStocks.map(s => s.symbol)),
    enabled: wallet.ownedStocks.length > 0,
  });
  
  useEffect(() => {
    const handleStorageChange = () => {
      setWallet(getWallet());
    };
    
    window.addEventListener('storage', handleStorageChange);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
  
  const portfolioData = (() => {
    if (!stocksData || !wallet.ownedStocks.length) {
      return {
        totalValue: 0,
        profitLoss: 0,
        profitLossPercentage: 0,
        stocks: []
      };
    }
    
    const currentPrices = stocksData.reduce((acc: Record<string, number>, stock) => {
      acc[stock.symbol] = stock.price;
      return acc;
    }, {});
    
    return calculatePortfolioValue(currentPrices);
  })();
  
  const transactionChartData: TransactionChartData[] = wallet.transactions.slice(-30).map((t) => ({
    date: new Date(t.timestamp).toLocaleDateString(),
    value: t.type === 'buy' ? -t.total : t.total
  }));
  
  const handleSellClick = (stock: OwnedStock & { currentPrice: number }) => {
    setSelectedStock(stock);
    setSellModalOpen(true);
  };

  const handleBuyClick = (stock: StockData) => {
    setBuyStock(stock);
    setBuyModalOpen(true);
  };

  const handleResetWallet = () => {
    if (confirm('Are you sure you want to reset your wallet? This will delete all your stocks and transactions.')) {
      resetWallet();
      setWallet(getWallet());
      toast({
        title: "Wallet reset",
        description: "Your wallet has been reset to the initial balance.",
      });
      refetch();
    }
  };
  
  const handleTransactionSuccess = () => {
    setWallet(getWallet());
    refetch();
  };

  const navigateToBuyTab = () => {
    const buyTab = document.querySelector('[data-state="inactive"][value="buy"]');
    if (buyTab && buyTab instanceof HTMLElement) {
      buyTab.click();
    }
  };

  const featuredStocks: StockData[] = [
    {
      symbol: 'AAPL',
      name: 'Apple Inc.',
      price: 187.32,
      change: 1.56,
      changePercent: 0.84,
      volume: 53621400,
      marketCap: 2920000000000,
      sector: 'Technology'
    },
    {
      symbol: 'MSFT',
      name: 'Microsoft Corporation',
      price: 402.56,
      change: 3.78,
      changePercent: 0.95,
      volume: 22456800,
      marketCap: 2990000000000,
      sector: 'Technology'
    },
    {
      symbol: 'GOOGL',
      name: 'Alphabet Inc.',
      price: 142.37,
      change: 0.89,
      changePercent: 0.63,
      volume: 18936700,
      marketCap: 1780000000000,
      sector: 'Communication Services'
    },
  ];
  
  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Investment Portfolio</h1>
          <p className="text-muted-foreground">Manage your virtual investment portfolio and track performance.</p>
        </div>
        <Button variant="outline" onClick={handleResetWallet} className="mt-2 md:mt-0">
          Reset Wallet
        </Button>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Available Balance
            </CardTitle>
            <WalletIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">${wallet.balance.toFixed(2)}</div>
            <p className="text-xs text-muted-foreground">
              Available funds for trading
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Portfolio Value
            </CardTitle>
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {isLoading ? (
                <Skeleton className="h-8 w-28" />
              ) : (
                `$${portfolioData.totalValue.toFixed(2)}`
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              Current value of all holdings
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Profit / Loss
            </CardTitle>
            {portfolioData.profitLoss >= 0 ? (
              <TrendingUp className="h-4 w-4 text-green-500" />
            ) : (
              <TrendingDown className="h-4 w-4 text-red-500" />
            )}
          </CardHeader>
          <CardContent>
            <div className={cn(
              "text-2xl font-bold",
              portfolioData.profitLoss >= 0 ? "text-green-500" : "text-red-500"
            )}>
              {isLoading ? (
                <Skeleton className="h-8 w-28" />
              ) : (
                `${portfolioData.profitLoss >= 0 ? '+' : ''}$${portfolioData.profitLoss.toFixed(2)}`
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              {isLoading ? (
                <Skeleton className="h-4 w-20" />
              ) : (
                `${portfolioData.profitLossPercentage >= 0 ? '+' : ''}${portfolioData.profitLossPercentage.toFixed(2)}% return`
              )}
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Value
            </CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${(wallet.balance + portfolioData.totalValue).toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              Cash + Portfolio Value
            </p>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="portfolio" className="space-y-4">
        <TabsList className="bg-gray-100 dark:bg-gray-800">
          <TabsTrigger value="portfolio">Portfolio</TabsTrigger>
          <TabsTrigger value="transactions">Transactions</TabsTrigger>
          <TabsTrigger value="buy">Buy Stocks</TabsTrigger>
        </TabsList>
        
        <TabsContent value="portfolio" className="space-y-4">
          <Card className="dark:bg-gray-900 dark:border-gray-800">
            <CardHeader>
              <CardTitle>Your Holdings</CardTitle>
              <CardDescription>
                Overview of all your current stock holdings and their performance
              </CardDescription>
            </CardHeader>
            <CardContent>
              {isLoading ? (
                <div className="space-y-3">
                  {[1, 2, 3].map((i) => (
                    <Skeleton className="h-12 w-full" key={i} />
                  ))}
                </div>
              ) : wallet.ownedStocks.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Symbol</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Avg. Buy Price</TableHead>
                      <TableHead>Current Price</TableHead>
                      <TableHead>Total Value</TableHead>
                      <TableHead>Profit/Loss</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {portfolioData.stocks.map((stock) => (
                      <TableRow key={stock.symbol}>
                        <TableCell className="font-medium">{stock.symbol}</TableCell>
                        <TableCell>{stock.name}</TableCell>
                        <TableCell>{stock.quantity}</TableCell>
                        <TableCell>${stock.avgBuyPrice.toFixed(2)}</TableCell>
                        <TableCell>${stock.currentPrice.toFixed(2)}</TableCell>
                        <TableCell>${stock.totalValue.toFixed(2)}</TableCell>
                        <TableCell className={stock.profitLoss >= 0 ? "text-green-500" : "text-red-500"}>
                          {stock.profitLoss >= 0 ? '+' : ''}${stock.profitLoss.toFixed(2)} 
                          <span className="text-xs ml-1">
                            ({stock.profitLossPercentage >= 0 ? '+' : ''}
                            {stock.profitLossPercentage.toFixed(2)}%)
                          </span>
                        </TableCell>
                        <TableCell>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleSellClick(stock)}
                          >
                            Sell
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="py-12 text-center">
                  <WalletIcon className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium">No stocks yet</h3>
                  <p className="text-sm text-gray-500 mt-2">You haven't purchased any stocks yet.</p>
                  <Button 
                    className="mt-4" 
                    variant="outline"
                    onClick={navigateToBuyTab}
                  >
                    Buy your first stock
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
          
          {portfolioData.stocks.length > 0 && (
            <Card className="dark:bg-gray-900 dark:border-gray-800 overflow-hidden">
              <CardHeader>
                <CardTitle>Portfolio Distribution</CardTitle>
                <CardDescription>Breakdown of your investments by stock</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <StyledAreaChart
                  data={portfolioData.stocks.map(s => ({
                    name: s.symbol,
                    value: s.totalValue
                  }))}
                  dataKey="Portfolio"
                  valueKey="value"
                  xAxisDataKey="name"
                  showGrid={true}
                  colors={{
                    stroke: "#8884d8",
                    fill: "url(#colorGradient)"
                  }}
                  tooltipFormatter={(value) => [`$${value.toFixed(2)}`, 'Value']}
                  tooltipLabelFormatter={(label) => `Stock: ${label}`}
                />
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="transactions" className="space-y-4">
          <Card className="dark:bg-gray-900 dark:border-gray-800">
            <CardHeader>
              <CardTitle>Recent Transactions</CardTitle>
              <CardDescription>History of your buy and sell activities</CardDescription>
            </CardHeader>
            <CardContent>
              {wallet.transactions.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Date</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Symbol</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Quantity</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Total</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {wallet.transactions.slice().reverse().map((transaction) => (
                      <TableRow key={transaction.id}>
                        <TableCell>
                          {new Date(transaction.timestamp).toLocaleDateString()}
                        </TableCell>
                        <TableCell>
                          <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${
                            transaction.type === 'buy' 
                              ? 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100' 
                              : 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100'
                          }`}>
                            {transaction.type === 'buy' ? (
                              <>
                                <ArrowDown className="mr-1 h-3 w-3" />
                                Buy
                              </>
                            ) : (
                              <>
                                <ArrowUp className="mr-1 h-3 w-3" />
                                Sell
                              </>
                            )}
                          </span>
                        </TableCell>
                        <TableCell className="font-medium">{transaction.symbol}</TableCell>
                        <TableCell>{transaction.name}</TableCell>
                        <TableCell>{transaction.quantity}</TableCell>
                        <TableCell>${transaction.price.toFixed(2)}</TableCell>
                        <TableCell>${transaction.total.toFixed(2)}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="py-12 text-center">
                  <BarChart3 className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                  <h3 className="text-lg font-medium">No transactions yet</h3>
                  <p className="text-sm text-gray-500 mt-2">Your transaction history will appear here.</p>
                </div>
              )}
            </CardContent>
          </Card>
          
          {wallet.transactions.length > 0 && (
            <Card className="dark:bg-gray-900 dark:border-gray-800 overflow-hidden">
              <CardHeader>
                <CardTitle>Transaction History</CardTitle>
                <CardDescription>Cash flow from your trading activities</CardDescription>
              </CardHeader>
              <CardContent className="h-80">
                <StyledAreaChart
                  data={transactionChartData}
                  dataKey="Transactions"
                  valueKey="value"
                  xAxisDataKey="date"
                  colors={{
                    stroke: "#8884d8",
                    fill: "url(#colorGradient)"
                  }}
                  tooltipFormatter={(value) => [`$${Math.abs(value).toFixed(2)}`, value >= 0 ? 'Sold' : 'Purchased']}
                />
              </CardContent>
            </Card>
          )}
        </TabsContent>
        
        <TabsContent value="buy" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Buy Stocks</CardTitle>
              <CardDescription>Purchase stocks to add to your portfolio</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {featuredStocks.map((stock) => (
                  <Card key={stock.symbol}>
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="font-bold">{stock.symbol}</h3>
                          <p className="text-sm text-muted-foreground">{stock.name}</p>
                        </div>
                        <div className={stock.change >= 0 ? "text-green-500" : "text-red-500"}>
                          ${stock.price.toFixed(2)}
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm">
                        <span className={stock.change >= 0 ? "text-green-500" : "text-red-500"}>
                          {stock.change >= 0 ? "+" : ""}{stock.change.toFixed(2)} ({stock.changePercent.toFixed(2)}%)
                        </span>
                        <Button size="sm" onClick={() => handleBuyClick(stock)}>
                          Buy Now
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
              
              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground">
                  Looking for more stocks? Check out the <a href="/stocks" className="text-primary underline">Stocks Page</a> to see all available stocks.
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
      
      {selectedStock && (
        <SellStockModal
          stock={selectedStock}
          isOpen={sellModalOpen}
          onClose={() => setSellModalOpen(false)}
          onSuccess={handleTransactionSuccess}
        />
      )}
      
      {buyStock && (
        <BuyStockModal
          stock={buyStock}
          isOpen={buyModalOpen}
          onClose={() => setBuyModalOpen(false)}
          onSuccess={handleTransactionSuccess}
        />
      )}
    </div>
  );
}
