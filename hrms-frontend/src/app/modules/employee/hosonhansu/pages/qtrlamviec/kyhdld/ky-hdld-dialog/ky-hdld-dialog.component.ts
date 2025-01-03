import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { Buttons } from '../../../../../../../fuse/components/message-box/common';
import { MessageBox } from '../../../../../../../fuse/components/message-box/message-box.provider';
import { NhansuComponent } from '../../../../../../components/nhansu/nhansu.component';
import { ValidateQD } from '../../../../../../components/qdnoidung/validateQD';
import { HopdonglaodongUI } from '../../../../model/hopdonglaodongUI';
import { LTinhtrangns } from '../../../../model/tinhTrangNs.model';
import { CommonApiService } from '../../../../../../../services/commonHttp';
import { DanhMucURL } from '../../../../../../../services/employe/danhmucURL';
import { EmployeURL } from '../../../../../../../services/employe/employeURL';
import { HSNhansuURL } from '../../../../../../../services/employe/hosonhansuURL';
import { QuatrinhLamviecURL } from '../../../../../../../services/employe/quatrinhlamviecURL';
import { FormquyetdinhComponent } from '../../../../../../../../assets/lib/formquyetdinh/src/public-api';
import { FileUpload, FileUploadModule } from 'primeng/fileupload';
import { Subject, takeUntil } from 'rxjs';
import { DividerModule } from 'primeng/divider';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CheckboxModule } from 'primeng/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-ky-hdld-dialog',
  templateUrl: './ky-hdld-dialog.component.html',
  styleUrls: ['./ky-hdld-dialog.component.scss'],
  imports: [
    DividerModule,
    TableModule,
    CommonModule,
    FormsModule,
    FileUploadModule,
    MatDatepickerModule,
    CheckboxModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatCheckboxModule,
    MatInputModule
  ],
})
export class KyHdldDialogComponent implements OnInit {
  chucVuList: any[] = [];
  hopDongList: LTinhtrangns[] = [];
  hopDongSelected: HopdonglaodongUI = {};
  listNgKy: any[] = [];
  listQdDv: any[] = [];

  quyetdinh = {
    qdinhId: null,
    soQd: '',
    ngayKy: null,
    nguoiky: '',
    chucvuKy: '',
    noiDung: '',
    namqd: '',
    fileAttach: {},
    fileName: '',
    fileExtend: '',
    fileSize: ''
  };
  registerForm: FormGroup;

  private _unsubscribeAll: Subject<any> = new Subject<any>();
  insertFile: any[];
  uploadedFiles: any[] = [];
  private _fileForm: any;
  fileContent: any;
  messageService: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public matDialogRef: MatDialogRef<KyHdldDialogComponent>,
    private _matDialog: MatDialog,
    private http: CommonApiService,
    private formBuilder: FormBuilder,
    private mb: MessageBox
  ) {}

  ngOnInit(): void {
    this.onloadData();

    // neu la update, hiển thị thông tin hợp đồng được chọn
    if (this.data.hopdongSelected && this.data.hopdongSelected.hdldId) {
      this.http
        .get(
          QuatrinhLamviecURL.getHdldSelected(this.data.hopdongSelected.hdldId)
        )
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((res: any) => {
          if (res.state) {
            this.hopDongSelected = res.data;
            //  console.log('----------------------------this.listChucVu: ', this.listChucVu)
          }
        });
    }

    // hiển thị quyết định liên quan
    if (this.data.hopdongSelected && this.data.hopdongSelected.nsQdnoidungId) {
      this.quyetdinh = this.data.hopdongSelected.nsQdndung;
      //  get file quyet dinh
      if (this.quyetdinh && this.quyetdinh.qdinhId)
        this.http
          .get(DanhMucURL.getFileQuyetDinh(this.quyetdinh.qdinhId))
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe((res: any) => {
            if (res.state) {
              var file = res.data;
              if (file) {
                this.quyetdinh.fileAttach = file;
                this.quyetdinh.fileName = file.fileName;
                //this.quyetdinh.fileExtend = file.fileExtend;
              }
            }
          });
    }

    throw new Error('Method not implemented.');
  }

  onloadData(): void {
    // //--------- vitri chuc danh --------
    // this.http
    //   .get(DanhMucURL.getListVtriCdanh())
    //   .pipe(takeUntil(this._unsubscribeAll))
    //   .subscribe((res: any) => {
    //     if (res.state) {
    //       this.chucVuList = res.data;
    //       //  console.log('----------------------------this.listChucVu: ', this.listChucVu)
    //     }
    //   });

    // //--------- Loai hop dong --------
    // this.http
    //   .get(QuatrinhLamviecURL.getAllTTrangHD())
    //   .pipe(takeUntil(this._unsubscribeAll))
    //   .subscribe((res: any) => {
    //     if (res.state) {
    //       this.hopDongList = res.data;
    //       //  console.log('----------------------------this.listChucVu: ', this.listChucVu)
    //     }
    //   });

    // //--------- nguoi ky --------
    // this.http
    //   .get(EmployeURL.getDsNguoiKy())
    //   .pipe(takeUntil(this._unsubscribeAll))
    //   .subscribe((res: any) => {
    //     if (res.state) {
    //       this.listNgKy = res.data;
    //       //console.log('----------------------------this.listNgKy: ', this.listNgKy)
    //     }
    //   });

    // // lay danh sach quyet dinh cua don vi
    // // lay chi tiet don vi cua nhan su
    // this.http
    //   .get(DanhMucURL.getDsQdnoidung(this.data.nhansu.donviId))
    //   .pipe(takeUntil(this._unsubscribeAll))
    //   .subscribe((res: any) => {
    //     if (res.state) {
    //       this.listQdDv = res.data;
    //     }
    //   });
  }

  onChonQuyetDinh(): void {
    const dialogRef = this._matDialog.open(FormquyetdinhComponent, {
      disableClose: true,
      data: this.listQdDv,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.quyetdinh = result;
      }
    });
  }

  openSoQDbyTxt(event: any): void {
    this.http
      .post(DanhMucURL.postNsQdndungBySoQd(), {
        soQd: event.target.value,
        donviId: this.data.nhansu.donviId,
      })
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (res.state) {
          this.quyetdinh = res.data;
        }
      });
  }

  onChonNgKy(): void {
    const dialogRef = this._matDialog.open(NhansuComponent, {
      disableClose: true,
      data: this.listNgKy,
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.quyetdinh.nguoiky = result.tenkhaisinh;
    });
  }

  onDeleteNgKy(): void {
    this.quyetdinh.nguoiky = null;
  }

  // File quyet dinh
  async myUploader(event, fileForm) {
    this.uploadedFiles.push(event);
    this._fileForm = fileForm;
    const files =
      this.uploadedFiles[this.uploadedFiles.length - 1].currentFiles;
    if (this.insertFile == null) this.insertFile = [];
    files.forEach(async (file) => {
      await this.blobToBase64(file).then((base64data) => {
        this.fileContent = base64data;
      });
      this.insertFile.push({
        fileName: file.name,
        mimeType: file.type,
        fileSize: file.size,
        fileContent: this.fileContent,
      });
    });
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
      'Bạn có xóa file đính kèm không?',
      Buttons.YesNo
    );

    dialog.dialogResult$.subscribe(async (result) => {
      if (result) {
        file.isdeleted = true;
        // this.data.webLlbsKthuongFileqd = null
      }
    });
  }

  removeFile(item: any, uploader: FileUpload, event: Event) {
    const index = uploader.files.indexOf(item);
    this.insertFile = this.insertFile.filter((element) => {
      return element.fileName != item.name;
    });
    uploader.remove(event, index);
    this.uploadedFiles.push(event);
  }

  async saveAndClose(): Promise<void> {
    const qdnoidung = await ValidateQD.getStatusOfNsQdndung(
      this.http,
      this.mb,
      this.quyetdinh,
      this.messageService,
      this.insertFile
    );
    this.data.hopdongSelected = this.hopDongSelected;
    this.data.hopdongSelected.nsQdndung = qdnoidung;
    try {
      if (this.insertFile && this.insertFile.length > 0) {
        let arrStr = this.insertFile[0].fileName.split('.');
        let extend = arrStr[arrStr - 1];
        this.data.hopdongSelected.nsQdndung.fileAttach = this.insertFile[0];
        this.data.hopdongSelected.nsQdndung.fileName =
          this.insertFile[0].fileName;
        this.data.hopdongSelected.nsQdndung.fileExtend = extend;
      }

      this.matDialogRef.close(this.data);
    } catch (error) {
      // Xử lý lỗi nếu có
      console.error('Đã xảy ra lỗi: ', error);
    }

    if (this.data.addNew) {
      this.http
        .post(QuatrinhLamviecURL.insertHdld(), this.data.hopdongSelected)
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
        });
    } else {
      this.http
        .post(QuatrinhLamviecURL.updateHdld(), this.data.hopdongSelected)
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
        });
    }
  }

  close(): void {
    this.matDialogRef.close();
  }
}
