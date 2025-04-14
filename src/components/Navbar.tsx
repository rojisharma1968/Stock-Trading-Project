
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Menu, X, Search, BarChart2, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/authContext";
import ThemeToggle from "@/components/ThemeToggle";
import { useIsMobile } from "@/hooks/use-mobile";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { pathname } = useLocation();
  const { isAuthenticated, logout } = useAuth();
  const isMobile = useIsMobile();
  
  // Define nav items with conditional logic for wallet
  const getNavItems = () => {
    const baseItems = [
      { name: "Home", path: "/" },
      { name: "Stocks", path: "/stocks" },
      { name: "Favorites", path: "/favorites" },
      { name: "News", path: "/news" },
      { name: "About", path: "/about" },
      { name: "Contact", path: "/contact" },
    ];
    
    // Only show wallet if authenticated
    if (isAuthenticated) {
      baseItems.push({ name: "Wallet", path: "/wallet" });
    }
    
    return baseItems;
  };
  
  const navItems = getNavItems();
  
  const handleLogout = () => {
    logout();
    setIsOpen(false);
  };
  
  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/" className="flex items-center">
                <BarChart2 className="h-8 w-8 text-financial-secondary" />
                <span className="ml-2 text-xl font-bold text-foreground">EquityWatch</span>
              </Link>
            </div>
          </div>
          
          {/* Desktop and tablet menu */}
          <div className="hidden sm:ml-6 sm:flex sm:flex-wrap sm:items-center">
            <div className="flex flex-wrap">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={cn(
                    "inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 transition-colors mx-1 lg:mx-3",
                    pathname === item.path
                      ? "border-financial-secondary text-foreground"
                      : "border-transparent text-muted-foreground hover:text-foreground hover:border-gray-300"
                  )}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </div>
          
          <div className="flex items-center">
            <div className="hidden sm:ml-2 sm:flex sm:items-center space-x-2 lg:space-x-4">
              <div className="relative lg:block hidden">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-4 w-4 text-muted-foreground" />
                </div>
                <input
                  type="text"
                  placeholder="Search stocks..."
                  className="block w-full pl-10 pr-3 py-2 border border-input rounded-md leading-5 bg-background placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-financial-secondary focus:border-financial-secondary"
                />
              </div>
              
              <ThemeToggle />
              
              {isAuthenticated ? (
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={handleLogout}
                  className="flex items-center"
                >
                  <LogOut className="h-4 w-4 mr-1" />
                  <span className="hidden lg:inline">Logout</span>
                </Button>
              ) : (
                <Link to="/login">
                  <Button variant="outline" size="sm">
                    Login
                  </Button>
                </Link>
              )}
            </div>
            
            {/* Mobile menu button */}
            <div className="flex sm:hidden">
              <Button 
                variant="ghost" 
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-muted-foreground hover:text-foreground hover:bg-accent focus:outline-none focus:ring-2 focus:ring-inset focus:ring-financial-secondary"
              >
                <span className="sr-only">Open main menu</span>
                {isOpen ? (
                  <X className="block h-6 w-6" aria-hidden="true" />
                ) : (
                  <Menu className="block h-6 w-6" aria-hidden="true" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile menu */}
      <div className={cn("sm:hidden", isOpen ? "block" : "hidden")}>
        <div className="pt-2 pb-3 space-y-1">
          {navItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={cn(
                "block pl-3 pr-4 py-2 border-l-4 text-base font-medium",
                pathname === item.path
                  ? "bg-accent border-financial-secondary text-foreground"
                  : "border-transparent text-muted-foreground hover:bg-accent hover:border-gray-300 hover:text-foreground"
              )}
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}
          
          <div className="px-3 py-2">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-muted-foreground" />
              </div>
              <input
                type="text"
                placeholder="Search stocks..."
                className="block w-full pl-10 pr-3 py-2 border border-input rounded-md leading-5 bg-background placeholder-muted-foreground focus:outline-none focus:ring-1 focus:ring-financial-secondary focus:border-financial-secondary"
              />
            </div>
          </div>
          
          <div className="flex items-center justify-between px-4 py-2">
            <ThemeToggle />
            
            {isAuthenticated ? (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={handleLogout}
                className="flex items-center"
              >
                <LogOut className="h-4 w-4 mr-1" />
                Logout
              </Button>
            ) : (
              <Link to="/login" onClick={() => setIsOpen(false)}>
                <Button variant="outline" size="sm">
                  Login
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
