import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { GridService } from '../../../services/grid.service';
import { Node } from '../../../models/node.model';
import { first } from 'rxjs/operators';

@Component({
  selector: 'av-grid',
  templateUrl: './av-grid.component.html',
  styleUrls: ['./av-grid.component.scss'],
})
export class AvGridComponent implements OnInit {
  renderedNodes: Node[][] = [];

  constructor(
    private gridService: GridService,
    public cdRef: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.gridService.nodes
      .asObservable()
      .pipe(first())
      .subscribe((nodes: Node[][]) => (this.renderedNodes = nodes));
  }
}
