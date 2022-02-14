import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { ActionModel } from '../../models/action.model';
import { ActionService } from 'src/app/services/action.service';
import { Page } from '../../models/page.enum';

@Component({
  selector: 'av-nav',
  templateUrl: './av-nav.component.html',
  styleUrls: ['./av-nav.component.scss'],
})
export class AvNavComponent {
  constructor(private actionService: ActionService) {}

  setPage(page: Page): void {
    this.actionService.setPage(page);
  }

  getPage(): Page {
    return this.actionService.getPage();
  }

  isMST(): boolean {
    return this.getPage() === Page.MST;
  }

  get actions(): Observable<ActionModel[]> {
    return this.actionService.getActions();
  }

  get Page(): typeof Page {
    return Page;
  }
}
