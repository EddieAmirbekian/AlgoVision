import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Algorithm } from '../controls/models/algorithm.enum';
import { MergeSort } from '../helpers/merge-sort';
import { AlgorithmService } from './algorithm.service';

const PRIMARY_COLOR = '#7cb342';
const SECONDARY_COLOR = '#ef6c00';
const ANIMATION_SPEED_MS = 5;

@Injectable()
export class SortingService {
  private readonly initialLength: number = 87;

  public array: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([]);
  public arrayLength: BehaviorSubject<number> = new BehaviorSubject<number>(
    this.initialLength
  );

  public generateArray(): void {
    this.array.next(
      Array.from({ length: this.arrayLength.value }, () =>
        Math.floor(1 + Math.random() * 200)
      ).map((value: number) => value * 3)
    );
  }

  public getArray(): Observable<number[]> {
    return this.array.asObservable();
  }

  public getArrayLength(): Observable<number> {
    return this.arrayLength.asObservable();
  }

  public setLength(len: number): void {
    this.arrayLength.next(len);
    this.generateArray();
  }

  constructor(private algorithmService: AlgorithmService) {
    this.generateArray();
  }

  public sort() {
    const algorithm = this.algorithmService.getAlgorithm();
    switch (algorithm) {
      case Algorithm.MERGE:
        this.mergeSort(this.array.value);
        break;
      case Algorithm.QUICK:
        this.quickSort(this.array.value);
        break;
      case Algorithm.HEAP:
        this.heapSort(this.array.value);
        break;
      case Algorithm.BUBBLE:
        this.bubbleSort(this.array.value);
        break;
      default:
        console.error('Wrong algorithm.');
    }
  }

  private mergeSort(items: number[]) {
    const bars = document.getElementsByClassName(
      'sorter-container-item'
    ) as HTMLCollectionOf<HTMLElement>;
    const cpyItems = items.slice();
    const mergeSortHelper = new MergeSort(bars, cpyItems);
    mergeSortHelper.mergePartition(0, this.arrayLength.value - 1);
  }

  private quickSort(items: number[]) {}

  private heapSort(items: number[]) {}

  private bubbleSort(items: number[]) {}
}
