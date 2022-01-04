import { Sortable } from './sortable';
import { ACCENT, PRIMARY, SECONDARY, WARN } from './styles';

export class BubbleSort extends Sortable {
  constructor(
    public divs: HTMLCollectionOf<HTMLElement>,
    public divSizes: number[],
    public speed: number = 1
  ) {
    super(divs, divSizes, speed);
  }

  public bubbleSort(): void {
    let i: number;
    let j: number;
    for (i = 0; i < this.divSizes.length - 1; i++) {
      for (j = 0; j < this.divSizes.length - i - 1; j++) {
        this.updateDiv(this.divs[j], this.divSizes[j], SECONDARY);

        if (this.divSizes[j] > this.divSizes[j + 1]) {
          this.updateDiv(this.divs[j], this.divSizes[j], WARN);
          this.updateDiv(this.divs[j + 1], this.divSizes[j + 1], WARN);

          const temp = this.divSizes[j];
          this.divSizes[j] = this.divSizes[j + 1];
          this.divSizes[j + 1] = temp;

          this.updateDiv(this.divs[j], this.divSizes[j], WARN);
          this.updateDiv(this.divs[j + 1], this.divSizes[j + 1], WARN);
        }
        this.updateDiv(this.divs[j], this.divSizes[j], PRIMARY);
      }
      this.updateDiv(this.divs[j], this.divSizes[j], ACCENT);
    }
    this.updateDiv(this.divs[0], this.divSizes[0], ACCENT);
  }
}
