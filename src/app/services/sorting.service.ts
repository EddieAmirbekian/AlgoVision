import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Algorithm } from '../controls/models/algorithm.enum';
import { BubbleSort } from '../helpers/bubble-sort';
import { HeapSort } from '../helpers/heap-sort';
import { MergeSort } from '../helpers/merge-sort';
import { QuickSort } from '../helpers/quick-sort';
import { AlgorithmService } from './algorithm.service';

@Injectable()
export class SortingService {
  private readonly initialLength: number = 87;

  public array: BehaviorSubject<number[]> = new BehaviorSubject<number[]>([]);
  public arrayLength: BehaviorSubject<number> = new BehaviorSubject<number>(
    this.initialLength
  );
  public sortSpeed: BehaviorSubject<number> = new BehaviorSubject<number>(1);

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

  public getSortSpeed(): Observable<number> {
    return this.sortSpeed.asObservable();
  }

  public setSpeed(speed: number) {
    this.sortSpeed.next(speed);
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
    const mergeSortHelper = new MergeSort(bars, cpyItems, this.sortSpeed.value);
    mergeSortHelper.mergePartition(0, this.arrayLength.value - 1);
  }

  private quickSort(items: number[]) {
    const bars = document.getElementsByClassName(
      'sorter-container-item'
    ) as HTMLCollectionOf<HTMLElement>;
    const cpyItems = items.slice();
    const quickSortHelper = new QuickSort(bars, cpyItems, this.sortSpeed.value);
    quickSortHelper.quickSort(0, this.arrayLength.value - 1);
  }

  private heapSort(items: number[]) {
    const bars = document.getElementsByClassName(
      'sorter-container-item'
    ) as HTMLCollectionOf<HTMLElement>;
    const cpyItems = items.slice();
    const heapSortHelper = new HeapSort(bars, cpyItems, this.sortSpeed.value);
    heapSortHelper.heapSort();
  }

  private bubbleSort(items: number[]) {
    const bars = document.getElementsByClassName(
      'sorter-container-item'
    ) as HTMLCollectionOf<HTMLElement>;
    const cpyItems = items.slice();
    const bubbleSortHelper = new BubbleSort(
      bars,
      cpyItems,
      this.sortSpeed.value
    );
    bubbleSortHelper.bubbleSort();
  }
}
