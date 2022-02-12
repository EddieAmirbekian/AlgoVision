import {EMPTY_NODE, Node} from '../../../models/node.model';
import {NodeType} from '../../../models/node-type.model';

export class Dijkstra {
  constructor(
    public grid: Node[][],
    public startNode: Node,
    public endNode: Node
  ) {
  }

  public getNodesInOrder(): Node[] {
    const visitedNodesInOrder = [];
    this.startNode.distance = 0;
    const unvisitedNodes = this.getAllNodes();
    unvisitedNodes.forEach((node: Node) => {
      node.isVisited = false;
      if (!node.position.equals(this.startNode.position)) {
        node.distance = Infinity;
      }
    });
    while (unvisitedNodes.length) {
      this.sortNodesByDistance(unvisitedNodes);
      const closestNode = unvisitedNodes.shift() || EMPTY_NODE;
      if (closestNode.type === NodeType.WALL) {
        continue;
      }
      if (closestNode.distance === Infinity) {
        return visitedNodesInOrder;
      }
      closestNode.isVisited = true;
      visitedNodesInOrder.push(closestNode);
      if (closestNode.position.equals(this.endNode.position)) {
        return visitedNodesInOrder;
      }
      this.updateUnvisitedNeighbors(closestNode);
    }
    return [];
  }

  public getNodesInShortestPathOrder(): Node[] {
    const nodesInShortestPathOrder = [] as Node[];
    let currentNode: Node = this.endNode;
    while (currentNode !== undefined && currentNode !== null) {
      if (nodesInShortestPathOrder.includes(currentNode.previousNode)) {
        break;
      }
      nodesInShortestPathOrder.unshift(currentNode);
      currentNode = currentNode.previousNode;
    }
    return nodesInShortestPathOrder;
  }

  protected sortNodesByDistance(unvisitedNodes: Node[]): void {
    unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
  }

  protected updateUnvisitedNeighbors(node: Node): void {
    const unvisitedNeighbors = this.getUnvisitedNeighbors(node);
    for (const neighbor of unvisitedNeighbors) {
      neighbor.distance = node.distance + node.weight;
      neighbor.previousNode = node;
    }
  }

  protected getUnvisitedNeighbors(node: Node): Node[] {
    const neighbors = [];
    const row = node.position.x;
    const col = node.position.y;
    if (row > 0) {
      neighbors.push(this.grid[row - 1][col]);
    }
    if (row < this.grid.length - 1) {
      neighbors.push(this.grid[row + 1][col]);
    }
    if (col > 0) {
      neighbors.push(this.grid[row][col - 1]);
    }
    if (col < this.grid[0].length - 1) {
      neighbors.push(this.grid[row][col + 1]);
    }
    return neighbors.filter(neighbor => !neighbor.isVisited);
  }

  protected getAllNodes(): Node[] {
    const nodes = [];
    for (const row of this.grid) {
      for (const node of row) {
        nodes.push(node);
      }
    }
    return nodes;
  }
}
