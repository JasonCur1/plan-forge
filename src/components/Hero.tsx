import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import heroBg from "@/assets/hero-bg.jpg";

export const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0">
        <img 
          src={heroBg} 
          alt="Planning background" 
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/95 to-background" />
      </div>

      {/* Animated gradient orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-precondition/20 rounded-full blur-3xl animate-pulse delay-1000" />

      {/* Content */}
      <div className="relative z-10 container mx-auto px-6 py-32">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4">
            <Sparkles className="h-4 w-4 text-primary" />
            <span className="text-sm text-primary font-medium">Visual Planning Made Simple</span>
          </div>
          
          <h1 className="text-6xl md:text-7xl font-bold leading-tight">
            Build{" "}
            <span className="bg-gradient-to-r from-primary via-precondition to-primary bg-clip-text text-transparent animate-gradient">
              Automated Planning
            </span>{" "}
            Problems Visually
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Create PDDL domains and problems through an intuitive graphical interface. 
            No manual coding required — just drag, drop, and connect.
          </p>

          <div className="flex items-center justify-center gap-4 pt-4">
            <Link to="/editor">
              <Button size="lg" className="bg-primary hover:bg-primary/90 glow-primary group">
                Launch Editor
                <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button size="lg" variant="outline" className="border-border/50 hover:border-primary/50">
              View Demo
            </Button>
          </div>

          <div className="pt-12 grid grid-cols-3 gap-8 max-w-2xl mx-auto">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-primary">Visual</div>
              <div className="text-sm text-muted-foreground">Node-based interface</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-precondition">AI-Powered</div>
              <div className="text-sm text-muted-foreground">Smart suggestions</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-effect">Export</div>
              <div className="text-sm text-muted-foreground">PDDL generation</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
