import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from "@angular/material/snack-bar";
@Injectable({
    providedIn: 'root'
  })
export class SnackBar {
  constructor(private _snackBar: MatSnackBar) {}
  config = new MatSnackBarConfig();
  successSnackBar(text: string): void {
    this.config.duration = 5000;
    this.config.panelClass = ["success-snackbar"];
    this.config.horizontalPosition = "right";
    this.config.verticalPosition = "bottom";
    this._snackBar.open(text, "X", this.config);
  }
  errorSnackBar(text: string): void {
    this.config.duration = 5000;
    this.config.panelClass = ["red-snackbar"];
    this.config.horizontalPosition = "right";
    this.config.verticalPosition = "bottom";
    this._snackBar.open(text, "X", this.config);
  }
}
