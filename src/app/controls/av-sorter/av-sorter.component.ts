import { Component, OnInit } from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { Observable } from 'rxjs';
import { SortingService } from 'src/app/services/sorting.service';

@Component({
  selector: 'av-sorter',
  templateUrl: './av-sorter.component.html',
  styleUrls: ['./av-sorter.component.scss'],
})
export class AvSorterComponent implements OnInit {
  constructor(private sortService: SortingService) {}

  ngOnInit(): void {}

  public get items(): Observable<number[]> {
    return this.sortService.getArray();
  }

  public get length(): Observable<number> {
    return this.sortService.getArrayLength();
  }

  public get speed(): Observable<number> {
    return this.sortService.getSortSpeed();
  }

  public onNumberOfItemsChange(event: MatSliderChange): void {
    if (event.value) {
      this.sortService.setLength(event.value);
    }
  }

  public onSpeedChange(event: MatSliderChange): void {
    if (event.value) {
      this.sortService.setSpeed(event.value);
    }
  }

  public generateArray(): Observable<number[]> {
    this.sortService.generateArray();
    return this.sortService.getArray();
  }
}
