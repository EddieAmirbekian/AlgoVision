import { Sortable } from './sortable';
import { ACCENT, PRIMARY, WARN } from './styles';

export class HeapSort extends Sortable {
  constructor(
    public divs: HTMLCollectionOf<HTMLElement>,
    public divSizes: number[],
    public speed: number = 1
  ) {
    super(divs, divSizes, speed);
  }

  protected swap(i: number, j: number) {
    this.updateDiv(this.divs[i], this.divSizes[i], WARN);
    this.updateDiv(this.divs[j], this.divSizes[j], WARN);

    let temp = this.divSizes[i];
    this.divSizes[i] = this.divSizes[j];
    this.divSizes[j] = temp;

    this.updateDiv(this.divs[i], this.divSizes[i], WARN);
    this.updateDiv(this.divs[j], this.divSizes[j], WARN);

    this.updateDiv(this.divs[i], this.divSizes[i], PRIMARY);
    this.updateDiv(this.divs[j], this.divSizes[j], PRIMARY);
  }

  protected maxHeapify(size: number, i: number) {
    let largest = i;
    let l = 2 * i + 1;
    let r = 2 * i + 2;

    if (l < size && this.divSizes[l] > this.divSizes[largest]) {
      if (largest != i) {
        this.updateDiv(this.divs[largest], this.divSizes[largest], PRIMARY);
      }

      largest = l;

      this.updateDiv(this.divs[largest], this.divSizes[largest], WARN);
    }

    if (r < size && this.divSizes[r] > this.divSizes[largest]) {
      if (largest != i) {
        this.updateDiv(this.divs[largest], this.divSizes[largest], PRIMARY);
      }

      largest = r;

      this.updateDiv(this.divs[largest], this.divSizes[largest], WARN);
    }

    if (largest != i) {
      this.swap(i, largest);
      this.maxHeapify(size, largest);
    }
  }

  public heapSort() {
    for (let i = Math.floor(this.divSizes.length / 2) - 1; i >= 0; i--) {
      this.maxHeapify(this.divSizes.length, i);
    }

    for (var i = this.divSizes.length - 1; i > 0; i--) {
      this.swap(0, i);
      this.updateDiv(this.divs[i], this.divSizes[i], ACCENT);
      this.updateDiv(this.divs[i], this.divSizes[i], PRIMARY);

      this.maxHeapify(i, 0);

      this.updateDiv(this.divs[i], this.divSizes[i], PRIMARY);
      this.updateDiv(this.divs[i], this.divSizes[i], ACCENT);
    }
    this.updateDiv(this.divs[i], this.divSizes[i], ACCENT);
  }
}
