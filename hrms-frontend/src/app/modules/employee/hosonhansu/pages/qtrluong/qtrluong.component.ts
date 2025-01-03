import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonApiService } from '../../../../../services/commonHttp';
import { HSNhansuURL } from '../../../../../services/employe/hosonhansuURL';
import { Subject, takeUntil } from 'rxjs';
import { THONG_TIN_CHUNG } from '../../model/thongtinchung';
import { LuongdialogComponent } from './luongdialog/luongdialog.component';
import { MessageBox } from '../../../../../fuse/components/message-box/message-box.provider';
import { Buttons } from '../../../../../fuse/components/message-box/common';
import { QuatrinhLuongURL } from '../../../../../services/employe/quatrinhluongURL';
import { MessageService } from '../../../../../shared/message.services';
import { DanhMucURL } from '../../../../../services/employe/danhmucURL';
import { AppUltil } from '../../../../../shared/AppUltil';
import FileSaver from 'file-saver';
import { FileviewComponent } from '../../../../components/fileview/fileview.component';
import { PhucapdialogComponent } from './phucapdialog/phucapdialog.component';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { QtrluongdieuchinhComponent } from '../qtrluongdieuchinh/qtrluongdieuchinh.component';
import { CommonModule } from '@angular/common';
import { NumberFormatPipe } from '../../../../../shared/formatNumber';

@Component({
  selector: 'app-qtrluong',
  templateUrl: './qtrluong.component.html',
  styleUrls: ['./qtrluong.component.scss'],
  imports:[
    MatAccordion,
    MatExpansionModule,
    TableModule,
    FormsModule,
    QtrluongdieuchinhComponent,
    CommonModule,
    NumberFormatPipe
  ]
})
export class QtrluongComponent implements OnInit, OnChanges {
  @Input('nsInfo') nsInfo: any;
  @ViewChild('qtrluongdieuchinh') qtrluongdieuchinh: any;
  data: any[];
  dataPhucap:any[];

  model: THONG_TIN_CHUNG;

  

  private _unsubscribeAll: Subject<any> = new Subject<any>();
  constructor(
    private _matDialog: MatDialog,
    private http: CommonApiService,
    private messageService: MessageService,
    private mb: MessageBox,
  ) {


  }

  ngOnChanges(changes: SimpleChanges): void {
    this.loadDataLuong();
    this.loadDataPhucap();
  }
  ngOnInit(): void {
    this.model = this.nsInfo;
    
    console.log('nhan su',this.nsInfo);
    // this.loadDataLuong();
    // this.loadDataPhucap();
  }

  loadDataLuong(): void {
    this.http
      .get(HSNhansuURL.getDsLuong(this.nsInfo?.nsID))
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (!res || !res.state) return;
        this.data = res.data;
      });


  }

  loadDataPhucap(): void {
    this.http
      .get(QuatrinhLuongURL.getDsNsPhucap(this.nsInfo?.nsID))
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (!res || !res.state) return;
        this.dataPhucap = res.data;
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

  themluong() {
    const dialogRef = this._matDialog.open(LuongdialogComponent, {
      width: '1000px',
      disableClose: true,
      data: {
        nsID: this.nsInfo?.nsID,
        donviId: this.nsInfo?.donviId,

      }
    });
    dialogRef.afterClosed()
      .subscribe((result) => {
        this.loadDataLuong();

      });
  }

  xuatExcelLuongdieuchinh(){
    this.qtrluongdieuchinh.xuatExcel();
  }

  themluongDieuchinh(){
    this.qtrluongdieuchinh.themluong();
  }

  themphucap() {
    const dialogRef = this._matDialog.open(PhucapdialogComponent, {
      width: '1000px',
      disableClose: true,
      data: {
        nsID: this.nsInfo?.nsID,
        donviId: this.nsInfo?.donviId,

      }
    });
    dialogRef.afterClosed()
      .subscribe((result) => {
        this.loadDataPhucap();

      });
  }


  sualuong(product): void {
    const obj = JSON.parse(JSON.stringify(product));
    obj.isNghiviec = this.nsInfo?.isNghiviec;
    const dialogRef = this._matDialog.open(LuongdialogComponent, {
      width: '1000px',
      disableClose: true,
      data: obj
    });
    dialogRef.afterClosed()
      .subscribe((result) => {
        this.loadDataLuong();

      });
  }

  suaphucap(product) {
    const obj = JSON.parse(JSON.stringify(product));
    obj.isNghiviec = this.nsInfo?.isNghiviec;
    const dialogRef = this._matDialog.open(PhucapdialogComponent, {
      width: '900px',
      disableClose: true,
      data: obj
    });
    dialogRef.afterClosed()
    .subscribe((result) => {
      this.loadDataPhucap();

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
          .delete(QuatrinhLuongURL.deleteNsLuong(id))
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

  deletePhucap(id) {

    let dialog = this.mb.showDefault(
      'Bạn có chắc chắn muốn muốn xóa quá phụ cấp này không?',
      Buttons.YesNo
    );

    dialog.dialogResult$.subscribe(async (result) => {
      if (result) {
        this.http
          .delete(QuatrinhLuongURL.deleteNsPhucap(id))
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
            this.loadDataPhucap();
          });
      }
    });

  }

  xuatExcel():void{
    console.log('excel');
    this.http
      .get(QuatrinhLuongURL.xuatExcel(this.nsInfo?.nsID))
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (!res || !res.state) {
          return;
        }

        const blob = AppUltil.base64ToBlob(res.data);
        FileSaver.saveAs(blob, "quatrinhluong.xls");
      });
  }

  xuatExcelPhucap():void{
    console.log('excel');
    this.http
      .get(QuatrinhLuongURL.xuatExcelPhucap(this.nsInfo?.nsID))
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (!res || !res.state) {
          return;
        }

        const blob = AppUltil.base64ToBlob(res.data);
        FileSaver.saveAs(blob, "quaphucap.xls");
      });
  }
}
