import {Injectable} from '@angular/core';
import {Grid, NodeType} from '../controls/models/node-type.model';
import {Subject} from 'rxjs';
import {Pair} from 'tstl';

type Orientation = 'horizontal' | 'vertical';
type Speed = 'fast' | 'average' | 'slow';
type Point = Pair<number, number>;

@Injectable()
export class GridService {
  public readonly rowsCount = 21;
  public readonly colsCount = 59;

  public startNode: Point = new Pair(10, 6);
  public endNode: Point = new Pair(10, 52);
  public nodes: Grid = [];
  public isMovingPoint = false;
  public isMouseDown = false;
  public eventBus$: Subject<Pair<Point, NodeType>> = new Subject<Pair<Point, NodeType>>();

  private speed: Speed = 'average';
  private wallsToAnimate: Array<Pair<number, number>> = [];
  private objects: Array<Pair<Point, NodeType>> = [];
  private prevPos: Point = new Pair(-1, -1);

  constructor() {
    for (let i = 0; i < this.rowsCount; i++) {
      const row = [];
      for (let j = 0; j < this.colsCount; j++) {
        if (this.startNode.equals(new Pair(i, j))) {
          row.push(NodeType.START);
        } else if (this.endNode.equals(new Pair(i, j))) {
          row.push(NodeType.END);
        } else {
          row.push(NodeType.EMPTY);
        }
      }
      this.nodes.push(row);
    }
  }

  public resetBooleans(): void {
    this.isMovingPoint = false;
    this.isMouseDown = false;
  }

  public generateMaze(): void {
    this.recursiveDivisionMaze(2, this.rowsCount - 3, 2, this.colsCount - 3, 'horizontal', false);
    this.mazeGenerationAnimations();
  }

  public setPrevPos(x: number, y: number): void {
    this.prevPos = new Pair(x, y);
  }

  public getPrevPos(): Point {
    return this.prevPos;
  }

  public addPoint(): Point {
    let x = Math.floor(Math.random() * this.rowsCount);
    let y = Math.floor(Math.random() * this.colsCount);
    while (this.nodes[x][y] !== NodeType.EMPTY) {
      x = Math.floor(Math.random() * this.rowsCount);
      y = Math.floor(Math.random() * this.colsCount);
    }
    this.nodes[x][y] = NodeType.POINT;
    this.objects.push(new Pair(new Pair(x, y), NodeType.POINT));
    return new Pair(x, y);
  }

  public addWeight(): void {

  }

  public movePoint(from: Point, to: Point): void {
    if (!from.equals(new Pair(-1, -1)) && this.nodes[to.first][to.second] !== NodeType.WALL) {
      const type = this.nodes[from.first][from.second];
      this.nodes[to.first][to.second] = type;
      this.nodes[from.first][from.second] = NodeType.EMPTY;
      if (type === NodeType.START) {
        this.startNode = to;
      } else if (type === NodeType.END) {
        this.endNode = to;
      }
      this.eventBus$.next(new Pair(to, type));
    }
  }

  public putWall(x: number, y: number): void {
    const node = this.nodes[x][y];
    this.nodes[x][y] = node === NodeType.EMPTY ? NodeType.WALL : NodeType.EMPTY;
    this.eventBus$.next(new Pair(new Pair(x, y), this.nodes[x][y]));
  }

  public clearWallsAndWeights(): void {
    for (let i = 0; i < this.rowsCount; i++) {
      for (let j = 0; j < this.colsCount; j++) {
        if (this.nodes[i][j] === NodeType.WALL || this.nodes[i][j] === NodeType.WEIGHT) {
          this.nodes[i][j] = NodeType.EMPTY;
        }
      }
    }
  }

  public clearAll(): void {
    for (let i = 0; i < this.rowsCount; i++) {
      for (let j = 0; j < this.colsCount; j++) {
        if (this.nodes[i][j] !== NodeType.START && this.nodes[i][j] !== NodeType.END) {
          this.nodes[i][j] = NodeType.EMPTY;
        }
      }
    }
    this.objects = [];
  }

  private recursiveDivisionMaze(
    rowStart: number,
    rowEnd: number,
    colStart: number,
    colEnd: number,
    orientation: Orientation,
    surroundingWalls: boolean
  ): void {
    if (rowEnd < rowStart || colEnd < colStart) {
      return;
    }
    if (!surroundingWalls) {
      const relevantIds = [this.startNode, this.endNode];
      if (this.objects) {
        relevantIds.push(...this.objects.map((value: Pair<Pair<number, number>, NodeType>) => value.first));
      }
      for (let i = 0; i < this.rowsCount; i++) {
        for (let j = 0; j < this.colsCount; j++) {
          if (!relevantIds.includes(new Pair(i, j))) {
            if (i === 0 || j === 0 || i === this.rowsCount - 1 || j === this.colsCount - 1) {
              this.wallsToAnimate.push(new Pair(i, j));
            }
          }
        }
      }
      surroundingWalls = true;
    }
    if (orientation === 'horizontal') {
      const possibleRows = [];
      for (let n = rowStart; n <= rowEnd; n += 2) {
        possibleRows.push(n);
      }
      const possibleCols = [];
      for (let n = colStart - 1; n <= colEnd + 1; n += 2) {
        possibleCols.push(n);
      }
      const randomRowIndex = Math.floor(Math.random() * possibleRows.length);
      const randomColIndex = Math.floor(Math.random() * possibleCols.length);
      const currentRow = possibleRows[randomRowIndex];
      const colRandom = possibleCols[randomColIndex];
      for (let i = 0; i < this.rowsCount; i++) {
        for (let j = 0; j < this.colsCount; j++) {
          if (i === currentRow && j !== colRandom && j >= colStart - 1 && j <= colEnd + 1) {
            if (this.nodes[i][j] === NodeType.EMPTY) {
              this.wallsToAnimate.push(new Pair(i, j));
            }
          }
        }
      }
      if (currentRow - 2 - rowStart > colEnd - colStart) {
        this.recursiveDivisionMaze(rowStart, currentRow - 2, colStart, colEnd, orientation, surroundingWalls);
      } else {
        this.recursiveDivisionMaze(rowStart, currentRow - 2, colStart, colEnd, 'vertical', surroundingWalls);
      }
      if (rowEnd - (currentRow + 2) > colEnd - colStart) {
        this.recursiveDivisionMaze(currentRow + 2, rowEnd, colStart, colEnd, orientation, surroundingWalls);
      } else {
        this.recursiveDivisionMaze(currentRow + 2, rowEnd, colStart, colEnd, 'vertical', surroundingWalls);
      }
    } else {
      const possibleCols = [];
      for (let n = colStart; n <= colEnd; n += 2) {
        possibleCols.push(n);
      }
      const possibleRows = [];
      for (let n = rowStart - 1; n <= rowEnd + 1; n += 2) {
        possibleRows.push(n);
      }
      const randomColIndex = Math.floor(Math.random() * possibleCols.length);
      const randomRowIndex = Math.floor(Math.random() * possibleRows.length);
      const currentCol = possibleCols[randomColIndex];
      const rowRandom = possibleRows[randomRowIndex];
      for (let i = 0; i < this.rowsCount; i++) {
        for (let j = 0; j < this.colsCount; j++) {
          if (j === currentCol && i !== rowRandom && i >= rowStart - 1 && i <= rowEnd + 1) {
            if (this.nodes[i][j] === NodeType.EMPTY) {
              this.wallsToAnimate.push(new Pair(i, j));
            }
          }
        }
      }
      if (rowEnd - rowStart > currentCol - 2 - colStart) {
        this.recursiveDivisionMaze(rowStart, rowEnd, colStart, currentCol - 2, 'horizontal', surroundingWalls);
      } else {
        this.recursiveDivisionMaze(rowStart, rowEnd, colStart, currentCol - 2, orientation, surroundingWalls);
      }
      if (rowEnd - rowStart > colEnd - (currentCol + 2)) {
        this.recursiveDivisionMaze(rowStart, rowEnd, currentCol + 2, colEnd, 'horizontal', surroundingWalls);
      } else {
        this.recursiveDivisionMaze(rowStart, rowEnd, currentCol + 2, colEnd, orientation, surroundingWalls);
      }
    }
  }

  private timeout(nodes: Array<Pair<number, number>>, speed: number, index: number): void {
    setTimeout(() => {
      if (index === nodes.length) {
        this.wallsToAnimate = [];
        return;
      }
      this.nodes[nodes[index].first][nodes[index].second] = NodeType.WALL;
      this.timeout(nodes, speed, index + 1);
    }, speed);
  }

  private mazeGenerationAnimations(): void {
    const nodes = this.wallsToAnimate.slice();
    const speed = this.speed === 'fast' ?
      5 : this.speed === 'average' ?
        25 : 75;
    this.timeout(nodes, speed, 0);
  }

  public changeSpeed(speed: Speed): void {
    this.speed = speed;
  }
}
