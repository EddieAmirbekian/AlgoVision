import {Pair} from 'tstl';
import {PathfinderNode} from '../../models/pathfinder-node.model';

type Point = Pair<number, number>;

export class Pathfinder {
  public closestNode(nodes: Array<PathfinderNode>, unvisitedNodes: Array<PathfinderNode>): Point {
    let currentClosest: PathfinderNode | undefined;
    let index: number | undefined;
    for (let i = 0; i < unvisitedNodes.length; i++) {
      const node = nodes.find((point: PathfinderNode) => unvisitedNodes[i].equals(point)) || PathfinderNode.EMPTY;
      if (!currentClosest || currentClosest.totalDistance > node.totalDistance) {
        currentClosest = node;
        index = i;
      } else if (currentClosest.totalDistance === node.totalDistance) {
        if (currentClosest.heuristicDistance > node.heuristicDistance) {
          currentClosest = node;
          index = i;
        }
      }
    }
    unvisitedNodes.splice(index || 0, 1);
    return new Pair(currentClosest?.row || -1, currentClosest?.col || -1);
  }
}
