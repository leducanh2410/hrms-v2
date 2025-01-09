import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Buttons } from '../../../../../fuse/components/message-box/common';
import { Button } from 'primeng/button';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-xacnhanpopup',
  templateUrl: './xacnhanpopup.component.html',
  styleUrls: ['./xacnhanpopup.component.scss']
})
export class XacnhanpopupComponent {
  title = "Cảnh báo";
  message = '';

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public matDialogRef: MatDialogRef<XacnhanpopupComponent>,
  ) {
    this.title = data.title ? data.title: "Cảnh báo";
    this.message = data.message
  }

  saveAndClose(value): void {
    this.matDialogRef.close(value);
  }

  close(): void {
    this.matDialogRef.close();
  }
}
