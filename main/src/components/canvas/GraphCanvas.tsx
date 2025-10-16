import { useCallback, useState } from 'react';
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
  Connection,
  Edge,
  Node,
  NodeTypes,
  BackgroundVariant,
} from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { TypeNode } from './TypeNode';
import { PredicateNode } from './PredicateNode';
import { ActionNode } from './ActionNode';
import { ObjectNode } from './ObjectNode';
import { toast } from 'sonner';

const nodeTypes: NodeTypes = {
  type: TypeNode,
  predicate: PredicateNode,
  action: ActionNode,
  object: ObjectNode,
};

const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

interface GraphCanvasProps {
  onNodeSelect: (node: Node | null) => void;
}

export const GraphCanvas = ({ onNodeSelect }: GraphCanvasProps) => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const [reactFlowInstance, setReactFlowInstance] = useState<any>(null);

  const onConnect = useCallback(
    (params: Connection) => {
      // Validation logic
      const sourceNode = nodes.find(n => n.id === params.source);
      const targetNode = nodes.find(n => n.id === params.target);

      if (!sourceNode || !targetNode) return;

      // Validate connection types
      if (sourceNode.type === 'predicate' && targetNode.type === 'action') {
        // Valid: predicate to action precondition
        setEdges((eds) => addEdge({ ...params, type: 'smoothstep', animated: true }, eds));
      } else if (sourceNode.type === 'action' && targetNode.type === 'predicate') {
        // Valid: action effect to predicate
        setEdges((eds) => addEdge({ ...params, type: 'smoothstep', animated: true }, eds));
      } else if (sourceNode.type === 'type' && targetNode.type === 'object') {
        // Valid: type to object
        setEdges((eds) => addEdge({ ...params, type: 'smoothstep' }, eds));
      } else {
        toast.error('Invalid connection', {
          description: 'Cannot connect these node types'
        });
      }
    },
    [nodes, setEdges]
  );

  const onNodeClick = useCallback(
    (_: React.MouseEvent, node: Node) => {
      onNodeSelect(node);
    },
    [onNodeSelect]
  );

  const onPaneClick = useCallback(() => {
    onNodeSelect(null);
  }, [onNodeSelect]);

  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();

      if (!reactFlowInstance) return;

      const type = event.dataTransfer.getData('application/reactflow');
      if (!type) return;

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode: Node = {
        id: `${type}-${Date.now()}`,
        type,
        position,
        data: {
          label: `New ${type}`,
          parameters: [],
          preconditions: [],
          effects: [],
        },
      };

      setNodes((nds) => nds.concat(newNode));
      toast.success('Node created', {
        description: `${type} node added to canvas`
      });
    },
    [reactFlowInstance, setNodes]
  );

  return (
    <div className="w-full h-full">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={onNodeClick}
        onPaneClick={onPaneClick}
        onInit={setReactFlowInstance}
        onDrop={onDrop}
        onDragOver={onDragOver}
        nodeTypes={nodeTypes}
        fitView
        snapToGrid
        snapGrid={[15, 15]}
      >
        <Background variant={BackgroundVariant.Dots} gap={20} size={1} />
        <Controls />
        <MiniMap
          nodeColor={(node) => {
            switch (node.type) {
              case 'type': return 'hsl(var(--muted))';
              case 'predicate': return 'hsl(var(--precondition))';
              case 'action': return 'hsl(var(--effect))';
              case 'object': return 'hsl(var(--parameter))';
              default: return 'hsl(var(--primary))';
            }
          }}
          className="bg-card border border-border"
        />
      </ReactFlow>
    </div>
  );
};
