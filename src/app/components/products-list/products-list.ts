import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDialog } from '@angular/material/dialog';
import { MyAccount } from '../my-account/my-account';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [
    MatDialogModule
  ],
  templateUrl: './products-list.html',
  styleUrl: './products-list.css',
})
export class ProductsList implements OnInit {
  private router = inject(Router);
  private dialog = inject(MatDialog);

  exit() {
    this.router.navigate(['/login']);
  }

  openModal() {
    this.dialog.open(MyAccount, {
      panelClass: 'custom-modal-studyflow'
    });
  }

  ngOnInit(): void {
    //
  }
}
