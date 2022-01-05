import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {Grid} from '../../models/node-type.model';
import {GridService} from '../../../services/grid.service';

@Component({
  selector: 'av-grid',
  templateUrl: './av-grid.component.html',
  styleUrls: ['./av-grid.component.scss'],
})
export class AvGridComponent implements OnInit {
  public nodes: Grid = [];

  constructor(private gridService: GridService, public cdRef: ChangeDetectorRef) {
  }

  ngOnInit(): void {
    this.nodes = this.gridService.nodes;
    this.gridService.eventBus$.subscribe(() => {
      this.nodes = this.gridService.nodes;
      // this.cdRef.detectChanges();
    });
  }
}
