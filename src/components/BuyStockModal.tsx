
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { StockData } from "@/components/StockTable";
import { buyStock } from "@/lib/wallet";

export interface BuyStockProps {
  // Make some fields optional to match what StockDetail is passing
  symbol: string;
  name: string;
  price: number;
  change: number;
  changePercent: number;
  volume?: number;
  marketCap?: number;
  sector?: string;
}

interface BuyStockModalProps {
  stock: BuyStockProps;
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void; // Make this optional
}

const BuyStockModal = ({ stock, isOpen, onClose, onSuccess }: BuyStockModalProps) => {
  const [quantity, setQuantity] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const totalCost = stock.price * quantity;

  const handleBuy = () => {
    if (quantity <= 0) {
      toast({
        variant: "destructive",
        title: "Invalid quantity",
        description: "Please enter a positive quantity.",
      });
      return;
    }

    setIsSubmitting(true);
    
    // Use the buyStock function from wallet.ts
    const result = buyStock(
      stock.symbol,
      stock.name,
      quantity,
      stock.price
    );

    // Simulate API call to give feedback to user
    setTimeout(() => {
      if (result.success) {
        toast({
          title: "Stock purchased",
          description: `You have successfully purchased ${quantity} share${quantity > 1 ? 's' : ''} of ${stock.symbol} for $${totalCost.toFixed(2)}.`,
        });

        // Call onSuccess callback if provided
        if (onSuccess) {
          onSuccess();
        }
      } else {
        toast({
          variant: "destructive",
          title: "Purchase failed",
          description: result.message,
        });
      }

      setIsSubmitting(false);
      setQuantity(1);
      onClose();
    }, 1000);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Buy {stock.symbol} Stock</DialogTitle>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div className="grid grid-cols-2 items-center gap-4">
            <div>
              <p className="text-sm text-muted-foreground">Current Price</p>
              <p className="text-lg font-medium">${stock.price.toFixed(2)}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-muted-foreground">Change</p>
              <p className={`text-lg font-medium ${stock.change >= 0 ? "text-stock-gain" : "text-stock-loss"}`}>
                {stock.change >= 0 ? "+" : ""}
                {stock.changePercent.toFixed(2)}%
              </p>
            </div>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(parseInt(e.target.value) || 0)}
              className="col-span-3"
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mt-2">
            <div>
              <p className="text-sm text-muted-foreground">Total Cost</p>
              <p className="text-lg font-medium">${totalCost.toFixed(2)}</p>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isSubmitting}
          >
            Cancel
          </Button>
          <Button
            onClick={handleBuy}
            disabled={quantity <= 0 || isSubmitting}
            className="ml-2"
          >
            {isSubmitting ? "Processing..." : "Buy Stock"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BuyStockModal;
