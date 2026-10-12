import { Component, OnInit, inject } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
    selector: 'app-task',
    standalone: true,
    imports: [],
    templateUrl: './modal-task.html',
    styleUrl: './modal-task.css',
  })

export class ModalTask {

  private dialogRef = inject(MatDialogRef);

  closeModal() {
    this.dialogRef.close();
  }

}