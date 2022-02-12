import {Node} from "../../models/node.model";

export const manhattanDistance = (to: Node) => (from: Node) => {
  const x1 = to.position.x;
  const y1 = to.position.y;
  const x2 = from.position.x;
  const y2 = from.position.y;
  return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}

export const poweredManhattanDistance = (to: Node) => (from: Node) => {
  const x1 = to.position.x;
  const y1 = to.position.y;
  const x2 = from.position.x;
  const y2 = from.position.y;
  return Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2);
}

export const extraPoweredManhattanDistance = (to: Node) => (from: Node) => {
  const x1 = to.position.x;
  const y1 = to.position.y;
  const x2 = from.position.x;
  const y2 = from.position.y;
  return Math.pow(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2), 7);
}
