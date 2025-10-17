import { Node } from '@xyflow/react';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Plus, Trash2 } from 'lucide-react';
import { useState, useEffect, useCallback } from 'react'; // Added useCallback
import { Parameter } from '@/types/graph';

interface AvailableObject {
  id: string;
  label: string;
  type: string;
}

interface PropertiesPanelProps {
  selectedNode: Node | null;
  onUpdateNode: (nodeId: string, data: any) => void;
  availableObjects: AvailableObject[];
}

export const PropertiesPanel = ({ selectedNode, onUpdateNode, availableObjects }: PropertiesPanelProps) => {
  const [nodeData, setNodeData] = useState<any>(null);

  useEffect(() => {
    if (selectedNode) {
      setNodeData({ ...selectedNode.data });
    } else {
        setNodeData(null); 
    }
  }, [selectedNode]);

  const handleUpdate = useCallback(() => {
    if (selectedNode && nodeData) {
      onUpdateNode(selectedNode.id, nodeData);
    }
  }, [selectedNode, nodeData, onUpdateNode]);

  // Helper to commit changes immediately (e.g., after an item removal)
  const handleImmediateUpdate = useCallback((newPartialData: any) => {
    if (!selectedNode || !nodeData) return; // Guard clause
    const newData = { ...nodeData, ...newPartialData };
    setNodeData(newData);
    onUpdateNode(selectedNode.id, newData);
  }, [selectedNode, nodeData, onUpdateNode]);
  
  if (!selectedNode || !nodeData) {
    return (
      <Card className="glass-panel p-4">
        <p className="text-sm text-muted-foreground text-center py-8">
          Select a node to edit its properties
        </p>
      </Card>
    );
  }

  const isPredicateOrAction = selectedNode.type === 'predicate' || selectedNode.type === 'action';
  const isPredicate = selectedNode.type === 'predicate';

  const addParameter = () => {
    const newParams = [...(nodeData.parameters || []), {
      name: `?param${(nodeData.parameters?.length || 0) + 1}`,
      type: 'object',
      value: availableObjects[0]?.label || ''
    }];
    handleImmediateUpdate({ parameters: newParams });
  };

  const removeParameter = (index: number) => {
    const newParams = [...nodeData.parameters];
    newParams.splice(index, 1);
    // Use handleImmediateUpdate to commit the removal right away
    handleImmediateUpdate({ parameters: newParams });
  };

  const updateParameter = (index: number, field: keyof Parameter, value: string) => {
    const newParams = [...nodeData.parameters];
    newParams[index] = { ...newParams[index], [field]: value };
    setNodeData({ ...nodeData, parameters: newParams });
  };

  const addPredicateArgument = (field: 'preconditions' | 'effects') => {
      const newArgs = [...(nodeData[field] || []), {
          object1: availableObjects[0]?.label || '',
          object2: ''
      }];
      handleImmediateUpdate({ [field]: newArgs });
  };

  const removePredicateArgument = (field: 'preconditions' | 'effects', index: number) => {
      const newArgs = [...nodeData[field]];
      newArgs.splice(index, 1);
      // Use handleImmediateUpdate to commit the removal right away
      handleImmediateUpdate({ [field]: newArgs });
  };

  const updatePredicateArgument = (field: 'preconditions' | 'effects', index: number, key: 'object1' | 'object2', value: string) => {
      const newArgs = [...nodeData[field]];
      newArgs[index] = { ...newArgs[index], [key]: value };
      const newData = { ...nodeData, [field]: newArgs };
      setNodeData(newData);
      onUpdateNode(selectedNode.id, newData);
  };

  // Helper to render the object selection dropdown
  const renderObjectSelect = (currentValue: string, onChange: (value: string) => void) => (
    <Select
      value={currentValue}
      onValueChange={onChange}
    >
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Select Object" />
      </SelectTrigger>
      <SelectContent>
        {availableObjects.map((obj) => (
          <SelectItem key={obj.id} value={obj.label}>
            {obj.label} ({obj.type})
          </SelectItem>
        ))}
        {availableObjects.length === 0 && (
          <SelectItem value="" disabled>
            No objects available
          </SelectItem>
        )}
      </SelectContent>
    </Select>
  );

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
          // COMMIT: Update on blur
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
            // COMMIT: Update on blur
            onBlur={handleUpdate}
            rows={3}
          />
        </div>
      )}

      {/* PARAMETERS SECTION (for Predicate and Action Nodes) */}
      {nodeData.parameters && isPredicateOrAction && (
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label>Parameters</Label>
            <Button size="sm" variant="outline" onClick={addParameter}>
              <Plus className="w-3 h-3" />
            </Button>
          </div>
          <div className="space-y-2">
            {nodeData.parameters.map((param: Parameter, index: number) => (
              <div key={index} className="flex items-center gap-2">
                <Input
                  placeholder="?Name"
                  value={param.name}
                  onChange={(e) => updateParameter(index, 'name', e.target.value)}
                  // COMMIT: Update on blur
                  onBlur={handleUpdate}
                  className="flex-1"
                />
                <Input
                  placeholder="Type"
                  value={param.type}
                  onChange={(e) => updateParameter(index, 'type', e.target.value)}
                  // COMMIT: Update on blur
                  onBlur={handleUpdate}
                  className="flex-1"
                />
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => removeParameter(index)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* PREDICATE ARGUMENT ASSIGNMENT (for Predicate Nodes) */}
      {isPredicate && (
        <div className="space-y-2">
            <div className="flex items-center justify-between">
                <Label>Object Assignment</Label>
                <Button size="sm" variant="outline" onClick={() => addPredicateArgument('preconditions')}>
                    <Plus className="w-3 h-3" />
                </Button>
            </div>
            <div className="space-y-2">
                {/* Note: Using 'preconditions' as a generic list for predicate object assignment for now */}
                {nodeData.preconditions?.map((arg: { object1: string, object2: string }, index: number) => (
                    <div key={index} className="flex gap-2 p-2 border border-border rounded-md items-center">
                        {/* First Parameter Dropdown */}
                        <div className="flex-1">
                            {renderObjectSelect(
                                arg.object1,
                                // Call update and then immediately commit
                                (value) => updatePredicateArgument('preconditions', index, 'object1', value)
                            )}
                        </div>

                        {/* Second Parameter Dropdown (only if needed, for predicates like on-top ?x ?y) */}
                        {selectedNode.data.parameters?.length > 1 && (
                            <div className="flex-1">
                                {renderObjectSelect(
                                    arg.object2,
                                    // Call update and then immediately commit
                                    (value) => updatePredicateArgument('preconditions', index, 'object2', value)
                                )}
                            </div>
                        )}

                        <Button
                            size="icon"
                            variant="ghost"
                            onClick={() => removePredicateArgument('preconditions', index)}
                        >
                            <Trash2 className="w-4 h-4" />
                        </Button>
                    </div>
                ))}
            </div>
            {/* Display message if no objects are available to select */}
            {availableObjects.length === 0 && (
                <p className="text-xs text-destructive">
                    Create an 'Object' node to enable parameter selection.
                </p>
            )}
        </div>
      )}

      {/* OBJECT TYPE SECTION (for Object Nodes) */}
      {selectedNode.type === 'object' && nodeData.type !== undefined && (
        <div className="space-y-2">
          <Label htmlFor="type">Type</Label>
          <Input
            id="type"
            value={nodeData.type}
            onChange={(e) => setNodeData({ ...nodeData, type: e.target.value })}
            // COMMIT: Update on blur
            onBlur={handleUpdate}
          />
        </div>
      )}
    </Card>
  );
};