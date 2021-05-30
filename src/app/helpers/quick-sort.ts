import { Sortable } from './sortable';
import { ACCENT, PRIMARY, WARN } from './styles';

export class QuickSort extends Sortable {
  constructor(
    public divs: HTMLCollectionOf<HTMLElement>,
    public divSizes: number[],
    public speed: number = 1
  ) {
    super(divs, divSizes, speed);
  }

  public quickPartition(start: number, end: number) {
    let i = start + 1;
    let piv = this.divSizes[start];
    this.updateDiv(this.divs[start], this.divSizes[start], PRIMARY);

    for (let j = start + 1; j <= end; j++) {
      if (this.divSizes[j] < piv) {
        this.updateDiv(this.divs[j], this.divSizes[j], PRIMARY);

        this.updateDiv(this.divs[i], this.divSizes[i], WARN);
        this.updateDiv(this.divs[j], this.divSizes[j], WARN);

        let temp = this.divSizes[i];
        this.divSizes[i] = this.divSizes[j];
        this.divSizes[j] = temp;

        this.updateDiv(this.divs[i], this.divSizes[i], WARN);
        this.updateDiv(this.divs[j], this.divSizes[j], WARN);

        this.updateDiv(this.divs[i], this.divSizes[i], PRIMARY);
        this.updateDiv(this.divs[j], this.divSizes[j], PRIMARY);

        i += 1;
      }
    }
    this.updateDiv(this.divs[start], this.divSizes[start], WARN);
    this.updateDiv(this.divs[i - 1], this.divSizes[i - 1], WARN);

    let temp = this.divSizes[start];
    this.divSizes[start] = this.divSizes[i - 1];
    this.divSizes[i - 1] = temp;

    this.updateDiv(this.divs[start], this.divSizes[start], WARN);
    this.updateDiv(this.divs[i - 1], this.divSizes[i - 1], WARN);

    for (let t = start; t <= i; t++) {
      this.updateDiv(this.divs[t], this.divSizes[t], ACCENT);
    }

    return i - 1;
  }

  public quickSort(start: number, end: number) {
    if (start < end) {
      let pivotPos = this.quickPartition(start, end);
      this.quickSort(start, pivotPos - 1);
      this.quickSort(pivotPos + 1, end);
    }
  }
}
