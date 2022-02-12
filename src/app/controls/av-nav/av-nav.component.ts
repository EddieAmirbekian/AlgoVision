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

  public setPage(page: Page): void {
    this.actionService.setPage(page);
  }

  public getPage(): Page {
    return this.actionService.getPage();
  }

  public isMST(): boolean {
    return this.getPage() === Page.MST;
  }

  public get actions(): Observable<ActionModel[]> {
    return this.actionService.getActions();
  }

  public get Page(): typeof Page {
    return Page;
  }
}
