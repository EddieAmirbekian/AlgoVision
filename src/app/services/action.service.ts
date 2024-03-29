import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { ActionModel } from '../models/action.model';
import { Algorithm } from '../models/algorithm.enum';
import { AlgorithmService } from './algorithm.service';
import { SortingService } from './sorting.service';
import { GridService } from './grid.service';
import { MstService } from './mst.service';
import { Page } from '../models/page.enum';

@Injectable()
export class ActionService {
  constructor(
    private algorithmService: AlgorithmService,
    private gridService: GridService,
    private mstService: MstService,
    private sortingService: SortingService
  ) {}

  private page: Page = Page.PATHFINDING;

  private pathFindingActions: ActionModel[] = [
    new ActionModel('Algorithms')
      .menu()
      .addChild(
        new ActionModel("Dijkstra's Algorithm").button().subscribe(() => {
          this.setAlgorithm(Algorithm.DIJKSTRA);
        })
      )
      .addChild(
        new ActionModel('A* Algorithm').button().subscribe(() => {
          this.setAlgorithm(Algorithm.ASTAR);
        })
      )
      .addChild(
        new ActionModel('Swarm Algorithm').button().subscribe(() => {
          this.setAlgorithm(Algorithm.SWARM);
        })
      )
      .addChild(
        new ActionModel('Convergent Swarm Algorithm').button().subscribe(() => {
          this.setAlgorithm(Algorithm.CONV_SWARM);
        })
      ),
    new ActionModel('Add Weight').button().subscribe(() => {
      this.gridService.addWeight();
    }),
    new ActionModel('Generate Maze').button().subscribe(() => {
      this.gridService.generateMaze();
    }),
    new ActionModel('Visualize!')
      .warn()
      .raised()
      .button()
      .subscribe(() => {
        this.visualize();
      }),
    new ActionModel('Clear Board').button().subscribe(() => {
      this.gridService.clearAll();
    }),
    new ActionModel('Clear Walls and Weights').button().subscribe(() => {
      this.gridService.clearWallsAndWeights();
    }),
    new ActionModel('Clear Path').button().subscribe(() => {
      this.gridService.clearVisitedAndPath(true);
    }),
  ];

  private sortingActions: ActionModel[] = [
    new ActionModel('Generate New Array').button().subscribe(() => {
      this.sortingService.generateArray();
    }),
    new ActionModel('Algorithms')
      .menu()
      .addChild(
        new ActionModel('Merge Sort').button().subscribe(() => {
          this.setAlgorithm(Algorithm.MERGE);
        })
      )
      .addChild(
        new ActionModel('Quick Sort').button().subscribe(() => {
          this.setAlgorithm(Algorithm.QUICK);
        })
      )
      .addChild(
        new ActionModel('Heap Sort').button().subscribe(() => {
          this.setAlgorithm(Algorithm.HEAP);
        })
      )
      .addChild(
        new ActionModel('Bubble Sort').button().subscribe(() => {
          this.setAlgorithm(Algorithm.BUBBLE);
        })
      )
      .addChild(
        new ActionModel('Insertion Sort').button().subscribe(() => {
          this.setAlgorithm(Algorithm.INSERTION);
        })
      )
      .addChild(
        new ActionModel('Selection Sort').button().subscribe(() => {
          this.setAlgorithm(Algorithm.SELECTION);
        })
      ),
    new ActionModel('Visualize!')
      .button()
      .raised()
      .warn()
      .subscribe(() => {
        this.sort();
      }),
  ];

  private mstActions: ActionModel[] = [
    new ActionModel('Clear Graph')
      .button()
      .raised()
      .warn()
      .subscribe(() => this.mstService.clear()),
  ];

  pageChangeEvent$: BehaviorSubject<Page> = new BehaviorSubject<Page>(
    Page.PATHFINDING
  );

  getActions(): Observable<ActionModel[]> {
    switch (this.page) {
      case Page.MST:
        return of(this.mstActions);
      case Page.PATHFINDING:
        return of(this.pathFindingActions);
      case Page.SORTING:
        return of(this.sortingActions);
    }
  }

  getPage(): Page {
    return this.page;
  }

  setPage(page: Page): void {
    this.page = page;
    this.pageChangeEvent$.next(page);
  }

  setAlgorithm(algorithm: Algorithm): void {
    this.algorithmService.setAlgorithm(algorithm);
  }

  sort(): void {
    this.sortingService.sort();
  }

  visualize(): void {
    this.gridService.visualize();
  }
}
