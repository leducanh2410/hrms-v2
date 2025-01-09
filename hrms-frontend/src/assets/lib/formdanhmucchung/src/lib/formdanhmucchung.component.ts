import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TableModule } from 'primeng/table';


@Component({
  selector: 'lib-formdanhmucchung',
  templateUrl: './formdanhmucchung.component.html',
  styleUrls: [
    './formdanhmucchung.component.css'
  ],
  imports: [
    CommonModule,
    MatCheckboxModule,
    MatTooltipModule,
    MatBadgeModule,
    MatDialogModule,
    MatDividerModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatSelectModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    TableModule,
  ]
})
export class FormdanhmucchungComponent implements OnInit {
  @ViewChild('danhmuc') danhmuc: any;
  selected: any;
  listSelected: any[] = [];
  scrollHeight = '960px';
  selectionMode = 'single'
  idField = 'id'
  globalFilterFields: any[] = [];

  private _unsubscribeAll: Subject<any> = new Subject<any>();
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public matDialogRef: MatDialogRef<FormdanhmucchungComponent>
  ) {
  }

  ngOnInit(): void {
    if (this.data.selectionMode) this.selectionMode = this.data.selectionMode
    if (this.data.idField) this.idField = this.data.idField
    this.data.columns.forEach((column: { field: any; }) => {
      this.globalFilterFields.push(column.field);
    });

  }

  onRowSelect(event: any, selected: any) {
    this.selected = selected;
    this.matDialogRef.close(selected);
  }
  /**
  * Save and close
  */
  saveAndClose(): void {
    if (this.selectionMode != 'single' && this.listSelected) {
      this.matDialogRef.close(this.listSelected);
    } else {
      if (this.selected == undefined || this.selected == null) {
        return;
      }
      this.matDialogRef.close(this.selected);
    }
  }

  unSelectAndClose(): void {
    if (this.selectionMode != 'single' && this.listSelected) {
      this.matDialogRef.close(this.listSelected);
    } else {
      this.matDialogRef.close({
        data: {
          [this.idField]: null,
        }
      });
    }
  }

  onClose(): void {
    // Close the dialog
    this.matDialogRef.close();
  }
  /**
  * On destroy
  */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

}
