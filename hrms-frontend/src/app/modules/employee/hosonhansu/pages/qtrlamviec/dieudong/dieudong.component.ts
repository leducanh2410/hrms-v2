import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { THONG_TIN_CHUNG } from '../../../model/thongtinchung';
import { QuatrinhDieuDongURL } from '../../../../../../services/employe/quatrinhdieudongURL';
import { MatDialog } from '@angular/material/dialog';
import { CommonApiService } from '../../../../../../services/commonHttp';
import { ShareData } from '../../../../../../shared/shareservice.service';
import { MessageBox } from '../../../../../../fuse/components/message-box/message-box.provider';
import { Subject, takeUntil } from 'rxjs';
import { DieudongdialogComponent } from './dieudongdialog/dieudongdialog/dieudongdialog.component';
import { Buttons } from '../../../../../../fuse/components/message-box/common';
import FileSaver from 'file-saver';
import { DanhMucURL } from '../../../../../../services/employe/danhmucURL';
import { FileviewComponent } from '../../../../../components/fileview/fileview.component';
import { NHAN_SU } from '../../../../../../shared/appkeymessages';
import { AppUltil } from '../../../../../../shared/AppUltil';
import { MessageService } from '../../../../../../shared/message.services';
import { Divider, DividerModule } from 'primeng/divider';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-dieudong',
  templateUrl: './dieudong.component.html',
  imports:[
    DividerModule,
    CommonModule,
    FormsModule,
    TableModule,
    
  ]
})
export class DieudongComponent implements OnInit, OnChanges {
  @Input('nsInfo') nsInfo: any;
  data: any[]

  model: THONG_TIN_CHUNG;

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private shareData: ShareData,
    private _matDialog: MatDialog,
    private http: CommonApiService,
    private messageService: MessageService,
    private mb: MessageBox,
  ) {

  }


  ngOnChanges(): void {
    this.loadData();
  }

  ngOnInit(): void {
    this.model = this.nsInfo;
    this.loadData();
  }

  loadData(): void {
    if (this.nsInfo != null && this.nsInfo.nsID != null) {
      this.http
        .get(QuatrinhDieuDongURL.getAllQuatrinhDDTChuyen(this.nsInfo.nsID))
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((res: any) => {
          if (!res || !res.state) return;
          this.data = res.data;
        });
    }
  }

  xuatExcel(): void {
    this.http
      .get(QuatrinhDieuDongURL.xuatExcel(this.nsInfo.nsID))
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (!res || !res.state) {
          return;
        }

        const blob = AppUltil.base64ToBlob(res.data);
        FileSaver.saveAs(blob, "quatrinhdieudong.xls");
      });
  }

  themdieudong() {
    const dialogRef = this._matDialog.open(DieudongdialogComponent, {
      width: '1000px',
      disableClose: true,
      data: {
        nsID: this.nsInfo.nsID,
        donviId: this.nsInfo.donviId,
        donvidenId: this.nsInfo.donviId,
        donvidiId: this.nsInfo.donviId,
        donvidi: this.nsInfo.donvi,
        phongdi: this.nsInfo.phongban,
        phongdiId: this.nsInfo.phongbanId
      }
    });
    dialogRef.afterClosed()
      .subscribe((result) => {
        this.loadData();

        if (result.data != null && result.data.vtriId != null) {
          this.shareData.sendMessage(NHAN_SU.REFRESH_QT_CVU, 'REFRESH_QT_CVU');
        }

        this.shareData.sendMessage(NHAN_SU.REFRESH_THONGTINCHUNG, 'REFRESH_THONGTINCHUNG');

      });
  }

  suadieudong(product) {
    const obj = JSON.parse(JSON.stringify(product));
    const dialogRef = this._matDialog.open(DieudongdialogComponent, {
      width: '900px',
      disableClose: true,
      data: obj
    });

    dialogRef.afterClosed()
      .subscribe((result) => {
        this.loadData();

      });
  }

  delete(id) {

    let dialog = this.mb.showDefault(
      'Bạn có chắc chắn muốn muốn xóa quá trình điều động này không?',
      Buttons.YesNo
    );

    dialog.dialogResult$.subscribe(async (result) => {
      if (result) {
        this.http
          .delete(QuatrinhDieuDongURL.deleteDieudongthuyenchuyen(id))
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

  }

  viewFileQD(idQD): void {
    this.http
      .get(DanhMucURL.getFileQuyetDinh(idQD))
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (!res || !res.state) {
          return;
        }
        var fileQD = res.data;
        const dialogRef = this._matDialog.open(FileviewComponent, {
          width: '1000px',
          disableClose: true,
          data: {
            fileId: fileQD.fileId,
            fileContent: fileQD.fileContent,
            fileExten: fileQD.fileExten,
            fileName: fileQD.fileName
          }
        });
        dialogRef.afterClosed()
          .subscribe((result) => {
            if (result) {
            }
          });
      });
    return;
  }

  downloadFileQD(idQD): void {
    this.http
      .get(DanhMucURL.getFileQuyetDinh(idQD))
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (!res || !res.state) {
          return;
        }
        var fileQD = res.data;
        const blob = AppUltil.base64ToBlob(fileQD.fileContent);
        FileSaver.saveAs(blob, fileQD.fileName);
      });
    return;
  }

}
