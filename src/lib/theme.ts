type Theme = 'light' | 'dark' | 'system';

// Get system color scheme preference
export const getSystemTheme = (): 'light' | 'dark' => {
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return 'dark';
  }
  return 'light';
};

// Get saved theme from localStorage or get system preference
export const getSavedTheme = (): Theme => {
  const savedTheme = localStorage.getItem('theme') as Theme | null;
  
  // Return saved theme if it exists and is valid
  if (savedTheme === 'light' || savedTheme === 'dark' || savedTheme === 'system') {
    return savedTheme;
  }
  
  // Default to system
  return 'system';
};

// Set theme and save to localStorage
export const setTheme = (theme: Theme): void => {
  localStorage.setItem('theme', theme);
  
  // If theme is system, check system preference
  const effectiveTheme = theme === 'system' ? getSystemTheme() : theme;
  
  if (effectiveTheme === 'dark') {
    document.documentElement.classList.add('dark');
    updateChartColors('dark');
  } else {
    document.documentElement.classList.remove('dark');
    updateChartColors('light');
  }
  
  // Update meta theme color for mobile browsers
  const metaThemeColor = document.querySelector('meta[name="theme-color"]');
  if (metaThemeColor) {
    // Use appropriate colors for each theme
    metaThemeColor.setAttribute('content', effectiveTheme === 'dark' ? '#121212' : '#ffffff');
  }
  
  // Apply additional theme-specific styles for improved contrast and visibility
  if (effectiveTheme === 'dark') {
    document.body.classList.add('dark-mode-active');
  } else {
    document.body.classList.remove('dark-mode-active');
  }
  
  // Force a repaint to fix any hover state issues
  document.body.style.transition = 'background-color 0.3s ease';
  document.body.style.backgroundColor = effectiveTheme === 'dark' ? 
    'hsl(225 9% 9%)' : 'hsl(210 40% 98%)';
};

// Update chart colors based on theme
const updateChartColors = (theme: 'light' | 'dark') => {
  // Find any gradient stops in SVGs and update them
  const gradientStops = document.querySelectorAll('stop');
  
  if (theme === 'dark') {
    // Set gradient colors for dark theme
    gradientStops.forEach((stop) => {
      if (stop.getAttribute('stop-color') === '#10b981') {
        // Keep the green color but adjust opacity for dark mode
        stop.setAttribute('stop-opacity', '0.6');
      }
    });
    
    // Update chart grid lines
    const gridLines = document.querySelectorAll('.recharts-cartesian-grid line');
    gridLines.forEach((line) => {
      if (line.getAttribute('stroke') === '#ccc' || line.getAttribute('stroke') === 'rgba(255, 255, 255, 0.1)') {
        line.setAttribute('stroke', 'rgba(255, 255, 255, 0.1)');
      }
    });
  } else {
    // Set gradient colors for light theme
    gradientStops.forEach((stop) => {
      if (stop.getAttribute('stop-color') === '#10b981') {
        stop.setAttribute('stop-opacity', '0.5');
      }
    });
    
    // Update chart grid lines
    const gridLines = document.querySelectorAll('.recharts-cartesian-grid line');
    gridLines.forEach((line) => {
      if (line.getAttribute('stroke') === 'rgba(255, 255, 255, 0.1)') {
        line.setAttribute('stroke', 'rgba(0, 0, 0, 0.1)');
      }
    });
  }
};

// Initialize theme from saved preference
export const initializeTheme = (): Theme => {
  const theme = getSavedTheme();
  setTheme(theme);
  
  // Add listener for system theme changes if using system theme
  if (theme === 'system') {
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
      if (getSavedTheme() === 'system') {
        setTheme('system');
      }
    });
  }
  
  return theme;
};

// Add a helper to toggle theme (light -> dark -> system)
export const cycleTheme = (): Theme => {
  const currentTheme = getSavedTheme();
  let newTheme: Theme;
  
  if (currentTheme === 'light') {
    newTheme = 'dark';
  } else if (currentTheme === 'dark') {
    newTheme = 'system';
  } else {
    newTheme = 'light';
  }
  
  setTheme(newTheme);
  return newTheme;
};
