import {Component, Input, OnInit} from '@angular/core';
import {NodeType} from '../../models/node-type.model';
import {GridService} from '../../../services/grid.service';
import {Pair} from 'tstl';

@Component({
  selector: 'av-grid-node',
  templateUrl: './av-grid-node.component.html',
  styleUrls: ['./av-grid-node.component.scss']
})
export class AvGridNodeComponent implements OnInit {

  @Input()
  public row = 0;

  @Input()
  public column = 0;

  @Input()
  public type: NodeType = NodeType.EMPTY;

  public className = '';

  constructor(private gridService: GridService) { }

  public ngOnInit(): void {
    switch (this.type) {
      case NodeType.START:
        this.className = 'node-start';
        break;
      case NodeType.END:
        this.className = 'node-finish';
        break;
      case NodeType.WALL:
        this.className = 'node-wall';
        break;
      case NodeType.POINT:
        this.className = 'node-point';
        break;
      case NodeType.WEIGHT:
        this.className = 'node-weight';
        break;
    }
  }

  public onClick(): void {
    this.gridService.isMovingPoint = !this.gridService.isMovingPoint;
    if (this.gridService.isMovingPoint) {
      this.gridService.setPrevPos(this.row, this.column);
    } else {
      this.gridService.movePoint(this.gridService.getPrevPos(), new Pair(this.row, this.column));
    }
  }

  public onMouseDown(event: MouseEvent): void {
    event.stopPropagation();
    if (this.canDoWall() && !this.gridService.isMovingPoint) {
      this.gridService.isMouseDown = true;
      this.gridService.putWall(this.row, this.column);
    }
  }

  public onMouseEnter(event: MouseEvent): void {
    event.stopPropagation();
    if (this.gridService.isMouseDown && this.canDoWall()) {
      this.gridService.putWall(this.row, this.column);
    }
  }

  public onMouseUp(): void {
    if (this.gridService.isMouseDown) {
      this.gridService.isMouseDown = false;
    }
  }

  private canDoWall(): boolean {
    return this.type === NodeType.EMPTY || this.type === NodeType.WALL;
  }
}
