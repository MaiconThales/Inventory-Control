import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackBarService {

  constructor(private snackBar: MatSnackBar) { }

  openSnackBar(msg: string, txtBtn: string): void {
    this.snackBar.open(msg, txtBtn, {
      horizontalPosition: 'end',
      verticalPosition: 'top',
    });
  }

}
