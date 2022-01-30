import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ActionModel } from '../../models/action.model';
import { ActionService } from 'src/app/services/action.service';
import { Algorithm } from '../../models/algorithm.enum';

@Component({
  selector: 'av-nav',
  templateUrl: './av-nav.component.html',
  styleUrls: ['./av-nav.component.scss'],
})
export class AvNavComponent {
  constructor(private actionService: ActionService) {}

  public setActions(actionsType: 'pathfinding' | 'sorting'): void {
    const bool = actionsType === 'pathfinding';
    this.actionService.isPathFinding.next(bool);
  }

  public get actions(): Observable<ActionModel[]> {
    return this.actionService.getActions();
  }
}
