import {
  Component,
  EventEmitter,
  Inject,
  Injectable,
  Input,
  Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';

export interface ModalBody {
  type: 'success' | 'warning' | 'error' | 'info';
  header: string;
  message: string;
}

@Component({
  selector: 'app-alert-message',
  standalone: true,
  imports: [CommonModule, MatButtonModule],
  templateUrl: './alert-message.component.html',
  styleUrl: './alert-message.component.scss',
})
export class AlertMessageComponent {
  constructor(
    private dialogRef: MatDialogRef<any>,
    @Inject(MAT_DIALOG_DATA) public data: ModalBody
  ) {}

  close() {
    this.dialogRef.close();
  }
}
