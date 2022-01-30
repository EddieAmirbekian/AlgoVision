import {Direction, EMPTY_NODE, Node} from '../../models/node.model';
import {Pathfinder} from './pathfinder';

export class WeightedPathfinder extends Pathfinder {
  public closestNode(nodes: Node[][], unvisitedNodes: Node[]): Node {
    let currentClosest;
    let index;
    for (let i = 0; i < unvisitedNodes.length; i++) {
      const pos = unvisitedNodes[i].position;
      if (!currentClosest || currentClosest.totalDistance > nodes[pos.x][pos.y].totalDistance) {
        currentClosest = nodes[pos.x][pos.y];
        index = i;
      } else if (currentClosest.totalDistance === nodes[pos.x][pos.y].totalDistance) {
        if (currentClosest.heuristicDistance > nodes[pos.x][pos.y].heuristicDistance) {
          currentClosest = nodes[pos.x][pos.y];
          index = i;
        }
      }
    }
    if (index) {
      unvisitedNodes.splice(index, 1);
    }
    return currentClosest || EMPTY_NODE;
  }

  public updateNeighbors(nodes: Node[][], node: Node, targetNode: Node): void {
    const neighbors = this.getNeighbors(node.position, nodes);
    for (const neighbor of neighbors) {
      const pos = neighbor.position;
      if (targetNode) {
        this.updateNode(node, nodes[pos.x][pos.y], nodes[targetNode.position.x][targetNode.position.y]);
      } else {
        this.updateNode(node, nodes[pos.x][pos.y], EMPTY_NODE);
      }
    }
  }

  public updateNode(currentNode: Node, targetNode: Node, actualTargetNode: Node): void {
    const distance = this.getDistance(currentNode, targetNode);
    if (distance) {
      if (!targetNode.heuristicDistance) {
        targetNode.heuristicDistance = this.manhattanDistance(targetNode, actualTargetNode);
      }
      const distanceToCompare = currentNode.distance + targetNode.weight + distance[0];
      if (distanceToCompare < targetNode.distance) {
        targetNode.distance = distanceToCompare;
        targetNode.totalDistance = targetNode.distance + targetNode.heuristicDistance;
        targetNode.previousNode = currentNode;
        targetNode.path = distance[1];
        targetNode.direction = distance[2];
      }
    }
  }

  public getDistance(node1: Node, node2: Node): [number, Array<string> | null, Direction] | undefined {
    const currentCoordinates = node1.position;
    const targetCoordinates = node2.position;
    const x1 = currentCoordinates.x;
    const y1 = currentCoordinates.y;
    const x2 = targetCoordinates.x;
    const y2 = targetCoordinates.y;
    if (x2 < x1 && y1 === y2) {
      if (node1.direction === 'up') {
        return [1, ['f'], 'up'];
      } else if (node1.direction === 'right') {
        return [2, ['l', 'f'], 'up'];
      } else if (node1.direction === 'left') {
        return [2, ['r', 'f'], 'up'];
      } else if (node1.direction === 'down') {
        return [3, ['r', 'r', 'f'], 'up'];
      } else if (node1.direction === 'up-right') {
        return [1.5, null, 'up'];
      } else if (node1.direction === 'down-right') {
        return [2.5, null, 'up'];
      } else if (node1.direction === 'up-left') {
        return [1.5, null, 'up'];
      } else if (node1.direction === 'down-left') {
        return [2.5, null, 'up'];
      }
    } else if (x2 > x1 && y1 === y2) {
      if (node1.direction === 'up') {
        return [3, ['r', 'r', 'f'], 'down'];
      } else if (node1.direction === 'right') {
        return [2, ['r', 'f'], 'down'];
      } else if (node1.direction === 'left') {
        return [2, ['l', 'f'], 'down'];
      } else if (node1.direction === 'down') {
        return [1, ['f'], 'down'];
      } else if (node1.direction === 'up-right') {
        return [2.5, null, 'down'];
      } else if (node1.direction === 'down-right') {
        return [1.5, null, 'down'];
      } else if (node1.direction === 'up-left') {
        return [2.5, null, 'down'];
      } else if (node1.direction === 'down-left') {
        return [1.5, null, 'down'];
      }
    }
    if (y2 < y1 && x1 === x2) {
      if (node1.direction === 'up') {
        return [2, ['l', 'f'], 'left'];
      } else if (node1.direction === 'right') {
        return [3, ['l', 'l', 'f'], 'left'];
      } else if (node1.direction === 'left') {
        return [1, ['f'], 'left'];
      } else if (node1.direction === 'down') {
        return [2, ['r', 'f'], 'left'];
      } else if (node1.direction === 'up-right') {
        return [2.5, null, 'left'];
      } else if (node1.direction === 'down-right') {
        return [2.5, null, 'left'];
      } else if (node1.direction === 'up-left') {
        return [1.5, null, 'left'];
      } else if (node1.direction === 'down-left') {
        return [1.5, null, 'left'];
      }
    } else if (y2 > y1 && x1 === x2) {
      if (node1.direction === 'up') {
        return [2, ['r', 'f'], 'right'];
      } else if (node1.direction === 'right') {
        return [1, ['f'], 'right'];
      } else if (node1.direction === 'left') {
        return [3, ['r', 'r', 'f'], 'right'];
      } else if (node1.direction === 'down') {
        return [2, ['l', 'f'], 'right'];
      } else if (node1.direction === 'up-right') {
        return [1.5, null, 'right'];
      } else if (node1.direction === 'down-right') {
        return [1.5, null, 'right'];
      } else if (node1.direction === 'up-left') {
        return [2.5, null, 'right'];
      } else if (node1.direction === 'down-left') {
        return [2.5, null, 'right'];
      }
    }
    return undefined;
  }

  public manhattanDistance(node1: Node, node2: Node): number {
    const x1 = node1.position.x;
    const y1 = node1.position.y;
    const x2 = node2.position.x;
    const y2 = node2.position.y;

    const dx = Math.abs(x1 - x2);
    const dy = Math.abs(y1 - y2);

    return (dx + dy);
  }

}
