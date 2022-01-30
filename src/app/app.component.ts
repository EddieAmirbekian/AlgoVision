import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActionService } from './services/action.service';

@Component({
  selector: 'av-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'AlgoVision';

  constructor(private actionService: ActionService) {}

  public get isPathFinding(): Observable<boolean> {
    return this.actionService.isPathFinding
      .asObservable();
  }
}
