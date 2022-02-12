import {Component} from '@angular/core';
import {ActionService} from './services/action.service';
import {Router} from '@angular/router';
import {Page} from './models/page.enum';

@Component({
  selector: 'av-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'AlgoVision';

  constructor(private actionService: ActionService, private router: Router) {
    this.router.navigate(['/pathfinder']);
  }

  public get isSorting(): boolean {
    return this.actionService.getPage() === Page.SORTING;
  }
}
