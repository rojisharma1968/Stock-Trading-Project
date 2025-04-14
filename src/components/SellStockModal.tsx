
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from '@/components/ui/use-toast';
import { sellStock, OwnedStock } from '@/lib/wallet';

interface SellStockModalProps {
  stock: OwnedStock & {
    currentPrice: number;
  };
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
}

export default function SellStockModal({ stock, isOpen, onClose, onSuccess }: SellStockModalProps) {
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  
  const totalValue = quantity * stock.currentPrice;
  
  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setQuantity(isNaN(value) || value < 1 || value > stock.quantity ? 1 : value);
  };
  
  const handleSell = () => {
    setIsLoading(true);
    
    try {
      const result = sellStock(stock.symbol, stock.name, quantity, stock.currentPrice);
      
      if (result.success) {
        toast({
          title: "Sale successful",
          description: result.message,
        });
        if (onSuccess) onSuccess();
        onClose();
      } else {
        toast({
          title: "Sale failed",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Sell {stock.symbol} - {stock.name}</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-4 items-center gap-2">
            <Label htmlFor="shares-owned" className="text-right">
              Shares Owned
            </Label>
            <div className="col-span-3">
              <Input
                id="shares-owned"
                value={stock.quantity}
                disabled
              />
            </div>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-2">
            <Label htmlFor="current-price" className="text-right">
              Current Price
            </Label>
            <div className="col-span-3">
              <Input
                id="current-price"
                value={`$${stock.currentPrice.toFixed(2)}`}
                disabled
              />
            </div>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-2">
            <Label htmlFor="quantity" className="text-right">
              Quantity to Sell
            </Label>
            <div className="col-span-3">
              <Input
                id="quantity"
                type="number"
                min="1"
                max={stock.quantity}
                value={quantity}
                onChange={handleQuantityChange}
              />
            </div>
          </div>
          
          <div className="grid grid-cols-4 items-center gap-2">
            <Label htmlFor="total-value" className="text-right">
              Total Value
            </Label>
            <div className="col-span-3">
              <Input
                id="total-value"
                value={`$${totalValue.toFixed(2)}`}
                disabled
              />
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Cancel
          </Button>
          <Button onClick={handleSell} disabled={isLoading}>
            {isLoading ? 'Processing...' : 'Sell Now'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
