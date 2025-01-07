import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { Buttons } from '../../../../../../fuse/components/message-box/common';
import { MessageBox } from '../../../../../../fuse/components/message-box/message-box.provider';
import { FileviewComponent } from '../../../../../components/fileview/fileview.component';
import { ChonquyetdinhComponent } from '../../../../../components/chonquyetdinh/chonquyetdinh.component';
import { ValidateQD } from '../../../../../components/qdnoidung/validateQD';
import { CommonApiService } from '../../../../../../services/commonHttp';
import { DanhMucURL } from '../../../../../../services/employe/danhmucURL';
import { llnsURL } from '../../../../../../services/employe/llnsURL';
import { AppUltil } from '../../../../../../shared/AppUltil';
import { MessageService } from '../../../../../../shared/message.services';
import FileSaver from 'file-saver';
import { FormquyetdinhComponent } from '../../../../../../../assets/lib/formquyetdinh/src/public-api';
import { FileUpload, FileUploadModule } from 'primeng/fileupload';
import { Observable, Subject, takeUntil } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { DividerModule } from 'primeng/divider';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { DropdownModule } from 'primeng/dropdown';
import { MatInputModule } from '@angular/material/input';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-khenthuongform',
  templateUrl: './khenthuongform.component.html',
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
    TooltipModule,
    DropdownModule,
    MatInputModule,
    InputTextModule,
    CalendarModule
  ],
})
export class KhenthuongformComponent implements OnInit {
  @ViewChild('fileForm2', { static: false }) fileUpload2: any;
  @ViewChild(ChonquyetdinhComponent, { static: false }) formquyetdinh: any;

  uploadedFiles: any[] = [];
  fileContent: any;
  insertFile: any;
  fileKhenThuong: any;
  insertFileBangKhen: any;
  fileContentBangKhen: any;
  listQhegd: any[] = [];
  listCapKT: any[] = [];
  listDanhhieu: any[] = [];
  listQdDv: any[] = [];
  capKtId: number;
  org: any;
  loadingFile: boolean = false;
  registerForm: FormGroup;
  submitted = false;
  isLockform = false;
  quyetdinh = {
    qdinhId: null,
    soQd: '',
    ngayKy: null,
    nguoiky: '',
    chucvuKy: '',
    noiDung: '',
    namqd: '',
    fileAttach: null,
    fileName: '',
    fileExtend: '',
    isChangeFileAttach: false,
  };

  private _unsubscribeAll: Subject<any> = new Subject<any>();
  protected _onDestroy = new Subject<void>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public matDialogRef: MatDialogRef<KhenthuongformComponent>,
    private messageService: MessageService,
    private _matDialog: MatDialog,
    private http: CommonApiService,
    private formBuilder: FormBuilder,
    private mb: MessageBox
  ) {}

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({});
    this.onloadData();

    if (this.data.khenthuong && this.data.khenthuong.nsKthuongId) {
      if (this.data.khenthuong.nsQdndung)
        this.quyetdinh = this.data.khenthuong.nsQdndung;
      this.http
        .get(DanhMucURL.getLKhenthuong(this.data.khenthuong.ktId))
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((res: any) => {
          if (res.state) {
            var kthuongSelected = res.data;
            var capKt = '';
            this.capKtId = kthuongSelected.capKtId;
            if (kthuongSelected.capNn) {
              capKt = 'Nhà nước';
              this.capKtId = 5;
            } else if (kthuongSelected.capBoCt) {
              capKt = 'Bộ công thương';
              this.capKtId = 4;
            } else if (kthuongSelected.capEvn) {
              if (this.org.orgLevel == 1) {
                capKt = 'Tập đoàn';
                this.capKtId = 3;
              } else if (this.org.orgLevel == 2) {
                capKt = 'Tổng công ty';
                this.capKtId = 2;
              } else if (this.org.orgLevel == 3) {
                capKt = 'Đơn vị cơ sở';
                this.capKtId = 1;
              }
            } else if (kthuongSelected.capTct) {
              if (this.org.orgLevel == 2) {
                capKt = 'Tổng công ty';
                this.capKtId = 2;
              } else if (this.org.orgLevel == 3) {
                capKt = 'Đơn vị cơ sở';
                this.capKtId = 1;
              }
            } else if (kthuongSelected.capCoso) {
              capKt = 'Đơn vị cơ sở';
              this.capKtId = 1;
            } else if (kthuongSelected.capUbqlvNn) {
              this.capKtId = 9;
            } else {
              capKt = 'Khác';
              this.capKtId = 6;
            }
          }

          this.http
            .get(
              DanhMucURL.getDanhhieuRaQD(
                this.capKtId,
                false,
                this.data.nhansu.donviId
              )
            )
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((res: any) => {
              if (res.state) {
                this.listDanhhieu = res.data;
              }
            });
        });
    }
  }

  onloadData(): void {
    // ------------------ danh sach cap khen thuong -----------------
    this.http
      .get(DanhMucURL.getDsCapKhenThuong())
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (res.state) {
          this.listCapKT = res.data;
        }
      });
    // lay chi tiet don vi cua nhan su
    this.http
      .get(DanhMucURL.getOrganization(this.data.nhansu.donviId))
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (res.state) {
          this.org = res.data;
        }
      });

    if (this.data.khenthuong.nsKthuongId) {
      this.http
        .get(llnsURL.getFileKhenThuong(this.data.khenthuong.nsKthuongId))
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((res: any) => {
          if (res.state) {
            var file = res.data;
            if (file) {
              this.fileKhenThuong = file;
            }
          }
        });
    }
  }

  onChonCapKT(): void {
    // ------------------ danh sach danh hieu theo cap khen thuong -----------------
    this.http
      .get(
        DanhMucURL.getDanhhieuRaQD(
          this.capKtId,
          false,
          this.data.nhansu.donviId
        )
      )
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (res.state) {
          this.listDanhhieu = res.data;
        }
      });
  }

  // File bang khen

  async myUploaderBangKhen(event, fileForm) {
    const files = event.currentFiles;
    this.insertFileBangKhen = [];
    for (let index = 0; index < files.length; index++) {
      const file = files[index];
      await this.blobToBase64(file).then((base64data) => {
        this.fileContentBangKhen = base64data;
      });
      this.insertFileBangKhen.push({
        fileName: file.name,
        mimeType: file.type,
        fileSize: file.size,
        fileContent: this.fileContentBangKhen,
      });
    }
  }

  deleteFileBangKhen() {
    let dialog = this.mb.showDefault(
      'Bạn có xóa file đính kèm không?',
      Buttons.YesNo
    );
    dialog.dialogResult$.subscribe(async (result) => {
      if (result) {
        this.insertFileBangKhen = [];
        this.fileKhenThuong = null;
      }
    });
  }

  removeFileBangKhen(item1: any, uploader2: FileUpload, event: Event) {
    const index = uploader2.files.indexOf(item1);
    this.insertFileBangKhen = this.insertFileBangKhen.filter((element) => {
      return element.fileName != item1.name;
    });
    uploader2.remove(event, index);
  }

  blobToBase64(blob: Blob) {
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  }

  async saveAndClose(): Promise<void> {
    try {
      // Xử lý bất đồng bộ ở đây
      const qdnoidung = await ValidateQD.getStatusOfNsQdndung(
        this.http,
        this.mb,
        this.quyetdinh,
        this.messageService,
        this.insertFile
      );
      if (qdnoidung === null) return;

      this.data.khenthuong.nsQdndung = qdnoidung;
      this.data.khenthuong.nsId = this.data.nhansu.nsID;
      this.data.khenthuong.donviId = this.data.nhansu.donviId;
      if (
        this.insertFile &&
        this.insertFile.length > 0 &&
        this.quyetdinh.isChangeFileAttach
      ) {
        let arrStr = this.insertFile[0].fileName.split('.');
        let extend = arrStr[arrStr - 1];
        this.data.khenthuong.nsQdndung.fileAttach = this.insertFile[0];
        this.data.khenthuong.nsQdndung.fileName = this.insertFile[0].fileName;
        this.data.khenthuong.nsQdndung.fileExtend = extend;
      } else {
        this.data.khenthuong.nsQdndung.fileAttach = this.quyetdinh.fileAttach;
      }

      if (this.insertFileBangKhen && this.insertFileBangKhen.length > 0) {
        this.data.khenthuong.fileKhenThuong = this.insertFileBangKhen[0];
      } else {
        this.data.khenthuong.fileKhenThuong = null;
      }
    } catch (error) {
      // Xử lý lỗi nếu có
      console.error('Đã xảy ra lỗi: ', error);
    }
    if (this.data.addNew) {
      this.data.khenthuong.nsId = this.data.nhansu.nsID;
      this.data.khenthuong.donviId = this.data.nhansu.donviId;
      this.http
        .post(llnsURL.saveKhenthuong(), this.data.khenthuong)
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
          this.isLockform = true;
        });
    } else {
      this.matDialogRef.close(this.data.khenthuong);
    }
  }

  downloadFileQD(): void {
    this.http
      .get(llnsURL.getFileKhenThuong(this.data.khenthuong.nsKthuongId))
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

  viewFileQD(): void {
    this.http
      .get(llnsURL.getFileKhenThuong(this.data.khenthuong.nsKthuongId))
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

  nhapTiep(): void {
    this.isLockform = false;
    this.formquyetdinh.onResetData();
    this.fileUpload2.clear();
    this.data.khenthuong = {};
    this.data.addNew = true;
    this.capKtId = 0;
    this.quyetdinh = {
      qdinhId: null,
      soQd: '',
      ngayKy: null,
      nguoiky: '',
      chucvuKy: '',
      noiDung: '',
      namqd: '',
      fileAttach: null,
      fileName: '',
      fileExtend: '',
      isChangeFileAttach: false,
    };
  }

  close(): void {
    this.matDialogRef.close();
  }
}
