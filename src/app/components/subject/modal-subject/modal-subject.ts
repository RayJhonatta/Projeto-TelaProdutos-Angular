import { Component, OnInit, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-subject',
    standalone: true,
    imports: [],
    templateUrl: './modal-subject.html',
    styleUrl: './modal-subject.css',
  })

export class ModalSubject {

  private dialogRef = inject(MatDialogRef);

  closeModal() {
    this.dialogRef.close();
  }

}