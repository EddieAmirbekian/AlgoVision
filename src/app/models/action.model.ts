import { Algorithm } from './algorithm.enum';
import { ThemePalette } from '@angular/material/core';

type ActionFunction = () => (algorithm: Algorithm) => void;

export class ActionModel {
  isMenu = false;
  disabled = false;
  color: ThemePalette;
  isVisible = true;
  isRaised = false;
  children: ActionModel[] = [];

  private actionFunc: ActionFunction | undefined;
  private component = 'action';

  id: string;

  constructor(public title: string) {
    this.id =
      this.component + '-' + this.title.replace('.', '-').replace('_', '-');
  }

  click(): void {
    if (this.actionFunc) {
      this.actionFunc();
    }
  }

  button(): ActionModel {
    this.isMenu = false;
    return this;
  }

  raised(): ActionModel {
    this.isRaised = true;
    return this;
  }

  primary(): ActionModel {
    this.color = 'primary';
    return this;
  }

  accent(): ActionModel {
    this.color = 'accent';
    return this;
  }

  warn(): ActionModel {
    this.color = 'warn';
    return this;
  }

  visible(): ActionModel {
    this.isVisible = true;
    return this;
  }

  default(): ActionModel {
    this.color = void 0;
    return this;
  }

  menu(): ActionModel {
    this.isMenu = true;
    return this;
  }

  setDisabled(disabled: boolean): void {
    this.disabled = disabled;
  }

  subscribe(action: any): ActionModel {
    this.actionFunc = action;
    return this;
  }

  addChild(action: ActionModel): ActionModel {
    if (this.isMenu) {
      this.children.push(action);
    }
    return this;
  }
}
