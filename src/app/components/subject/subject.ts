import { Component, inject, OnInit } from '@angular/core';
import { ModalSubject } from './modal-subject/modal-subject';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-subject',
  standalone: true,
  imports: [],
  templateUrl: './subject.html',
  styleUrl: './subject.css',
})

export class Subject implements OnInit {

  private dialog = inject(MatDialog);

  ngOnInit(): void {
    // 
  }

  openModal() {
    this.dialog.open(ModalSubject, {
      panelClass: 'custom-modal-studyflow'
    });
  }
}