import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Buttons } from '../../../../../../../../fuse/components/message-box/common';
import { MessageBox } from '../../../../../../../../fuse/components/message-box/message-box.provider';
import { Store } from '@ngrx/store';
import { API } from '../../../../../../../../core/config/app.config';
import { User } from '../../../../../../../../../assets/lib/formnhansu-donvi/src/lib/ngxstore/user.types';
import { QtrinhlamviecBean } from '../../../../../model/qtrinhlamviecbean';
import { APP_ACTION } from '../../../../../../../../ngxstore/actions/app.actions';
import { AppState } from '../../../../../../../../ngxstore/state/app.state';
import { CommonApiService } from '../../../../../../../../services/commonHttp';
import { DanhMucURL } from '../../../../../../../../services/employe/danhmucURL';
import { EmployeURL } from '../../../../../../../../services/employe/employeURL';

import { QuatrinhLamviecURL } from '../../../../../../../../services/employe/quatrinhlamviecURL';
import { AppUltil } from '../../../../../../../../shared/AppUltil';
import { MessageService } from '../../../../../../../../shared/message.services';
import FileSaver from 'file-saver';
import { FormnnghecnktComponent } from '../../../../../../../../../assets/lib/formnnghecnkt/src/public-api';
import { FormphongbanComponent } from '../../../../../../../../../assets/lib/formphongban/src/public-api';
import { FileUpload, FileUploadModule } from 'primeng/fileupload';

import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { CheckboxModule } from 'primeng/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatOptionModule } from '@angular/material/core';
import { DropdownModule } from 'primeng/dropdown';
import { MatInputModule } from '@angular/material/input';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-lamviecdialog',
  templateUrl: './lamviecdialog.component.html',
  styleUrls: ['./lamviecdialog.component.scss'],
  imports:[
    CheckboxModule,
    MatFormFieldModule,
    MatDatepickerModule,
    FormsModule,
    CommonModule,
    FileUploadModule,
    MatOptionModule,
    CheckboxModule,
    DropdownModule,
    MatInputModule,
    CalendarModule
  ]
})
export class LamviecdialogComponent implements OnInit {
  tendonvi?: string;
  tenphongban?: string;
  phongbanId?: number;

  uploadedFiles: any[] = [];
  _fileForm: any;
  insertFile: any[] = [];
  fileContent: any;

  listChucdanh: any[] = [];
  listNgheCNKT: any[] = [];
  listNhomNgheCNKT: any[] = [];

  model: any;
  donviThaotacId: number;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  phongBan: any[];
  user_info: User;
  user$ = new BehaviorSubject<User>({});

  disableChkChucdanhnamgiu?: boolean;

  isVisiableVtriCdanh?: boolean;

  isQuaTrinhTruocKhiVaoDonVi?: boolean;
  isQuaTrinhGoc?: boolean;
  isQuaTrinhAnhHuong?: boolean;
  strLabelThongBao?: string;

  disableBtnCNKT: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: QtrinhlamviecBean,
    public matDialogRef: MatDialogRef<LamviecdialogComponent>,
    private http: CommonApiService,
    private _matDialog: MatDialog,
    private store: Store<AppState>,
    private messageService: MessageService,
    private mb: MessageBox,
  ) {
    const appUser = this.store.select((state) => state.appUser);
    appUser.subscribe((res: any) => {
      const data = res;
      if (data && data.type === APP_ACTION.USER_INFO) {
        this.user_info = { ...data.payload };
        this.user_info.avatar = `${API.IMG}/${this.user_info?.iddonvi}/${this.user_info.idnv}.png`;
        this.user_info.status = 'online';
        this.user$.next(this.user_info);
      }
    });
  }

  ngOnInit(): void {
    this.isVisiableVtriCdanh = false;
    this.isQuaTrinhGoc = false;
    this.isQuaTrinhAnhHuong = false;
    this.isQuaTrinhAnhHuong = false;
    this.strLabelThongBao = '';
    this.disableChkChucdanhnamgiu = false;

    this.disableBtnCNKT = true;

    this.donviThaotacId = 1;
    if (this.data) this.model = this.data;

    this.tendonvi = this.data.tendonvi;
    this.tenphongban = this.data.tenbophan;
    this.phongbanId = this.data.phonbanId;

    if (this.data.qtlamviecId == null) {

      this.data.isKiemNghiem = false;

    } else {

      if (this.data.isManager != null && this.data.isManager == true) {
        this.isVisiableVtriCdanh = true;
      }

      if (this.data.truockhivao != null && this.data.truockhivao == true) {
        this.isVisiableVtriCdanh = true;
      }



      this.http
        .post(QuatrinhLamviecURL.loadQtlamviec(), this.data)
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((res: any) => {

          this.isQuaTrinhAnhHuong = res.data.isQuaTrinhAnhHuong;
          this.isQuaTrinhGoc = res.data.isQuaTrinhGoc;
          this.isQuaTrinhTruocKhiVaoDonVi = res.data.isQuaTrinhTruocKhiVaoDonVi;
          this.strLabelThongBao = res.data.strLabelThongBao;

          if (this.isQuaTrinhTruocKhiVaoDonVi || this.isQuaTrinhAnhHuong || this.isQuaTrinhGoc) {
            this.disableChkChucdanhnamgiu = true;
          }

        });

    }



    this.http
      .get(DanhMucURL.getVtriCdanhForQtlamviec())
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (!res || !res.state) return;
        this.listChucdanh = res.data;
      });

    this.http
      .get(DanhMucURL.getAllDepartment(this.user_info?.iddonvi))
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (!res || !res.state) return;
        let donvis = res.data;
        this.phongBan = donvis
      });

    this.http
      .get(DanhMucURL.getListNgheCNKT())
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (!res || !res.state) return;
        this.listNgheCNKT = res.data;
      });

    this.http
      .get(DanhMucURL.getListNhomNgheCNKT())
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (!res || !res.state) return;
        this.listNhomNgheCNKT = res.data;
      });
  }

  onChonphongban(): void {
    const dialogRef = this._matDialog.open(FormphongbanComponent, {
      disableClose: true,
      data: {
        phongBan: this.phongBan,
        boChon: false
      }
    });

    dialogRef.afterClosed()
      .subscribe((result) => {
        if (result) {
          this.data.tenbophan = result.data.name;
          this.data.phonbanId = result.data.id;
        }

      });
  }

  async myUploader(event, fileForm) {
    this.uploadedFiles.push(event);
    this._fileForm = fileForm;
    const files = this.uploadedFiles[this.uploadedFiles.length - 1].currentFiles;
    if (this.insertFile == null)
      this.insertFile = []
    files.forEach(async (file) => {
      await this.blobToBase64(file)
        .then((base64data) => {
          this.fileContent = base64data;
        });
      this.insertFile.push(
        {
          fileName: file.name,
          mimeType: file.type,
          fileSize: file.size,
          fileContent: this.fileContent,
        }
      )
    })
  }

  blobToBase64(blob: Blob) {
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  }

  deleteFile(file) {
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

  removeFile(item: any, uploader: FileUpload, event: Event) {
    const index = uploader.files.indexOf(item);
    this.insertFile = this.insertFile.filter((element) => { return element.fileName != item.name });
    uploader.remove(event, index);
    this.uploadedFiles.push(event);
  }

  taiFiledinhkem(data): void {

    var fileBase64;
    this.http
      .get(EmployeURL.getFile(data.fileAttach.id))
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (!res || !res.state) {
          return;
        }
        fileBase64 = res.data;
        const blob = AppUltil.base64ToBlob(fileBase64);
        FileSaver.saveAs(blob, data.fileAttach.fileName);
      });

  }

  checkTruockhivaodvi(): void {
    if (this.data.truockhivao) {

      this.isVisiableVtriCdanh = true;
      this.disableChkChucdanhnamgiu = true;
      this.data.tendonvi = '';
      this.data.phonbanId = null;
      this.data.tenbophan = '';
      this.data.isNow = false;
    } else {

      this.isVisiableVtriCdanh = false;
      this.disableChkChucdanhnamgiu = false;

      this.data.tendonvi = this.tendonvi;

      this.data.phonbanId = this.phongbanId;
      this.data.tenbophan = this.tenphongban;

      this.data.isNow = true;
      this.data.denngay = null;
    }
  }

  checkChucdanhdangNamgiu(): void {
    if (this.data.isNow) {
      this.data.tendonvi = this.tendonvi;

      this.data.phonbanId = this.phongbanId;
      this.data.tenbophan = this.tenphongban;
    }
  }

  onChonNgheCNKT(): void {
    const dialogRef = this._matDialog.open(FormnnghecnktComponent, {
      disableClose: true,
      data: {
        lnhomnghe: this.listNhomNgheCNKT,
        lnghe: this.listNgheCNKT,
        boChon: false
      }
    });

    dialogRef.afterClosed()
      .subscribe((result) => {
        if (result) {
          this.data.nghecnkt = result.data.name;
          this.data.nghecnktId = result.data.id;
        }

      });
  }

  onChangeChucdanh(): void {
    if (this.data != null && this.data.vtricdanhId != null) {
      this.http
        .get(DanhMucURL.checkCdanhCnkt(this.data.vtricdanhId))
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((res: any) => {
          if (!res || !res.state) return;
          this.disableBtnCNKT = res.data;
          if (this.disableBtnCNKT) {
            this.data.nghecnkt = '';
            this.data.nghecnktId = null;
          }
        });
    }
  }

  onSave(): void {

    this.http
      .post(QuatrinhLamviecURL.validQtlamviec(), this.data)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (!res || !res.state) {

          this.messageService.showErrorMessage(
            'Hệ thống',
            res.message
          );
          return;
        }

        if (this.insertFile && this.insertFile.length != 0) this.data.fileAttach = this.insertFile[this.insertFile.length - 1]

        if (this.data != null && this.data.qtlamviecId != null) {

          this.http
            .post(QuatrinhLamviecURL.updateQtlamviec(), this.data)
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
              let result = res.data;
              this.matDialogRef.close(result);
            });

        } else {
          this.http
            .post(QuatrinhLamviecURL.insertQtlamviec(), this.data)
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
              let result = res.data;
              this.matDialogRef.close(result);
            });
        }

      });


  }

  onKeyDown(event: any, maxLength: number) {

    const acceptKeys = ['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Delete', 'Backspace'];

    if (event.target.value.length >= maxLength && !acceptKeys.includes(event.key)) {
      event.preventDefault();
    }
  }

  onClose(): void {
    this.matDialogRef.close();
  }

}
