import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Heart, Star, Zap, Shield, Target, Rocket } from 'lucide-react';

export const DemoShowcase = () => {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <section className="text-center py-12 px-4 bg-gradient-background rounded-2xl">
        <h1 className="text-4xl md:text-6xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
          Dynamic Theme Engine
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          Experience seamless theme transitions powered by API-driven design systems. 
          Every element transforms in harmony.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button size="lg" className="shadow-glow">
            <Rocket className="w-5 h-5 mr-2" />
            Get Started
          </Button>
          <Button variant="outline" size="lg">
            <Heart className="w-5 h-5 mr-2" />
            Learn More
          </Button>
        </div>
      </section>

      {/* Feature Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="border-primary/20 hover:shadow-glow transition-all duration-300">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Zap className="w-6 h-6 text-primary" />
              <CardTitle>Instant Transformation</CardTitle>
            </div>
            <CardDescription>
              Watch your entire website change themes in real-time with smooth animations.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Progress value={85} className="mb-3" />
            <Badge variant="secondary">Performance: 85%</Badge>
          </CardContent>
        </Card>

        <Card className="border-accent/20 hover:shadow-glow transition-all duration-300">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Shield className="w-6 h-6 text-accent" />
              <CardTitle>API-Driven</CardTitle>
            </div>
            <CardDescription>
              Centralized theme management through a robust API system.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Input placeholder="Theme ID or name..." className="mb-3" />
            <Button variant="outline" size="sm" className="w-full">
              Apply Custom Theme
            </Button>
          </CardContent>
        </Card>

        <Card className="border-primary/20 hover:shadow-glow transition-all duration-300">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Target className="w-6 h-6 text-primary" />
              <CardTitle>Component Library</CardTitle>
            </div>
            <CardDescription>
              Seamless integration with existing shadcn/ui components.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              <Badge>Button</Badge>
              <Badge variant="outline">Card</Badge>
              <Badge variant="secondary">Input</Badge>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Interactive Elements */}
      <Card className="p-8">
        <div className="space-y-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-2">Interactive Elements</h3>
            <p className="text-muted-foreground">All components respond to theme changes dynamically</p>
          </div>
          
          <Separator />
          
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-3">
              <h4 className="font-semibold flex items-center gap-2">
                <Star className="w-4 h-4" />
                Form Elements
              </h4>
              <Input placeholder="Dynamic input styling..." />
              <div className="flex gap-2">
                <Button size="sm">Primary</Button>
                <Button variant="secondary" size="sm">Secondary</Button>
                <Button variant="outline" size="sm">Outline</Button>
              </div>
            </div>
            
            <div className="space-y-3">
              <h4 className="font-semibold">Theme Indicators</h4>
              <Alert>
                <AlertDescription>
                  This alert adapts to the current theme configuration automatically.
                </AlertDescription>
              </Alert>
              <Progress value={60} className="w-full" />
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};