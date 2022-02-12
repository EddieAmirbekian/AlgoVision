import {Injectable} from '@angular/core';
import {Observable, of} from 'rxjs';
import {ActionModel} from '../models/action.model';
import {Algorithm} from '../models/algorithm.enum';
import {AlgorithmService} from './algorithm.service';
import {SortingService} from './sorting.service';
import {GridService} from './grid.service';
import {MstService} from './mst.service';
import {Page} from '../models/page.enum';

@Injectable()
export class ActionService {

  constructor(
    private algorithmService: AlgorithmService,
    private gridService: GridService,
    private mstService: MstService,
    private sortingService: SortingService
  ) {
  }

  private page: Page = Page.PATHFINDING;

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
    new ActionModel('Visualize!').warn().raised().button().subscribe(() => {
      this.visualize();
    }),
    new ActionModel('Clear Board').button().subscribe(() => {
      this.gridService.clearAll();
    }),
    new ActionModel('Clear Walls and Weights').button().subscribe(() => {
      this.gridService.clearWallsAndWeights();
    }),
    new ActionModel('Clear Path'),
    new ActionModel('Speed: ' + this.getSpeed())
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

  private mstActions: ActionModel[] = [
    new ActionModel('Clear Graph').button().raised().warn().subscribe(() => this.mstService.clear())
  ];

  public getActions(): Observable<ActionModel[]> {
    switch (this.page) {
      case Page.MST:
        return of(this.mstActions);
      case Page.PATHFINDING:
        return of(this.pathFindingActions);
      case Page.SORTING:
        return of(this.sortingActions);
    }
  }

  public getPage(): Page {
    return this.page;
  }

  public setPage(page: Page): void {
    this.page = page;
  }

  public setAlgorithm(algorithm: Algorithm): void {
    this.algorithmService.setAlgorithm(algorithm);
  }

  public sort(): void {
    this.sortingService.sort();
  }

  public visualize(): void {
    this.gridService.visualize();
  }

  private getSpeed(): string {
    const speed = this.gridService.getSpeed();
    const lower = speed.toLowerCase();
    return speed.charAt(0).toUpperCase() + lower.slice(1);
  }
}
