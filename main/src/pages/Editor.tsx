import { useState, useCallback } from "react";
import { Node } from "@xyflow/react";
import { Navbar } from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Toaster } from "@/components/ui/sonner";
import { GraphCanvas } from "@/components/canvas/GraphCanvas";
import { PropertiesPanel } from "@/components/canvas/PropertiesPanel";
import { 
  Box, 
  GitBranch, 
  Zap, 
  Plus,
  Play,
  Download,
  Settings
} from "lucide-react";

export default function Editor() {
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  const onDragStart = (event: React.DragEvent, nodeType: string) => {
    event.dataTransfer.setData('application/reactflow', nodeType);
    event.dataTransfer.effectAllowed = 'move';
  };

  const handleNodeUpdate = useCallback((nodeId: string, updatedData: any) => {
    // Update nodes state in the parent
    // This is a placeholder - the actual implementation would update React Flow's nodes state
    console.log('Update node:', nodeId, updatedData);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <div className="flex-1 flex pt-16">
        {/* Left Panel - Element Palette */}
        <aside className="w-64 border-r border-border/50 glass-panel flex flex-col">
          <div className="p-4 border-b border-border/50">
            <h2 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">
              Elements
            </h2>
          </div>
          
          <ScrollArea className="flex-1 p-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <h3 className="text-xs font-medium text-muted-foreground uppercase">Domain</h3>
                <Button 
                  variant="outline" 
                  className="w-full justify-start cursor-move"
                  draggable
                  onDragStart={(e) => onDragStart(e, 'type')}
                >
                  <Box className="mr-2 h-4 w-4" />
                  Type
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start node-predicate cursor-move"
                  draggable
                  onDragStart={(e) => onDragStart(e, 'predicate')}
                >
                  <GitBranch className="mr-2 h-4 w-4" />
                  Predicate
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full justify-start node-effect cursor-move"
                  draggable
                  onDragStart={(e) => onDragStart(e, 'action')}
                >
                  <Zap className="mr-2 h-4 w-4" />
                  Action
                </Button>
              </div>

              <div className="space-y-2">
                <h3 className="text-xs font-medium text-muted-foreground uppercase">Problem</h3>
                <Button 
                  variant="outline" 
                  className="w-full justify-start node-parameter cursor-move"
                  draggable
                  onDragStart={(e) => onDragStart(e, 'object')}
                >
                  <Plus className="mr-2 h-4 w-4" />
                  Object
                </Button>
              </div>
              
              <div className="pt-4 border-t border-border/50">
                <p className="text-xs text-muted-foreground">
                  Drag elements onto the canvas to create nodes
                </p>
              </div>
            </div>
          </ScrollArea>

          <div className="p-4 border-t border-border/50 space-y-2">
            <Button variant="outline" size="sm" className="w-full">
              <Settings className="mr-2 h-4 w-4" />
              Settings
            </Button>
          </div>
        </aside>

        {/* Center - Canvas */}
        <main className="flex-1 flex flex-col">
          <div className="border-b border-border/50 glass-panel px-4 py-2 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Button size="sm" variant="outline">
                <Play className="mr-2 h-4 w-4" />
                Run Planner
              </Button>
              <Button size="sm" variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Export PDDL
              </Button>
            </div>
            <div className="text-sm text-muted-foreground">
              Untitled Domain
            </div>
          </div>

          <div className="flex-1 relative">
            <GraphCanvas onNodeSelect={setSelectedNode} />
          </div>
        </main>

        {/* Right Panel - Properties */}
        <aside className="w-80 border-l border-border/50 glass-panel flex flex-col">
          <div className="p-4 border-b border-border/50">
            <h2 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground">
              Properties
            </h2>
          </div>
          
          <ScrollArea className="flex-1 p-4">
            <PropertiesPanel 
              selectedNode={selectedNode} 
              onUpdateNode={handleNodeUpdate}
            />
          </ScrollArea>
        </aside>
      </div>

      {/* Bottom Panel - PDDL Preview & Logs */}
      <div className="border-t border-border/50 glass-panel">
        <Tabs defaultValue="pddl" className="w-full">
          <div className="border-b border-border/50 px-4">
            <TabsList className="bg-transparent">
              <TabsTrigger value="pddl">PDDL Preview</TabsTrigger>
              <TabsTrigger value="logs">Logs</TabsTrigger>
              <TabsTrigger value="plan">Plan Results</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="pddl" className="m-0">
            <ScrollArea className="h-48">
              <pre className="p-4 text-sm font-mono text-muted-foreground">
                {`; Domain definition will appear here
(define (domain example-domain)
  (:requirements :strips :typing)
  (:types )
  (:predicates )
  (:action example
    :parameters ()
    :precondition ()
    :effect ()
  )
)`}
              </pre>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="logs" className="m-0">
            <ScrollArea className="h-48">
              <div className="p-4 space-y-2 text-sm font-mono">
                <div className="text-muted-foreground">Ready to build...</div>
              </div>
            </ScrollArea>
          </TabsContent>
          
          <TabsContent value="plan" className="m-0">
            <ScrollArea className="h-48">
              <div className="p-4 text-sm text-muted-foreground">
                Run a planner to see results
              </div>
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </div>
      <Toaster />
    </div>
  );
}
