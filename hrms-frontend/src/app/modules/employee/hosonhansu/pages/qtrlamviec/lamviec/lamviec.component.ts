import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonApiService } from '../../../../../../services/commonHttp';
import { HSNhansuURL } from '../../../../../../services/employe/hosonhansuURL';
import { Subject } from 'rxjs/internal/Subject';
import { THONG_TIN_CHUNG } from '../../../model/thongtinchung';
import { takeUntil } from 'rxjs';
import { LamviecdialogComponent } from './lamviecDialog/lamviecdialog/lamviecdialog.component';
import { QuatrinhLamviecURL } from '../../../../../../services/employe/quatrinhlamviecURL';
import { MessageService } from '../../../../../../shared/message.services';
import { Buttons } from '../../../../../../fuse/components/message-box/common';
import { MessageBox } from '../../../../../../fuse/components/message-box/message-box.provider';
import { AppUltil } from '../../../../../../shared/AppUltil';
import FileSaver from 'file-saver';
import { DividerModule } from 'primeng/divider';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { QtrinhlamviecBean } from '../../../model/qtrinhlamviecbean';

@Component({
  selector: 'app-lamviec',
  templateUrl: './lamviec.component.html',
  styleUrls: ['./lamviec.component.scss'],
  imports: [DividerModule, CommonModule, FormsModule, TableModule],
})
export class LamviecComponent implements OnInit, OnChanges {
  @Input('nsInfo') nsInfo: THONG_TIN_CHUNG;

  listQuaTrinhLamViec: QtrinhlamviecBean[];

  private _unsubscribeAll: Subject<any> = new Subject<any>();
  constructor(
    private _matDialog: MatDialog,
    private http: CommonApiService,
    private messageService: MessageService,
    private mb: MessageBox
  ) {}
  ngOnChanges(): void {
    if (this.nsInfo != null && this.nsInfo?.id != null) {
      // this.http
      //   .get(HSNhansuURL.getQtlamviec(this.nsInfo?.id))
      //   .pipe(takeUntil(this._unsubscribeAll))
      //   .subscribe((res: any) => {
      //     if (!res || !res.state) return;
      //     this.data = res.data;
      //   });
    }
  }

  ngOnInit(): void {
    this.listQuaTrinhLamViec = this.nsInfo?.quaTrinhCongTac;
    this.loadData();
    
  }

  loadData(): void {
    
  }

  themchucdanh() {
    const dialogRef = this._matDialog.open(LamviecdialogComponent, {
      width: '900px',
      disableClose: true,
      data: {
        id: this.nsInfo?.id,
        isNow: true,
        tenbophan: this.nsInfo?.quaTrinhCongTac[0].department.departmentName,
        phonbanId: this.nsInfo?.quaTrinhCongTac[0].department.id,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.loadData();
    });
  }

  suachucdanh(product) {
    const obj = JSON.parse(JSON.stringify(product));
    const dialogRef = this._matDialog.open(LamviecdialogComponent, {
      width: '900px',
      disableClose: true,
      data: obj,
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.loadData();
    });
  }

  delete(product) {
    this.http
      .post(QuatrinhLamviecURL.validXoaQtLamviec(), product)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (!res || !res.state) {
          this.messageService.showErrorMessage('Hệ thống', res.message);
          return;
        }
        let dialog = this.mb.showDefault(
          'Bạn có chắc chắn muốn muốn xóa quá trình làm việc này không?',
          Buttons.YesNo
        );

        dialog.dialogResult$.subscribe(async (result) => {
          if (result) {
            this.http
              .delete(QuatrinhLamviecURL.deleteQtlamviec(product.qtlamviecId))
              .pipe(takeUntil(this._unsubscribeAll))
              .subscribe((res: any) => {
                if (!res || !res.state) {
                  this.messageService.showErrorMessage(
                    'Hệ thống',
                    'Xóa thông tin không thành công'
                  );
                  return;
                }
                this.messageService.showSuccessMessage(
                  'Hệ thống',
                  'Xóa thành công'
                );
                this.loadData();
              });
          }
        });
      });
  }

  xuatExcel(): void {
    this.http
      .get(QuatrinhLamviecURL.xuatExcel(this.nsInfo?.id))
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (!res || !res.state) {
          return;
        }

        const blob = AppUltil.base64ToBlob(res.data);
        FileSaver.saveAs(blob, 'quatrinhlamviec.xls');
      });
  }
}
