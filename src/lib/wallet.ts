
// Types for wallet functionality
export interface WalletState {
  balance: number;
  ownedStocks: OwnedStock[];
  transactions: Transaction[];
}

export interface OwnedStock {
  symbol: string;
  name: string;
  quantity: number;
  avgBuyPrice: number;
}

export interface Transaction {
  id: string;
  symbol: string;
  name: string;
  type: 'buy' | 'sell';
  quantity: number;
  price: number;
  total: number;
  timestamp: string;
}

// Initial wallet balance
const INITIAL_BALANCE = 10000;

// Initialize wallet in localStorage if it doesn't exist
export const initializeWallet = (): WalletState => {
  const savedWallet = localStorage.getItem('wallet');
  
  if (savedWallet) {
    return JSON.parse(savedWallet);
  }
  
  const initialWallet: WalletState = {
    balance: INITIAL_BALANCE,
    ownedStocks: [],
    transactions: []
  };
  
  localStorage.setItem('wallet', JSON.stringify(initialWallet));
  return initialWallet;
};

// Get current wallet state
export const getWallet = (): WalletState => {
  return initializeWallet();
};

// Save wallet state to localStorage
export const saveWallet = (wallet: WalletState): void => {
  localStorage.setItem('wallet', JSON.stringify(wallet));
};

// Buy stock
export const buyStock = (
  symbol: string,
  name: string,
  quantity: number,
  currentPrice: number
): { success: boolean; message: string } => {
  const wallet = getWallet();
  const totalCost = quantity * currentPrice;
  
  // Check if user has enough balance
  if (wallet.balance < totalCost) {
    return { success: false, message: 'Insufficient funds' };
  }
  
  // Find if user already owns this stock
  const existingStockIndex = wallet.ownedStocks.findIndex(stock => stock.symbol === symbol);
  
  if (existingStockIndex !== -1) {
    // Update existing stock
    const existingStock = wallet.ownedStocks[existingStockIndex];
    const totalShares = existingStock.quantity + quantity;
    const totalInvestment = existingStock.quantity * existingStock.avgBuyPrice + totalCost;
    
    wallet.ownedStocks[existingStockIndex] = {
      ...existingStock,
      quantity: totalShares,
      avgBuyPrice: totalInvestment / totalShares
    };
  } else {
    // Add new stock
    wallet.ownedStocks.push({
      symbol,
      name,
      quantity,
      avgBuyPrice: currentPrice
    });
  }
  
  // Deduct from balance
  wallet.balance -= totalCost;
  
  // Record transaction
  wallet.transactions.push({
    id: Date.now().toString(),
    symbol,
    name,
    type: 'buy',
    quantity,
    price: currentPrice,
    total: totalCost,
    timestamp: new Date().toISOString()
  });
  
  // Save updated wallet
  saveWallet(wallet);
  
  return { success: true, message: `Successfully bought ${quantity} shares of ${symbol}` };
};

// Sell stock
export const sellStock = (
  symbol: string,
  name: string,
  quantity: number,
  currentPrice: number
): { success: boolean; message: string } => {
  const wallet = getWallet();
  
  // Find if user owns this stock
  const existingStockIndex = wallet.ownedStocks.findIndex(stock => stock.symbol === symbol);
  
  if (existingStockIndex === -1) {
    return { success: false, message: `You don't own any shares of ${symbol}` };
  }
  
  const existingStock = wallet.ownedStocks[existingStockIndex];
  
  if (existingStock.quantity < quantity) {
    return { success: false, message: `You only have ${existingStock.quantity} shares of ${symbol}` };
  }
  
  const saleAmount = quantity * currentPrice;
  
  // Update or remove stock
  if (existingStock.quantity === quantity) {
    // Remove stock completely
    wallet.ownedStocks.splice(existingStockIndex, 1);
  } else {
    // Update quantity
    wallet.ownedStocks[existingStockIndex] = {
      ...existingStock,
      quantity: existingStock.quantity - quantity
    };
  }
  
  // Add to balance
  wallet.balance += saleAmount;
  
  // Record transaction
  wallet.transactions.push({
    id: Date.now().toString(),
    symbol,
    name,
    type: 'sell',
    quantity,
    price: currentPrice,
    total: saleAmount,
    timestamp: new Date().toISOString()
  });
  
  // Save updated wallet
  saveWallet(wallet);
  
  return { success: true, message: `Successfully sold ${quantity} shares of ${symbol}` };
};

// Calculate portfolio value (needs current stock prices)
export const calculatePortfolioValue = (
  currentPrices: Record<string, number>
): { 
  totalValue: number; 
  profitLoss: number;
  profitLossPercentage: number;
  stocks: Array<{
    symbol: string;
    name: string;
    quantity: number;
    avgBuyPrice: number;
    currentPrice: number;
    totalValue: number;
    profitLoss: number;
    profitLossPercentage: number;
  }>;
} => {
  const wallet = getWallet();
  let totalValue = 0;
  let totalInvestment = 0;
  
  const stocks = wallet.ownedStocks.map(stock => {
    const currentPrice = currentPrices[stock.symbol] || stock.avgBuyPrice;
    const stockValue = stock.quantity * currentPrice;
    const stockCost = stock.quantity * stock.avgBuyPrice;
    const profitLoss = stockValue - stockCost;
    const profitLossPercentage = stockCost > 0 ? (profitLoss / stockCost) * 100 : 0;
    
    totalValue += stockValue;
    totalInvestment += stockCost;
    
    return {
      ...stock,
      currentPrice,
      totalValue: stockValue,
      profitLoss,
      profitLossPercentage
    };
  });
  
  const profitLoss = totalValue - totalInvestment;
  const profitLossPercentage = totalInvestment > 0 ? (profitLoss / totalInvestment) * 100 : 0;
  
  return {
    totalValue,
    profitLoss,
    profitLossPercentage,
    stocks
  };
};

// Reset wallet (for testing)
export const resetWallet = (): void => {
  const initialWallet: WalletState = {
    balance: INITIAL_BALANCE,
    ownedStocks: [],
    transactions: []
  };
  
  localStorage.setItem('wallet', JSON.stringify(initialWallet));
};
