import { Astar } from './astar';
import { Node } from '../../../models/node.model';

export class ConvergentSwarm extends Astar {
  constructor(
    public grid: Node[][],
    public startNode: Node,
    public endNode: Node,
    public heuristic: (node: Node) => number
  ) {
    super(grid, startNode, endNode, heuristic);
  }
}
