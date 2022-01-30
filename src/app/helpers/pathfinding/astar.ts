import {WeightedPathfinder} from './weighted-pathfinder';
import {Node} from '../../models/node.model';
import {Point} from '../../models/point';
import {NodeType} from '../../models/node-type.model';

export class Astar extends WeightedPathfinder {
  public astar(nodes: Node[][], start: Point, target: Point, nodesToAnimate: Node[]): boolean {
    if (!start || !target || start === target) {
      return false;
    }
    nodes[start.x][start.y].distance = 0;
    nodes[start.x][start.y].totalDistance = 0;
    nodes[start.x][start.y].direction = 'up';
    const unvisitedNodes = nodes.reduce((accumulator: Node[], value: Node[]) => accumulator.concat(value), []);
    while (unvisitedNodes.length) {
      let currentNode = this.closestNode(nodes, unvisitedNodes);
      while (currentNode.type === NodeType.WALL && unvisitedNodes.length) {
        currentNode = this.closestNode(nodes, unvisitedNodes);
      }
      if (currentNode.distance === Infinity) {
        return false;
      }
      nodesToAnimate.push(currentNode);
      currentNode.type = NodeType.VISITED;
      if (currentNode.position.equals(target)) {
        return true;
      }
      this.updateNeighbors(nodes, currentNode, nodes[target.x][target.y]);
    }
    return false;
  }
}
