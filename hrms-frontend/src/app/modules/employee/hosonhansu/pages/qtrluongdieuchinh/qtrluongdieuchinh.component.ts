import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { THONG_TIN_CHUNG } from '../../model/thongtinchung';
import { Subject, takeUntil } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { CommonApiService } from '../../../../../services/commonHttp';
import { MessageService } from '../../../../../shared/message.services';
import { MessageBox } from '../../../../../fuse/components/message-box/message-box.provider';
import { HSNhansuURL } from '../../../../../services/employe/hosonhansuURL';
import { QuatrinhLuongURL } from '../../../../../services/employe/quatrinhluongURL';
import { LuongdieuchinhdialogComponent } from './luongdieuchinhdialog/luongdieuchinhdialog.component';
import { Buttons } from '../../../../../fuse/components/message-box/common';
import { DanhMucURL } from '../../../../../services/employe/danhmucURL';
import { FileviewComponent } from '../../../../components/fileview/fileview.component';
import { AppUltil } from '../../../../../shared/AppUltil';
import FileSaver from 'file-saver';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { NumberFormatPipe } from '../../../../../shared/formatNumber';

@Component({
  selector: 'app-qtrluongdieuchinh',
  templateUrl: './qtrluongdieuchinh.component.html',
  styleUrls: ['./qtrluongdieuchinh.component.scss'],
  imports:[
    TableModule,
    CommonModule,
    NumberFormatPipe
  ]
})
export class QtrluongdieuchinhComponent implements OnInit, OnChanges {
  @Input('nsInfo') nsInfo: any;
  data: any[];

  model: THONG_TIN_CHUNG;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _matDialog: MatDialog,
    private http: CommonApiService,
    private messageService: MessageService,
    private mb: MessageBox,
  ) {


  }

  ngOnInit(): void {
    this.model = this.nsInfo;
    this.loadDataLuong();
  }
  ngOnChanges(changes: SimpleChanges): void {
    this.loadDataLuong();
  }

  loadDataLuong(): void {

    this.http
      .get(QuatrinhLuongURL.getDsLuongDieuchinh(this.nsInfo?.nsID))
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (!res || !res.state) return;
        this.data = res.data;
      });
  }

  themluong() {
    const dialogRef = this._matDialog.open(LuongdieuchinhdialogComponent, {
      width: '1000px',
      disableClose: true,
      data: {
        nsID: this.nsInfo?.nsID,
        donviId: this.nsInfo.donviId,

      }
    });
    dialogRef.afterClosed()
      .subscribe((result) => {
        this.loadDataLuong();

      });
  }

  sualuong(product): void {
    const obj = JSON.parse(JSON.stringify(product));
    obj.isNghiviec = this.nsInfo.isNghiviec;
    const dialogRef = this._matDialog.open(LuongdieuchinhdialogComponent, {
      width: '1000px',
      disableClose: true,
      data: obj
    });
    dialogRef.afterClosed()
      .subscribe((result) => {
        this.loadDataLuong();

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

  xuatExcel(): void {

    this.http
      .get(QuatrinhLuongURL.xuatExcelQtLuongDieuchinh(this.nsInfo?.nsID))
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (!res || !res.state) {
          return;
        }

        const blob = AppUltil.base64ToBlob(res.data);
        FileSaver.saveAs(blob, "quatrinhluong.xls");
      });



  }

  delete(id) {

    let dialog = this.mb.showDefault(
      'Bạn có chắc chắn muốn muốn xóa quá trình lương này không?',
      Buttons.YesNo
    );

    dialog.dialogResult$.subscribe(async (result) => {
      if (result) {
        this.http
          .delete(QuatrinhLuongURL.deleteNsLuongDieuchinh(id))
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
            this.loadDataLuong();
          });
      }
    });

  }

}
