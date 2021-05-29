import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

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

  constructor() {
    this.generateArray();
  }
}
