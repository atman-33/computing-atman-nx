import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss'],
})

export class ConfirmationDialogComponent {
  @Output() confirmed = new EventEmitter<boolean>();

  message = '';

  confirm(result: boolean): void {
    this.confirmed.emit(result);
  }
}
