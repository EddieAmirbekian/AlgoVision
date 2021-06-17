import { Sortable } from './sortable';
import { ACCENT, PRIMARY, WARN } from './styles';

export class InsertionSort extends Sortable {
  constructor(
    public divs: HTMLCollectionOf<HTMLElement>,
    public divSizes: number[],
    public speed: number = 1
  ) {
    super(divs, divSizes, speed);
  }

  public insertionSort() {
    let j: number;
    for (j = 0; j < this.divSizes.length; j++) {
      this.updateDiv(this.divs[j], this.divSizes[j], PRIMARY);

      let key = this.divSizes[j];
      let i = j - 1;
      while (i >= 0 && this.divSizes[i] > key) {
        this.updateDiv(this.divs[i], this.divSizes[i], WARN);
        this.updateDiv(this.divs[i + 1], this.divSizes[i + 1], WARN);

        this.divSizes[i + 1] = this.divSizes[i];

        this.updateDiv(this.divs[i], this.divSizes[i], WARN);
        this.updateDiv(this.divs[i + 1], this.divSizes[i + 1], WARN);

        this.updateDiv(this.divs[i], this.divSizes[i], PRIMARY);
        if (i === j - 1) {
          this.updateDiv(this.divs[i + 1], this.divSizes[i + 1], PRIMARY);
        } else {
          this.updateDiv(this.divs[i + 1], this.divSizes[i + 1], PRIMARY);
        }
        i -= 1;
      }
      this.divSizes[i + 1] = key;

      for (let t = 0; t < j; t++) {
        this.updateDiv(this.divs[t], this.divSizes[t], ACCENT);
      }
    }
    this.updateDiv(this.divs[j - 1], this.divSizes[j - 1], ACCENT);
  }
}
