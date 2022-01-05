export enum NodeType {
  EMPTY = 0,
  START = 1,
  END = 2,
  WALL = 3,
  WEIGHT = 4
}

export type Grid = NodeType[][];
