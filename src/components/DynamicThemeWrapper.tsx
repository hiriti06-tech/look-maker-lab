import { ReactNode, useEffect, useRef } from 'react';
import { ThemeConfig } from '@/lib/theme-api';

interface DynamicThemeWrapperProps {
  children: ReactNode;
  theme?: ThemeConfig;
  className?: string;
}

/**
 * DynamicThemeWrapper - A publishable component for library use
 * 
 * This component can be published as an npm package and used to wrap
 * any React application or component tree to enable dynamic theming.
 * 
 * Usage:
 * ```tsx
 * import { DynamicThemeWrapper } from 'your-theme-library';
 * 
 * function App() {
 *   return (
 *     <DynamicThemeWrapper theme={customTheme}>
 *       <YourAppComponents />
 *     </DynamicThemeWrapper>
 *   );
 * }
 * ```
 */
export const DynamicThemeWrapper = ({ 
  children, 
  theme, 
  className = '' 
}: DynamicThemeWrapperProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!theme || !containerRef.current) return;

    const container = containerRef.current;
    
    // Apply theme variables to the container's CSS scope
    Object.entries(theme.variables).forEach(([property, value]) => {
      container.style.setProperty(property, value);
    });

    // Add theme-specific class for additional styling
    container.setAttribute('data-theme', theme.id);
    
    return () => {
      // Cleanup on unmount or theme change
      Object.keys(theme.variables).forEach(property => {
        container.style.removeProperty(property);
      });
    };
  }, [theme]);

  return (
    <div 
      ref={containerRef}
      className={`dynamic-theme-container ${className}`}
      style={{
        // Ensure CSS variables cascade to children
        isolation: 'isolate',
        // Enable smooth transitions for theme changes
        transition: 'var(--transition-theme, all 0.4s cubic-bezier(0.4, 0, 0.2, 1))'
      }}
    >
      {children}
    </div>
  );
};

// Export utilities for library consumers
export interface LibraryThemeConfig {
  primary: string;
  secondary?: string;
  background: string;
  foreground: string;
  accent: string;
  border: string;
  radius: string;
  [key: string]: string;
}

/**
 * Utility function to convert simplified theme config to full theme config
 * This makes it easier for library consumers to create themes
 */
export const createThemeConfig = (
  id: string,
  name: string,
  config: LibraryThemeConfig
): ThemeConfig => {
  const variables: Record<string, string> = {};
  
  Object.entries(config).forEach(([key, value]) => {
    variables[`--${key}`] = value;
  });

  return { id, name, variables };
};

/**
 * Hook for library consumers to easily apply themes
 */
export const useThemeLibrary = () => {
  const applyThemeToElement = (element: HTMLElement, theme: ThemeConfig) => {
    Object.entries(theme.variables).forEach(([property, value]) => {
      element.style.setProperty(property, value);
    });
  };

  const removeThemeFromElement = (element: HTMLElement, theme: ThemeConfig) => {
    Object.keys(theme.variables).forEach(property => {
      element.style.removeProperty(property);
    });
  };

  return {
    applyThemeToElement,
    removeThemeFromElement,
    createThemeConfig,
  };
};