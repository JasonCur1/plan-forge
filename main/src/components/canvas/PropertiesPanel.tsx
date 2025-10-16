import { Node } from '@xyflow/react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Plus, Trash2 } from 'lucide-react';
import { useState, useEffect } from 'react';

interface PropertiesPanelProps {
  selectedNode: Node | null;
  onUpdateNode: (nodeId: string, data: any) => void;
}

export const PropertiesPanel = ({ selectedNode, onUpdateNode }: PropertiesPanelProps) => {
  const [nodeData, setNodeData] = useState<any>(null);

  useEffect(() => {
    if (selectedNode) {
      setNodeData({ ...selectedNode.data });
    }
  }, [selectedNode]);

  if (!selectedNode || !nodeData) {
    return (
      <Card className="glass-panel p-4">
        <p className="text-sm text-muted-foreground text-center py-8">
          Select a node to edit its properties
        </p>
      </Card>
    );
  }

  const handleUpdate = () => {
    onUpdateNode(selectedNode.id, nodeData);
  };

  const addParameter = () => {
    setNodeData({
      ...nodeData,
      parameters: [...(nodeData.parameters || []), { name: '?new', type: 'object' }]
    });
  };

  const removeParameter = (index: number) => {
    const newParams = [...nodeData.parameters];
    newParams.splice(index, 1);
    setNodeData({ ...nodeData, parameters: newParams });
  };

  const updateParameter = (index: number, field: string, value: string) => {
    const newParams = [...nodeData.parameters];
    newParams[index] = { ...newParams[index], [field]: value };
    setNodeData({ ...nodeData, parameters: newParams });
  };

  return (
    <Card className="glass-panel p-4 space-y-4">
      <div>
        <h3 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-4">
          {selectedNode.type} Node
        </h3>
      </div>

      <div className="space-y-2">
        <Label htmlFor="label">Name</Label>
        <Input
          id="label"
          value={nodeData.label}
          onChange={(e) => setNodeData({ ...nodeData, label: e.target.value })}
          onBlur={handleUpdate}
        />
      </div>

      {nodeData.description !== undefined && (
        <div className="space-y-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            value={nodeData.description || ''}
            onChange={(e) => setNodeData({ ...nodeData, description: e.target.value })}
            onBlur={handleUpdate}
            rows={3}
          />
        </div>
      )}

      {nodeData.parameters && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Parameters</Label>
            <Button size="sm" variant="outline" onClick={addParameter}>
              <Plus className="w-3 h-3" />
            </Button>
          </div>
          <div className="space-y-2">
            {nodeData.parameters.map((param: any, index: number) => (
              <div key={index} className="flex gap-2">
                <Input
                  placeholder="Name"
                  value={param.name}
                  onChange={(e) => updateParameter(index, 'name', e.target.value)}
                  onBlur={handleUpdate}
                  className="flex-1"
                />
                <Input
                  placeholder="Type"
                  value={param.type}
                  onChange={(e) => updateParameter(index, 'type', e.target.value)}
                  onBlur={handleUpdate}
                  className="flex-1"
                />
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => {
                    removeParameter(index);
                    handleUpdate();
                  }}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {selectedNode.type === 'object' && nodeData.type !== undefined && (
        <div className="space-y-2">
          <Label htmlFor="type">Type</Label>
          <Input
            id="type"
            value={nodeData.type}
            onChange={(e) => setNodeData({ ...nodeData, type: e.target.value })}
            onBlur={handleUpdate}
          />
        </div>
      )}
    </Card>
  );
};
