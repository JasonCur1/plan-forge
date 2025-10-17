export type NodeType = 'type' | 'predicate' | 'action' | 'object';

export interface Parameter {
  name: string;
  type: string;
  value?: string;
}

export interface TypeNodeData {
  label: string;
  description?: string;
}

export interface PredicateNodeData {
  label: string;
  parameters: Parameter[];
  preconditions: Array<{ object1: string; object2: string }>;
  description?: string;
}

export interface ActionNodeData {
  label: string;
  parameters: Parameter[];
  preconditions: Array<{ object1: string; object2: string }>;
  effects: Array<{ object1: string; object2: string }>;
  description?: string;
}

export interface ObjectNodeData {
  label: string;
  type: string;
  description?: string;
}

export type NodeData = TypeNodeData | PredicateNodeData | ActionNodeData | ObjectNodeData;
