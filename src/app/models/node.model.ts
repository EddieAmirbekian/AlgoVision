import { NodeType } from './node-type.model';
import { Point } from './point';

export type Direction = 'up' | 'right' | 'down' | 'left' | 'up-right' | 'down-right' | 'up-left' | 'down-left' | 'none';

export interface Node {
  /**
   * position of node [row, column]
   */
  position: Point;

  type: NodeType;

  weight: 15 | 0;

  /**
   * distances from start node
   */
  distance: number;
  totalDistance: number;
  heuristicDistance: number;

  /**
   * direction of check
   */
  direction: Direction;

  /**
   * for building the path
   */
  previousNode: Node | null;
  path: string[] | null;
}

export const EMPTY_NODE: Node = {
  position: new Point(-2, -2),
  type: NodeType.EMPTY,
  weight: 0,
  distance: Infinity,
  totalDistance: Infinity,
  heuristicDistance: Infinity,
  direction: 'none',
  previousNode: null,
  path: null
};
