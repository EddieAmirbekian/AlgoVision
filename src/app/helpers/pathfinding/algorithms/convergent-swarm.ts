import { Node } from '../../../models/node.model';
import { Swarm } from './swarm';

export class ConvergentSwarm extends Swarm {
  constructor(
    public grid: Node[][],
    public startNode: Node,
    public endNode: Node,
    public heuristic: (node: Node) => number
  ) {
    super(grid, startNode, endNode, heuristic);
  }
}
