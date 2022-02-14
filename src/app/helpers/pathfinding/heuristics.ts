import { Node } from '../../models/node.model';

export const manhattanDistance = (to: Node) => (from: Node) => {
  return Math.sqrt(
    Math.pow(to.position.x - from.position.x, 2) +
      Math.pow(to.position.y - from.position.y, 2)
  );
};

export const poweredManhattanDistance = (to: Node) => (from: Node) => {
  return (
    Math.pow(to.position.x - from.position.x, 2) +
    Math.pow(to.position.y - from.position.y, 2)
  );
};

export const extraPoweredManhattanDistance = (to: Node) => (from: Node) => {
  return Math.pow(
    Math.pow(to.position.x - from.position.x, 2) +
      Math.pow(to.position.y - from.position.y, 2),
    3.5
  );
};
