import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {Grid, NodeType} from '../../models/node-type.model';
import {GridService} from '../../../services/grid.service';
import {Subject} from 'rxjs';
import {takeUntil, throttleTime} from 'rxjs/operators';
import {Pair} from 'tstl';

@Component({
  selector: 'av-grid',
  templateUrl: './av-grid.component.html',
  styleUrls: ['./av-grid.component.scss'],
})
export class AvGridComponent implements OnInit, OnDestroy {
  public nodes: Grid = [];

  private destroy$: Subject<void> = new Subject<void>();

  constructor(private gridService: GridService, public cdRef: ChangeDetectorRef) {
  }

  public ngOnInit(): void {
    this.nodes = this.gridService.nodes;
    this.gridService.eventBus$
      .pipe(
        takeUntil(this.destroy$)
      )
      .subscribe((p: Pair<Pair<number, number>, NodeType>) => {
        const x = p.first.first;
        const y = p.first.second;
        this.nodes[x][y] = p.second;
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
  }
}
