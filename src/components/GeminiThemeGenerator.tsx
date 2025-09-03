import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useTheme } from '@/contexts/ThemeContext';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { Sparkles, Wand2, Eye, EyeOff, Loader2 } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import { themeAPI, ThemeConfig } from '@/lib/theme-api';

export const GeminiThemeGenerator = () => {
  const [apiKey, setApiKey] = useState(() => localStorage.getItem('gemini-api-key') || '');
  const [showApiKey, setShowApiKey] = useState(false);
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const { applyTheme } = useTheme();

  const saveApiKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem('gemini-api-key', apiKey);
      toast({
        title: "API Key Saved! ✨",
        description: "Your Gemini API key has been securely stored.",
      });
    }
  };

  const generateThemeWithGemini = async () => {
    if (!apiKey.trim()) {
      toast({
        title: "API Key Required",
        description: "Please enter your Gemini API key first.",
        variant: "destructive"
      });
      return;
    }

    if (!prompt.trim()) {
      toast({
        title: "Theme Prompt Required", 
        description: "Please describe the theme you want to generate.",
        variant: "destructive"
      });
      return;
    }

    setIsGenerating(true);

    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-pro" });

      const themePrompt = `Create a beautiful color theme for a website based on this description: "${prompt}". 
      
Return ONLY a JSON object with these exact HSL values (no explanations, just the JSON):
{
  "primary": "hue saturation% lightness%",
  "primaryGlow": "hue saturation% lightness%", 
  "background": "hue saturation% lightness%",
  "foreground": "hue saturation% lightness%",
  "card": "hue saturation% lightness%",
  "cardForeground": "hue saturation% lightness%",
  "secondary": "hue saturation% lightness%",
  "secondaryForeground": "hue saturation% lightness%",
  "accent": "hue saturation% lightness%",
  "accentForeground": "hue saturation% lightness%",
  "border": "hue saturation% lightness%",
  "radius": "0.5rem"
}

Make sure colors have good contrast and the theme matches the mood/feeling described.`;

      const result = await model.generateContent(themePrompt);
      const response = await result.response;
      const text = response.text();
      
      // Extract JSON from response
      const jsonMatch = text.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('Invalid response format from Gemini');
      }

      const themeData = JSON.parse(jsonMatch[0]);
      
      // Convert to ThemeConfig format
      const newTheme: ThemeConfig = {
        id: `gemini-${Date.now()}`,
        name: `AI: ${prompt.slice(0, 20)}...`,
        variables: {
          '--primary': themeData.primary,
          '--primary-foreground': themeData.accentForeground,
          '--primary-glow': themeData.primaryGlow,
          '--background': themeData.background,
          '--foreground': themeData.foreground,
          '--card': themeData.card,
          '--card-foreground': themeData.cardForeground,
          '--secondary': themeData.secondary,
          '--secondary-foreground': themeData.secondaryForeground,
          '--accent': themeData.accent,
          '--accent-foreground': themeData.accentForeground,
          '--border': themeData.border,
          '--radius': themeData.radius || '0.75rem',
        }
      };

      // Add to available themes (temporary)
      const existingThemes = await themeAPI.getThemes();
      (themeAPI as any)._addTheme = (theme: ThemeConfig) => {
        if (!(themeAPI as any)._customThemes) {
          (themeAPI as any)._customThemes = [];
        }
        (themeAPI as any)._customThemes.push(theme);
      };
      
      // Apply the theme immediately
      const root = document.documentElement;
      Object.entries(newTheme.variables).forEach(([property, value]) => {
        root.style.setProperty(property, value);
      });

      toast({
        title: "🎨 AI Theme Generated!",
        description: `Created "${newTheme.name}" theme based on your prompt.`,
      });

      setPrompt('');
      
    } catch (error) {
      console.error('Gemini API error:', error);
      toast({
        title: "Generation Failed",
        description: "Failed to generate theme. Check your API key and try again.",
        variant: "destructive"
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto shadow-glow overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-pink-500 via-purple-500 via-blue-500 via-green-500 via-yellow-500 to-red-500 text-white relative">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-center gap-2 mb-2">
            <Sparkles className="w-6 h-6 animate-pulse" />
            <CardTitle className="text-2xl font-bold">Gemini AI Theme Generator</CardTitle>
            <Wand2 className="w-6 h-6 animate-bounce" />
          </div>
          <CardDescription className="text-white/90 text-center">
            Let AI create magical themes based on your imagination ✨
          </CardDescription>
        </div>
      </CardHeader>
      
      <CardContent className="p-6 space-y-6">
        {/* API Key Section */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
              🔑 API Key
            </Badge>
          </div>
          <div className="flex gap-2">
            <div className="relative flex-1">
              <Input
                type={showApiKey ? "text" : "password"}
                value={apiKey}
                onChange={(e) => setApiKey(e.target.value)}
                placeholder="Enter your Gemini API key..."
                className="pr-10 border-2 border-gradient-to-r from-purple-300 to-pink-300 focus:border-gradient-to-r focus:from-purple-500 focus:to-pink-500"
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                className="absolute right-0 top-0 h-full px-3"
                onClick={() => setShowApiKey(!showApiKey)}
              >
                {showApiKey ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </Button>
            </div>
            <Button onClick={saveApiKey} variant="outline" className="bg-gradient-to-r from-purple-50 to-pink-50 hover:from-purple-100 hover:to-pink-100">
              Save
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Get your free API key from{' '}
            <a 
              href="https://aistudio.google.com/app/apikey" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-500 hover:underline"
            >
              Google AI Studio
            </a>
          </p>
        </div>

        {/* Theme Generation Section */}
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <Badge className="bg-gradient-to-r from-blue-500 to-green-500 text-white">
              🎨 Theme Prompt
            </Badge>
          </div>
          
          <Input
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe your dream theme... (e.g., 'sunset over ocean', 'cyberpunk neon', 'forest morning')"
            className="border-2 border-gradient-to-r from-blue-300 to-green-300 focus:border-gradient-to-r focus:from-blue-500 focus:to-green-500"
          />

          <Button
            onClick={generateThemeWithGemini}
            disabled={isGenerating || !apiKey.trim()}
            className="w-full bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 hover:from-pink-600 hover:via-purple-600 hover:to-blue-600 text-white font-semibold py-3 transition-all duration-300 transform hover:scale-105"
          >
            {isGenerating ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                AI is painting your theme...
              </>
            ) : (
              <>
                <Sparkles className="w-4 h-4 mr-2" />
                Generate Magic Theme ✨
              </>
            )}
          </Button>
        </div>

        <div className="text-center text-sm text-muted-foreground">
          <p className="flex items-center justify-center gap-1">
            <span>🌈</span>
            Powered by Google's Gemini AI for infinite creativity
            <span>🌈</span>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};