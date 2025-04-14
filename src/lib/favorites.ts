
// Utility functions to handle favorite stocks

// Save favorites to localStorage
export const saveFavorites = (symbols: string[]): void => {
  try {
    localStorage.setItem('favoriteStocks', JSON.stringify(symbols));
  } catch (error) {
    console.error('Error saving favorites:', error);
  }
};

// Get favorites from localStorage
export const getFavorites = (): string[] => {
  try {
    const favorites = localStorage.getItem('favoriteStocks');
    return favorites ? JSON.parse(favorites) : [];
  } catch (error) {
    console.error('Error getting favorites:', error);
    return [];
  }
};

// Add a stock to favorites
export const addFavorite = (symbol: string): string[] => {
  const currentFavorites = getFavorites();
  if (!currentFavorites.includes(symbol)) {
    const newFavorites = [...currentFavorites, symbol];
    saveFavorites(newFavorites);
    return newFavorites;
  }
  return currentFavorites;
};

// Remove a stock from favorites
export const removeFavorite = (symbol: string): string[] => {
  const currentFavorites = getFavorites();
  const newFavorites = currentFavorites.filter(s => s !== symbol);
  saveFavorites(newFavorites);
  return newFavorites;
};

// Toggle a stock in favorites
export const toggleFavorite = (symbol: string): string[] => {
  const currentFavorites = getFavorites();
  if (currentFavorites.includes(symbol)) {
    return removeFavorite(symbol);
  } else {
    return addFavorite(symbol);
  }
};
