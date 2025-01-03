import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DanhMucURL } from '../../../../../../../services/employe/danhmucURL';
import { Subject, takeUntil } from 'rxjs';
import { BangluongformComponent } from '../bangluongform/bangluongform.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-thamsoluongform',
  templateUrl: './thamsoluongform.component.html',
  styleUrls: ['./thamsoluongform.component.scss'],
  imports: [
    MatFormFieldModule,
    TableModule,
    CommonModule,
    FormsModule,
    MatInputModule
  ]
})
export class ThamsoluongformComponent implements OnInit, OnDestroy {
  @ViewChild('dtns') dtns: any;
  selected: any
  listNgachLuong: any[]
  columns: string[]
  bangluong: any[]

  // thong tin bang luong hien tai
  tenBangLuong: string;
  idBangLuong: string;
  bacluongId: number;
  mangachluong: string;
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  constructor(
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public matDialogRef: MatDialogRef<ThamsoluongformComponent>,
    private _matDialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.columns = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX', 'X', 'XI', 'XII', 'XIII', 'XIV', 'XV', 'XVI', 'XVII', 'XVIII', 'XIX', 'XX']
    if (this.data.id) {
      this.idBangLuong = this.data.id
      this.http
        .get(DanhMucURL.getListThangbangluong(this.data.id))
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((res: any) => {
          if (!res || !res.state) return;
          this.listNgachLuong = res.data;
          if (this.data.bacluongId && this.data.mangachluong) {
            // Bang luong dang chon
            let bangLuongSelected = this.listNgachLuong.find((item) => item.ngachluongCode = this.data.mangachluong);
            this.selected = bangLuongSelected.ngachluongcon.find((item) => item.id = this.data.bacluongId)
          }
        });

      }
    // this.http
    //   .get(DanhMucURL.getListBangluong())
    //   .pipe(takeUntil(this._unsubscribeAll))
    //   .subscribe((res: any) => {
    //     if (!res || !res.state) return;
    //     this.bangluong = res.data;
    //     if(this.data.id) this.tenBangLuong = this.bangluong.find((item) => item.id = this.idBangLuong).name;
    //   });
  }

  onSelectBacluong(bacluong) {
    this.selected = bacluong;
  }

  onChonBangluong() {
    const dialogRef = this._matDialog.open(BangluongformComponent, {
      disableClose: true,
      data: this.bangluong
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.tenBangLuong = result.name
        this.idBangLuong = result.id
        this.http
          .get(DanhMucURL.getListThangbangluong(result.id))
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe((res: any) => {
            if (!res || !res.state) return;
            this.listNgachLuong = res.data;
          });
      }
    })
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

  unSelectAndClose(): void {
    this.matDialogRef.close({
      data: {
        id: null,
        name: null
      }
    });
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
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
