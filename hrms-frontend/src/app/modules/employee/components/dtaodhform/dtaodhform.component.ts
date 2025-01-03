import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonApiService } from '../../../../services/commonHttp';
import { Subject, takeUntil } from 'rxjs';
import { MessageBox } from '../../../../fuse/components/message-box/message-box.provider';
import { Buttons } from '../../../../fuse/components/message-box/common';
import { FileUpload } from 'primeng/fileupload';
import { DanhMucURL } from '../../../../services/employe/danhmucURL';
import { DropdownModule } from 'primeng/dropdown';
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
import { FileUploadModule } from 'primeng/fileupload';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-dtaodhform',
  templateUrl: './dtaodhform.component.html',
  styleUrls: ['./dtaodhform.component.scss'],
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
export class DtaodhformComponent implements OnInit {
  // Model
  data: any;

  stateForm: boolean;

  fileContent: any;
  uploadedFiles: any[] = [];
  _fileForm: any;
  insertFile: any[] = [];

  // Autocomplete
  filteredTruongDt: any[];
  filteredNganhDt: any[];
  truongDt: any;
  nganhDt: any;

  // Danh muc
  listTrinhDo: any[] = [];
  listHocVi: any[] = [];
  listBangCap: any[] = [];
  listHinhThucDaoTao: any[] = [];
  listTruongDaoTao: any[] = [];
  listNganhdt: any;

  private _unsubscribeAll: Subject<any> = new Subject<any>();
  constructor(
    @Inject(MAT_DIALOG_DATA) public obj: any,
    public matDialogRef: MatDialogRef<DtaodhformComponent>,
    private http: CommonApiService,
    private mb: MessageBox
  ) {}

  ngOnInit(): void {
    if (this.obj) {
      this.data = this.obj.product;
      this.stateForm = this.obj.state;
    }

    this.http
      .get(DanhMucURL.getListTrinhdo())
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (!res || !res.state) return;
        this.listTrinhDo = res.data;
      });

    this.http
      .get(DanhMucURL.getListHocvi())
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (!res || !res.state) return;
        this.listHocVi = res.data;
      });

    this.http
      .get(DanhMucURL.getListXeploai())
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (!res || !res.state) return;
        this.listBangCap = res.data;
      });

    this.http
      .get(DanhMucURL.getListHthucdtao())
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (!res || !res.state) return;
        this.listHinhThucDaoTao = res.data;
      });

    this.http
      .get(DanhMucURL.getListTruongdt())
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (!res || !res.state) return;
        this.listTruongDaoTao = res.data;
        if (this.data && this.data.truongdtId)
          this.truongDt = this.listTruongDaoTao.find(
            (element) => element.id === this.data.truongdtId
          );
        if (this.truongDt == null) {
          this.truongDt = {
            id: null,
            name: this.data.noidaotao,
          };
        }
      });

    this.http
      .get(DanhMucURL.getListNganhnghe())
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (!res || !res.state) return;
        this.listNganhdt = res.data;
        if (this.data && this.data.nganhngheId)
          this.nganhDt = this.listNganhdt.find(
            (element) => element.id === this.data.nganhngheId
          );
        if (this.nganhDt == null) {
          this.nganhDt = {
            id: null,
            name: this.data.tenNnghe,
          };
        }
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
      'Bạn có muốn hủy phiếu đang tạo mới không?',
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

  _handleReaderLoaded(e) {
    var reader = e.target;
    this.fileContent = reader.result;
  }

  saveAndClose(): void {
    if (this.truongDt == null || this.truongDt.noidaotao == '') return;
    if (this.nganhDt == null || this.nganhDt.tenNnghe == '') return;
    if (this.truongDt.id) {
      this.data.truongdtId = this.truongDt.id;
      this.data.noidaotao = this.truongDt.name;
    } else {
      this.data.truongdtId = null;
      this.data.noidaotao = this.truongDt.name;
    }
    if (this.nganhDt.id) {
      this.data.nganhngheId = this.nganhDt.id;
      this.data.tenNnghe = this.nganhDt.name;
    } else {
      this.data.nganhngheId = null;
      this.data.tenNnghe = this.nganhDt.name;
    }
    if (this.data.namTotnghiep == null) return;
    if (this.data.fileList == null) this.data.fileList = [];
    if (this.insertFile != null)
      this.insertFile.forEach((element) => {
        this.data.fileList.push(element);
      });

    this.matDialogRef.close(this.data);
  }

  close(): void {
    this.matDialogRef.close();
  }

  selectTruongdt(event) {
    this.listTruongDaoTao.forEach((element) => {
      if (element.id == event.value) {
        this.data.noidaotao = element.name;
      }
    });
  }

  selectNganhdt(event) {
    this.listNganhdt.forEach((element) => {
      if (element.id == event.value) {
        this.data.tenNnghe = element.name;
      }
    });
  }

  // Autocomplete input
  search(event) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: any[] = [];
    let query = event.query;
    if (query && query != '') {
      this.truongDt = {
        id: null,
        name: query,
      };
    }

    for (let i = 0; i < this.listTruongDaoTao.length; i++) {
      let country = this.listTruongDaoTao[i];
      if (country.name.toLowerCase().includes(query.toLowerCase())) {
        filtered.push(country);
      }
    }

    this.filteredTruongDt = filtered;
  }

  searchNgNghe(event) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: any[] = [];
    let query = event.query;
    if (query && query != '') {
      this.nganhDt = {
        id: null,
        name: query,
      };
    }
    for (let i = 0; i < this.listNganhdt.length; i++) {
      let country = this.listNganhdt[i];
      if (country.name.toLowerCase().includes(query.toLowerCase())) {
        filtered.push(country);
      }
    }

    this.filteredNganhDt = filtered;
  }

  changeTrinhdo(id) {
    this.data.tentrinhdo = this.listTrinhDo.find((i) => i.id == id).name;
  }

  changeHocvi(id) {
    this.data.tenhocvi = this.listHocVi.find((i) => i.id == id).name;
  }

  changeHthucdtao(id) {
    this.data.tenhthucdtao = this.listHinhThucDaoTao.find(
      (i) => i.id == id
    ).name;
  }

  changeBangcap(id) {
    this.data.tenxeploai = this.listBangCap.find((i) => i.id == id).name;
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
