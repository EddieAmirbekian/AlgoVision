import { Sortable } from './sortable';
import { ACCENT, PRIMARY, SECONDARY, WARN } from '../styles';

export class MergeSort extends Sortable {
  constructor(
    public divs: HTMLCollectionOf<HTMLElement>,
    public divSizes: number[],
    public speed: number = 1
  ) {
    super(divs, divSizes, speed);
  }

  public mergePartition(start: number, end: number): void {
    if (start < end) {
      const mid = Math.floor((start + end) / 2);
      this.updateDiv(this.divs[mid], this.divSizes[mid], SECONDARY);

      this.mergePartition(start, mid);
      this.mergePartition(mid + 1, end);

      this.mergeSort(start, mid, end);
    }
  }

  private mergeSort(start: number, mid: number, end: number): void {
    let p = start;
    let q = mid + 1;
    let k = 0;
    const array: number[] = [];

    for (let i = start; i <= end; i++) {
      if (p > mid) {
        array[k++] = this.divSizes[q++];
        this.updateDiv(this.divs[q - 1], this.divSizes[q - 1], WARN);
      } else if (q > end) {
        array[k++] = this.divSizes[p++];
        this.updateDiv(this.divs[p - 1], this.divSizes[p - 1], WARN);
      } else if (this.divSizes[p] < this.divSizes[q]) {
        array[k++] = this.divSizes[p++];
        this.updateDiv(this.divs[p - 1], this.divSizes[p - 1], WARN);
      } else {
        array[k++] = this.divSizes[q++];
        this.updateDiv(this.divs[q - 1], this.divSizes[q - 1], WARN);
      }
    }

    for (let i = 0; i < k; i++) {
      this.divSizes[start++] = array[i];
      this.updateDiv(this.divs[start - 1], this.divSizes[start - 1], ACCENT);
    }
  }
}
