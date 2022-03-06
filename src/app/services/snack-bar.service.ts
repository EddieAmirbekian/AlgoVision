import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable()
export class SnackBarService {
  private readonly config: MatSnackBarConfig = {
    duration: 5000,
    horizontalPosition: 'end',
    verticalPosition: 'top',
  };

  constructor(private snackbar: MatSnackBar) {}

  open(message: string, action: string | undefined): void {
    this.snackbar.open(message, action, this.config);
  }
}
