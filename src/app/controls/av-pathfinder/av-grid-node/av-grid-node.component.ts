import { Component, Input, OnInit } from '@angular/core';
import { Node } from '../../../models/node.model';
import { NodeType } from '../../../models/node-type.model';
import { GridService } from '../../../services/grid.service';
import { Point } from '../../../models/point';

@Component({
  selector: 'av-grid-node',
  templateUrl: './av-grid-node.component.html',
  styleUrls: ['./av-grid-node.component.scss'],
})
export class AvGridNodeComponent implements OnInit {
  @Input()
  node: Node = {} as Node;

  className = '';

  get row(): number {
    return this.node.position.x;
  }

  get column(): number {
    return this.node.position.y;
  }

  constructor(private gridService: GridService) {}

  ngOnInit(): void {
    this.setClassName();
    if (this.row >= 0) {
      this.gridService.nodes.asObservable().subscribe((nodes: Node[][]) => {
        this.node.type = this.gridService.getNodeByPos(
          new Point(this.row, this.column)
        ).type;
        this.setClassName();
      });
    }
  }

  onClick(): void {
    if (this.node.type === NodeType.START || this.node.type === NodeType.END) {
      this.gridService.isMovingPoint = true;
      this.gridService.setPrevPos(this.node.position);
    }
    if (this.gridService.isMovingPoint && this.canMoveTo()) {
      this.gridService.isMovingPoint = !this.gridService.isMovingPoint;
      if (!this.gridService.isMovingPoint) {
        this.gridService.movePoint(
          this.gridService.getPrevPos(),
          this.node.position
        );
      }
      return;
    }
  }

  onMouseDown(event: MouseEvent): void {
    event.preventDefault();
    if (this.canDo(event.ctrlKey) && !this.gridService.isMovingPoint) {
      this.gridService.isMouseDown = true;
      this.gridService.doWallWeight(this.node.position, event.ctrlKey);
    }
  }

  onMouseEnter(event: MouseEvent): void {
    event.preventDefault();
    if (this.gridService.isMouseDown && this.canDo(event.ctrlKey)) {
      this.gridService.doWallWeight(this.node.position, event.ctrlKey);
    }
  }

  onMouseUp(): void {
    if (this.gridService.isMouseDown) {
      this.gridService.isMouseDown = false;
    }
  }

  private canDoWall(): boolean {
    return (
      this.node.type === NodeType.EMPTY || this.node.type === NodeType.WALL
    );
  }

  private canDoWeight(): boolean {
    return this.node.type === NodeType.EMPTY;
  }

  private canDo(ctrKey: boolean): boolean {
    return ctrKey ? this.canDoWeight() : this.canDoWall();
  }

  private canMoveTo(): boolean {
    return (
      this.node.type === NodeType.EMPTY ||
      this.node.type === NodeType.VISITED ||
      this.node.type === NodeType.PATH
    );
  }

  private setClassName(): void {
    if (this.node) {
      switch (this.node.type) {
        case NodeType.START:
          this.className = 'node-start';
          break;
        case NodeType.END:
          this.className = 'node-finish';
          break;
        case NodeType.WALL:
          this.className = 'node-wall';
          break;
        case NodeType.WEIGHT:
          this.className = 'node-weight';
          break;
        case NodeType.VISITED:
          this.className = 'node-visited';
          break;
        case NodeType.PATH:
          this.className = 'node-path';
          break;
        default:
          this.className = '';
          break;
      }
    }
  }
}
