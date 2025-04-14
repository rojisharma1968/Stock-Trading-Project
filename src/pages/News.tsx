
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { fetchNews } from "@/lib/api";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

export default function News() {
  const [searchQuery, setSearchQuery] = useState("");
  
  // Fetch news
  const { data: newsItems, isLoading } = useQuery({
    queryKey: ['newsArticles'],
    queryFn: fetchNews
  });
  
  // Filter news based on search query
  const filteredNews = newsItems?.filter(news =>
    searchQuery === "" || 
    news.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    news.symbols.some(symbol => symbol.toLowerCase().includes(searchQuery.toLowerCase())) ||
    news.summary.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  // Image error handler
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    e.currentTarget.src = "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d";
    e.currentTarget.alt = "Fallback image";
  };
  
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold">Financial News</h1>
      
      {/* Search input */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        <Input
          placeholder="Search news..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10"
        />
      </div>
      
      {/* News items */}
      <div className="space-y-6">
        {isLoading ? (
          Array(5).fill(0).map((_, i) => (
            <Card key={i} className="overflow-hidden">
              <div className="flex flex-col md:flex-row">
                <div className="w-full md:w-64 h-48 skeleton" />
                <CardContent className="p-4 md:p-6 flex-1">
                  <div className="h-6 w-3/4 skeleton mb-2" />
                  <div className="h-4 w-1/3 skeleton mb-4" />
                  <div className="h-4 w-full skeleton mb-2" />
                  <div className="h-4 w-full skeleton mb-2" />
                  <div className="h-4 w-2/3 skeleton mb-4" />
                  <div className="h-5 w-32 skeleton" />
                </CardContent>
              </div>
            </Card>
          ))
        ) : filteredNews.length > 0 ? (
          filteredNews.map(news => (
            <Card key={news.id} className="overflow-hidden hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row md:h-48">
                <div className="w-full md:w-64 h-45 md:h-full bg-gray-100">
                  <img 
                    src={news.image} 
                    alt={news.title}
                    onError={handleImageError}
                    loading="lazy"
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4 md:p-6 flex-1">
                  <h2 className="text-xl font-semibold mb-1">{news.title}</h2>
                  <div className="text-sm text-gray-500 mb-4">
                    {news.source} • {new Date(news.date).toLocaleDateString()}
                  </div>
                  <p className="mb-4">{news.summary}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {news.symbols.map(symbol => (
                      <span 
                        key={symbol}
                        className="bg-financial-secondary/10 text-financial-secondary px-2 py-1 rounded-md text-xs font-medium"
                      >
                        {symbol}
                      </span>
                    ))}
                  </div>
                  <a 
                    href={news.url} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-financial-secondary hover:underline font-medium"
                  >
                    Read full article
                  </a>
                </CardContent>
              </div>
            </Card>
          ))
        ) : (
          <div className="text-center py-12 border rounded-md">
            <h3 className="font-medium text-lg">No news found</h3>
            <p className="text-gray-500">Try adjusting your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
}
