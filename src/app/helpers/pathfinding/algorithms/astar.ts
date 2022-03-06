import { Node } from '../../../models/node.model';
import { Dijkstra } from './dijkstra';

export class Astar extends Dijkstra {
  constructor(
    public grid: Node[][],
    public startNode: Node,
    public endNode: Node,
    public heuristic: (node: Node) => number
  ) {
    super(grid, startNode, endNode);
  }

  protected sortNodesByDistance(unvisitedNodes: Node[]): void {
    unvisitedNodes.sort(
      (nodeA, nodeB) => nodeA.totalDistance - nodeB.totalDistance
    );
  }

  protected updateUnvisitedNeighbors(node: Node): void {
    const unvisitedNeighbors = this.getUnvisitedNeighbors(node);
    for (const neighbor of unvisitedNeighbors) {
      neighbor.distance = node.distance + neighbor.weight;
      neighbor.totalDistance =
        node.distance + neighbor.weight * this.heuristic(neighbor);
      neighbor.previousNode = node;
    }
  }
}
