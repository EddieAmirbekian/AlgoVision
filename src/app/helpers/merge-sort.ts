import { ACCENT, PRIMARY, WARN } from './styles';

export class MergeSort {
  private currentDelay: number;
  private readonly delayTime: number;
  constructor(
    public divs: HTMLCollectionOf<HTMLElement>,
    public divSizes: number[]
  ) {
    this.currentDelay = 0;
    this.delayTime = 10;
  }

  public mergePartition(start: number, end: number) {
    if (start < end) {
      let mid = Math.floor((start + end) / 2);
      this.updateDiv(this.divs[mid], this.divSizes[mid], PRIMARY);

      this.mergePartition(start, mid);
      this.mergePartition(mid + 1, end);

      this.mergeSort(start, mid, end);
    }
  }

  private mergeSort(start: number, mid: number, end: number) {
    let p = start,
      q = mid + 1,
      k = 0;
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
      this.updateDiv(this.divs[start - 1], this.divSizes[start - 1], ACCENT); //Color update
    }
  }

  private updateDiv(container: HTMLElement, height: number, color: string) {
    window.setTimeout(() => {
      container.style.height = height + 'px';
      container.style.backgroundColor = color;
    }, (this.currentDelay += this.delayTime));
  }
}
