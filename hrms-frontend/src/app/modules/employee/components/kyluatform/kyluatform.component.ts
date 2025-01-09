import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { Buttons } from '../../../../fuse/components/message-box/common';
import { MessageBox } from '../../../../fuse/components/message-box/message-box.provider';
import { NhansuComponent } from '../../../components/nhansu/nhansu.component';
import { CommonApiService } from '../../../../services/commonHttp';
import { DanhMucURL } from '../../../../services/employe/danhmucURL';
import { EmployeURL } from '../../../../services/employe/employeURL';
import { MessageService } from '../../../../shared/message.services';
import { FormnhansuComponent } from '../../../../../assets/lib/formnhansu/src/public-api';
import { FileUpload, FileUploadModule } from 'primeng/fileupload';
import { Subject, takeUntil } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-kyluatform',
  templateUrl: './kyluatform.component.html',
  styleUrls: ['./kyluatform.component.scss'],
  imports: [
    MatFormFieldModule,
    MatDatepickerModule,
    FormsModule,
    CommonModule,
    DropdownModule,
    FileUploadModule,
    MatCheckboxModule,
    MatInputModule
  ],
})
export class KyluatformComponent implements OnInit {
  data: any;
  stateForm: boolean;

  uploadedFiles: any[] = [];
  _fileForm: any;
  fileContent: any;
  insertFile: any[] = [];
  listChucvu: any[];
  listNguoiKy: any[];
  listHthucKyLuat: any[];

  private _unsubscribeAll: Subject<any> = new Subject<any>();
  constructor(
    @Inject(MAT_DIALOG_DATA) public obj: any,
    public matDialogRef: MatDialogRef<KyluatformComponent>,
    private _matDialog: MatDialog,
    private messageService: MessageService,
    private mb: MessageBox,
    private http: CommonApiService
  ) {}

  ngOnInit(): void {
    if (this.obj) {
      this.data = this.obj.product;
      this.stateForm = this.obj.state;
    }

    this.http
      .get(DanhMucURL.getListChucVu())
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (!res || !res.state) return;
        this.listChucvu = res.data;
      });
    this.http
      .get(EmployeURL.getDsNguoiKy())
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (!res || !res.state) return;
        this.listNguoiKy = res.data;
      });
    this.http
      .get(DanhMucURL.getListHthucKyluat())
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (!res || !res.state) return;
        this.listHthucKyLuat = res.data;
      });
  }

  async myUploader(event, fileForm) {
    this.uploadedFiles.push(event);
    this._fileForm = fileForm;
    const files =
      this.uploadedFiles[this.uploadedFiles.length - 1].currentFiles;
    // if (this.insertFile == null)
    this.insertFile = [];
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
        file.deleted = true;
        // this.data.webLlbsKyluatFileqd = null
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

  removeAllFiles(event: Event) {
    this.insertFile = [];
    this.uploadedFiles.push(event);
  }

  saveAndClose(): void {
    if (this.data.ngayHieuluc == null) {
      return;
    }
    if (this.insertFile && this.insertFile.length != 0)
      this.data.webLlbsKyluatFileqd =
        this.insertFile[this.insertFile.length - 1];

    this.matDialogRef.close(this.data);
  }

  close(): void {
    this.matDialogRef.close();
  }

  onChonNhansu(): void {
    const dialogRef = this._matDialog.open(FormnhansuComponent, {
      disableClose: true,
      data: {
        selectionMode: 'single',
        nhansus: this.listNguoiKy,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.data.nguoiky = result.tenkhaisinh;
    });
  }
  onDeleteNhansu(): void {
    this.data.nguoiky = null;
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  changeHTKyluat(idKhenthuong) {
    this.data.tenloaikluat = this.data.listHthucKyLuat.find(
      (item) => item.id == idKhenthuong
    ).name;
  }
}
