import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import {
  MatDatepickerInputEvent,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { Buttons } from '../../../../../../fuse/components/message-box/common';
import { MessageBox } from '../../../../../../fuse/components/message-box/message-box.provider';
import { ValidateQD } from '../../../../../components/qdnoidung/validateQD';
import { Quyetdinh } from '../../../../../model/quyetdinhND.model';
import { CommonApiService } from '../../../../../../services/commonHttp';
import { DanhMucURL } from '../../../../../../services/employe/danhmucURL';
import { llnsURL } from '../../../../../../services/employe/llnsURL';
import { MessageService } from '../../../../../../shared/message.services';
import { FormquyetdinhComponent } from '../../../../../../../assets/lib/formquyetdinh/src/public-api';
import { FileUpload, FileUploadModule } from 'primeng/fileupload';
import { Observable, Subject, map, startWith, takeUntil } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { DividerModule } from 'primeng/divider';
import { TableModule } from 'primeng/table';
import { ChonquyetdinhComponent } from '../../../../../components/chonquyetdinh/chonquyetdinh.component';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-kyluatform',
  templateUrl: './kyluatform.component.html',
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
    ChonquyetdinhComponent,
    MatInputModule
  ],
})
export class KyluatformComponent implements OnInit {
  @ViewChild('fileForm', { static: false }) fileUpload: any;
  @ViewChild('registerForm', { static: false }) registerForm: any;
  uploadedFiles: any[] = [];
  fileContent: any;
  insertFile: any[];
  insertFileXoa: any[];
  listQhegd: any[] = [];
  isLockform = false;
  isQdXoaKluat = false;
  lqhegdinh: number;
  listChucVu: any[] = [];
  listNgKy: any[] = [];
  listQdDv: any[] = [];
  listHthucKyLuat: any[] = [];
  loadingFile: boolean = false;
  org: any;
  minDate: Date = null;
  maxDate: Date = null;
  quyetdinh = new Quyetdinh();
  quyetdinhxoa = new Quyetdinh();

  public filterCvuky: Observable<any>;
  public filterNgky: Observable<any>;
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public matDialogRef: MatDialogRef<KyluatformComponent>,
    private messageService: MessageService,
    private _matDialog: MatDialog,
    private http: CommonApiService,
    private formBuilder: FormBuilder,
    private mb: MessageBox
  ) {
    (this.listNgKy = this.data.listNgKy),
      (this.listChucVu = this.data.listChucVu);
  }

  ngOnInit(): void {
    this.onloadData();
    if (!this.data.addNew) {
      this.loadingFile = true;
      if (this.data.kyluat.qdinh) this.quyetdinh = this.data.kyluat.qdinh;
      if (this.data.kyluat.qdinhXoa) {
        this.quyetdinhxoa = this.data.kyluat.qdinhXoa;
        this.isQdXoaKluat = true;
      }
    }
  }

  onloadData(): void {
    // lay chi tiet don vi cua nhan su
    this.http
      .get(DanhMucURL.getOrganization(this.data.nhansu.donviId))
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (res.state) {
          this.org = res.data;
        }
      });

    this.http
      .get(DanhMucURL.getListHthucKyluat())
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (!res || !res.state) return;
        this.listHthucKyLuat = res.data;
        // this.data.forEach(element => {
        //   element.tenloaikluat = this.listHthucKyLuat.find(e => e.id === element.lKyluatId).name;
        // });
      });
  }

  async saveAndClose(): Promise<void> {
    console.log(
      '--------------------------this.registerForm: ',
      this.registerForm
    );
    if (this.minDate && this.maxDate && this.minDate > this.maxDate) {
      this.messageService.showWarningMessage(
        'Hệ thống',
        'Ngày hiệu lực phải nhỏ hơn ngày kết thúc!'
      );
      return;
    }

    if (!this.registerForm.valid) return;
    // Xử lý bất đồng bộ ở đây
    const qdnoidung = await ValidateQD.getStatusOfNsQdndung(
      this.http,
      this.mb,
      this.quyetdinh,
      this.messageService,
      this.insertFile
    );
    const qdnoidungxoa = await ValidateQD.getStatusOfNsQdndung(
      this.http,
      this.mb,
      this.quyetdinhxoa,
      this.messageService,
      this.insertFileXoa
    );
    if (qdnoidung == null || qdnoidungxoa == null) return;

    this.data.kyluat.qdinh = qdnoidung;
    this.data.kyluat.qdinhXoa = qdnoidungxoa;
    this.data.kyluat.nsId = this.data.nhansu.nsID;
    this.data.kyluat.donviId = this.data.nhansu.donviId;
    try {
      if (
        this.insertFile &&
        this.insertFile.length > 0 &&
        this.quyetdinh.isChangeFileAttach
      ) {
        let arrStr = this.insertFile[0].fileName.split('.');
        let extend = arrStr[arrStr - 1];
        this.data.kyluat.qdinh.fileAttach = this.insertFile[0];
        this.data.kyluat.qdinh.fileName = this.insertFile[0].fileName;
        this.data.kyluat.qdinh.fileExtend = extend;
      } else {
        this.data.kyluat.qdinh.fileAttach = this.quyetdinh.fileAttach;
      }

      if (this.isQdXoaKluat) {
        if (
          this.insertFileXoa &&
          this.insertFileXoa.length > 0 &&
          this.quyetdinhxoa.isChangeFileAttach
        ) {
          let arrStr = this.insertFileXoa[0].fileName.split('.');
          let extend = arrStr[arrStr - 1];
          this.data.kyluat.qdinhXoa.fileAttach = this.insertFileXoa[0];
          this.data.kyluat.qdinhXoa.fileName = this.insertFileXoa[0].fileName;
          this.data.kyluat.qdinhXoa.fileExtend = extend;
        } else {
          this.data.kyluat.qdinhXoa.fileAttach = this.quyetdinhxoa.fileAttach;
        }
      } else {
        this.data.kyluat.qdinhXoa = null;
      }
    } catch (error) {
      // Xử lý lỗi nếu có
      console.error('Đã xảy ra lỗi: ', error);
    }
    if (this.data.addNew) {
      this.http
        .post(llnsURL.saveKyluat(), this.data.kyluat)
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
          this.matDialogRef.close();
        });
    } else {
      this.matDialogRef.close(this.data.kyluat);
    }
  }
  startDate(event: MatDatepickerInputEvent<Date>): void {
    this.minDate = event.value;
    if (this.data.qtchucfvu.ngayKT) {
      let stareYear = new Date(event.value).getFullYear();
      let endYear = new Date(this.data.qtchucfvu.ngayKT).getFullYear();
      if (endYear - stareYear > 0)
        this.data.qtchucfvu.thoihanbonhiem = endYear - stareYear;
    }
  }

  endDate(event: MatDatepickerInputEvent<Date>): void {
    this.maxDate = event.value;
    if (this.data.qtchucfvu.ngayBD) {
      let stareYear = new Date(this.data.qtchucfvu.ngayBD).getFullYear();
      let endYear = new Date(event.value).getFullYear();
      if (endYear - stareYear > 0)
        this.data.qtchucfvu.thoihanbonhiem = endYear - stareYear;
    }
  }

  close(): void {
    this.matDialogRef.close();
  }
}
