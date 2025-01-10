import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { CommonApiService } from '../../../../../../services/commonHttp';
import { EmployeURL } from '../../../../../../services/employe/employeURL';
import { Subject, takeUntil } from 'rxjs';
import { QtrinhLuongBean } from '../../../model/qtrinhluongbean';
import { AppUltil } from '../../../../../../shared/AppUltil';
import FileSaver from 'file-saver';
import { Buttons } from '../../../../../../fuse/components/message-box/common';
import { MessageBox } from '../../../../../../fuse/components/message-box/message-box.provider';
import { QuatrinhLuongURL } from '../../../../../../services/employe/quatrinhluongURL';
import { MessageService } from '../../../../../../shared/message.services';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FileUploadModule } from 'primeng/fileupload';
import { CheckboxModule } from 'primeng/checkbox';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { Luong } from '../../../model/luong';
import { THONG_TIN_CHUNG } from '../../../model/thongtinchung';
import { NgachLuong } from '../../../model/nghachluong';
import { BacLuong } from '../../../model/bacluong';

@Component({
  selector: 'app-luongdialog',
  templateUrl: './luongdialog.component.html',
  styleUrls: ['./luongdialog.component.scss'],
  imports: [
    MatFormFieldModule,
    FormsModule,
    MatDatepickerModule,
    AutoCompleteModule,
    FileUploadModule,
    CheckboxModule,
    CommonModule,
    MatInputModule,
    DropdownModule,
    InputTextModule,
    CalendarModule,
  ],
})
export class LuongdialogComponent implements OnInit, OnDestroy {
  pheDuyetOptions = [
    { label: 'Duyệt', value: true },
    { label: 'Chờ duyệt', value: false },
  ];

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  isNghiviec: boolean;
  nsInfo: THONG_TIN_CHUNG = new THONG_TIN_CHUNG();
  luong: Luong = new Luong();
  ngayHieuLuc: Date = new Date();
  listNgachLuong: NgachLuong[] = [];
  listBacLuong: BacLuong[] = [];

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public matDialogRef: MatDialogRef<LuongdialogComponent>,
    private http: CommonApiService,
    private mb: MessageBox,
    private _matDialog: MatDialog,
    private messageService: MessageService
  ) {
    this.luong = data?.nsLuong;
    this.nsInfo = data?.nsInfo;
    this.ngayHieuLuc = new Date(this.luong.ngayHieuLuc);
  }

  ngOnInit(): void {
    console.log(this.luong);

    // if (this.data.nsLuongId == null) {
    //   this.data.isDanghuong = true;
    // }
    this.http
      .get(QuatrinhLuongURL.getAllNgachLuong())
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (res.state) {
          this.listNgachLuong = res.data;
        }
      });
    this.http
      .get(QuatrinhLuongURL.getAllBacLuong())
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (res.state) {
          this.listBacLuong = res.data;
        }
      });
    // this.http
    //   .get(DanhMucURL.getChucvuForQdnoidung())
    //   .pipe(takeUntil(this._unsubscribeAll))
    //   .subscribe((res: any) => {
    //     if (!res || !res.state) return;
    //     this.listChucvuQd = res.data;
    //     this.chucvuQdBean = this.listChucvuQd.find(element => element.name === this.data.chucvuky)
    //     if (this.chucvuQdBean == null) {
    //       this.chucvuQdBean = {
    //         id: null,
    //         chucvuky: this.data.chucvuky
    //       }
    //     }
    //   });
  }

  async onSave(): Promise<void> {
    this.http
      .post(QuatrinhLuongURL.validInfoLuong(), this.data)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (!res || !res.state) {
          this.messageService.showErrorMessage('Hệ thống', res.message);
          return;
        }
        if (this.data != null && this.data.id != null) {
          this.http
            .post(QuatrinhLuongURL.updateNsLuong(), this.data)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((res: any) => {
              if (!res || !res.state) {
                this.messageService.showErrorMessage(
                  'Hệ thống',
                  'Cập nhật thông tin không thành công'
                );
              }
              this.messageService.showSuccessMessage(
                'Hệ thống',
                'Cập nhật thành công'
              );
              let result = res.data;
              this.matDialogRef.close(result);
            });
        } else {
          this.http
            .post(QuatrinhLuongURL.insertNsLuong(), this.data)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((res: any) => {
              if (!res || !res.state) {
                this.messageService.showErrorMessage(
                  'Hệ thống',
                  'Cập nhật thông tin không thành công'
                );
              }
              this.messageService.showSuccessMessage(
                'Hệ thống',
                'Cập nhật thành công'
              );
              let result = res.data;
              this.matDialogRef.close(result);
            });
        }
      });
  }

  blobToBase64(blob: Blob) {
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  }

  taiFileQDdinhkem(data): void {
    var fileBase64;
    this.http
      .get(EmployeURL.getFile(data.fileQdinh.id))
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (!res || !res.state) {
          return;
        }
        fileBase64 = res.data;
        const blob = AppUltil.base64ToBlob(fileBase64);
        FileSaver.saveAs(blob, data.fileQdinh.fileName);
      });
  }

  taiFilePhuluc(data): void {
    var fileBase64;
    this.http
      .get(EmployeURL.getFile(data.fileLuongDinhkem.id))
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (!res || !res.state) {
          return;
        }
        fileBase64 = res.data;
        const blob = AppUltil.base64ToBlob(fileBase64);
        FileSaver.saveAs(blob, data.fileLuongDinhkem.fileName);
      });
  }

  deleteFileQD(file) {
    let dialog = this.mb.showDefault(
      'Bạn có muốn xóa file đính kèm không?',
      Buttons.YesNo
    );
    dialog.dialogResult$.subscribe(async (result) => {
      if (result) {
        file.deleted = true;
        // this.data.webLlbsKyluatFileqd = null
      }
    });
  }

  deleteFilePhuluc(file) {
    let dialog = this.mb.showDefault(
      'Bạn có muốn xóa file phụ lục này không?',
      Buttons.YesNo
    );
    dialog.dialogResult$.subscribe(async (result) => {
      if (result) {
        file.deleted = true;
        // this.data.webLlbsKyluatFileqd = null
      }
    });
  }

  onClose(): void {
    this.matDialogRef.close();
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
