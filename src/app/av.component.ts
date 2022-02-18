import { Component } from '@angular/core';
import { ActionService } from './services/action.service';
import { Router } from '@angular/router';
import { Page } from './models/page.enum';

@Component({
  selector: 'av-root',
  templateUrl: './av.component.html',
  styleUrls: ['./av.component.scss'],
})
export class AvComponent {
  title = 'AlgoVision';

  constructor(private actionService: ActionService, private router: Router) {
    this.router.navigate(['/pathfinder']);
  }

  get isSorting(): boolean {
    return this.actionService.getPage() === Page.SORTING;
  }
}
