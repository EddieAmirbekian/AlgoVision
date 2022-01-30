export class Point {
  constructor(public x: number, public y: number) {
  }

  public static random(xMax: number, yMax: number): Point {
    return new Point(
      Math.floor(Math.random() * xMax),
      Math.floor(Math.random() * yMax)
    );
  }

  public equals(other: Point): boolean {
    return this.x === other.x && this.y === other.y;
  }

  public toString(): string {
    return `${this.x}-${this.y}`;
  }
}
