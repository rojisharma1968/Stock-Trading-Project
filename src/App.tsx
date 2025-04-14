
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useEffect, ErrorInfo, ReactNode } from "react";
import { AuthProvider } from "./lib/authContext";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import Index from "./pages/Index";
import Stocks from "./pages/Stocks";
import StockDetail from "./pages/StockDetail";
import Favorites from "./pages/Favorites";
import News from "./pages/News";
import About from "./pages/About";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";
import Wallet from "./pages/Wallet";
import Login from "./pages/Login";
import { initializeTheme } from "./lib/theme";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
      meta: {
        // Move error handling to meta
        onError: (error: Error) => {
          console.error("Query error:", error);
        }
      }
    }
  }
});

// Error boundary component to catch rendering errors
class ErrorBoundary extends React.Component<{children: ReactNode}, {hasError: boolean}> {
  constructor(props: {children: ReactNode}) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("React error boundary caught an error:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="p-8 text-center">
          <h2 className="text-2xl font-bold mb-4">Something went wrong</h2>
          <p className="mb-4">The application encountered an error. Please try refreshing the page.</p>
          <button 
            onClick={() => this.setState({ hasError: false })} 
            className="px-4 py-2 bg-financial-secondary text-white rounded hover:bg-opacity-90"
          >
            Try again
          </button>
        </div>
      );
    }

    return this.props.children;
  }
}

const App = () => {
  // Initialize theme when app loads
  useEffect(() => {
    initializeTheme();
  }, []);

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
              <Routes>
                <Route element={<Layout />}>
                  <Route path="/" element={<Index />} />
                  <Route path="/stocks" element={<Stocks />} />
                  <Route path="/stocks/:symbol" element={<StockDetail />} />
                  <Route path="/favorites" element={<Favorites />} />
                  <Route path="/news" element={<News />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={<Contact />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/wallet" element={
                    <ProtectedRoute>
                      <Wallet />
                    </ProtectedRoute>
                  } />
                  <Route path="*" element={<NotFound />} />
                </Route>
              </Routes>
            </BrowserRouter>
          </TooltipProvider>
        </AuthProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
