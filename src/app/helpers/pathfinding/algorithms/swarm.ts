import { Astar } from './astar';
import { Node } from '../../../models/node.model';
import { Dijkstra } from './dijkstra';

export class Swarm extends Astar {
  constructor(
    public grid: Node[][],
    public startNode: Node,
    public endNode: Node,
    public heuristic: (node: Node) => number
  ) {
    super(grid, startNode, endNode, heuristic);
  }

  protected updateUnvisitedNeighbors(node: Node): void {
    const unvisitedNeighbors = this.getUnvisitedNeighbors(node);
    for (const neighbor of unvisitedNeighbors) {
      neighbor.distance = neighbor.totalDistance =
        node.distance + neighbor.weight * this.heuristic(neighbor);
      neighbor.previousNode = node;
    }
  }
}
