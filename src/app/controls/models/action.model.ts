import {Algorithm} from './algorithm.enum';
import {ThemePalette} from '@angular/material/core';

type ActionFunction = () => ((algorithm: Algorithm) => void);

export class ActionModel {
  public isMenu = false;
  public disabled = false;
  public color: ThemePalette;
  public isVisible = true;
  public isRaised = false;
  public children: ActionModel[] = [];

  private actionFunc: ActionFunction | undefined;
  private component = 'action';

  public id: string;

  constructor(public title: string) {
    this.id =
      this.component + '-' + this.title.replace('.', '-').replace('_', '-');
  }

  public click(): void {
    if (this.actionFunc) {
      this.actionFunc();
    }
  }

  public button(): ActionModel {
    this.isMenu = false;
    return this;
  }

  public raised(): ActionModel {
    this.isRaised = true;
    return this;
  }

  public primary(): ActionModel {
    this.color = 'primary';
    return this;
  }

  public accent(): ActionModel {
    this.color = 'accent';
    return this;
  }

  public visible(): ActionModel {
    this.isVisible = true;
    return this;
  }

  public default(): ActionModel {
    this.color = void 0;
    return this;
  }

  public menu(): ActionModel {
    this.isMenu = true;
    return this;
  }

  public setDisabled(disabled: boolean): void {
    this.disabled = disabled;
  }

  public subscribe(action: any): ActionModel {
    this.actionFunc = action;
    return this;
  }

  public addChild(action: ActionModel): ActionModel {
    if (this.isMenu) {
      this.children.push(action);
    }
    return this;
  }
}
