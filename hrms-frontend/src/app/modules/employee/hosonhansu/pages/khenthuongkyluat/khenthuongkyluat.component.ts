import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { CommonApiService } from '../../../../../services/commonHttp';
import { EmployeURL } from '../../../../../services/employe/employeURL';
import { MessageService } from '../../../../../shared/message.services';
import { Buttons } from '../../../../../fuse/components/message-box/common';
import { MessageBox } from '../../../../../fuse/components/message-box/message-box.provider';
import { llnsURL } from '../../../../../services/employe/llnsURL';
import { KhenthuongformComponent } from './khenthuongform/khenthuongform.component';
import { KyluatformComponent } from './kyluatform/kyluatform.component';
import FileSaver, { saveAs } from 'file-saver';
import { DanhMucURL } from '../../../../../services/employe/danhmucURL';
import { FileviewComponent } from '../../../../components/fileview/fileview.component';
import { AppUltil } from '../../../../../shared/AppUltil';
import { CommonModule, formatDate } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FileUploadModule } from 'primeng/fileupload';
import { MatSelectModule } from '@angular/material/select';
import { DividerModule } from 'primeng/divider';
import { TableModule } from 'primeng/table';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-khenthuongkyluat',
  templateUrl: './khenthuongkyluat.component.html',
  imports: [
    MatFormFieldModule,
    CommonModule,
    FormsModule,
    MatCheckboxModule,
    MatOptionModule,
    MatDatepickerModule,
    FileUploadModule,
    MatSelectModule,
    DividerModule,
    TableModule,
    MatInputModule
  ],
})
export class KhenthuongKyluatComponent implements OnInit {
  @Input('nsInfo') nhansu: any;
  dsKhenthuong: any;
  dsKyluat: any;
  dsSangkien: any;
  listNgKy: any[] = [];
  listChucVu: any[] = [];

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _matDialog: MatDialog,
    private http: CommonApiService,
    private messageService: MessageService,
    private mb: MessageBox
  ) {}

  ngOnInit(): void {
    this.loadDataKhenThuong();
    this.loadDataKyLuat();

    if (this.nhansu) {
      this.http
        .get(llnsURL.getTdktSangkienByNsId(this.nhansu.nsID))
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((res: any) => {
          if (!res || !res.state) return;
          this.dsSangkien = res.data;
        });
    }

    //--------- nguoi ky --------
    this.http
      .get(EmployeURL.getDsNguoiKyBean())
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (res.state) {
          this.listNgKy = res.data;
          //console.log('----------------------------this.listNgKy: ', this.listNgKy)
        }
      });
    //--------- vitri chuc danh --------
    this.http
      .get(DanhMucURL.getChucvuForQdnoidung2())
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (res.state) {
          this.listChucVu = res.data;
        }
      });
  }

  loadDataKhenThuong() {
    if (this.nhansu) {
      this.http
        .get(llnsURL.getDsKhenthuong(this.nhansu.nsID))
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((res: any) => {
          if (!res || !res.state) return;
          this.dsKhenthuong = res.data;
        });
    }
  }

  loadDataKyLuat() {
    if (this.nhansu) {
      this.http
        .get(llnsURL.getDsKyluat(this.nhansu.nsID))
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((res: any) => {
          if (!res || !res.state) return;
          this.dsKyluat = res.data;
        });
    }
  }

  addKhenThuong(): void {
    const dialogRef = this._matDialog.open(KhenthuongformComponent, {
      width: '900px',
      data: {
        addNew: true,
        nhansu: this.nhansu,
        listNgKy: this.listNgKy,
        listChucVu: this.listChucVu,
        khenthuong: {
          soQD: '',
          nguoiKy: '',
          chucvuKy: '',
          ngayKy: null,
          namQD: null,
          lydo: '',
        },
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.loadDataKhenThuong();
    });
  }

  updateKhenThuong(khenthuong): void {
    const dialogRef = this._matDialog.open(KhenthuongformComponent, {
      width: '900px',
      disableClose: true,
      data: {
        nhansu: this.nhansu,
        listNgKy: this.listNgKy,
        listChucVu: this.listChucVu,
        khenthuong: khenthuong,
        addNew: false,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.http
          .post(llnsURL.saveKhenthuong(), result)
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe((res: any) => {
            if (!res || !res.state) {
              this.messageService.showErrorMessage(
                'Hệ thống',
                'Cập nhật thông tin không thành công'
              );
              return;
            }
            this.messageService.showSuccessMessage(
              'Hệ thống',
              'Cập nhật thành công'
            );
            this.loadDataKhenThuong();
          });
      }
      this.loadDataKhenThuong();
    });
  }

  deleteKhenthuong(id) {
    let dialog = this.mb.showDefault(
      'Bạn có chắc chắn muốn muốn xóa thông tin không?',
      Buttons.YesNo
    );
    dialog.dialogResult$.subscribe(async (result) => {
      if (result) {
        this.http
          .delete(llnsURL.deleteKhenthuong(id))
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
            this.loadDataKhenThuong();
          });
      }
    });
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

  viewFileQD(idQD): void {
    this.http
      .get(DanhMucURL.getFileQuyetDinh(idQD))
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (!res || !res.state) {
          return;
        }

        var fileQD = res.data;
        if (fileQD) {
          const dialogRef = this._matDialog.open(FileviewComponent, {
            width: '1000px',
            disableClose: true,
            data: {
              fileId: fileQD.fileId,
              fileContent: fileQD.fileContent,
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

  addKyLuat(): void {
    const dialogRef = this._matDialog.open(KyluatformComponent, {
      width: '900px',
      data: {
        nhansu: this.nhansu,
        listNgKy: this.listNgKy,
        listChucVu: this.listChucVu,
        kyluat: {},
        addNew: true,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.loadDataKyLuat();
    });
  }

  updateKyLuat(data): void {
    const dialogRef = this._matDialog.open(KyluatformComponent, {
      width: '900px',
      disableClose: true,
      data: {
        nhansu: this.nhansu,
        listNgKy: this.listNgKy,
        listChucVu: this.listChucVu,
        kyluat: data,
        addNew: false,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.http
          .post(llnsURL.saveKyluat(), result)
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe((res: any) => {
            if (!res || !res.state) {
              this.messageService.showErrorMessage(
                'Hệ thống',
                'Cập nhật thông tin không thành công'
              );
              return;
            }
            this.messageService.showSuccessMessage(
              'Hệ thống',
              'Cập nhật thành công'
            );
            this.loadDataKyLuat();
          });
      }
      this.loadDataKyLuat();
    });
  }

  deleteKyluat(id) {
    let dialog = this.mb.showDefault(
      'Bạn có chắc chắn muốn muốn xóa thông tin không?',
      Buttons.YesNo
    );
    dialog.dialogResult$.subscribe(async (result) => {
      if (result) {
        this.http
          .delete(llnsURL.deleteKyluat(id))
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
            this.loadDataKyLuat();
          });
      }
    });
  }

  xuatExcelKhenThuong() {
    var data = {};
    var columName = [
      'Năm KT',
      'Hình thức khen thưởng',
      'Nội dung',
      'Quyết định',
    ];
    var dataBody = [];
    if (this.dsKhenthuong && this.dsKhenthuong.length > 0) {
      for (let index = 0; index < this.dsKhenthuong.length; index++) {
        const element = this.dsKhenthuong[index];

        var ngayKy = formatDate(
          element?.nsQdndung?.ngayKy,
          'dd/MM/yyyy',
          'en-US'
        );
        var quyetdinh =
          element.nsQdndung?.soQd +
          '\n' +
          ngayKy +
          '\n' +
          element.nsQdndung.nguoiky;
        var arr = [element.namKt, element.tenKT, element.lydo, quyetdinh];
        dataBody.push(arr);
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
          FileSaver.saveAs(blob, 'Danhsachkhenthuong.xls');
        });
    }
  }

  xuatExcelKyLuat() {
    var data = {};
    var columName = [
      'Hình thức kỷ luật',
      'Ngày hiệu lực',
      'Ngày hết hiệu lực',
      'Lý do',
      'Quyết định',
    ];
    var dataBody = [];
    if (this.dsKyluat && this.dsKyluat.length > 0) {
      for (let index = 0; index < this.dsKyluat.length; index++) {
        const element = this.dsKyluat[index];
        var ngayKy = formatDate(element?.qdinh?.ngayKy, 'dd/MM/yyyy', 'en-US');
        var ngayBatdau = formatDate(
          element?.ngayHieuluc,
          'dd/MM/yyyy',
          'en-US'
        );
        var ngayKetthuc = element.ngayketthuc
          ? formatDate(element?.ngayketthuc, 'dd/MM/yyyy', 'en-US')
          : '';
        var quyetdinh =
          element.qdinh?.soQd + '\n' + ngayKy + '\n' + element.qdinh.nguoiky;

        var arr = [
          element.tenKL,
          ngayBatdau,
          ngayKetthuc,
          element.lydo,
          quyetdinh,
        ];
        dataBody.push(arr);
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
          FileSaver.saveAs(blob, 'Danhsachkyluat.xls');
        });
    }
  }

  xuatExcelSangkien() {
    var data = {};
    var columName = ['Năm', 'Nội dung', 'Số QĐ', '	Ngày ký'];
    var dataBody = [];
    if (this.dsSangkien && this.dsSangkien.length > 0) {
      for (let index = 0; index < this.dsSangkien.length; index++) {
        const element = this.dsSangkien[index];
        var soQd = element.nsQdndung?.soQd;
        var ngayKy = formatDate(
          element?.nsQdndung?.ngayKy,
          'dd/MM/yyyy',
          'en-US'
        );
        var arr = [element.nam, element.ndungSkien, soQd, ngayKy];
        dataBody.push(arr);
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
          FileSaver.saveAs(blob, 'DanhsachSangkien.xls');
        });
    }
  }

  downloadFileBangKhen(nsKthuongId): void {
    this.http
      .get(llnsURL.getFileKhenThuong(nsKthuongId))
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
            'Không có File khen thưởng!'
          );
        }
      });
    return;
  }

  viewFileBangKhen(nsKthuongId): void {
    this.http
      .get(llnsURL.getFileKhenThuong(nsKthuongId))
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (!res || !res.state) {
          return;
        }

        var fileQD = res.data;
        if (fileQD) {
          const dialogRef = this._matDialog.open(FileviewComponent, {
            width: '1000px',
            disableClose: true,
            data: {
              fileId: fileQD.fileId,
              fileContent: fileQD.fileContent,
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
            'Không có File khen thưởng!'
          );
          return;
        }
      });
    return;
  }
}
