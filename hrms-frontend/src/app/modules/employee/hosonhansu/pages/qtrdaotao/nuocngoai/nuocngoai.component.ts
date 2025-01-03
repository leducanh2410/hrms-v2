import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonApiService } from '../../../../../../services/commonHttp';
import { DaotaoCanhanURL } from '../../../../../../services/employe/daotaocanhanURL';
import { Subject, takeUntil } from 'rxjs';
import { NuocngoaiDialogComponent } from './nuocngoai-dialog/nuocngoai-dialog.component';
import { MessageService } from '../../../../../../shared/message.services';
import { MessageBox } from '../../../../../../fuse/components/message-box/message-box.provider';
import { Buttons } from '../../../../../../fuse/components/message-box/common';
import { CommonModule, formatDate } from '@angular/common';
import FileSaver from 'file-saver';
import { DanhMucURL } from '../../../../../../services/employe/danhmucURL';
import { FileviewComponent } from '../../../../../components/fileview/fileview.component';
import { AppUltil } from '../../../../../../shared/AppUltil';
import { DividerModule } from 'primeng/divider';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-nuocngoai',
  templateUrl: './nuocngoai.component.html',
  styleUrls: ['./nuocngoai.component.scss'],
  imports: [
    DividerModule,
    FormsModule,
    CommonModule,
    TableModule,
    MatTooltipModule,
  ],
})
export class NuocngoaiComponent implements OnInit {
  @Input('nsInfo') nhansu: any;

  public dsNuocNgoai: any[] = [];

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  checkNhanSuValid: boolean = false;

  constructor(
    private _matDialog: MatDialog,
    private http: CommonApiService,
    private messageService: MessageService,
    private mb: MessageBox
  ) {}

  ngOnInit(): void {
    if (this.nhansu === undefined) {
      this.checkNhanSuValid = !this.checkNhanSuValid;
    }

    this.loadDataNuocNgoai();
  }

  loadDataNuocNgoai() {
    if (this.nhansu) {
      this.http
        .get(DaotaoCanhanURL.getAllNsNuocNgoai(this.nhansu.nsID))
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((res: any) => {
          if (res.state) {
            this.dsNuocNgoai = res.data;
          }
        });
    }
  }

  themNuocNgoai(): void {
    const dialogRef = this._matDialog.open(NuocngoaiDialogComponent, {
      width: '900px',
      data: {
        nhansu: this.nhansu,
        addNew: true,
      },
    });
    dialogRef.afterClosed().subscribe({
      next: () => {
        this.loadDataNuocNgoai();
      },
    });
  }

  updateNuocNgoai(nuocngoai): void {
    const dialogRef = this._matDialog.open(NuocngoaiDialogComponent, {
      width: '900px',
      data: {
        nhansu: this.nhansu,
        addNew: false,
        nsNuocNgoai: nuocngoai,
      },
    });
    dialogRef.afterClosed().subscribe({
      next: () => {
        this.loadDataNuocNgoai();
      },
    });
  }

  deleteNuocNgoai(nuocngoai) {
    let dialog = this.mb.showDefault(
      'Bạn có chắc chắn muốn xóa thông tin không?',
      Buttons.YesNo
    );
    const paramNuocNgoai = {
      nuocngoaiIdList: nuocngoai.nuocngoaiIdList,
    };
    dialog.dialogResult$.subscribe(async (result) => {
      if (result) {
        this.http
          .post(DaotaoCanhanURL.deleteNsNuocNgoai(), paramNuocNgoai)
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
            this.loadDataNuocNgoai();
          });
      }
    });
  }

  xuatExcelNuocNgoai() {
    var data = {};
    var columName = [
      'Ngày bắt đầu',
      'Ngày kết thúc',
      'Nước đến',
      'Mục đích, lý do',
      'Số QĐ',
    ];
    var dataBody = [];
    if (this.dsNuocNgoai && this.dsNuocNgoai.length > 0) {
      for (let index = 0; index < this.dsNuocNgoai.length; index++) {
        const element = this.dsNuocNgoai[index];
        var ngayBatDau = formatDate(element?.ngayBdau, 'dd/MM/yyyy', 'en-US');
        var ngayKetThuc =
          element?.ngayKthuc !== null
            ? formatDate(element?.ngayKthuc, 'dd/MM/yyyy', 'en-US')
            : '';
        var tenNuoc: string[] = [];
        if (element && element.selectedCountries) {
          for (let country of element.selectedCountries) {
            if (country && country.name) {
              tenNuoc.push(country.name);
            }
          }
        }
        var tenNuocStr = tenNuoc.join(', ');
        var lyDo = element?.lydo;
        var soQD =
          element?.soQD +
          '\n' +
          'Ngày ký: ' +
          formatDate(element?.ngayKy, 'dd/MM/yyyy', 'en-US');
        var arr = [ngayBatDau, ngayKetThuc, tenNuocStr, lyDo, soQD];
        dataBody.push(arr);
      }
    } else {
      dataBody.push(['', '', '', '', '']);
    }
    data = { columName, dataBody };
    this.http
      .post(DanhMucURL.xuatExcel(), data)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (!res || !res.state) {
          return;
        }
        const blob = AppUltil.base64ToBlob(res.data);
        FileSaver.saveAs(blob, 'Danh_Sach_Nuoc_Ngoai.xls');
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
        console.log('fileQD', fileQD);
        if (fileQD) {
          const dialogRef = this._matDialog.open(FileviewComponent, {
            width: '1000px',
            disableClose: true,
            data: {
              fileId: fileQD.qdinhId,
              fileContent: fileQD.noiDung,
              fileExten: fileQD.fileExten,
              fileName: fileQD.fileName,
            },
          });
          dialogRef.afterClosed().subscribe((result) => {
            if (result) {
            }
          });
        } else {
          this.messageService.showWarningMessage(
            'Hệ thống',
            'Quyết định không có File đính kèm!'
          );
          return;
        }
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
        if (fileQD) {
          const blob = AppUltil.base64ToBlob(fileQD.fileContent);
          FileSaver.saveAs(blob, fileQD.fileName);
        } else {
          this.messageService.showWarningMessage(
            'Hệ thống',
            'Quyết định không có File đính kèm!'
          );
        }
      });
    return;
  }
}
