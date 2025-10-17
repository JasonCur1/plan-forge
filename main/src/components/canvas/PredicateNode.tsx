import { memo } from 'react';
import { Handle, Position, NodeProps } from '@xyflow/react';
import { GitBranch, Box } from 'lucide-react';
import { cn } from '@/lib/utils';

export const PredicateNode = memo(({ data, selected }: NodeProps) => {
  const nodeData = data as any;

  // Logic to display parameters (e.g., ?x, ?y)
  const paramDisplay = nodeData.parameters && nodeData.parameters.length > 0
    ? `(${nodeData.parameters.map((p: any) => `${p.name}`).join(', ')})`
    : '()';

  // Logic to display assigned objects (e.g., block: a, block: b)
  const assignedObjects = nodeData.preconditions || [];

  return (
    <div className={`
      px-4 py-3 border-2 shadow-lg node-precondition
      ${selected ? 'border-primary ring-2 ring-primary/20' : 'border-precondition'}
    `} style={{
      clipPath: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
      minWidth: '160px',
    }}>
      <Handle type="target" position={Position.Top} className="w-3 h-3 bg-precondition" />
      <Handle type="source" position={Position.Bottom} className="w-3 h-3 bg-precondition" />

      <div className="flex flex-col items-center justify-center space-y-1">
        <div className="flex items-center gap-2">
          <GitBranch className="w-4 h-4 text-precondition" />
          <div className="font-semibold text-sm">{nodeData.label}</div>
        </div>

        {/* Parameter placeholders (e.g., (?x, ?y)) */}
        <div className="text-xs text-muted-foreground mt-1 text-center font-mono">
          {paramDisplay}
        </div>

        {/* Assigned Objects */}
        {assignedObjects.length > 0 && (
          <div className="flex flex-wrap gap-1.5 justify-center mt-2">
            {assignedObjects.map((arg: { object1: string; object2: string }, index: number) => (
              <div
                key={index}
                className={cn(
                  "flex items-center gap-1 text-xs px-2 py-0.5 rounded-full node-parameter border-parameter/50",
                  { 'bg-parameter/30': index % 2 === 0, 'bg-parameter/50': index % 2 !== 0 }
                )}
              >
                <Box className="w-3 h-3 text-parameter" />
                <span>
                  {arg.object1}
                  {arg.object2 && ` & ${arg.object2}`}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
});

PredicateNode.displayName = 'PredicateNode';
