import { Component } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { Observable } from 'rxjs';
import { SortingService } from 'src/app/services/sorting.service';

@Component({
  selector: 'av-sorter',
  templateUrl: './av-sorter.component.html',
  styleUrls: ['./av-sorter.component.scss'],
})
export class AvSorterComponent {
  constructor(private sortService: SortingService) {}

  get items(): Observable<number[]> {
    return this.sortService.getArray();
  }

  get length(): Observable<number> {
    return this.sortService.getArrayLength();
  }

  get speed(): Observable<number> {
    return this.sortService.getSortSpeed();
  }

  onNumberOfItemsChange(event: MatSliderChange): void {
    if (event.value) {
      this.sortService.setLength(event.value);
    }
  }

  onSpeedChange(event: MatSliderChange): void {
    if (event.value) {
      this.sortService.setSpeed(event.value);
    }
  }
}
