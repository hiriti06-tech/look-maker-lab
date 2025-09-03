import { ThemeController } from "@/components/ThemeController";
import { DemoShowcase } from "@/components/DemoShowcase";
import { LibraryDemo } from "@/components/LibraryDemo";

const Index = () => {
  return (
    <main className="min-h-screen bg-gradient-background">
      <div className="container mx-auto px-4 py-8 space-y-12">
        <ThemeController />
        <DemoShowcase />
        <LibraryDemo />
      </div>
    </main>
  );
};

export default Index;
