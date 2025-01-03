import { HttpClient } from '@angular/common/http';
import { Component, Inject, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { DanhMucURL } from '../../../../../../../services/employe/danhmucURL';
import { Subject, takeUntil } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TableModule } from 'primeng/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-bangluongform',
  templateUrl: './bangluongform.component.html',
  styleUrls: ['./bangluongform.component.scss'],
  imports:[
    MatFormFieldModule,
    TableModule,
    MatCheckboxModule,
    CommonModule,
    FormsModule,
    MatInputModule
  ]
})
export class BangluongformComponent {
  @ViewChild('dtns') dtns: any;
  selected: any
  listBangluong: any[]
  listBangluongCu: any[]
  hienthiPBcu: boolean = false;

  private _unsubscribeAll: Subject<any> = new Subject<any>();
  constructor(
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public matDialogRef: MatDialogRef<BangluongformComponent>
  ) { }

  ngOnInit(): void {
    if (this.data) {
      this.listBangluongCu = this.data;
      this.listBangluong = this.listBangluongCu.filter((item) => item.dangSd = true);
    }
  }

  onRowSelect(event: any, selected: any) {
    this.selected = selected;
    this.matDialogRef.close(this.selected);
  }

  /**
  * Save and close
  */
  saveAndClose(): void {
    if (this.selected == undefined || this.selected == null) {
      return;
    }
    this.matDialogRef.close(this.selected);
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
