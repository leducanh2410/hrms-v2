import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { CommonApiService } from '../../../../../services/commonHttp';
import { MessageService } from '../../../../../shared/message.services';
import { Buttons } from '../../../../../fuse/components/message-box/common';
import { MessageBox } from '../../../../../fuse/components/message-box/message-box.provider';
import { llnsURL } from '../../../../../services/employe/llnsURL';
import { GiadinhformComponent } from './giadinhform/giadinhform.component';
import { assign } from 'lodash';
import { DividerModule } from 'primeng/divider';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { THONG_TIN_CHUNG } from '../../model/thongtinchung';
import { NhanThan } from '../../model/nhanthan';
import { ExportUtil } from '../../../../../core/utilities/exportExcel';

interface Person {
  fullName: string;
  relationship: string;
  dateOfBirth: Date;
  gender: string;
  occupation: string;
  address: string;
}

@Component({
  selector: 'app-thongtinthannhan',
  templateUrl: './thongtinthannhan.component.html',
  imports: [
    DividerModule,
    TableModule,
    CheckboxModule,
    CommonModule,
    FormsModule,
  ],
})
export class ThongtinthannhanComponent implements OnInit {
  @Input('nsInfo') nhansu: THONG_TIN_CHUNG;
  listThanNhan: NhanThan[] = [];
  nguoiphuthuoc: any;
  //nhansu: any = {donviId: 115, nsId : 115000000000002};

  private _unsubscribeAll: Subject<any> = new Subject<any>();
  private exportUtil: ExportUtil = new ExportUtil();

  constructor(
    private _matDialog: MatDialog,
    private http: CommonApiService,
    private messageService: MessageService,
    private mb: MessageBox
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    if (this.nhansu) {
      this.http
        .get(llnsURL.getAllNhanThanByEmpId(this.nhansu.id))
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((res: any) => {
          if (!res || !res.state) return;
          this.listThanNhan = res.data;
        });
    }
  }

  exportExcel() {
    
    this.exportUtil.exportExcel(
      this.listThanNhan,
      'Danh sách nhân thân_' + Date.now()
    );
  }

  add(): void {
    const dialogRef = this._matDialog.open(GiadinhformComponent, {
      width: '900px',
      data: {
        nsId: this.nhansu.id,
        addNew: true,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.loadData();
    });
  }

  update(data): void {
    const dialogRef = this._matDialog.open(GiadinhformComponent, {
      width: '900px',
      disableClose: true,
      data: { nhanThanId: data.id, addNew: false, nsId: this.nhansu.id },
    });

    dialogRef.afterClosed().subscribe((result) => {
      // if (result) {
      //   this.http
      //     .post(llnsURL.updateNhanThanById(), result)
      //     .pipe(takeUntil(this._unsubscribeAll))
      //     .subscribe((res: any) => {
      //       if (!res || !res.state) {
      //         this.messageService.showErrorMessage(
      //           'Hệ thống',
      //           'Cập nhật thông tin không thành công'
      //         );
      //         return;
      //       }
      //       this.messageService.showSuccessMessage(
      //         'Hệ thống',
      //         'Cập nhật thành công'
      //       );
      //     });
      //   this.loadData();
      // }
      this.loadData();
    });
  }

  delete(id) {
    let dialog = this.mb.showDefault(
      'Bạn có chắc chắn muốn muốn xóa thông tin không?',
      Buttons.YesNo
    );
    dialog.dialogResult$.subscribe(async (result) => {
      if (result) {
        this.http
          .delete(llnsURL.deleteNhanThanById(id))
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe((res: any) => {
            console.log(res);

            if (res.state == 200) {
              this.messageService.showSuccessMessage(
                'Hệ thống',
                'Xóa thành công'
              );
              this.loadData();
              return;
            }
            this.messageService.showErrorMessage(
              'Hệ thống',
              'Xóa thông tin không thành công'
            );
          });
      }
    });
  }

  getFieldValue(rowData: any, field: string) {
    if (typeof rowData[field] == 'number') {
      return rowData[field] === 0
        ? 'Nam'
        : rowData[field] === 1
        ? 'Nữ'
        : 'LGBT';
    }

    return rowData[field];
  }
}
