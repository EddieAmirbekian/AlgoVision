import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Node } from '../models/node.model';
import { Point } from '../models/point';
import { NodeType } from '../models/node-type.model';
import { AlgorithmService } from './algorithm.service';
import { Algorithm } from '../models/algorithm.enum';
import { Dijkstra } from '../helpers/pathfinding/algorithms/dijkstra';
import { Astar } from '../helpers/pathfinding/algorithms/astar';
import {
  extraPoweredManhattanDistance,
  manhattanDistance,
  poweredManhattanDistance,
} from '../helpers/pathfinding/heuristics';
import { Swarm } from '../helpers/pathfinding/algorithms/swarm';
import { ConvergentSwarm } from '../helpers/pathfinding/algorithms/convergent-swarm';
import { MatSnackBar } from '@angular/material/snack-bar';

type Orientation = 'horizontal' | 'vertical';
export type Speed = 'fast' | 'average' | 'slow';

@Injectable()
export class GridService {
  private NODES: Node[][] = [];
  private speed: Speed = 'fast';
  private wallsToAnimate: Point[] = [];
  private prevPos: Point = new Point(-1, -1);

  rowsCount = 21;
  colsCount = 59;
  readonly nodeSize = 25;

  startNodePos: Point = new Point(10, 6);
  endNodePos: Point = new Point(10, 52);
  nodes: BehaviorSubject<Node[][]> = new BehaviorSubject<Node[][]>([]);

  isMouseDown = false;
  isMovingPoint = false;
  isDrawn = false;

  constructor(
    private algorithmService: AlgorithmService,
    private snackBar: MatSnackBar
  ) {
    this.rowsCount = this.calculateRowCount() - 7;
    this.colsCount = this.calculateColCount() - 2;
    for (let i = 0; i < this.rowsCount; i++) {
      const row = [] as Node[];
      for (let j = 0; j < this.colsCount; j++) {
        const point = new Point(i, j);
        if (point.equals(this.startNodePos)) {
          row.push({
            position: point,
            type: NodeType.START,
            weight: 1,
          } as Node);
        } else if (point.equals(this.endNodePos)) {
          row.push({ position: point, type: NodeType.END, weight: 1 } as Node);
        } else {
          row.push({
            position: point,
            type: NodeType.EMPTY,
            weight: 1,
          } as Node);
        }
      }
      this.NODES.push(row);
    }
    this.nodes.next(this.NODES);
  }

  get startNode(): Node {
    return this.getNodeByPos(this.startNodePos);
  }

  get endNode(): Node {
    return this.getNodeByPos(this.endNodePos);
  }

  setPrevPos(pos: Point): void {
    this.prevPos = pos;
  }

  getPrevPos(): Point {
    return this.prevPos;
  }

  movePoint(from: Point, to: Point): void {
    if (
      !from.equals(new Point(-1, -1)) &&
      this.NODES[to.x][to.y].type !== NodeType.WALL
    ) {
      const type = this.NODES[from.x][from.y].type;
      this.NODES[to.x][to.y].type = type;
      this.NODES[from.x][from.y].type = NodeType.EMPTY;
      [this.NODES[from.x][from.y].distance, this.NODES[to.x][to.y].distance] = [
        this.NODES[to.x][to.y].distance,
        this.NODES[from.x][from.y].distance,
      ];
      if (type === NodeType.START) {
        this.startNodePos = to;
      } else if (type === NodeType.END) {
        this.endNodePos = to;
      }
      this.nodes.next(this.NODES);
      if (this.isDrawn) {
        this.clearVisitedAndPath();
        this.visualize();
      }
    }
  }

  addWeight(): void {
    this.snackBar.open("Press 'left ctrl' key while drawing walls.", 'OK', {
      duration: 5000,
      horizontalPosition: 'end',
      verticalPosition: 'top',
      panelClass: ['av-snackbar-container'],
    });
  }

  doWallWeight(pos: Point, isWeight: boolean): void {
    const obj = isWeight ? NodeType.WEIGHT : NodeType.WALL;
    if (this.NODES[pos.x][pos.y].type === obj) {
      this.updateNodeType(pos, NodeType.EMPTY);
    } else if (this.NODES[pos.x][pos.y].type === NodeType.EMPTY) {
      this.updateNodeType(pos, obj);
    }
  }

  clearWallsAndWeights(): void {
    for (let i = 0; i < this.rowsCount; i++) {
      for (let j = 0; j < this.colsCount; j++) {
        if (
          this.NODES[i][j].type === NodeType.WALL ||
          this.NODES[i][j].type === NodeType.WEIGHT
        ) {
          this.NODES[i][j].type = NodeType.EMPTY;
          this.NODES[i][j].weight = 1;
        }
      }
    }
    this.nodes.next(this.NODES);
  }

  clearVisitedAndPath(fromActions: boolean = false): void {
    for (let i = 0; i < this.rowsCount; i++) {
      for (let j = 0; j < this.colsCount; j++) {
        if (
          this.NODES[i][j].type === NodeType.VISITED ||
          this.NODES[i][j].type === NodeType.PATH
        ) {
          this.NODES[i][j].type = NodeType.EMPTY;
          this.NODES[i][j].weight = 1;
        } else if (
          this.NODES[i][j].type === NodeType.WVISITED ||
          this.NODES[i][j].type === NodeType.WPATH
        ) {
          this.NODES[i][j].type = NodeType.WEIGHT;
        }
      }
    }
    if (fromActions) {
      this.isDrawn = false;
    }
    this.nodes.next(this.NODES);
  }

  clearAll(): void {
    for (let i = 0; i < this.rowsCount; i++) {
      for (let j = 0; j < this.colsCount; j++) {
        if (
          this.NODES[i][j].type !== NodeType.START &&
          this.NODES[i][j].type !== NodeType.END
        ) {
          this.NODES[i][j].type = NodeType.EMPTY;
          this.NODES[i][j].weight = 1;
        }
      }
    }
    this.isDrawn = false;
    this.nodes.next(this.NODES);
  }

  private updateNodeType(pos: Point, type: NodeType): void {
    this.NODES[pos.x][pos.y].type = type;
    this.NODES[pos.x][pos.y].weight = type === NodeType.WEIGHT ? 30 : 1;
    this.nodes.next(this.NODES);
  }

  // search algorithms part

  getNodeByPos(pos: Point): Node {
    return this.NODES[pos.x][pos.y];
  }

  draw(visitedNodesInOrder: Node[], nodesInShortestPathOrder: Node[]): void {
    for (let i = 0; i < visitedNodesInOrder.length; i++) {
      const nodePos = visitedNodesInOrder[i].position;
      if (
        this.getNodeByPos(nodePos).type !== NodeType.START &&
        this.getNodeByPos(nodePos).type !== NodeType.END
      ) {
        this.NODES[nodePos.x][nodePos.y].type =
          this.getNodeByPos(nodePos).type !== NodeType.WEIGHT
            ? NodeType.VISITED
            : NodeType.WVISITED;
      }
    }
    this.drawShortestPath(nodesInShortestPathOrder);
  }

  drawShortestPath(nodesInShortestPathOrder: Node[]): void {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      const nodePos = nodesInShortestPathOrder[i].position;
      if (
        !nodePos.equals(this.startNodePos) &&
        !nodePos.equals(this.endNodePos)
      ) {
        this.NODES[nodePos.x][nodePos.y].type =
          this.getNodeByPos(nodePos).type !== NodeType.WEIGHT
            ? NodeType.PATH
            : NodeType.WPATH;
      }
    }
    this.nodes.next(this.NODES);
  }

  animate(visitedNodesInOrder: Node[], nodesInShortestPathOrder: Node[]): void {
    for (let i = 0; i <= visitedNodesInOrder.length; i++) {
      if (i === visitedNodesInOrder.length) {
        setTimeout(() => {
          if (nodesInShortestPathOrder.length) {
            this.animateShortestPath(nodesInShortestPathOrder);
          } else {
            this.snackBar.open('NO PATH!', 'OK', {
              duration: 5000,
              horizontalPosition: 'end',
              verticalPosition: 'top',
              panelClass: ['av-snackbar-container'],
            });
          }
        }, 10 * i);
        return;
      }
      setTimeout(() => {
        const nodePos = visitedNodesInOrder[i].position;
        if (
          this.getNodeByPos(nodePos).type !== NodeType.START &&
          this.getNodeByPos(nodePos).type !== NodeType.END
        ) {
          this.NODES[nodePos.x][nodePos.y].type =
            this.getNodeByPos(nodePos).type !== NodeType.WEIGHT
              ? NodeType.VISITED
              : NodeType.WVISITED;
        }
        this.nodes.next(this.NODES);
      }, 10 * i);
    }
  }

  animateShortestPath(nodesInShortestPathOrder: Node[]): void {
    for (let i = 0; i < nodesInShortestPathOrder.length; i++) {
      setTimeout(() => {
        const nodePos = nodesInShortestPathOrder[i].position;
        if (
          !nodePos.equals(this.startNodePos) &&
          !nodePos.equals(this.endNodePos)
        ) {
          this.NODES[nodePos.x][nodePos.y].type =
            this.getNodeByPos(nodePos).type !== NodeType.WVISITED
              ? NodeType.PATH
              : NodeType.WPATH;
          this.nodes.next(this.NODES);
        }
      }, 50 * i);
    }
  }

  doDijkstra(): void {
    const dijkstraHelper = new Dijkstra(
      this.NODES,
      this.startNode,
      this.endNode
    );
    const visitedNodesInOrder = dijkstraHelper.getNodesInOrder();
    const nodesInShortestPathOrder = Dijkstra.endReached(visitedNodesInOrder)
      ? dijkstraHelper.getNodesInShortestPathOrder()
      : [];
    const fn = this.isDrawn ? this.draw : this.animate;
    this.isDrawn = true;
    fn.apply(this, [visitedNodesInOrder, nodesInShortestPathOrder]);
  }

  doAStar(): void {
    const aStarHelper = new Astar(
      this.NODES,
      this.startNode,
      this.endNode,
      poweredManhattanDistance(this.endNode)
    );
    const visitedNodesInOrder = aStarHelper.getNodesInOrder();
    const nodesInShortestPathOrder = Astar.endReached(visitedNodesInOrder)
      ? aStarHelper.getNodesInShortestPathOrder()
      : [];
    const fn = this.isDrawn ? this.draw : this.animate;
    this.isDrawn = true;
    fn.apply(this, [visitedNodesInOrder, nodesInShortestPathOrder]);
  }

  doSwarm(): void {
    const swarmHelper = new Swarm(
      this.NODES,
      this.startNode,
      this.endNode,
      manhattanDistance(this.endNode)
    );
    const visitedNodesInOrder = swarmHelper.getNodesInOrder();
    const nodesInShortestPathOrder = Swarm.endReached(visitedNodesInOrder)
      ? swarmHelper.getNodesInShortestPathOrder()
      : [];
    const fn = this.isDrawn ? this.draw : this.animate;
    this.isDrawn = true;
    fn.apply(this, [visitedNodesInOrder, nodesInShortestPathOrder]);
  }

  doConvergentSwarm(): void {
    const swarmHelper = new ConvergentSwarm(
      this.NODES,
      this.startNode,
      this.endNode,
      extraPoweredManhattanDistance(this.endNode)
    );
    const visitedNodesInOrder = swarmHelper.getNodesInOrder();
    const nodesInShortestPathOrder = ConvergentSwarm.endReached(
      visitedNodesInOrder
    )
      ? swarmHelper.getNodesInShortestPathOrder()
      : [];
    const fn = this.isDrawn ? this.draw : this.animate;
    this.isDrawn = true;
    fn.apply(this, [visitedNodesInOrder, nodesInShortestPathOrder]);
  }

  visualize(): void {
    switch (this.algorithmService.getAlgorithm()) {
      case Algorithm.ASTAR:
        this.doAStar();
        break;
      case Algorithm.DIJKSTRA:
        this.doDijkstra();
        break;
      case Algorithm.SWARM:
        this.doSwarm();
        break;
      case Algorithm.CONV_SWARM:
        this.doConvergentSwarm();
        break;
    }
  }

  // Maze part

  generateMaze(): void {
    this.recursiveDivisionMaze(
      2,
      this.rowsCount - 3,
      2,
      this.colsCount - 3,
      'horizontal',
      false
    );
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
            if (
              i === 0 ||
              j === 0 ||
              i === this.rowsCount - 1 ||
              j === this.colsCount - 1
            ) {
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
          if (
            i === currentRow &&
            j !== colRandom &&
            j >= colStart - 1 &&
            j <= colEnd + 1
          ) {
            if (this.NODES[i][j].type === NodeType.EMPTY) {
              this.wallsToAnimate.push(new Point(i, j));
            }
          }
        }
      }
      if (currentRow - 2 - rowStart > colEnd - colStart) {
        this.recursiveDivisionMaze(
          rowStart,
          currentRow - 2,
          colStart,
          colEnd,
          orientation,
          surroundingWalls
        );
      } else {
        this.recursiveDivisionMaze(
          rowStart,
          currentRow - 2,
          colStart,
          colEnd,
          'vertical',
          surroundingWalls
        );
      }
      if (rowEnd - (currentRow + 2) > colEnd - colStart) {
        this.recursiveDivisionMaze(
          currentRow + 2,
          rowEnd,
          colStart,
          colEnd,
          orientation,
          surroundingWalls
        );
      } else {
        this.recursiveDivisionMaze(
          currentRow + 2,
          rowEnd,
          colStart,
          colEnd,
          'vertical',
          surroundingWalls
        );
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
          if (
            j === currentCol &&
            i !== rowRandom &&
            i >= rowStart - 1 &&
            i <= rowEnd + 1
          ) {
            if (this.NODES[i][j].type === NodeType.EMPTY) {
              this.wallsToAnimate.push(new Point(i, j));
            }
          }
        }
      }
      if (rowEnd - rowStart > currentCol - 2 - colStart) {
        this.recursiveDivisionMaze(
          rowStart,
          rowEnd,
          colStart,
          currentCol - 2,
          'horizontal',
          surroundingWalls
        );
      } else {
        this.recursiveDivisionMaze(
          rowStart,
          rowEnd,
          colStart,
          currentCol - 2,
          orientation,
          surroundingWalls
        );
      }
      if (rowEnd - rowStart > colEnd - (currentCol + 2)) {
        this.recursiveDivisionMaze(
          rowStart,
          rowEnd,
          currentCol + 2,
          colEnd,
          'horizontal',
          surroundingWalls
        );
      } else {
        this.recursiveDivisionMaze(
          rowStart,
          rowEnd,
          currentCol + 2,
          colEnd,
          orientation,
          surroundingWalls
        );
      }
    }
  }

  private timeout(nodes: Point[], speed: number, index: number): void {
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
    const nodes = this.wallsToAnimate
      .slice()
      .filter((point: Point) => point.x >= 0 && point.y >= 0);
    const speed =
      this.speed === 'fast' ? 5 : this.speed === 'average' ? 25 : 75;
    this.timeout(nodes, speed, 0);
  }

  private calculateColCount(): number {
    const width = window.innerWidth > 0 ? window.innerWidth : screen.width;
    return Math.floor(width / this.nodeSize);
  }

  private calculateRowCount(): number {
    const height = window.innerHeight > 0 ? window.innerHeight : screen.height;
    return Math.floor(height / this.nodeSize);
  }

  changeSpeed(speed: Speed): void {
    this.speed = speed;
  }
}
