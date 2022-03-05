import { Node } from '../../models/node.model';

export const manhattanDistance = (to: Node) => (from: Node) => {
  return (
    Math.abs(to.position.x - from.position.x) +
    Math.abs(to.position.y - from.position.y)
  );
};

export const poweredManhattanDistance = (to: Node) => (from: Node) => {
  return Math.pow(
    Math.abs(to.position.x - from.position.x) +
      Math.abs(to.position.y - from.position.y),
    2
  );
};

export const extraPoweredManhattanDistance = (to: Node) => (from: Node) => {
  return Math.pow(
    Math.abs(to.position.x - from.position.x) +
      Math.abs(to.position.y - from.position.y),
    7
  );
};
