import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';
import {Node} from '../models/node.model';
import {Point} from '../models/point';
import {NodeType} from '../models/node-type.model';
import {AlgorithmService} from './algorithm.service';
import {Algorithm} from '../models/algorithm.enum';
import {dijkstra, getNodesInShortestPathOrder} from "../helpers/pathfinding/dijkstra";

type Orientation = 'horizontal' | 'vertical';
export type Speed = 'fast' | 'average' | 'slow';

@Injectable()
export class GridService {
  private NODES: Node[][] = [];
  private speed: Speed = 'fast';
  private wallsToAnimate: Array<Point> = [];
  private prevPos: Point = new Point(-1, -1);

  public readonly rowsCount = 21;
  public readonly colsCount = 59;

  public startNodePos: Point = new Point(10, 6);
  public endNodePos: Point = new Point(10, 52);
  public nodes: BehaviorSubject<Node[][]> = new BehaviorSubject<Node[][]>([]);

  public isMouseDown = false;
  public isMovingPoint = false;

  constructor(private algorithmService: AlgorithmService) {
    for (let i = 0; i < this.rowsCount; i++) {
      const row = [] as Node[];
      for (let j = 0; j < this.colsCount; j++) {
        const point = new Point(i, j);
        if (point.equals(this.startNodePos)) {
          row.push({position: point, type: NodeType.START, weight: 0} as Node);
        } else if (point.equals(this.endNodePos)) {
          row.push({position: point, type: NodeType.END, weight: 0} as Node);
        } else {
          row.push({position: point, type: NodeType.EMPTY, weight: 0} as Node);
        }
      }
      this.NODES.push(row);
    }
    this.nodes.next(this.NODES);
  }

  public get startNode(): Node {
    return this.getNodeByPos(this.startNodePos);
  }

  public get endNode(): Node {
    return this.getNodeByPos(this.endNodePos);
  }

  public getSpeed(): Speed {
    return this.speed;
  }

  public setPrevPos(pos: Point): void {
    this.prevPos = pos;
  }

  public getPrevPos(): Point {
    return this.prevPos;
  }

  public movePoint(from: Point, to: Point): void {
    if (!from.equals(new Point(-1, -1)) && this.NODES[to.x][to.y].type !== NodeType.WALL) {
      const type = this.NODES[from.x][from.y].type;
      this.NODES[to.x][to.y].type = type;
      this.NODES[from.x][from.y].type = NodeType.EMPTY;
      if (type === NodeType.START) {
        this.startNodePos = to;
      } else if (type === NodeType.END) {
        this.endNodePos = to;
      }
      this.nodes.next(this.NODES);
    }
  }

  public addWeight(): void {
    throw new Error('Not implemented.');
  }

  public doWall(pos: Point): void {
    if (this.NODES[pos.x][pos.y].type === NodeType.WALL) {
      this.updateNodeType(pos, NodeType.EMPTY);
    } else if (this.NODES[pos.x][pos.y].type === NodeType.EMPTY) {
      this.updateNodeType(pos, NodeType.WALL);
    }
  }

  public clearWallsAndWeights(): void {
    for (let i = 0; i < this.rowsCount; i++) {
      for (let j = 0; j < this.colsCount; j++) {
        if (this.NODES[i][j].type === NodeType.WALL || this.NODES[i][j].type === NodeType.WEIGHT) {
          this.NODES[i][j].type = NodeType.EMPTY;
        }
      }
    }
    this.nodes.next(this.NODES);
  }

  public clearAll(): void {
    for (let i = 0; i < this.rowsCount; i++) {
      for (let j = 0; j < this.colsCount; j++) {
        if (this.NODES[i][j].type !== NodeType.START && this.NODES[i][j].type !== NodeType.END) {
          this.NODES[i][j].type = NodeType.EMPTY;
        }
      }
    }
    this.nodes.next(this.NODES);
  }

  private updateNodeType(pos: Point, type: NodeType): void {
    this.NODES[pos.x][pos.y].type = type;
    this.nodes.next(this.NODES);
  }

  // search algorithms part

  public getNodeByPos(pos: Point): Node {
    return this.NODES[pos.x][pos.y];
  }

  public doAStar(): void {
    throw new Error('Method not implemented!');
  }

  public animateDijkstra(visitedNodesInOrder: Node[], nodesInShortestPathOrder: Node[]): void {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          this.animateShortestPath(nodesInShortestPathOrder);
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const nodePos = visitedNodesInOrder[i].position;
        if (
          this.getNodeByPos(nodePos).type !== NodeType.START
          && this.getNodeByPos(nodePos).type !== NodeType.END
        ) {
          this.NODES[nodePos.x][nodePos.y].type = NodeType.VISITED;
        }
        this.nodes.next(this.NODES);
      }, 10 * i);
    }
  }

  public animateShortestPath(nodesInShortestPathOrder: Node[]): void {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const nodePos = nodesInShortestPathOrder[i].position;
        if (
          !nodePos.equals(this.startNodePos)
          && !nodePos.equals(this.endNodePos)
        ) {
          this.NODES[nodePos.x][nodePos.y].type = NodeType.PATH;
          this.nodes.next(this.NODES);
        }
      }, 50 * i);
    }
  }

  public doDijkstra(): void {
    const visitedNodesInOrder = dijkstra(this.NODES, this.startNode, this.endNode);
    const nodesInShortestPathOrder = getNodesInShortestPathOrder(this.endNode);
    this.animateDijkstra(visitedNodesInOrder, nodesInShortestPathOrder);
  }

  public visualize(): void {
    switch (this.algorithmService.getAlgorithm()) {
      case Algorithm.ASTAR:
        this.doAStar();
        break;
      case Algorithm.DIJKSTRA:
        this.doDijkstra();
        break;
    }
  }

  // Maze part

  public generateMaze(): void {
    this.recursiveDivisionMaze(2, this.rowsCount - 3, 2, this.colsCount - 3, 'horizontal', false);
    this.mazeGenerationAnimations();
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
      const relevantIds = [this.startNodePos, this.endNodePos];
      for (let i = 0; i < this.rowsCount; i++) {
        for (let j = 0; j < this.colsCount; j++) {
          if (!relevantIds.includes(new Point(i, j))) {
            if (i === 0 || j === 0 || i === this.rowsCount - 1 || j === this.colsCount - 1) {
              this.wallsToAnimate.push(new Point(i, j));
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
            if (this.NODES[i][j].type === NodeType.EMPTY) {
              this.wallsToAnimate.push(new Point(i, j));
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
            if (this.NODES[i][j].type === NodeType.EMPTY) {
              this.wallsToAnimate.push(new Point(i, j));
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

  private timeout(nodes: Array<Point>, speed: number, index: number): void {
    setTimeout(() => {
      if (index === nodes.length) {
        this.wallsToAnimate = [];
        return;
      }
      this.updateNodeType(nodes[index], NodeType.WALL);
      this.timeout(nodes, speed, index + 1);
    }, speed);
  }

  private mazeGenerationAnimations(): void {
    const nodes = this.wallsToAnimate.slice().filter((point: Point) => point.x >= 0 && point.y >= 0);
    const speed = this.speed === 'fast' ?
      5 : this.speed === 'average' ?
        25 : 75;
    this.timeout(nodes, speed, 0);
  }

  public changeSpeed(speed: Speed): void {
    this.speed = speed;
  }
}
