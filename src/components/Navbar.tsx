import { Button } from "@/components/ui/button";
import { Zap } from "lucide-react";
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 border-b border-border/50 glass-panel">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <div className="p-2 rounded-lg bg-primary/20 group-hover:bg-primary/30 transition-colors">
              <Zap className="h-5 w-5 text-primary" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-precondition bg-clip-text text-transparent">
              PlanForge
            </span>
          </Link>
          
          <div className="flex items-center gap-4">
            <Link to="/editor">
              <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                Editor
              </Button>
            </Link>
            <Button variant="default" className="bg-primary hover:bg-primary/90 glow-primary">
              Get Started
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
};
