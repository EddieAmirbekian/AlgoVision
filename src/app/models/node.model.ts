import { NodeType } from './node-type.model';
import { Point } from './point';

export interface Node {
  /**
   * position of node [row, column]
   */
  position: Point;

  type: NodeType;
  weight: 15 | 0;

  /**
   * distance from start node
   */
  distance: number;

  /**
   * for building the path
   */
  previousNode: Node | null;
  path: string[] | null;
  isVisited?: boolean;
}

export const EMPTY_NODE: Node = {
  position: new Point(-2, -2),
  type: NodeType.EMPTY,
  weight: 0,
  distance: Infinity,
  previousNode: null,
  path: null
};
