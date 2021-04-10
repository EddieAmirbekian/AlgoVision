export class ActionModel {
  public isMenu: boolean = false;
  public disabled: boolean = false;
  public color: string = '';
  public isVisible: boolean = true;
  public isRaised: boolean = false;
  public children: ActionModel[] = [];

  private actionFunc: Function | undefined;
  private component: string = 'action';

  public id: string;

  constructor(public title: string) {
    this.id =
      this.component + '-' + this.title.replace('.', '-').replace('_', '-');
  }

  public click() {
    this.actionFunc && this.actionFunc();
  }

  public button() {
    this.isMenu = false;
    return this;
  }

  public raised() {
    this.isRaised = true;
    return this;
  }

  public primary() {
    this.color = 'primary';
    return this;
  }

  public accent() {
    this.color = 'accent';
    return this;
  }

  public visible() {
    this.isVisible = true;
    return this;
  }

  public default() {
    this.color = 'default';
    return this;
  }

  public menu() {
    this.isMenu = true;
    return this;
  }

  public setDisabled(disabled: boolean) {
    this.disabled = disabled;
  }

  public subscribe(action: any) {
    this.actionFunc = action;
    return this;
  }

  public addChild(action: ActionModel) {
    if (this.isMenu) {
      this.children.push(action);
    }
    return this;
  }
}
