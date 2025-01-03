import {
  Component,
  DoCheck,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';
import {
  ControlContainer,
  FormBuilder,
  FormsModule,
  NgForm,
  NgModel,
} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Buttons } from '../../../fuse/components/message-box/common';
import { MessageBox } from '../../../fuse/components/message-box/message-box.provider';
import { CommonApiService } from '../../../services/commonHttp';
import { DanhMucURL } from '../../../services/employe/danhmucURL';
import { EmployeURL } from '../../../services/employe/employeURL';
import { AppUltil } from '../../../shared/AppUltil';
import FileSaver from 'file-saver';
import { FormquyetdinhComponent } from '../../../../assets/lib/formquyetdinh/src/public-api';
import { FileUpload, FileUploadModule } from 'primeng/fileupload';
import { Observable, Subject, map, startWith, takeUntil } from 'rxjs';
import { FileviewComponent } from '../fileview/fileview.component';
import { hdldURL } from '../../../services/employe/hdldURL';
import { MatRadioButton, MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatOptionModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { TooltipModule } from 'primeng/tooltip';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-chonquyetdinh',
  templateUrl: './chonquyetdinh.component.html',
  styleUrls: ['./chonquyetdinh.component.scss'],
  viewProviders: [{ provide: ControlContainer, useExisting: NgForm }],
  imports: [
    MatRadioModule,
    MatDatepickerModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatOptionModule,
    CommonModule,
    FileUploadModule,
    MatProgressSpinnerModule,
    TooltipModule,
    FormsModule,
    MatInputModule
  ],
})
export class ChonquyetdinhComponent
  implements OnInit, OnChanges, DoCheck, OnDestroy
{
  // Disable Form
  @Input() isDisableForm: boolean = false;
  // Model quyet dinh
  @Input() quyetdinh;
  @Input() donviId;
  // Mảng lưu trữ file thêm mới, file đã có được lưu trong model.fileAttach
  @Input() insertFile: any[];
  // EventEmitter call cập nhật thông tin
  @Output() quyetdinhChange: EventEmitter<any> = new EventEmitter();
  @Output() insertFileChange: EventEmitter<any> = new EventEmitter();

  // Sử dụng khi dùng 2 component này 1 form
  @Input() formName = '';

  // Yêu cầu require các trường quyetdinh, ngayky
  @Input() fieldRequired = false;

  @ViewChild('fileForm1') fileForm1;

  listChucVu: any[] = [];
  listNgKy: any[] = [];
  listQdDv: any[] = [];

  public filterCvuky: any[] = [];
  public filterNgky: any[] = [];
  currentYear = new Date().getFullYear();

  // File
  loadingFile: boolean;
  uploadedFiles: any[];
  fileContent: any;

  private _unsubscribeAll: Subject<any> = new Subject<any>();
  constructor(
    private _matDialog: MatDialog,
    private http: CommonApiService,
    private mb: MessageBox
  ) {}

  ngOnInit(): void {
    //--------- nguoi ky --------
    this.http
      .get(EmployeURL.getDsNguoiKyBean())
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (res.state) {
          this.listNgKy = res.data;
          this.filterNgky = res.data;
        }
      });
    //--------- vitri chuc danh --------
    this.http
      .get(DanhMucURL.getChucvuForQdnoidung2())
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (res.state) {
          this.listChucVu = res.data;
          this.filterCvuky = res.data;
        }
      });
    if (this.quyetdinh && this.quyetdinh.qdinhId) {
      this.loadingFile = true;
      this.http
        .get(DanhMucURL.getFileQdNotContend(this.quyetdinh.qdinhId))
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((res: any) => {
          if (res.state) {
            var file = res.data;
            if (file) {
              this.quyetdinh.fileAttach = file;
              this.quyetdinhChange.emit({ ...this.quyetdinh });
            }
          }
          this.loadingFile = false;
        });
    }
  }

  ngOnChanges() {}

  ngDoCheck() {
    this.quyetdinhChange.emit({ ...this.quyetdinh });
    this.insertFileChange.emit(this.insertFile);
  }

  openSoQDbyTxt(event: any): void {
    this.http
      .post(DanhMucURL.postNsQdndungBySoQdNamQd(), {
        soQd: event.target.value,
        namqd: this.currentYear,
        donviId: this.donviId,
      })
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (res.state && res.data) {
          this.quyetdinh = { ...res.data };
          this.loadingFile = true;
          this.uploadedFiles = [];
          this.insertFile = [];
          this.loadingFile = false;
          this.quyetdinhChange.emit({ ...this.quyetdinh });
          this.insertFileChange.emit(this.insertFile);
        } else {
          this.quyetdinh = {
            ...this.quyetdinh,
            ngayKy: null,
            chucvuKy: null,
            nguoiky: null,
            noiDung: null,
            fileAttach: null,
          };
          this.quyetdinhChange.emit({ ...this.quyetdinh });
        }
      });
  }

  onChonQuyetDinh(): void {
    const dialogRef = this._matDialog.open(FormquyetdinhComponent, {
      disableClose: true,
      data: {
        apiGetDsQdByNam: DanhMucURL.getDsQdnoidungByDvIdAndNam(),
        donviId: this.donviId,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadingFile = true;
        this.quyetdinh = { ...this.quyetdinh, ...result };
        this.uploadedFiles = [];
        this.insertFile = [];
        this.quyetdinhChange.emit({ ...this.quyetdinh });
        if (this.quyetdinh && this.quyetdinh.qdinhId)
          this.http
            .get(DanhMucURL.getFileQuyetDinh(this.quyetdinh.qdinhId))
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((res: any) => {
              if (res.state) {
                var file = res.data;
                if (file) {
                  this.quyetdinh.fileAttach = file;
                }
              }
              this.loadingFile = false;
              this.quyetdinhChange.emit({ ...this.quyetdinh });
            });
        this.insertFileChange.emit(this.insertFile);
      }
    });
  }

  async dateChange(event: any): Promise<void> {
    if (event.target.value) {
      let selectedDate: Date = new Date(event.target.value);
      let year: number = selectedDate.getFullYear();
      const res0 = await this.http
        .post(DanhMucURL.postNsQdndungBySoQdNamQd(), {
          soQd: this.quyetdinh.soQd,
          namqd: year,
          donviId: this.donviId,
        })
        .pipe(takeUntil(this._unsubscribeAll))
        .toPromise();
      if (res0.state && res0.data) {
        this.quyetdinh = res0.data;
        this.quyetdinh.ngayKy = selectedDate;
        this.loadingFile = true;
        this.uploadedFiles = [];
        this.insertFile = [];
        this.loadingFile = false;
      } else {
        this.quyetdinh = {
          ...this.quyetdinh,
          chucvuKy: null,
          nguoiky: null,
          noiDung: null,
          fileAttach: null,
        };
      }

      this.quyetdinhChange.emit({ ...this.quyetdinh });
      this.insertFileChange.emit(this.insertFile);
    }
  }

  onSelectNgKy(event: any) {
    this.quyetdinh.nguoiky = event.option.value.name;
    this.quyetdinh.chucvuKy = event.option.value.chucvu;
    this.onChangeCvu(this.quyetdinh.chucvuKy);
    this.quyetdinhChange.emit(this.quyetdinh);
  }

  onSelectCvu(event: any) {
    this.quyetdinh.chucvuKy = event.option.value.name;
    this.quyetdinhChange.emit(this.quyetdinh);
  }

  // File quyet dinh
  async myUploader(event, fileForm) {
    const files = event.currentFiles;
    this.insertFile = [];
    this.quyetdinh.fileAttach = null;
    for (let index = 0; index < files.length; index++) {
      const file = files[index];
      await AppUltil.blobToBase64(file).then((base64data) => {
        this.fileContent = base64data;
      });
      this.insertFile.push({
        fileName: file.name,
        mimeType: file.type,
        fileSize: file.size,
        fileContent: this.fileContent,
      });
    }
    if (this.insertFile && this.insertFile.length > 0) {
      this.quyetdinh.isChangeFileAttach = true;
    }
    this.quyetdinhChange.emit({ ...this.quyetdinh });
    this.insertFileChange.emit(this.insertFile);
  }

  deleteFile(file) {
    let dialog = this.mb.showDefault(
      'Bạn có xóa file đính kèm không?',
      Buttons.YesNo
    );
    dialog.dialogResult$.subscribe(async (result) => {
      if (result) {
        this.insertFile = [];
        this.quyetdinh.fileAttach = null;
        this.quyetdinh.isChangeFileAttach = true;
        this.quyetdinhChange.emit({ ...this.quyetdinh });
        this.insertFileChange.emit(this.insertFile);
      }
    });
  }

  removeFile(item: any, uploader: FileUpload, event: Event) {
    const index = uploader.files.indexOf(item);
    this.insertFile = this.insertFile.filter((element) => {
      return element.fileName != item.name;
    });
    uploader.remove(event, index);
    this.insertFileChange.emit(this.insertFile);
    this.uploadedFiles.push(event);
  }

  deleteAllFile() {
    this.insertFile = null;
  }

  download(file): void {
    this.http
      .get(DanhMucURL.getFileQuyetDinh(file.qdinhId))
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

  viewFile(qdinh) {
    // TH file không hiển thị được => không cần lấy fileContent
    if (
      !qdinh?.fileAttach.fileExten.toUpperCase().includes('DOCX') &&
      !qdinh?.fileAttach.fileExten.toUpperCase().includes('PDF')
    ) {
      const dialogRef = this._matDialog.open(FileviewComponent, {
        width: '1000px',
        disableClose: true,
        data: {
          fileId: qdinh.fileId,
          fileContent: qdinh.fileContent,
          fileExten: qdinh.fileExten,
          fileName: qdinh.fileName,
        },
      });
      dialogRef.afterClosed().subscribe((result) => {
        if (result) {
        }
      });
      return;
    }
    // TH file docx, pdf => lấy fileContent
    this.http
      .get(DanhMucURL.getFileQuyetDinh(qdinh.qdinhId))
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(async (res: any) => {
        if (!res || !res.state) {
          return;
        }
        var fileQD = res.data;

        if (fileQD.fileExten.toUpperCase().includes('DOCX')) {
          let res = await this.http
            .post(hdldURL.convertToPdf(), {
              file: fileQD.fileContent,
            })
            .pipe(takeUntil(this._unsubscribeAll))
            .toPromise();
          if (!res || !res.state) {
            return;
          }
          fileQD.fileContent = res.data;
        }

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
      });
    return;
  }

  displayFn(value: any): string {
    if (typeof value === 'string') {
      return value;
    } else {
      return value && value.name ? value.name : '';
    }
  }

  onChangeNgKy(value) {
    const name = typeof value === 'string' ? value : value?.name;
    this.filterNgky = name
      ? this.filterNguoiKy(name as string)
      : this.listNgKy.slice();
    if (name === '' || name === null || name === undefined)
      this.quyetdinh.chucvuKy = '';

    this.quyetdinhChange.emit({ ...this.quyetdinh });
  }

  onChangeCvu(value) {
    const name = typeof value === 'string' ? value : value?.name;
    this.filterCvuky = name
      ? this.filterChucvuky(name as string)
      : this.listChucVu.slice();
    this.quyetdinhChange.emit({ ...this.quyetdinh });
  }

  private filterNguoiKy(value: string): any {
    const filterValue = value.toLowerCase();
    return this.listNgKy.filter((option) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }

  private filterChucvuky(value: string): any {
    const filterValue = value.toLowerCase();
    return this.listChucVu.filter((option) =>
      option.name.toLowerCase().includes(filterValue)
    );
  }

  onResetData() {
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
    this.quyetdinhChange.emit({ ...this.quyetdinh });
    this.insertFile = [];
    this.insertFileChange.emit(this.insertFile);
    this.fileForm1.clear();
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
