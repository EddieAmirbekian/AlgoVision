import { Injectable } from '@angular/core';
import { of, Observable, BehaviorSubject } from 'rxjs';
import { ActionModel } from '../controls/models/action.model';

@Injectable()
export class ActionService {
  private pathFindingActions: ActionModel[] = [
    new ActionModel('Algorithms')
      .menu()
      .addChild(new ActionModel("Dijkstra's Algorithm").button())
      .addChild(new ActionModel('A* Algorithm').button())
      .addChild(new ActionModel('BFS').button())
      .addChild(new ActionModel('DFS').button()),
    new ActionModel('Add Bomb').button(),
    new ActionModel('Visualize!').accent().raised().button(),
    new ActionModel('Clear Board').button(),
    new ActionModel('Clear Walls and Weights'),
    new ActionModel('Clear Path'),
  ];

  private sortingActions: ActionModel[] = [
    new ActionModel('Generate New Array').button(),
    new ActionModel('Algorithms')
      .menu()
      .addChild(new ActionModel('Merge Sort').button())
      .addChild(new ActionModel('Quick Sort').button())
      .addChild(new ActionModel('Heap Sort').button())
      .addChild(new ActionModel('Bubble Sort').button()),
    new ActionModel('Sort!').button().raised().accent(),
  ];

  private getPathFindingActions(): Observable<ActionModel[]> {
    return of(this.pathFindingActions);
  }

  private getSortingActions(): Observable<ActionModel[]> {
    return of(this.sortingActions);
  }

  public isPathFinding: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    true
  );

  public getActions(): Observable<ActionModel[]> {
    if (this.isPathFinding.value) {
      return this.getPathFindingActions();
    } else {
      return this.getSortingActions();
    }
  }
}
