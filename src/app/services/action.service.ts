import { Injectable } from '@angular/core';
import { of, Observable, BehaviorSubject } from 'rxjs';
import { ActionModel } from '../controls/models/action.model';
import { Algorithm } from '../controls/models/algorithm.enum';
import { AlgorithmService } from './algorithm.service';
import { SortingService } from './sorting.service';
import {GridService} from './grid.service';

@Injectable()
export class ActionService {

  constructor(
    private algorithmService: AlgorithmService,
    private gridService: GridService,
    private sortingService: SortingService
  ) {}
  private pathFindingActions: ActionModel[] = [
    new ActionModel('Algorithms')
      .menu()
      .addChild(
        new ActionModel('Dijkstra\'s Algorithm').button().subscribe(() => {
          this.setAlgorithm(Algorithm.DIJKSTRA);
        })
      )
      .addChild(
        new ActionModel('A* Algorithm').button().subscribe(() => {
          this.setAlgorithm(Algorithm.ASTAR);
        })
      )
      .addChild(
        new ActionModel('BFS').button().subscribe(() => {
          this.setAlgorithm(Algorithm.BFS);
        })
      )
      .addChild(
        new ActionModel('DFS').button().subscribe(() => {
          this.setAlgorithm(Algorithm.DFS);
        })
      ),
    new ActionModel('Add Point').button().subscribe(() => {
      this.gridService.addPoint();
    }),
    new ActionModel('Generate Maze').button().subscribe(() => {
      this.gridService.generateMaze();
    }),
    new ActionModel('Visualize!').accent().raised().button(),
    new ActionModel('Clear Board').button().subscribe(() => {
      this.gridService.clearAll();
    }),
    new ActionModel('Clear Walls and Weights').button().subscribe(() => {
      this.gridService.clearWallsAndWeights();
    }),
    new ActionModel('Clear Path'),
    new ActionModel('Speed')
      .menu()
      .addChild(new ActionModel('Fast').subscribe(() => this.gridService.changeSpeed('fast')))
      .addChild(new ActionModel('Average').subscribe(() => this.gridService.changeSpeed('average')))
      .addChild(new ActionModel('Slow').subscribe(() => this.gridService.changeSpeed('slow')))
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
    new ActionModel('Sort!')
      .button()
      .raised()
      .accent()
      .subscribe(() => {
        this.sort();
      }),
  ];

  public isPathFinding: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    true
  );

  private getPathFindingActions(): Observable<ActionModel[]> {
    return of(this.pathFindingActions);
  }

  private getSortingActions(): Observable<ActionModel[]> {
    return of(this.sortingActions);
  }

  public getActions(): Observable<ActionModel[]> {
    if (this.isPathFinding.value) {
      return this.getPathFindingActions();
    } else {
      return this.getSortingActions();
    }
  }

  public setAlgorithm(algorithm: Algorithm): void {
    this.algorithmService.setAlgorithm(algorithm);
  }

  public sort(): void {
    this.sortingService.sort();
  }
}
