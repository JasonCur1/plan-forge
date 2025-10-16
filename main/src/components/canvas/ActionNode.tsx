import { memo } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { Zap } from 'lucide-react';

export const ActionNode = memo(({ data, selected }: NodeProps) => {
  const nodeData = data as any;
  
  return (
    <div className={`
      border-2 bg-card shadow-lg rounded-lg overflow-hidden
      ${selected ? 'border-primary ring-2 ring-primary/20' : 'border-effect'}
    `} style={{ minWidth: '180px' }}>
      {/* Header */}
      <div className="px-4 py-2 bg-effect/10 border-b border-effect/20">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-effect" />
          <div className="font-semibold text-sm">{nodeData.label}</div>
        </div>
        {nodeData.parameters && nodeData.parameters.length > 0 && (
          <div className="text-xs text-muted-foreground mt-1">
            {nodeData.parameters.map((p: any) => `${p.name}: ${p.type}`).join(', ')}
          </div>
        )}
      </div>

      {/* Preconditions */}
      <div className="px-4 py-2 bg-precondition/5 border-b border-precondition/20 relative">
        <Handle 
          type="target" 
          position={Position.Left} 
          id="precondition"
          className="w-3 h-3 bg-precondition"
          style={{ top: '50%' }}
        />
        <div className="text-xs font-medium text-precondition uppercase tracking-wide">
          Preconditions
        </div>
        <div className="text-xs text-muted-foreground mt-1">
          {nodeData.preconditions && nodeData.preconditions.length > 0 ? nodeData.preconditions.join(', ') : 'None'}
        </div>
      </div>

      {/* Effects */}
      <div className="px-4 py-2 bg-effect/5 relative">
        <Handle 
          type="source" 
          position={Position.Right} 
          id="effect"
          className="w-3 h-3 bg-effect"
          style={{ top: '50%' }}
        />
        <div className="text-xs font-medium text-effect uppercase tracking-wide">
          Effects
        </div>
        <div className="text-xs text-muted-foreground mt-1">
          {nodeData.effects && nodeData.effects.length > 0 ? nodeData.effects.join(', ') : 'None'}
        </div>
      </div>
    </div>
  );
});

ActionNode.displayName = 'ActionNode';
