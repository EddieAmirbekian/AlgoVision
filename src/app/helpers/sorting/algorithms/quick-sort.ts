import { Sortable } from '../sortable';
import { ACCENT, PRIMARY, SECONDARY, WARN } from '../../styles';

export class QuickSort extends Sortable {
  constructor(
    public divs: HTMLCollectionOf<HTMLElement>,
    public divSizes: number[],
    public speed: number = 1
  ) {
    super(divs, divSizes, speed);
  }

  protected swapDivSizes(i: number, j: number): void {
    const tmp = this.divSizes[i];
    this.divSizes[i] = this.divSizes[j];
    this.divSizes[j] = tmp;
  }

  quickPartition(start: number, end: number): number {
    let i = start + 1;
    const piv = this.divSizes[start];
    this.updateDiv(this.divs[start], this.divSizes[start], SECONDARY);

    for (let j = start + 1; j <= end; j++) {
      if (this.divSizes[j] < piv) {
        this.updateDiv(this.divs[j], this.divSizes[j], SECONDARY);

        this.updateDiv(this.divs[i], this.divSizes[i], WARN);
        this.updateDiv(this.divs[j], this.divSizes[j], WARN);

        this.swapDivSizes(i, j);

        this.updateDiv(this.divs[i], this.divSizes[i], WARN);
        this.updateDiv(this.divs[j], this.divSizes[j], WARN);

        this.updateDiv(this.divs[i], this.divSizes[i], PRIMARY);
        this.updateDiv(this.divs[j], this.divSizes[j], PRIMARY);

        i += 1;
      }
    }
    this.updateDiv(this.divs[start], this.divSizes[start], WARN);
    this.updateDiv(this.divs[i - 1], this.divSizes[i - 1], WARN);

    this.swapDivSizes(start, i - 1);

    this.updateDiv(this.divs[start], this.divSizes[start], WARN);
    this.updateDiv(this.divs[i - 1], this.divSizes[i - 1], WARN);

    for (let t = start; t <= i; t++) {
      this.updateDiv(this.divs[t], this.divSizes[t], ACCENT);
    }

    return i - 1;
  }

  quickSort(start: number, end: number): void {
    if (start < end) {
      const pivotPos = this.quickPartition(start, end);
      this.quickSort(start, pivotPos - 1);
      this.quickSort(pivotPos + 1, end);
    }
  }
}
