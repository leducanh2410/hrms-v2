import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MessageBox } from '../../../../../../fuse/components/message-box/message-box.provider';
import { CommonApiService } from '../../../../../../services/commonHttp';
import { QuatrinhLamviecURL } from '../../../../../../services/employe/quatrinhlamviecURL';
import { MessageService } from '../../../../../../shared/message.services';
import { DoantheformComponent } from './doantheform/doantheform.component';
import { Buttons } from '../../../../../../fuse/components/message-box/common';
import { Subject, takeUntil } from 'rxjs';
import { DanhMucURL } from '../../../../../../services/employe/danhmucURL';
import { FileviewComponent } from '../../../../../components/fileview/fileview.component';
import FileSaver from 'file-saver';
import { AppUltil } from '../../../../../../shared/AppUltil'
import { CommonModule, formatDate } from '@angular/common';
import { EmployeURL } from '../../../../../../services/employe/employeURL';
import { NHAN_SU } from '../../../../../../shared/appkeymessages';
import { ShareData } from '../../../../../../shared/shareservice.service';
import { DividerModule } from 'primeng/divider';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';

@Component({
  selector: 'app-doanthe',
  templateUrl: './doanthe.component.html',
  imports:[
    DividerModule,
    FormsModule,
    CommonModule,
    TableModule,
    
  ]
})
export class DoantheComponent {
  @Input('nsInfo') nhansu: any;


  listDsChucVuDT: any[] = [];
  listNgKy: any[] = [];
  listChucVu: any[] = [];
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  constructor(
    private _matDialog: MatDialog,
    private http: CommonApiService,
    private messageService: MessageService,
    private mb: MessageBox,
    private shareData: ShareData,
  ) { }



  ngOnInit(): void {
    //--------- nguoi ky --------
    // this.http
    //   .get(EmployeURL.getDsNguoiKyBean())
    //   .pipe(takeUntil(this._unsubscribeAll))
    //   .subscribe((res: any) => {
    //     if (res.state) {
    //       this.listNgKy = res.data;
    //       //console.log('----------------------------this.listNgKy: ', this.listNgKy)
    //     }
    //   });
    // //--------- vitri chuc danh --------
    // this.http
    //   .get(DanhMucURL.getChucvuForQdnoidung2())
    //   .pipe(takeUntil(this._unsubscribeAll))
    //   .subscribe((res: any) => {
    //     if (res.state) {
    //       this.listChucVu = res.data;
    //     }
    //   });
    // this.loadDsDoanThe();
  }

  loadDsDoanThe(): void {
    this.http
      .get(QuatrinhLamviecURL.getDsNsCvudthe(this.nhansu.nsID))
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (res || res.state) {
          this.listDsChucVuDT = res.data;
        }
      });
  }

  addDoanthe(): void {
    const dialogRef = this._matDialog.open(DoantheformComponent, {
      width: '900px',
      data: {
        nhansu: this.nhansu,
        listNgKy: this.listNgKy,
        listChucVu: this.listChucVu,
        NsCvudthe: {},
        addNew: true
      }
    });

    dialogRef.afterClosed()
      .subscribe((result) => {
        if(result){
          this.http
          .post(QuatrinhLamviecURL.insertNsCvuDthe(), result)
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
              this.loadDsDoanThe();
              this.shareData.sendMessage(NHAN_SU.REFRESH_THONGTINCHUNG, 'REFRESH_THONGTINCHUNG');
          });
          this.loadDsDoanThe();
        }
      });
  }



  update(data): void {
    const dialogRef = this._matDialog.open(DoantheformComponent, {
      width: '900px',
      disableClose: true,
      data: {
        nhansu: this.nhansu,
        listNgKy: this.listNgKy,
        listChucVu: this.listChucVu,
        NsCvudthe: data,
        addNew: false
      }
    });

    dialogRef.afterClosed()
      .subscribe((result) => {
        if (result) {
          this.http
            .post(QuatrinhLamviecURL.updateNsCvuDthe(), result)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((res: any) => {
              if (!res || !res.state) {
                this.messageService.showWarningMessage(
                  'Hệ thống',
                  res.message
              );
                return;
              }
              this.messageService.showSuccessMessage(
                'Hệ thống',
                'Cập nhật thành công'
              );
              this.loadDsDoanThe();
              this.shareData.sendMessage(NHAN_SU.REFRESH_THONGTINCHUNG, 'REFRESH_THONGTINCHUNG');
            });

        }
        this.loadDsDoanThe();
      });

  }

  delete(id) : void {
    let dialog = this.mb.showDefault(
      'Bạn có chắc chắn muốn muốn xóa thông tin không?',
      Buttons.YesNo
    );
    dialog.dialogResult$.subscribe(async (result) => {
      if (result) {
        this.http
          .delete(QuatrinhLamviecURL.deleteNsCvuDthe(id))
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
             this.loadDsDoanThe();
             this.shareData.sendMessage(NHAN_SU.REFRESH_THONGTINCHUNG, 'REFRESH_THONGTINCHUNG');
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

  xuatExcel(){
    var data = {};
    var columName = ['Từ ngày','Đến ngày','Chức vụ đoàn thể','Loại đoàn thể','Chuyên trách','Số QĐ','Ngày ký','Người ký'];
    var dataBody = [];
    if(this.listDsChucVuDT && this.listDsChucVuDT.length > 0){
      for (let index = 0; index < this.listDsChucVuDT.length; index++) {
        const element = this.listDsChucVuDT[index];
        var tungay = formatDate(element?.ngayBdau, 'dd/MM/yyyy', 'en-US');
        var denngay = element.ngayKthuc ? formatDate(element?.ngayKthuc, 'dd/MM/yyyy', 'en-US') : '';
        var ngayKy = formatDate(element.nsQdndung?.ngayKy, 'dd/MM/yyyy', 'en-US');
        var chuyentrach = element.chuyentrach == true ? 'X' : ''
        var arr = [tungay,denngay,element.cvuDthe.name,element.cvuDthe.ldoanthe.name,chuyentrach,element.nsQdndung?.soQd,ngayKy,element.nsQdndung?.nguoiky];
        dataBody.push(arr);
      }
      data = {columName,dataBody};

      this.http
      .post(DanhMucURL.xuatExcel(),data)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (!res || !res.state) {
          return;
        }

        const blob = AppUltil.base64ToBlob(res.data);
        FileSaver.saveAs(blob, "Quatrinhdoanthe.xls");
      });
    }
  }

}
