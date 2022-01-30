import {Point} from '../../models/point';
import {Node} from '../../models/node.model';
import {NodeType} from '../../models/node-type.model';

export class Pathfinder {
  public getNeighbors(pos: Point, nodes: Node[][]): Node[] {
    const neighbors = [] as Node[];
    let potentialNeighbor;
    if (nodes[pos.x - 1] && nodes[pos.x - 1][pos.y]) {
      potentialNeighbor = new Point(pos.x - 1, pos.y);
      if (nodes[potentialNeighbor.x][potentialNeighbor.y].type !== NodeType.WALL) {
        neighbors.push(nodes[potentialNeighbor.x][potentialNeighbor.y]);
      }
    }
    if (nodes[pos.x + 1] && nodes[pos.x + 1][pos.y]) {
      potentialNeighbor = new Point(pos.x + 1, pos.y);
      if (nodes[potentialNeighbor.x][potentialNeighbor.y].type !== NodeType.WALL) {
        neighbors.push(nodes[potentialNeighbor.x][potentialNeighbor.y]);
      }
    }
    if (nodes[pos.x][pos.y - 1]) {
      potentialNeighbor = new Point(pos.x, pos.y - 1);
      if (nodes[potentialNeighbor.x][potentialNeighbor.y].type !== NodeType.WALL) {
        neighbors.push(nodes[potentialNeighbor.x][potentialNeighbor.y]);
      }
    }
    if (nodes[pos.x][pos.y + 1]) {
      potentialNeighbor = new Point(pos.x, pos.y + 1);
      if (nodes[potentialNeighbor.x][potentialNeighbor.y + 1].type !== NodeType.WALL) {
        neighbors.push(nodes[potentialNeighbor.x][potentialNeighbor.y]);
      }
    }
    return neighbors;
  }
}
