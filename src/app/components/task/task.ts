import { Component, inject } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ModalTask } from './modal-task/modal-task';

@Component({
  selector: 'app-task',
  imports: [],
  templateUrl: './task.html',
  styleUrl: './task.css',
})
export class Task {
  private dialog = inject(MatDialog);
  openModal() {
    this.dialog.open(ModalTask, {
      panelClass: 'custom-modal-studyflow'
    });
  }
}
