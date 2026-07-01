import { Component } from '@angular/core';
import { MatDialogModule } from '@angular/material/dialog';
// import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-my-account',
  imports: [
    MatDialogModule
  ],
  templateUrl: './my-account.html',
  styleUrl: './my-account.css',
})
export class MyAccount {
 // private router = inject(Router);
  private dialogRef = inject(MatDialogRef)
  closeModal() {
    this.dialogRef.close();
  }
}
