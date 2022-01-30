import {NodeType} from './node-type.model';
import {Point} from './point';

export type Direction = 'up' | 'right' | 'down' | 'left';

export interface Node {
  /**
   * position of node [row, column]
   */
  position: Point;

  type: NodeType;

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
}
