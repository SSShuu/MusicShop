import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  constructor(public _SnackBar: MatSnackBar) {}

  showSnackBar(msg: string) {
    this._SnackBar.open(msg, '', {
      duration: 3500,
      verticalPosition: 'top',
      horizontalPosition: 'center',
    });
  }
}
