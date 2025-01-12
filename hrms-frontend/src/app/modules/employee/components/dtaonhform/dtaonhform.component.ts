import { Component, EventEmitter, Inject, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { CommonApiService } from '../../../../services/commonHttp';
import { MessageService } from '../../../../shared/message.services';
import { FileUpload } from 'primeng/fileupload';
import { Buttons } from '../../../../fuse/components/message-box/common';
import { MessageBox } from '../../../../fuse/components/message-box/message-box.provider';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';


@Component({
  selector: 'app-dtaonhform',
  templateUrl: './dtaonhform.component.html',
  styleUrls: ['./dtaonhform.component.scss'],
  imports: [
      CommonModule,
      DropdownModule,
      MatButtonModule,
      MatIconModule,
      MatFormFieldModule,
      MatInputModule,
      MatRadioModule,
      MatSelectModule,
      FormsModule,
      MatCheckboxModule,
      MatDatepickerModule,
      DropdownModule,
      CheckboxModule,
      FileUploadModule,
      MatInputModule,
      MomentDateModule,
      AutoCompleteModule,
    ],
})
export class DtaonhformComponent implements OnInit {
  data: any;
  stateForm: boolean;
  
  // Danh muc
  listNNgu: any[] = [];
  listCCNNgu: any[] = [];
  @Output()
  public monthAndYearChange = new EventEmitter<Date | null>();

  fileContent: any;
  uploadedFiles: any[] = [];
  _fileForm: any;
  insertFile: any[]
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public obj: any,
    public matDialogRef: MatDialogRef<DtaonhformComponent>,
    private http: CommonApiService,
    private messageService: MessageService,
    private mb: MessageBox,
  ) { }


  ngOnInit(): void {
    if (this.obj) {
      this.data = this.obj.product;
      this.stateForm = this.obj.state;
    }

  }

  async myUploader(event, fileForm) {
    this.uploadedFiles.push(event);
    this._fileForm = fileForm;
    const files = this.uploadedFiles[this.uploadedFiles.length - 1].currentFiles;
    // if (this.insertFile == null)
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
      }
    });
  }

  removeFile(item: any, uploader: FileUpload, event: Event) {
    const index = uploader.files.indexOf(item);
    this.insertFile = this.insertFile.filter((element) => { return element.fileName != item.name });
    uploader.remove(event, index);
    this.uploadedFiles.push(event);
  }

  removeAllFiles(event: Event) {
    this.insertFile = []
    this.uploadedFiles.push(event)
  }

  changeNNgu() {
    if (!this.data.dtngoaingu) {
      this.data.lNgoainguId = null;
      this.data.lTrinhdonnId = null;
    }
  }

  onChangeNgoaiNgu(idNN) {
   
  }

  onChangeCCNN(value) {
    this.data.tentrinhdonn = this.listNNgu.find(item => item.id == value).name
  }

  
  saveAndClose(): void {
    if (this.data.noidungdt == null || this.data.noidungdt === '') {
      return;
    }
    if (this.data.fileList == null)
      this.data.fileList = []
    if (this.insertFile != null)
      this.insertFile.forEach(element => {
        this.data.fileList.push(element)
      });
    this.matDialogRef.close(this.data);
  }

  close(): void {
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
