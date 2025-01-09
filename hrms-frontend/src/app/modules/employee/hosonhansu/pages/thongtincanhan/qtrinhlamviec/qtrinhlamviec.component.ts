import { CommonModule } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-qtrinhlamviec',
  templateUrl: './qtrinhlamviec.component.html',
  styleUrls: ['./qtrinhlamviec.component.scss'],
  imports: [
    MatFormFieldModule,
    TableModule,
    CommonModule,
    MatInputModule
  ]
})
export class QtrinhlamviecComponent {
  selecteds: any[]

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public matDialogRef: MatDialogRef<QtrinhlamviecComponent>,
  ) {

  }

  saveAndClose(): void {
    this.matDialogRef.close(this.selecteds);
  }

  close(): void {
    this.matDialogRef.close();
  }
}
