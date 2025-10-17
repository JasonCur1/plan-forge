import { Box, Sparkles, Code2, Play, GitBranch, Wand2 } from "lucide-react";
import { Card } from "@/components/ui/card";

const features = [
  {
    icon: Box,
    title: "Visual Domain Designer",
    description: "Define types, predicates, and actions through an intuitive canvas interface",
    color: "precondition"
  },
  {
    icon: GitBranch,
    title: "Problem Builder",
    description: "Create objects, initial states, and goals with real-time validation",
    color: "parameter"
  },
  {
    icon: Code2,
    title: "PDDL Generation",
    description: "Automatically generate production-ready PDDL domain and problem files",
    color: "effect"
  },
  {
    icon: Play,
    title: "Planner Integration",
    description: "Run Fast Downward, OPTIC, and other planners directly from the interface",
    color: "primary"
  },
  {
    icon: Sparkles,
    title: "Simulation View",
    description: "Visualize state transitions and action sequences in real-time",
    color: "precondition"
  },
  {
    icon: Wand2,
    title: "AI Assistance",
    description: "Get intelligent suggestions for predicates, actions, and logical connections",
    color: "parameter"
  }
];

export const Features = () => {
  return (
    <section className="py-24 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold">
            Everything You Need to{" "}
            <span className="text-primary">Plan</span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Powerful features designed for AI researchers, roboticists, and planning enthusiasts
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index}
                className="glass-panel p-6 hover:border-primary/50 transition-all group cursor-pointer"
              >
                <div className={`inline-flex p-3 rounded-lg bg-${feature.color}/10 border border-${feature.color}/20 mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className={`h-6 w-6 text-${feature.color}`} />
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
};
