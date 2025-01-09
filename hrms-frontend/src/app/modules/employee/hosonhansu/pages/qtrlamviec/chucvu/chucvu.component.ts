import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ChucvuformComponent } from './chucvuform/chucvuform.component';
import { MessageService } from '../../../../../../shared/message.services';
import { Subject, takeUntil } from 'rxjs';
import { CommonApiService } from '../../../../../../services/commonHttp';
import { QuatrinhLamviecURL } from '../../../../../../services/employe/quatrinhlamviecURL';
import { Buttons } from '../../../../../../fuse/components/message-box/common';
import { MessageBox } from '../../../../../../fuse/components/message-box/message-box.provider';
import { DanhMucURL } from '../../../../../../services/employe/danhmucURL';
import FileSaver from 'file-saver';
import { FileviewComponent } from '../../../../../components/fileview/fileview.component';
import { CommonModule, formatDate } from '@angular/common';
import { ShareData } from '../../../../../../shared/shareservice.service';
import { NHAN_SU } from '../../../../../../shared/appkeymessages';
import { EmployeURL } from '../../../../../../services/employe/employeURL';
import { AppUltil } from '../../../../../../shared/AppUltil';
import { DividerModule } from 'primeng/divider';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';

@Component({
  selector: 'app-chucvu',
  templateUrl: './chucvu.component.html',
  imports:[
    DividerModule,CommonModule,
    TableModule,
    FormsModule,
    DropdownModule,
    CheckboxModule,
    
  ]
})
export class ChucvuComponent {
  @Input('nsInfo') nsInfo: any;
  listChucVu: any[];
  selectedCvTduong: any;
  listNgKy: any[] = [];
  listChucVuNgky: any[] = [];

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _matDialog: MatDialog,
    private messageService: MessageService,
    private http: CommonApiService,
    private mb: MessageBox,
    private shareData: ShareData,
  ) {


  }
  ngOnChanges(): void {

  }

  ngOnInit(): void {
    //--------- vitri chuc danh --------
    // this.http
    //   .get(DanhMucURL.getChucvuForQdnoidung2())
    //   .pipe(takeUntil(this._unsubscribeAll))
    //   .subscribe((res: any) => {
    //     if (res.state) {
    //       this.listChucVuNgky = res.data;
    //     }
    //   });
    // this.loadDsChucVu();

    this.shareData.getMessage(NHAN_SU.REFRESH_QT_CVU).pipe(takeUntil(this._unsubscribeAll)).subscribe(async (page: any) => {
      this.loadDsChucVu();
    });
  }

  //------------------------------ chuc vu ---------------------------------

  loadDsChucVu(): void {
    if (this.nsInfo) {
      this.http
        .get(QuatrinhLamviecURL.getAllQtcv(this.nsInfo.nsID))
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((res: any) => {
          if (!res || !res.state) return;
          this.listChucVu = res.data;
          for (let index = 0; index < this.listChucVu.length; index++) {
            const element = this.listChucVu[index];
            element.disableDelete = true;
            element.disableEdit = true;
            if (element.duongchuc ) {
              element.disableEdit = false;
            }
            if (element.duongchuc || element.ttHienthoi != 1 ) {
              element.disableDelete = false;
            }
          }
        });
    }
  }



  deleteNsChucvu(id) {
    let dialog = this.mb.showDefault(
      'Bạn có chắc chắn muốn muốn xóa thông tin không?',
      Buttons.YesNo
    );
    dialog.dialogResult$.subscribe(async (result) => {
      if (result) {
        this.http
          .delete(QuatrinhLamviecURL.deleteNsChucvu(id))
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe((res: any) => {
            if (!res || !res.state) {
              this.messageService.showErrorMessage(
                'Hệ thống',
                res.message
              );
              return;
            }
            this.messageService.showSuccessMessage(
              'Hệ thống',
              'Xóa thành công'
            );
            this.loadDsChucVu();
            this.shareData.sendMessage(NHAN_SU.REFRESH_THONGTINCHUNG, 'REFRESH_THONGTINCHUNG');
          });
      }
    });
  }

  addChucVu(state): void {
    const dialogRef = this._matDialog.open(ChucvuformComponent, {
      width: '900px',
      data: {
        nhansu: this.nsInfo,
        listNgKy: this.listNgKy,
        listChucVu: this.listChucVuNgky,
        qtchucfvu: (state === 'STATE_BO_NHIEM_LAI' || state === 'STATE_BAI_NHIEM') ? this.selectedCvTduong : {},
        state: state
      }
    });

    dialogRef.afterClosed()
      .subscribe((result) => {
        if (result) {
          this.http
            .post(QuatrinhLamviecURL.insertNsChucvu(), result)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((res: any) => {
              if (!res || !res.state) {
                this.messageService.showErrorMessage(
                  'Hệ thống',
                  res.message
                );
                return;
              }
              this.messageService.showSuccessMessage(
                'Hệ thống',
                'Cập nhật thành công'
              );
              this.loadDsChucVu();
              this.shareData.sendMessage(NHAN_SU.REFRESH_THONGTINCHUNG, 'REFRESH_THONGTINCHUNG');
            });
        }
      });
  }

  editChucVu(obj): void {
    let noedit = false;
    if (obj.chucvuId == null && obj.donviId == null && obj.phongtoId == null) {
      noedit = true;
    }

    if (obj != null) {
      if (obj.status != null) {
        if (obj.status == 1) {
          noedit = true;
        } else if (obj.status == 2) {
          noedit = true;
        } else {
          noedit = true;
        }
      }
    }

    const dialogRef = this._matDialog.open(ChucvuformComponent, {
      width: '900px',
      data: {
        nhansu: this.nsInfo,
        listNgKy: this.listNgKy,
        listChucVu: this.listChucVuNgky,
        qtchucfvu: obj,
        state: 'STATE_UPDATE',
        noedit
      }
    });

    dialogRef.afterClosed()
      .subscribe((result) => {
        if (result) {
          this.http
            .post(QuatrinhLamviecURL.updateNsChucvu(), result)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((res: any) => {
              if (!res || !res.state) {

                this.messageService.showErrorMessage(
                  'Hệ thống',
                  res.message
                );

              }
              this.messageService.showSuccessMessage(
                'Hệ thống',
                'Cập nhật thành công'
              );
              this.loadDsChucVu();
            });
        }
        this.loadDsChucVu();
        this.shareData.sendMessage(NHAN_SU.REFRESH_THONGTINCHUNG, 'REFRESH_THONGTINCHUNG');
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
        const blob = AppUltil.base64ToBlob(fileQD.fileContent);
        FileSaver.saveAs(blob, fileQD.fileName);
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


  xuatExcel() {
    var data = {};
    var columName = ['Ngày hiệu lực', 'Phân loại', 'Chức vụ', 'Phòng ban', 'Đơn vị', 'Đương chức', 'Kiêm nhiệm', 'Số QĐ', 'Ngày ký QĐ'];
    var dataBody = [];
    if (this.listChucVu && this.listChucVu.length > 0) {
      for (let index = 0; index < this.listChucVu.length; index++) {
        const element = this.listChucVu[index];
        var ngayKy = formatDate(element?.ngayky, 'dd/MM/yyyy', 'en-US');
        var ngayHieuluc = formatDate(element?.ngayBD, 'dd/MM/yyyy', 'en-US');
        var duongchuc = element.duongchuc == true ? 'X' : ''
        var cvChinh = element.cvChinh == false ? 'X' : ''
        var arr = [ngayHieuluc, element.loaiQdStr, element.chucvu, element.phongto, element.donvi, duongchuc, cvChinh, element.soQD, ngayKy];
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
          FileSaver.saveAs(blob, "Quatrinhchucvu.xls");
        });
    }
  }

}
