import {Pathfinder} from './pathfinder';
import {EMPTY_NODE, Node} from '../../models/node.model';
import {Point} from '../../models/point';
import {NodeType} from '../../models/node-type.model';

export class BFS extends Pathfinder {
  public bfs(nodes: Node[][], start: Point, target: Point, nodesToAnimate: Node[]): boolean {
    if (!start || !target || start === target) {
      return false;
    }
    const structure = [nodes[start.x][start.y]];
    const exploredNodes = {[start.toString()]: true};
    while (structure.length) {
      const currentNode = structure.shift() || EMPTY_NODE;
      nodesToAnimate.push(currentNode);
      currentNode.type = NodeType.VISITED;
      if (currentNode.position.equals(target)) {
        return true;
      }
      const currentNeighbors = this.getNeighbors(currentNode.position, nodes);
      currentNeighbors.forEach((neighbor: Node) => {
        if (!exploredNodes[neighbor.position.toString()]) {
          exploredNodes[neighbor.position.toString()] = true;
          nodes[neighbor.position.x][neighbor.position.y].previousNode = currentNode;
          structure.push(nodes[neighbor.position.x][neighbor.position.y]);
        }
      });
    }
    return false;
  }
}
