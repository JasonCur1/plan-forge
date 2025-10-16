import { memo } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { Box } from 'lucide-react';

export const TypeNode = memo(({ data, selected }: NodeProps) => {
  const nodeData = data as any;
  
  return (
    <div className={`
      px-4 py-3 rounded-lg border-2 bg-card shadow-lg
      ${selected ? 'border-primary ring-2 ring-primary/20' : 'border-border/50'}
    `}>
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-muted-foreground" />
      <div className="flex items-center gap-2">
        <Box className="w-4 h-4 text-muted-foreground" />
        <div className="font-medium text-sm">{nodeData.label}</div>
      </div>
      {nodeData.description && (
        <div className="text-xs text-muted-foreground mt-1">{nodeData.description}</div>
      )}
    </div>
  );
});

TypeNode.displayName = 'TypeNode';
