import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(private _snackBar: MatSnackBar) { }

  showSnackBar(message: string) {
    this._snackBar.open(message, '', { duration: 5000, panelClass: 'my-custom-snackbar' });
  }
}
