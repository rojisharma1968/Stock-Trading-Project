
import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Heart, ArrowUpDown, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

export interface StockData {
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume: number;
  marketCap: number;
  sector: string;
}

interface StockTableProps {
  stocks: StockData[];
  onToggleFavorite: (symbol: string) => void;
  favoriteSymbols: Set<string>;
}

type SortField = 'symbol' | 'price' | 'change' | 'changePercent' | 'volume' | 'marketCap';
type SortDirection = 'asc' | 'desc';

export default function StockTable({ stocks, onToggleFavorite, favoriteSymbols }: StockTableProps) {
  const [sortField, setSortField] = useState<SortField>('marketCap');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };
  
  const sortedStocks = [...stocks].sort((a, b) => {
    const aValue = a[sortField];
    const bValue = b[sortField];
    
    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });
  
  const formatLargeNumber = (num: number): string => {
    if (num >= 1e12) return (num / 1e12).toFixed(2) + 'T';
    if (num >= 1e9) return (num / 1e9).toFixed(2) + 'B';
    if (num >= 1e6) return (num / 1e6).toFixed(2) + 'M';
    if (num >= 1e3) return (num / 1e3).toFixed(2) + 'K';
    return num.toString();
  };
  
  return (
    <div className="overflow-x-auto rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]"></TableHead>
            <TableHead>
              <Button 
                variant="ghost" 
                onClick={() => handleSort('symbol')}
                className="hover:bg-transparent p-0 h-auto font-medium flex items-center"
              >
                Symbol
                <ArrowUpDown className="ml-1 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>Name</TableHead>
            <TableHead>
              <Button 
                variant="ghost" 
                onClick={() => handleSort('price')}
                className="hover:bg-transparent p-0 h-auto font-medium flex items-center"
              >
                Price
                <ArrowUpDown className="ml-1 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button 
                variant="ghost" 
                onClick={() => handleSort('change')}
                className="hover:bg-transparent p-0 h-auto font-medium flex items-center"
              >
                Change
                <ArrowUpDown className="ml-1 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead>
              <Button 
                variant="ghost" 
                onClick={() => handleSort('changePercent')}
                className="hover:bg-transparent p-0 h-auto font-medium flex items-center"
              >
                % Change
                <ArrowUpDown className="ml-1 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead className="hidden md:table-cell">
              <Button 
                variant="ghost" 
                onClick={() => handleSort('volume')}
                className="hover:bg-transparent p-0 h-auto font-medium flex items-center"
              >
                Volume
                <ArrowUpDown className="ml-1 h-4 w-4" />
              </Button>
            </TableHead>
            <TableHead className="hidden md:table-cell">
              <Button 
                variant="ghost" 
                onClick={() => handleSort('marketCap')}
                className="hover:bg-transparent p-0 h-auto font-medium flex items-center"
              >
                Market Cap
                <ArrowUpDown className="ml-1 h-4 w-4" />
              </Button>
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {sortedStocks.map((stock) => {
            const isPositive = stock.change >= 0;
            const isFavorite = favoriteSymbols.has(stock.symbol);
            
            return (
              <TableRow key={stock.symbol} className="hover:bg-gray-50">
                <TableCell className="px-2">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="p-1 h-auto"
                    onClick={(e) => {
                      e.preventDefault();
                      onToggleFavorite(stock.symbol);
                    }}
                  >
                    <Heart 
                      className={cn(
                        "h-5 w-5", 
                        isFavorite ? "fill-red-500 text-red-500" : "text-gray-400"
                      )} 
                    />
                  </Button>
                </TableCell>
                <TableCell className="font-medium">
                  <Link to={`/stocks/${stock.symbol}`} className="hover:text-financial-secondary">
                    {stock.symbol}
                  </Link>
                </TableCell>
                <TableCell>
                  <div className="max-w-[200px] truncate">{stock.name}</div>
                </TableCell>
                <TableCell>${stock.price.toFixed(2)}</TableCell>
                <TableCell className={isPositive ? "text-stock-gain" : "text-stock-loss"}>
                  {isPositive ? "+" : ""}{stock.change.toFixed(2)}
                </TableCell>
                <TableCell className={isPositive ? "text-stock-gain" : "text-stock-loss"}>
                  <div className="flex items-center">
                    {isPositive ? (
                      <ChevronUp className="h-4 w-4 mr-1" />
                    ) : (
                      <ChevronDown className="h-4 w-4 mr-1" />
                    )}
                    {isPositive ? "+" : ""}{stock.changePercent.toFixed(2)}%
                  </div>
                </TableCell>
                <TableCell className="hidden md:table-cell">{formatLargeNumber(stock.volume)}</TableCell>
                <TableCell className="hidden md:table-cell">${formatLargeNumber(stock.marketCap)}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
}
