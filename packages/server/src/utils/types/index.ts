export type ExtractVariables<T> = T extends { variables: object }
  ? T["variables"]
  : never;

export interface Edge<T> {
  node: T;
}

export interface Connection<T> {
  edges: Edge<T>[];
}
