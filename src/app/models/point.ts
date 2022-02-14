export class Point {
  constructor(public x: number, public y: number) {}

  static random(xMax: number, yMax: number): Point {
    return new Point(
      Math.floor(Math.random() * xMax),
      Math.floor(Math.random() * yMax)
    );
  }

  equals(other: Point): boolean {
    return this.x === other.x && this.y === other.y;
  }

  toString(): string {
    return `${this.x}-${this.y}`;
  }
}
