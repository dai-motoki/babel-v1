
export interface Node {
  id: string;
  name: string;
  type: 'file' | 'directory';
}

export interface Link {
  source: string;
  target: string;
}

export interface DirectoryStructure {
  nodes: Node[];
  links: Link[];
}

export interface FileChange {
  type: 'add' | 'modify' | 'delete';
  path: string;
}
