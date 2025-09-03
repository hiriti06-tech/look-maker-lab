import { createContext, useContext, useCallback, useEffect, useState } from 'react';
import { themeAPI, ThemeConfig } from '@/lib/theme-api';

interface ThemeContextType {
  currentTheme: ThemeConfig | null;
  availableThemes: ThemeConfig[];
  applyTheme: (themeId: string) => Promise<void>;
  applyRandomTheme: () => Promise<void>;
  isLoading: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeConfig | null>(null);
  const [availableThemes, setAvailableThemes] = useState<ThemeConfig[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Apply theme by updating CSS variables
  const updateCSSVariables = useCallback((theme: ThemeConfig) => {
    const root = document.documentElement;
    
    // Add class to disable transitions during theme change
    root.classList.add('theme-changing');
    
    // Update all CSS variables
    Object.entries(theme.variables).forEach(([property, value]) => {
      root.style.setProperty(property, value);
    });
    
    // Re-enable transitions after a brief delay
    setTimeout(() => {
      root.classList.remove('theme-changing');
    }, 50);
  }, []);

  // Load available themes on mount
  useEffect(() => {
    const loadThemes = async () => {
      try {
        const themes = await themeAPI.getThemes();
        setAvailableThemes(themes);
        
        // Set default theme if none is set
        if (!currentTheme && themes.length > 0) {
          const defaultTheme = themes.find(t => t.id === 'default') || themes[0];
          setCurrentTheme(defaultTheme);
          updateCSSVariables(defaultTheme);
        }
      } catch (error) {
        console.error('Failed to load themes:', error);
      }
    };

    loadThemes();
  }, [currentTheme, updateCSSVariables]);

  const applyTheme = useCallback(async (themeId: string) => {
    setIsLoading(true);
    try {
      const theme = await themeAPI.getTheme(themeId);
      if (theme) {
        setCurrentTheme(theme);
        updateCSSVariables(theme);
      }
    } catch (error) {
      console.error('Failed to apply theme:', error);
    } finally {
      setIsLoading(false);
    }
  }, [updateCSSVariables]);

  const applyRandomTheme = useCallback(async () => {
    setIsLoading(true);
    try {
      const randomTheme = await themeAPI.getRandomTheme();
      setCurrentTheme(randomTheme);
      updateCSSVariables(randomTheme);
    } catch (error) {
      console.error('Failed to apply random theme:', error);
    } finally {
      setIsLoading(false);
    }
  }, [updateCSSVariables]);

  const value: ThemeContextType = {
    currentTheme,
    availableThemes,
    applyTheme,
    applyRandomTheme,
    isLoading,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};