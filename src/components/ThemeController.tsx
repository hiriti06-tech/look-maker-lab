import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTheme } from '@/contexts/ThemeContext';
import { Palette, Shuffle, Loader2 } from 'lucide-react';

export const ThemeController = () => {
  const { currentTheme, availableThemes, applyTheme, applyRandomTheme, isLoading } = useTheme();

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-glow">
      <CardHeader className="text-center bg-gradient-primary text-primary-foreground rounded-t-lg">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Palette className="w-6 h-6" />
          <CardTitle className="text-2xl font-bold">Dynamic Theme Controller</CardTitle>
        </div>
        <CardDescription className="text-primary-foreground/80">
          Transform your entire website with API-driven themes
        </CardDescription>
      </CardHeader>
      
      <CardContent className="p-6 space-y-6">
        <div className="text-center space-y-4">
          <div className="flex items-center justify-center gap-2">
            <span className="text-sm font-medium">Current Theme:</span>
            <Badge variant="secondary" className="font-semibold">
              {currentTheme?.name || 'Loading...'}
            </Badge>
          </div>
          
          <Button
            onClick={applyRandomTheme}
            disabled={isLoading}
            size="lg"
            className="w-full sm:w-auto bg-gradient-primary hover:shadow-glow transition-all duration-300"
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Shuffle className="w-4 h-4 mr-2" />
            )}
            {isLoading ? 'Applying Theme...' : 'Random Theme Magic'}
          </Button>
        </div>

        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {availableThemes.map((theme) => (
            <Button
              key={theme.id}
              onClick={() => applyTheme(theme.id)}
              disabled={isLoading}
              variant={currentTheme?.id === theme.id ? "default" : "outline"}
              className="h-auto p-3 flex flex-col items-start gap-1 text-left transition-all duration-300 hover:shadow-md"
            >
              <span className="font-semibold text-sm">{theme.name}</span>
              <span className="text-xs opacity-70">#{theme.id}</span>
            </Button>
          ))}
        </div>

        <div className="text-center text-sm text-muted-foreground">
          <p>✨ Watch the entire website transform instantly with each theme selection!</p>
        </div>
      </CardContent>
    </Card>
  );
};