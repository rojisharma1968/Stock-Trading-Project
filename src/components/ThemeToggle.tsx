

import { useState, useEffect } from 'react';
import { Sun, Moon, Laptop } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { getSavedTheme, setTheme } from '@/lib/theme';

type ThemeOption = 'light' | 'dark' | 'system';

const ThemeToggle = () => {
  const [theme, setThemeState] = useState<ThemeOption>('light');

  useEffect(() => {
    // Initialize from localStorage
    const savedTheme = getSavedTheme();
    setThemeState(savedTheme);
  }, []);

  const toggleTheme = (newTheme: ThemeOption) => {
    setTheme(newTheme);
    setThemeState(newTheme);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full bg-transparent hover:bg-gray-100 dark:hover:bg-gray-800">
          <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          <span className="sr-only">Toggle theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="dark:bg-gray-800 dark:border-gray-700">
        <DropdownMenuItem 
          onClick={() => toggleTheme('light')} 
          className="dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:bg-gray-700 dark:focus:text-white"
        >
          <Sun className="mr-2 h-4 w-4" />
          <span>Light</span>
          {theme === 'light' && <span className="ml-auto">✓</span>}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => toggleTheme('dark')}
          className="dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:bg-gray-700 dark:focus:text-white"
        >
          <Moon className="mr-2 h-4 w-4" />
          <span>Dark</span>
          {theme === 'dark' && <span className="ml-auto">✓</span>}
        </DropdownMenuItem>
        <DropdownMenuItem 
          onClick={() => toggleTheme('system')}
          className="dark:text-gray-300 dark:hover:bg-gray-700 dark:hover:text-white dark:focus:bg-gray-700 dark:focus:text-white"
        >
          <Laptop className="mr-2 h-4 w-4" />
          <span>System</span>
          {theme === 'system' && <span className="ml-auto">✓</span>}
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeToggle;

