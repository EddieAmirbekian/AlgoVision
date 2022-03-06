import { Component, Inject, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { ActionService } from './services/action.service';
import { Router } from '@angular/router';
import { Page } from './models/page.enum';
import { DOCUMENT } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'av-root',
  templateUrl: './av.component.html',
  styleUrls: ['./av.component.scss'],
})
export class AvComponent implements OnInit, OnDestroy {
  title = 'AlgoVision';
  private subscription: Subscription | undefined;

  constructor(
    private actionService: ActionService,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.router.navigate(['/pathfinder']);
    this.subscription = this.actionService.pageChangeEvent$.subscribe(
      (page: Page) => {
        this.setTheme(page === Page.SORTING ? 'dark-theme' : 'light-theme');
      }
    );
  }

  ngOnDestroy(): void {
    if (this.subscription && !this.subscription.closed) {
      this.subscription.unsubscribe();
    }
  }

  private setTheme(theme: string): void {
    this.renderer.setAttribute(this.document.body, 'class', theme);
  }
}
