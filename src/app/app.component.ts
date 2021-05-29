import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ActionService } from './services/action.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'AlgoVision';

  constructor(private actionService: ActionService) {}

  public get isSorting(): Observable<boolean> {
    return this.actionService.isPathFinding
      .asObservable()
      .pipe(map((value: boolean) => !value));
  }
}
