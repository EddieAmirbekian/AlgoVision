import {EMPTY_NODE, Node} from '../../models/node.model';
import {NodeType} from '../../models/node-type.model';

export function dijkstra(grid: Node[][], startNode: Node, endNode: Node): Node[] {
  const visitedNodesInOrder = [];
  startNode.distance = 0;
  const unvisitedNodes = getAllNodes(grid);
  unvisitedNodes.forEach((node: Node) => {
    node.isVisited = false;
    if (!node.position.equals(startNode.position)) {
      node.distance = Infinity;
    }
  });
  while (unvisitedNodes.length) {
    sortNodesByDistance(unvisitedNodes);
    const closestNode = unvisitedNodes.shift() || EMPTY_NODE;
    // If we encounter a wall, we skip it.
    if (closestNode.type === NodeType.WALL) { continue; }
    // If the closest node is at a distance of infinity,
    // we must be trapped and should therefore stop.
    if (closestNode.distance === Infinity) { return visitedNodesInOrder; }
    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);
    if (closestNode.position.equals(endNode.position)) { return visitedNodesInOrder; }
    updateUnvisitedNeighbors(closestNode, grid);
  }
  return [];
}

function sortNodesByDistance(unvisitedNodes: Node[]): void {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

function updateUnvisitedNeighbors(node: Node, grid: Node[][]): void {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + node.weight + 1;
    neighbor.previousNode = node;
  }
}

function getUnvisitedNeighbors(node: Node, grid: Node[][]): Node[] {
  const neighbors = [];
  const row = node.position.x;
  const col = node.position.y;
  if (row > 0) { neighbors.push(grid[row - 1][col]); }
  if (row < grid.length - 1) { neighbors.push(grid[row + 1][col]); }
  if (col > 0) { neighbors.push(grid[row][col - 1]); }
  if (col < grid[0].length - 1) { neighbors.push(grid[row][col + 1]); }
  return neighbors.filter(neighbor => !neighbor.isVisited);
}

function getAllNodes(grid: Node[][]): Node[] {
  const nodes = [];
  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }
  return nodes;
}

// Backtracks from the endNode to find the shortest path.
// Only works when called *after* the dijkstra method above.
export function getNodesInShortestPathOrder(endNode: Node): Node[] {
  const nodesInShortestPathOrder = [];
  let currentNode: Node | null = endNode;
  while (currentNode !== undefined && currentNode !== null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }
  return nodesInShortestPathOrder;
}
