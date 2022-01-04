import {Component, Input, OnInit} from '@angular/core';
import {NodeType} from '../../models/node-type.model';

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

  constructor() { }

  ngOnInit(): void {
    switch (this.type) {
      case NodeType.START:
        this.className = 'node-start';
        break;
      case NodeType.END:
        this.className = 'node-finish';
        break;
      case NodeType.WALL:
        this.className = 'node-wall';
    }
  }

  public onMouseDown(event: any): void {

  }

  public onMouseEnter(event: any): void {

  }

  public onMouseUp(event: any): void {

  }

}
