import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatSliderChange } from '@angular/material/slider';
import { Observable, of } from 'rxjs';
import { AlgorithmService } from 'src/app/services/algorithm.service';
import { SortingService } from 'src/app/services/sorting.service';

@Component({
  selector: 'av-sorter',
  templateUrl: './av-sorter.component.html',
  styleUrls: ['./av-sorter.component.scss'],
})
export class AvSorterComponent implements OnInit {
  constructor(
    private algoService: AlgorithmService,
    private sortService: SortingService
  ) {}

  ngOnInit(): void {}

  public get items(): Observable<number[]> {
    return this.sortService.getArray();
  }

  public get length(): Observable<number> {
    return this.sortService.getArrayLength();
  }

  public onSliderChange(event: MatSliderChange) {
    event.value && this.sortService.setLength(event.value);
  }

  public generateArray(): Observable<number[]> {
    this.sortService.generateArray();
    return this.sortService.getArray();
  }
}
