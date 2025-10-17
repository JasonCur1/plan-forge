import { memo } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { GitBranch } from 'lucide-react';

export const PredicateNode = memo(({ data, selected }: NodeProps) => {
  const nodeData = data as any;

  return (
    <div className={`
      px-4 py-3 border-2 shadow-lg node-predicate
      ${selected ? 'border-primary ring-2 ring-primary/20' : 'border-precondition'}
      clip-hexagon
    `} style={{
      clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
      minWidth: '120px'
    }}>
      <Handle type="target" position={Position.Top} className="w-3 h-3 bg-precondition" />
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-precondition" />
      <div className="flex items-center gap-2 justify-center">
        <GitBranch className="w-4 h-4 text-precondition" />
        <div className="font-medium text-sm">{nodeData.label}</div>
      </div>
      {nodeData.parameters && nodeData.parameters.length > 0 && (
        <div className="text-xs text-muted-foreground mt-1 text-center">
          ({nodeData.parameters.map((p: any) => `${p.name}: ${p.type}`).join(', ')})
        </div>
      )}
    </div>
  );
});

PredicateNode.displayName = 'PredicateNode';
