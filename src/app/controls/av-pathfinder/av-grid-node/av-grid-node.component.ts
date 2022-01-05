import {Component, Input, OnInit} from '@angular/core';
import {NodeType} from '../../models/node-type.model';
import {GridService} from '../../../services/grid.service';

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
}
