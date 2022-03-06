import { NodeType } from './node-type.model';
import { Point } from './point';

export interface Node {
  /**
   * position of node [row, column]
   */
  position: Point;

  type: NodeType;
  weight: 30 | 1;

  /**
   * distance from start node ( g score )
   */
  distance: number;

  /**
   * heuristic distance to end node ( h score )
   */
  heuristicDistance: number;

  /**
   * distance to compare with ( f score )
   */
  totalDistance: number;

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
  heuristicDistance: Infinity,
  totalDistance: Infinity,
  previousNode: {} as Node,
  path: null,
};
