import { Sortable } from './sortable';
import { ACCENT, PRIMARY, WARN } from './styles';

export class SelectionSort extends Sortable {
  constructor(
    public divs: HTMLCollectionOf<HTMLElement>,
    public divSizes: number[],
    public speed: number = 1
  ) {
    super(divs, divSizes, speed);
  }

  public selectionSort() {
    let i: number;
    for (i = 0; i < this.divSizes.length - 1; i++) {
      this.updateDiv(this.divs[i], this.divSizes[i], WARN);

      let minIndex: number = i;

      for (let j = i + 1; j < this.divSizes.length; j++) {
        this.updateDiv(this.divs[j], this.divSizes[j], PRIMARY);

        if (this.divSizes[j] < this.divSizes[minIndex]) {
          if (minIndex !== i) {
            this.updateDiv(
              this.divs[minIndex],
              this.divSizes[minIndex],
              PRIMARY
            );
          }
          minIndex = j;
          this.updateDiv(this.divs[minIndex], this.divSizes[minIndex], WARN);
        } else {
          this.updateDiv(this.divs[j], this.divSizes[j], PRIMARY);
        }
      }

      if (minIndex !== i) {
        let temp = this.divSizes[minIndex];
        this.divSizes[minIndex] = this.divSizes[i];
        this.divSizes[i] = temp;

        this.updateDiv(this.divs[minIndex], this.divSizes[minIndex], WARN);
        this.updateDiv(this.divs[i], this.divSizes[i], WARN);
        this.updateDiv(this.divs[minIndex], this.divSizes[minIndex], PRIMARY);
      }
      this.updateDiv(this.divs[i], this.divSizes[i], ACCENT);
    }
    this.updateDiv(this.divs[i], this.divSizes[i], ACCENT);
  }
}
