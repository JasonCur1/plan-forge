import { memo } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { Plus } from 'lucide-react';

export const ObjectNode = memo(({ data, selected }: NodeProps) => {
  const nodeData = data as any;
  
  return (
    <div className={`
      w-20 h-20 rounded-full border-2 bg-card shadow-lg flex flex-col items-center justify-center
      ${selected ? 'border-primary ring-2 ring-primary/20' : 'border-parameter'}
    `}>
      <Handle type="target" position={Position.Top} className="w-3 h-3 bg-parameter" />
      <Plus className="w-4 h-4 text-parameter" />
      <div className="font-medium text-xs mt-1">{nodeData.label}</div>
      <div className="text-xs text-muted-foreground">{nodeData.type}</div>
    </div>
  );
});

ObjectNode.displayName = 'ObjectNode';
