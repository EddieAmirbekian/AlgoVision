import { Component, OnInit } from '@angular/core';
import {AvGridNodeComponent} from '../av-grid-node/av-grid-node.component';
import {NodeType} from '../av-grid-node/node-type.model';

@Component({
  selector: 'av-grid',
  templateUrl: './av-grid.component.html',
  styleUrls: ['./av-grid.component.scss'],
})
export class AvGridComponent implements OnInit {
  public readonly rowsCount = 22;
  public readonly colsCount = 60;

  public nodes: NodeType[][] = [];

  constructor() {
    for (let i = 0; i < this.rowsCount; i++) {
      const row = [];
      for (let j = 0; j < this.colsCount; j++) {
        row.push(NodeType.EMPTY);
      }
      this.nodes.push(row);
    }
  }

  ngOnInit(): void {}
}
