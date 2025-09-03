// Mock API for dynamic themes
export interface ThemeConfig {
  id: string;
  name: string;
  variables: Record<string, string>;
}

// Predefined theme configurations
export const THEME_PRESETS: ThemeConfig[] = [
  {
    id: 'default',
    name: 'Default Theme',
    variables: {
      '--primary': '262 83% 58%',
      '--primary-foreground': '210 40% 98%',
      '--primary-glow': '262 83% 68%',
      '--background': '0 0% 100%',
      '--foreground': '222.2 84% 4.9%',
      '--card': '0 0% 100%',
      '--card-foreground': '222.2 84% 4.9%',
      '--secondary': '210 40% 96.1%',
      '--secondary-foreground': '222.2 47.4% 11.2%',
      '--accent': '262 83% 58%',
      '--accent-foreground': '210 40% 98%',
      '--border': '214.3 31.8% 91.4%',
      '--radius': '0.75rem',
      '--animation-speed': '0.3s',
      '--animation-style': 'smooth',
      '--click-effect': 'scale',
      '--hover-intensity': 'medium',
    }
  },
  {
    id: 'dark-neon',
    name: 'Dark Neon',
    variables: {
      '--primary': '120 100% 50%',
      '--primary-foreground': '0 0% 0%',
      '--primary-glow': '120 100% 60%',
      '--background': '0 0% 5%',
      '--foreground': '120 100% 95%',
      '--card': '0 0% 8%',
      '--card-foreground': '120 100% 95%',
      '--secondary': '0 0% 15%',
      '--secondary-foreground': '120 100% 95%',
      '--accent': '300 100% 50%',
      '--accent-foreground': '0 0% 0%',
      '--border': '0 0% 20%',
      '--radius': '1rem',
      '--animation-speed': '0.15s',
      '--animation-style': 'electric',
      '--click-effect': 'glow',
      '--hover-intensity': 'strong',
    }
  },
  {
    id: 'ocean-blue',
    name: 'Ocean Blue',
    variables: {
      '--primary': '200 100% 50%',
      '--primary-foreground': '0 0% 100%',
      '--primary-glow': '200 100% 60%',
      '--background': '210 100% 97%',
      '--foreground': '210 100% 10%',
      '--card': '200 50% 95%',
      '--card-foreground': '210 100% 10%',
      '--secondary': '200 30% 90%',
      '--secondary-foreground': '210 100% 20%',
      '--accent': '180 100% 40%',
      '--accent-foreground': '0 0% 100%',
      '--border': '200 30% 80%',
      '--radius': '0.5rem',
      '--animation-speed': '0.5s',
      '--animation-style': 'gentle',
      '--click-effect': 'ripple',
      '--hover-intensity': 'subtle',
    }
  },
  {
    id: 'sunset-orange',
    name: 'Sunset Orange',
    variables: {
      '--primary': '20 100% 60%',
      '--primary-foreground': '0 0% 100%',
      '--primary-glow': '30 100% 70%',
      '--background': '35 100% 98%',
      '--foreground': '10 50% 10%',
      '--card': '25 80% 95%',
      '--card-foreground': '10 50% 10%',
      '--secondary': '40 60% 90%',
      '--secondary-foreground': '10 50% 20%',
      '--accent': '340 100% 60%',
      '--accent-foreground': '0 0% 100%',
      '--border': '35 40% 85%',
      '--radius': '1.25rem',
      '--animation-speed': '0.4s',
      '--animation-style': 'bouncy',
      '--click-effect': 'pulse',
      '--hover-intensity': 'medium',
    }
  },
  {
    id: 'corporate',
    name: 'Corporate Blue',
    variables: {
      '--primary': '220 70% 40%',
      '--primary-foreground': '0 0% 100%',
      '--primary-glow': '220 70% 50%',
      '--background': '0 0% 99%',
      '--foreground': '220 10% 10%',
      '--card': '220 20% 97%',
      '--card-foreground': '220 10% 10%',
      '--secondary': '220 15% 92%',
      '--secondary-foreground': '220 10% 20%',
      '--accent': '220 70% 50%',
      '--accent-foreground': '0 0% 100%',
      '--border': '220 15% 88%',
      '--radius': '0.25rem',
      '--animation-speed': '0.2s',
      '--animation-style': 'smooth',
      '--click-effect': 'scale',
      '--hover-intensity': 'subtle',
    }
  }
];

// Mock API functions
export const themeAPI = {
  async getThemes(): Promise<ThemeConfig[]> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 300));
    return THEME_PRESETS;
  },

  async getTheme(id: string): Promise<ThemeConfig | null> {
    await new Promise(resolve => setTimeout(resolve, 200));
    return THEME_PRESETS.find(theme => theme.id === id) || null;
  },

  async getRandomTheme(): Promise<ThemeConfig> {
    await new Promise(resolve => setTimeout(resolve, 150));
    const randomIndex = Math.floor(Math.random() * THEME_PRESETS.length);
    return THEME_PRESETS[randomIndex];
  }
};