import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { Buttons } from '../../../../fuse/components/message-box/common';
import { MessageBox } from '../../../../fuse/components/message-box/message-box.provider';
import { CommonApiService } from '../../../../services/commonHttp';
import { MessageService } from 'primeng/api';
import { FormnhansuComponent } from '../../../../../assets/lib/formnhansu/src/public-api';
import { FileUpload, FileUploadModule } from 'primeng/fileupload';
import { Subject, takeUntil } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DropdownModule } from 'primeng/dropdown';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-khenthuongform',
  templateUrl: './khenthuongform.component.html',
  styleUrls: ['./khenthuongform.component.scss'],
  imports: [
    MatFormFieldModule,
    MatDatepickerModule,
    FormsModule,
    CommonModule,
    FileUploadModule,
    DropdownModule,
    MatInputModule
  ],
})
export class KhenthuongformComponent implements OnInit {
  data: any;
  stateForm: boolean;

  // Danh muc
  uploadedFiles: any[] = [];
  _fileForm: any;
  fileContent: any;
  insertFile: any[];
  listHthucKhenthg: any[] = [];
  listChucvu: any[];
  listNguoiKy: any[];

  uploadedFiles2: any[] = [];
  _fileForm2: any;
  fileContent2: any;
  insertFileKhenthuong: any[];

  private _unsubscribeAll: Subject<any> = new Subject<any>();
  constructor(
    @Inject(MAT_DIALOG_DATA) public obj: any,
    public matDialogRef: MatDialogRef<KhenthuongformComponent>,
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
  }

  // File quyet dinh
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

  deleteFile(file) {
    let dialog = this.mb.showDefault(
      'Bạn có xóa file đính kèm không?',
      Buttons.YesNo
    );
    dialog.dialogResult$.subscribe(async (result) => {
      if (result) {
        file.deleted = true;
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

  // File khen thuong
  async myUploader2(event, fileForm) {
    this.uploadedFiles2.push(event);
    this._fileForm2 = fileForm;
    const files =
      this.uploadedFiles2[this.uploadedFiles2.length - 1].currentFiles;
    // if (this.insertFileKhenthuong == null)
    this.insertFileKhenthuong = [];
    files.forEach(async (file) => {
      await this.blobToBase64(file).then((base64data) => {
        this.fileContent = base64data;
      });
      this.insertFileKhenthuong.push({
        fileName: file.name,
        mimeType: file.type,
        fileSize: file.size,
        fileContent: this.fileContent,
      });
    });
  }

  deleteFileKhenthuong(file) {
    let dialog = this.mb.showDefault(
      'Bạn có xóa file đính kèm không?',
      Buttons.YesNo
    );
    dialog.dialogResult$.subscribe(async (result) => {
      if (result) {
        file.deleted = true;
        // this.data.fileBangkhen = null
      }
    });
  }

  removeFileKhenthuong(item: any, uploader: FileUpload, event: Event) {
    const index = uploader.files.indexOf(item);
    this.insertFileKhenthuong = this.insertFileKhenthuong.filter((element) => {
      return element.fileName != item.name;
    });
    uploader.remove(event, index);
    this.uploadedFiles.push(event);
  }

  removeAllFiles(event: Event) {
    this.insertFile = [];
    this.uploadedFiles.push(event);
  }

  blobToBase64(blob: Blob) {
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  }

  saveAndClose(): void {
    if (this.data.nam == null || this.data.nam == '') {
      // this.messageService.showErrorMessage("Cảnh báo", "Vui lòng nhập năm khen thưởng");
      return;
    }
    if (this.insertFile && this.insertFile.length != 0)
      this.data.webLlbsKthuongFileqd =
        this.insertFile[this.insertFile.length - 1];
    if (this.insertFileKhenthuong && this.insertFileKhenthuong.length != 0)
      this.data.fileBangkhen =
        this.insertFileKhenthuong[this.insertFileKhenthuong.length - 1];

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

  changeKhenthuong(idKhenthuong) {
    this.data.tenloaikthuong = this.data.listHthucKhenthg.find(
      (item) => item.id == idKhenthuong
    ).name;
  }
}
