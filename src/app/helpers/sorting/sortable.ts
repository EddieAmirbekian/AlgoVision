export class Sortable {
  protected currentDelay: number;
  protected readonly delayTime: number;

  constructor(
    public divs: HTMLCollectionOf<HTMLElement>,
    public divSizes: number[],
    public speed: number = 1
  ) {
    const sp = Math.pow(10, this.speed - 1);
    this.currentDelay = 0;
    this.delayTime = 10000 / (Math.floor(this.divSizes.length / 10) * sp);
  }

  protected updateDiv(
    container: HTMLElement,
    height: number,
    color: string
  ): void {
    window.setTimeout(() => {
      container.style.height = height + 'px';
      container.style.backgroundColor = color;
    }, (this.currentDelay += this.delayTime));
  }
}
