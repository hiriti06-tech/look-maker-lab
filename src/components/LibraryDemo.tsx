import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { DynamicThemeWrapper, createThemeConfig } from './DynamicThemeWrapper';
import { Package, Code, Download } from 'lucide-react';

// Example themes for the library demo
const demoThemes = [
  createThemeConfig('library-pink', 'Pink Delight', {
    primary: '330 100% 60%',
    'primary-foreground': '0 0% 100%',
    'primary-glow': '330 100% 70%',
    background: '330 50% 98%',
    foreground: '330 30% 10%',
    accent: '300 100% 50%',
    'accent-foreground': '0 0% 100%',
    border: '330 30% 85%',
    radius: '1rem',
  }),
  createThemeConfig('library-emerald', 'Emerald Fresh', {
    primary: '160 100% 40%',
    'primary-foreground': '0 0% 100%',
    'primary-glow': '160 100% 50%',
    background: '160 30% 98%',
    foreground: '160 30% 10%',
    accent: '140 100% 45%',
    'accent-foreground': '0 0% 100%',
    border: '160 30% 85%',
    radius: '0.75rem',
  }),
];

export const LibraryDemo = () => {
  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader className="text-center">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Package className="w-6 h-6 text-primary" />
          <CardTitle className="text-2xl font-bold">Component Library Demo</CardTitle>
        </div>
        <CardDescription>
          Ready-to-publish theme wrapper for seamless integration with any React app
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-8">
        {/* Usage Example */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Code className="w-5 h-5" />
            Library Usage Example
          </h3>
          <Card className="bg-muted/50">
            <CardContent className="p-4 font-mono text-sm">
              <pre className="text-muted-foreground overflow-x-auto">
{`import { DynamicThemeWrapper } from '@your-org/dynamic-themes';

function App() {
  return (
    <DynamicThemeWrapper theme={customTheme}>
      <YourExistingComponents />
    </DynamicThemeWrapper>
  );
}`}
              </pre>
            </CardContent>
          </Card>
        </div>

        <Separator />

        {/* Live Demo Previews */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold">Live Theme Previews</h3>
          
          <div className="grid gap-6 md:grid-cols-2">
            {demoThemes.map((theme) => (
              <DynamicThemeWrapper key={theme.id} theme={theme} className="rounded-lg border p-4">
                <div className="space-y-4">
                  <div className="text-center">
                    <Badge variant="secondary" className="mb-2">{theme.name}</Badge>
                    <h4 className="text-lg font-semibold text-foreground">Themed Component</h4>
                    <p className="text-muted-foreground text-sm">All styles adapt automatically</p>
                  </div>
                  
                  <div className="space-y-3">
                    <Button className="w-full">Primary Action</Button>
                    <Button variant="outline" className="w-full">Secondary Action</Button>
                    <div className="text-center text-xs text-muted-foreground">
                      Theme ID: {theme.id}
                    </div>
                  </div>
                </div>
              </DynamicThemeWrapper>
            ))}
          </div>
        </div>

        <Separator />

        {/* Installation Instructions */}
        <div className="text-center space-y-4">
          <h3 className="text-lg font-semibold flex items-center justify-center gap-2">
            <Download className="w-5 h-5" />
            Ready for Publishing
          </h3>
          <p className="text-muted-foreground">
            This component library can be packaged and published to npm for use in any React project.
            It seamlessly overrides shadcn/ui components without requiring any code changes.
          </p>
          <div className="flex flex-wrap justify-center gap-2">
            <Badge variant="outline">Zero Config</Badge>
            <Badge variant="outline">Type Safe</Badge>
            <Badge variant="outline">Framework Agnostic</Badge>
            <Badge variant="outline">SSR Compatible</Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};