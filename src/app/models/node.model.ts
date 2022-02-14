import { NodeType } from './node-type.model';
import { Point } from './point';

export interface Node {
  /**
   * position of node [row, column]
   */
  position: Point;

  type: NodeType;
  weight: 15 | 1;

  /**
   * distance from start node
   */
  distance: number;

  /**
   * for building the path
   */
  previousNode: Node;
  path: string[] | null;
  isVisited?: boolean;
}

export const EMPTY_NODE: Node = {
  position: new Point(-2, -2),
  type: NodeType.EMPTY,
  weight: 1,
  distance: Infinity,
  previousNode: {} as Node,
  path: null,
};
