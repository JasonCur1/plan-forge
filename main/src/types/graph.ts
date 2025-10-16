export type NodeType = 'type' | 'predicate' | 'action' | 'object';

export interface TypeNodeData {
  label: string;
  description?: string;
}

export interface PredicateNodeData {
  label: string;
  parameters: Array<{ name: string; type: string }>;
  description?: string;
}

export interface ActionNodeData {
  label: string;
  parameters: Array<{ name: string; type: string }>;
  preconditions: string[];
  effects: string[];
  description?: string;
}

export interface ObjectNodeData {
  label: string;
  type: string;
  description?: string;
}

export type NodeData = TypeNodeData | PredicateNodeData | ActionNodeData | ObjectNodeData;
