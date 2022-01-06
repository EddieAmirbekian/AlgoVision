import { Sortable } from './sortable';
import { ACCENT, PRIMARY, SECONDARY, WARN } from '../styles';
import {ThemePalette} from '@angular/material/core';

export class HeapSort extends Sortable {
  constructor(
    public divs: HTMLCollectionOf<HTMLElement>,
    public divSizes: number[],
    public speed: number = 1
  ) {
    super(divs, divSizes, speed);
  }

  protected swapDivs(i: number, j: number, color: string): void {
    this.updateDiv(this.divs[i], this.divSizes[i], color);
    this.updateDiv(this.divs[j], this.divSizes[j], color);
  }

  protected swapDivSizes(i: number, j: number): void {
    const temp = this.divSizes[i];
    this.divSizes[i] = this.divSizes[j];
    this.divSizes[j] = temp;
  }

  protected swap(i: number, j: number): void {
    this.swapDivs(i, j, WARN);
    this.swapDivSizes(i, j);
    this.swapDivs(i, j, WARN);
    this.swapDivs(i, j, PRIMARY);
  }

  protected checkForHeapify(n: number, size: number, largest: number): boolean {
    return n < size && this.divSizes[n] > this.divSizes[largest];
  }

  protected heapify(n: number, i: number, size: number, largest: number): number | undefined {
    if (this.checkForHeapify(n, size, largest)) {
      if (largest !== i) {
        this.updateDiv(this.divs[largest], this.divSizes[largest], PRIMARY);
      }

      this.updateDiv(this.divs[largest], this.divSizes[largest], WARN);
      return n;
    }
    return;
  }

  protected maxHeapify(size: number, i: number): void {
    let largest = i;
    let tmp: number | undefined = 0;
    const l = 2 * i + 1;
    const r = 2 * i + 2;


    tmp = this.heapify(l, i, size, largest);
    largest = tmp ? tmp : largest;

    tmp = this.heapify(r, i, size, largest);
    largest = tmp ? tmp : largest;

    if (largest !== i) {
      this.swap(i, largest);
      this.maxHeapify(size, largest);
    }
  }

  public heapSort(): void {
    let i: number;
    for (i = Math.floor(this.divSizes.length / 2) - 1; i >= 0; i--) {
      this.maxHeapify(this.divSizes.length, i);
    }

    for (i = this.divSizes.length - 1; i > 0; i--) {
      this.swap(0, i);
      this.updateDiv(this.divs[i], this.divSizes[i], ACCENT);
      this.updateDiv(this.divs[i], this.divSizes[i], SECONDARY);

      this.maxHeapify(i, 0);

      this.updateDiv(this.divs[i], this.divSizes[i], PRIMARY);
      this.updateDiv(this.divs[i], this.divSizes[i], ACCENT);
    }
    this.updateDiv(this.divs[i], this.divSizes[i], ACCENT);
  }
}
