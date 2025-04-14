import { StockData } from "@/components/StockTable";

// Mock data for the application
// In a real app, these would be fetched from a stock market API

export interface DetailedStockData extends StockData {
  open: number;
  high: number;
  low: number;
  close: number;
  pe: number;
  eps: number;
  dividend: number;
  dividendYield: number;
  dayRange: string;
  yearRange: string;
  avgVolume: number;
  description: string;
  website: string;
  exchange: string;
  industry: string;
  ceo: string;
  employees: number;
  founded: string;
}

export interface NewsItem {
  id: string;
  title: string;
  summary: string;
  image: string;
  url: string;
  source: string;
  date: string;
  symbols: string[];
}

export interface MarketIndex {
  name: string;
  value: number;
  change: number;
  changePercent: number;
}

// Sample stock data
const sampleStocks: DetailedStockData[] = [
  {
    symbol: "AAPL",
    name: "Apple Inc.",
    price: 187.32,
    change: 1.56,
    changePercent: 0.84,
    volume: 53621400,
    marketCap: 2920000000000,
    open: 186.05,
    high: 187.65,
    low: 184.82,
    close: 187.32,
    pe: 30.14,
    eps: 6.21,
    dividend: 0.96,
    dividendYield: 0.51,
    dayRange: "184.82 - 187.65",
    yearRange: "124.17 - 198.23",
    avgVolume: 58936500,
    sector: "Technology",
    description: "Apple Inc. designs, manufactures, and markets smartphones, personal computers, tablets, wearables, and accessories worldwide.",
    website: "https://www.apple.com",
    exchange: "NASDAQ",
    industry: "Consumer Electronics",
    ceo: "Tim Cook",
    employees: 164000,
    founded: "1976"
  },
  {
    symbol: "MSFT",
    name: "Microsoft Corporation",
    price: 402.56,
    change: 3.78,
    changePercent: 0.95,
    volume: 22456800,
    marketCap: 2990000000000,
    open: 399.01,
    high: 403.15,
    low: 398.22,
    close: 402.56,
    pe: 34.8,
    eps: 11.57,
    dividend: 3.00,
    dividendYield: 0.75,
    dayRange: "398.22 - 403.15",
    yearRange: "310.48 - 420.81",
    avgVolume: 24152300,
    sector: "Technology",
    description: "Microsoft Corporation develops, licenses, and supports software, services, devices, and solutions worldwide.",
    website: "https://www.microsoft.com",
    exchange: "NASDAQ",
    industry: "Software—Infrastructure",
    ceo: "Satya Nadella",
    employees: 221000,
    founded: "1975"
  },
  {
    symbol: "AMZN",
    name: "Amazon.com, Inc.",
    price: 178.12,
    change: -0.45,
    changePercent: -0.25,
    volume: 31254200,
    marketCap: 1840000000000,
    open: 179.05,
    high: 180.13,
    low: 177.80,
    close: 178.12,
    pe: 60.31,
    eps: 2.95,
    dividend: 0,
    dividendYield: 0,
    dayRange: "177.80 - 180.13",
    yearRange: "118.35 - 188.55",
    avgVolume: 35426100,
    sector: "Consumer Cyclical",
    description: "Amazon.com, Inc. engages in the retail sale of consumer products and subscriptions in North America and internationally.",
    website: "https://www.amazon.com",
    exchange: "NASDAQ",
    industry: "Internet Retail",
    ceo: "Andy Jassy",
    employees: 1541000,
    founded: "1994"
  },
  {
    symbol: "GOOGL",
    name: "Alphabet Inc.",
    price: 142.37,
    change: 0.89,
    changePercent: 0.63,
    volume: 18936700,
    marketCap: 1780000000000,
    open: 141.50,
    high: 143.20,
    low: 141.12,
    close: 142.37,
    pe: 24.54,
    eps: 5.80,
    dividend: 0,
    dividendYield: 0,
    dayRange: "141.12 - 143.20",
    yearRange: "120.21 - 155.02",
    avgVolume: 22568900,
    sector: "Communication Services",
    description: "Alphabet Inc. provides various products and platforms in the United States, Europe, the Middle East, Africa, the Asia-Pacific, Canada, and Latin America.",
    website: "https://www.abc.xyz",
    exchange: "NASDAQ",
    industry: "Internet Content & Information",
    ceo: "Sundar Pichai",
    employees: 156500,
    founded: "1998"
  },
  {
    symbol: "TSLA",
    name: "Tesla, Inc.",
    price: 172.63,
    change: -2.35,
    changePercent: -1.34,
    volume: 41526800,
    marketCap: 549290000000,
    open: 174.50,
    high: 175.89,
    low: 172.05,
    close: 172.63,
    pe: 49.75,
    eps: 3.47,
    dividend: 0,
    dividendYield: 0,
    dayRange: "172.05 - 175.89",
    yearRange: "138.80 - 299.29",
    avgVolume: 52641300,
    sector: "Consumer Cyclical",
    description: "Tesla, Inc. designs, develops, manufactures, leases, and sells electric vehicles, and energy generation and storage systems.",
    website: "https://www.tesla.com",
    exchange: "NASDAQ",
    industry: "Auto Manufacturers",
    ceo: "Elon Musk",
    employees: 127855,
    founded: "2003"
  },
  {
    symbol: "META",
    name: "Meta Platforms, Inc.",
    price: 520.46,
    change: 5.28,
    changePercent: 1.02,
    volume: 12456300,
    marketCap: 1330000000000,
    open: 515.10,
    high: 522.58,
    low: 514.02,
    close: 520.46,
    pe: 27.85,
    eps: 18.69,
    dividend: 0,
    dividendYield: 0,
    dayRange: "514.02 - 522.58",
    yearRange: "274.38 - 531.49",
    avgVolume: 14563200,
    sector: "Communication Services",
    description: "Meta Platforms, Inc. develops products that enable people to connect and share with friends and family through mobile devices, personal computers, virtual reality headsets, and wearables worldwide.",
    website: "https://www.meta.com",
    exchange: "NASDAQ",
    industry: "Internet Content & Information",
    ceo: "Mark Zuckerberg",
    employees: 86482,
    founded: "2004"
  },
  {
    symbol: "JPM",
    name: "JPMorgan Chase & Co.",
    price: 199.75,
    change: 1.23,
    changePercent: 0.62,
    volume: 7896500,
    marketCap: 573580000000,
    open: 198.65,
    high: 200.13,
    low: 198.05,
    close: 199.75,
    pe: 12.05,
    eps: 16.58,
    dividend: 4.20,
    dividendYield: 2.10,
    dayRange: "198.05 - 200.13",
    yearRange: "135.16 - 205.76",
    avgVolume: 9125600,
    sector: "Financial Services",
    description: "JPMorgan Chase & Co. operates as a financial services company worldwide.",
    website: "https://www.jpmorganchase.com",
    exchange: "NYSE",
    industry: "Banks—Diversified",
    ceo: "Jamie Dimon",
    employees: 293723,
    founded: "1968"
  },
  {
    symbol: "JNJ",
    name: "Johnson & Johnson",
    price: 154.89,
    change: -0.35,
    changePercent: -0.23,
    volume: 6547800,
    marketCap: 372900000000,
    open: 155.10,
    high: 155.76,
    low: 154.35,
    close: 154.89,
    pe: 25.87,
    eps: 5.99,
    dividend: 4.76,
    dividendYield: 3.07,
    dayRange: "154.35 - 155.76",
    yearRange: "144.95 - 175.97",
    avgVolume: 7658900,
    sector: "Healthcare",
    description: "Johnson & Johnson researches, develops, manufactures, and sells various products in the healthcare field worldwide.",
    website: "https://www.jnj.com",
    exchange: "NYSE",
    industry: "Drug Manufacturers—General",
    ceo: "Joaquin Duato",
    employees: 152700,
    founded: "1886"
  },
  {
    symbol: "V",
    name: "Visa Inc.",
    price: 275.42,
    change: 2.15,
    changePercent: 0.79,
    volume: 5423900,
    marketCap: 561800000000,
    open: 273.50,
    high: 276.10,
    low: 272.89,
    close: 275.42,
    pe: 30.94,
    eps: 8.90,
    dividend: 2.08,
    dividendYield: 0.76,
    dayRange: "272.89 - 276.10",
    yearRange: "227.15 - 290.96",
    avgVolume: 7124600,
    sector: "Financial Services",
    description: "Visa Inc. operates as a payments technology company worldwide.",
    website: "https://www.visa.com",
    exchange: "NYSE",
    industry: "Credit Services",
    ceo: "Ryan McInerney",
    employees: 29900,
    founded: "1958"
  },
  {
    symbol: "PG",
    name: "Procter & Gamble",
    price: 162.83,
    change: 0.57,
    changePercent: 0.35,
    volume: 4856700,
    marketCap: 383700000000,
    open: 162.30,
    high: 163.15,
    low: 161.98,
    close: 162.83,
    pe: 26.78,
    eps: 6.08,
    dividend: 4.08,
    dividendYield: 2.51,
    dayRange: "161.98 - 163.15",
    yearRange: "141.45 - 169.02",
    avgVolume: 6547800,
    sector: "Consumer Defensive",
    description: "The Procter & Gamble Company provides branded consumer packaged goods worldwide.",
    website: "https://www.pg.com",
    exchange: "NYSE",
    industry: "Household & Personal Products",
    ceo: "Jon R. Moeller",
    employees: 106000,
    founded: "1837"
  },
  {
    symbol: "UNH",
    name: "UnitedHealth Group",
    price: 542.76,
    change: -1.28,
    changePercent: -0.24,
    volume: 2458900,
    marketCap: 503400000000,
    open: 544.10,
    high: 545.30,
    low: 541.25,
    close: 542.76,
    pe: 25.36,
    eps: 21.40,
    dividend: 7.52,
    dividendYield: 1.39,
    dayRange: "541.25 - 545.30",
    yearRange: "436.38 - 554.70",
    avgVolume: 3654700,
    sector: "Healthcare",
    description: "UnitedHealth Group Incorporated operates as a diversified health care company in the United States.",
    website: "https://www.unitedhealthgroup.com",
    exchange: "NYSE",
    industry: "Healthcare Plans",
    ceo: "Andrew Witty",
    employees: 400000,
    founded: "1977"
  },
  {
    symbol: "NVDA",
    name: "NVIDIA Corporation",
    price: 947.89,
    change: 22.34,
    changePercent: 2.41,
    volume: 42156800,
    marketCap: 2340000000000,
    open: 929.45,
    high: 952.30,
    low: 925.10,
    close: 947.89,
    pe: 88.25,
    eps: 10.74,
    dividend: 0.64,
    dividendYield: 0.07,
    dayRange: "925.10 - 952.30",
    yearRange: "280.12 - 987.54",
    avgVolume: 45621300,
    sector: "Technology",
    description: "NVIDIA Corporation provides graphics, computing, and networking solutions worldwide.",
    website: "https://www.nvidia.com",
    exchange: "NASDAQ",
    industry: "Semiconductors",
    ceo: "Jensen Huang",
    employees: 26196,
    founded: "1993"
  }
];

// Sample news data
const sampleNews: NewsItem[] = [
  {
    id: "1",
    title: "Apple Announces New MacBook Pro with M3 Chip",
    summary: "Apple has unveiled its latest MacBook Pro lineup featuring the new M3 chip, promising significant performance improvements and better battery life.",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8",
    url: "#",
    source: "Tech News",
    date: "2025-04-10T10:30:00Z",
    symbols: ["AAPL"]
  },
  {
    id: "2",
    title: "Amazon Reports Record-Breaking Holiday Sales",
    summary: "Amazon announced that it had its biggest holiday season ever, with billions of items ordered worldwide and record-breaking sales across multiple categories.",
    image: "https://images.unsplash.com/photo-1607083206968-13611e3d76db",
    url: "#",
    source: "Business Today",
    date: "2025-04-09T15:45:00Z",
    symbols: ["AMZN"]
  },
  {
    id: "3",
    title: "Microsoft's Azure Cloud Business Sees 30% Growth",
    summary: "Microsoft reported strong quarterly earnings driven by continued momentum in its Azure cloud computing services, which grew by 30% year-over-year.",
    image: "https://images.unsplash.com/photo-1633419461186-7d40a38105ec",
    url: "#",
    source: "Financial Times",
    date: "2025-04-08T09:15:00Z",
    symbols: ["MSFT"]
  },
  {
    id: "4",
    title: "Tesla Expands Supercharger Network Across Europe",
    summary: "Tesla announced plans to double its Supercharger network in Europe within the next two years, addressing growing demand from electric vehicle owners.",
    image: "https://images.unsplash.com/photo-1620481679288-0f43709ecbe2",
    url: "#",
    source: "Auto Insider",
    date: "2025-04-07T13:20:00Z",
    symbols: ["TSLA"]
  },
  {
    id: "5",
    title: "Meta's Reality Labs Division Reports Strong VR Headset Sales",
    summary: "Meta Platforms' Reality Labs division reported better-than-expected sales figures for its latest VR headsets, signaling growing adoption of metaverse technologies.",
    image: "https://images.unsplash.com/photo-1622979135225-d2ba269cf1ac",
    url: "#",
    source: "VR World",
    date: "2025-04-06T11:30:00Z",
    symbols: ["META"]
  },
  {
    id: "6",
    title: "NVIDIA Unveils Next-Gen AI Chips",
    summary: "NVIDIA has announced its next generation of AI processing chips, promising a 2x performance increase for machine learning workloads.",
    image: "https://images.unsplash.com/photo-1555618565-5a7eff2be057",
    url: "#",
    source: "Tech Insider",
    date: "2025-04-05T14:20:00Z",
    symbols: ["NVDA"]
  },
  {
    id: "7",
    title: "JPMorgan Chase Expands Digital Banking Services",
    summary: "JPMorgan Chase has announced new digital banking features aimed at competing with fintech startups and improving customer experience.",
    image: "https://images.unsplash.com/photo-1601597111158-2fceff292cdc",
    url: "#",
    source: "Banking Weekly",
    date: "2025-04-04T09:45:00Z",
    symbols: ["JPM"]
  },
  {
    id: "8",
    title: "Johnson & Johnson Receives FDA Approval for New Drug",
    summary: "Johnson & Johnson's pharmaceutical division has received FDA approval for a breakthrough treatment targeting autoimmune disorders.",
    image: "https://broken-image-url.jpg",
    url: "#",
    source: "Healthcare Daily",
    date: "2025-04-03T11:15:00Z",
    symbols: ["JNJ"]
  }
];

// Sample market indices data
const sampleMarketIndices: MarketIndex[] = [
  {
    name: "S&P 500",
    value: 5218.53,
    change: 32.64,
    changePercent: 0.63
  },
  {
    name: "Nasdaq",
    value: 16429.85,
    change: 183.02,
    changePercent: 1.12
  },
  {
    name: "Dow Jones",
    value: 39149.54,
    change: -45.27,
    changePercent: -0.12
  },
  {
    name: "Russell 2000",
    value: 2042.40,
    change: 12.38,
    changePercent: 0.61
  }
];

// Simulate API request delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// API functions
export const fetchStocks = async (): Promise<StockData[]> => {
  await delay(1000); // Simulate network request
  return sampleStocks;
};

export const fetchTopGainers = async (limit: number = 5): Promise<StockData[]> => {
  await delay(800); 
  return sampleStocks
    .sort((a, b) => b.changePercent - a.changePercent)
    .slice(0, limit);
};

export const fetchTopLosers = async (limit: number = 5): Promise<StockData[]> => {
  await delay(800);
  return sampleStocks
    .sort((a, b) => a.changePercent - b.changePercent)
    .slice(0, limit);
};

export const fetchMostActive = async (limit: number = 5): Promise<StockData[]> => {
  await delay(800);
  return sampleStocks
    .sort((a, b) => b.volume - a.volume)
    .slice(0, limit);
};

export const fetchStockDetails = async (symbol: string): Promise<DetailedStockData | null> => {
  await delay(1200);
  const stock = sampleStocks.find(s => s.symbol === symbol.toUpperCase());
  return stock || null;
};

export const searchStocks = async (query: string): Promise<StockData[]> => {
  await delay(500);
  const lowerQuery = query.toLowerCase();
  return sampleStocks.filter(
    stock => 
      stock.symbol.toLowerCase().includes(lowerQuery) || 
      stock.name.toLowerCase().includes(lowerQuery)
  );
};

export const fetchStocksBySymbols = async (symbols: string[]): Promise<StockData[]> => {
  await delay(1000);
  return sampleStocks.filter(stock => symbols.includes(stock.symbol));
};

export const fetchNews = async (): Promise<NewsItem[]> => {
  await delay(1500);
  return sampleNews;
};

export const fetchNewsBySymbol = async (symbol: string): Promise<NewsItem[]> => {
  await delay(1000);
  return sampleNews.filter(news => 
    news.symbols.includes(symbol.toUpperCase())
  );
};

export const fetchMarketIndices = async (): Promise<MarketIndex[]> => {
  await delay(800);
  return sampleMarketIndices;
};

export const fetchHistoricalData = async (
  symbol: string,
  timeframe: 'day' | 'week' | 'month' | 'year' = 'month'
): Promise<{ date: string; price: number }[]> => {
  await delay(1200);
  
  // Base price - use the price from our sample data
  const stock = sampleStocks.find(s => s.symbol === symbol.toUpperCase());
  const basePrice = stock ? stock.price : 100;
  
  // Generate mock historical data based on timeframe
  let dataPoints: { date: string; price: number }[] = [];
  const now = new Date();
  
  switch (timeframe) {
    case 'day':
      // Hourly data for the current day
      for (let i = 9; i <= 16; i++) {
        const hour = i < 10 ? `0${i}` : `${i}`;
        dataPoints.push({
          date: `${hour}:00`,
          price: basePrice + (Math.random() * 4 - 2)
        });
      }
      break;
    
    case 'week':
      // Daily data for the week
      for (let i = 6; i >= 0; i--) {
        const date = new Date();
        date.setDate(now.getDate() - i);
        dataPoints.push({
          date: date.toLocaleDateString('en-US', { weekday: 'short' }),
          price: basePrice + (Math.random() * 8 - 4)
        });
      }
      break;
    
    case 'month':
      // Weekly data for the month
      for (let i = 4; i >= 0; i--) {
        const date = new Date();
        date.setDate(now.getDate() - (i * 7));
        dataPoints.push({
          date: `Week ${4-i}`,
          price: basePrice + (Math.random() * 15 - 7.5)
        });
      }
      break;
    
    case 'year':
      // Monthly data for the year
      for (let i = 11; i >= 0; i--) {
        const date = new Date();
        date.setMonth(now.getMonth() - i);
        dataPoints.push({
          date: date.toLocaleDateString('en-US', { month: 'short' }),
          price: basePrice + (Math.random() * 30 - 15)
        });
      }
      break;
  }
  
  return dataPoints;
};
