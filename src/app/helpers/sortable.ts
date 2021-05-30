export class Sortable {
  protected currentDelay: number;
  protected readonly delayTime: number;

  constructor(
    public divs: HTMLCollectionOf<HTMLElement>,
    public divSizes: number[],
    public speed: number = 1
  ) {
    this.currentDelay = 0;
    this.delayTime = Math.floor(10 / speed);
  }

  protected updateDiv(container: HTMLElement, height: number, color: string) {
    window.setTimeout(() => {
      container.style.height = height + 'px';
      container.style.backgroundColor = color;
    }, (this.currentDelay += this.delayTime));
  }
}
