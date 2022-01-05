import {Injectable} from '@angular/core';
import {Grid, NodeType} from '../controls/models/node-type.model';
import {Subject} from 'rxjs';
import {Pair} from 'tstl';

type Orientation = 'horizontal' | 'vertical';
type Speed = 'fast' | 'average' | 'slow';

@Injectable()
export class GridService {
  public readonly rowsCount = 21;
  public readonly colsCount = 60;
  public readonly startNode: Pair<number, number> = new Pair<number, number>(10, 10);
  public readonly endNode: Pair<number, number> = new Pair<number, number>(16, 49);

  public nodes: Grid = [];
  public eventBus$: Subject<void> = new Subject<void>();

  private speed: Speed = 'average';
  private wallsToAnimate: Array<Pair<number, number>> = [];
  private objects: Array<Pair<Pair<number, number>, NodeType>> = [];

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

  public generateMaze(): void {
    this.recursiveDivisionMaze(2, this.rowsCount - 3, 2, this.colsCount - 3, 'horizontal', false);
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

  public mazeGenerationAnimations(): void {
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
