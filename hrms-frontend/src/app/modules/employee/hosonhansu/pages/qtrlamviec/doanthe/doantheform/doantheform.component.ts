import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { Buttons } from '../../../../../../../fuse/components/message-box/common';
import { MessageBox } from '../../../../../../../fuse/components/message-box/message-box.provider';
import { NhansuComponent } from '../../../../../../components/nhansu/nhansu.component';
import { ValidateQD } from '../../../../../../components/qdnoidung/validateQD';
import { CommonApiService } from '../../../../../../../services/commonHttp';
import { DanhMucURL } from '../../../../../../../services/employe/danhmucURL';
import { QuatrinhLamviecURL } from '../../../../../../../services/employe/quatrinhlamviecURL';
import { MessageService } from '../../../../../../../shared/message.services';
import { FormquyetdinhComponent } from '../../../../../../../../assets/lib/formquyetdinh/src/public-api';
import { FileUpload } from 'primeng/fileupload';
import { Observable, Subject, map, startWith, takeUntil } from 'rxjs';
import { DividerModule } from 'primeng/divider';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { ChonquyetdinhComponent } from '../../../../../../components/chonquyetdinh/chonquyetdinh.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-doantheform',
  templateUrl: './doantheform.component.html',
  imports: [
    DividerModule,
    TableModule,
    CommonModule,
    FormsModule,
    ChonquyetdinhComponent,
    MatFormFieldModule,
    MatOptionModule,
    MatDatepickerModule,
    MatSelectModule,
    MatInputModule

  ],
})
export class DoantheformComponent implements OnInit {
  @ViewChild('registerForm', { static: false }) registerForm: any;
  uploadedFiles: any[] = [];
  fileContent: any;
  insertFile: any[];
  _fileForm: any;
  isLockform = false;
  listQdDv: any[] = [];
  listLDoanthe: any[] = [];
  listLDoantheCv: any[] = [];
  loadingFile: boolean = false;
  idDoanthe: any;
  minDate: Date = null;
  maxDate: Date = null;
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
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public matDialogRef: MatDialogRef<DoantheformComponent>,
    private messageService: MessageService,
    private _matDialog: MatDialog,
    private http: CommonApiService,
    private formBuilder: FormBuilder,
    private mb: MessageBox
  ) {}

  ngOnInit(): void {
    this.onloadData();
    if (!this.data.addNew) {
      if (this.data.NsCvudthe.nsQdndung)
        this.quyetdinh = this.data.NsCvudthe.nsQdndung;

      this.idDoanthe = this.data.NsCvudthe.cvuDthe.ldoanthe.id;
      if (this.data.NsCvudthe.ngayBdau)
        this.minDate = new Date(this.data.NsCvudthe.ngayBdau);
      if (this.data.NsCvudthe.ngayKthuc)
        this.maxDate = new Date(this.data.NsCvudthe.ngayKthuc);

      this.http
        .get(DanhMucURL.getAllDsLDoantheCv(this.idDoanthe))
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((res: any) => {
          if (res.state) {
            this.listLDoantheCv = res.data;
          }
        });
    }
  }

  ngOnChanges(): void {}

  onloadData(): void {
    this.http
      .get(DanhMucURL.getAllDsLDoanthe())
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (res.state) {
          this.listLDoanthe = res.data;
        }
      });
  }

  onSelectLoaiDoanThe(event) {
    this.http
      .get(DanhMucURL.getAllDsLDoantheCv(event.value))
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (res.state) {
          this.listLDoantheCv = res.data;
          //  console.log('----------------------------this.listChucVu: ', this.listChucVu)
        }
      });
  }

  compareObjectsCvDoanthe(o1: any, o2: any): boolean {
    return o1.name === o2.name && o1.id === o2.id;
  }

  startDate(event: MatDatepickerInputEvent<Date>): void {
    this.minDate = event.value;
  }

  endDate(event: MatDatepickerInputEvent<Date>): void {
    this.maxDate = event.value;
  }

  async saveAndClose(): Promise<void> {
    if (this.minDate && this.maxDate && this.minDate > this.maxDate) {
      this.messageService.showWarningMessage(
        'Hệ thống',
        'Ngày bắt đầu phải nhỏ hơn ngày kết thúc!'
      );
    }
    if (this.registerForm.invalid) return;
    // Xử lý bất đồng bộ ở đây
    const qdnoidung = await ValidateQD.getStatusOfNsQdndung(
      this.http,
      this.mb,
      this.quyetdinh,
      this.messageService,
      this.insertFile
    );
    if (qdnoidung === null) return;

    this.data.NsCvudthe.nsQdndung = qdnoidung;
    this.data.NsCvudthe.nsId = this.data.nhansu.nsID;
    this.data.NsCvudthe.donviId = this.data.nhansu.donviId;
    try {
      if (
        this.insertFile &&
        this.insertFile.length > 0 &&
        this.quyetdinh.isChangeFileAttach
      ) {
        let arrStr = this.insertFile[0].fileName.split('.');
        let extend = arrStr[arrStr - 1];
        this.data.NsCvudthe.nsQdndung.fileAttach = this.insertFile[0];
        this.data.NsCvudthe.nsQdndung.fileName = this.insertFile[0].fileName;
        this.data.NsCvudthe.nsQdndung.fileExtend = extend;
      }
    } catch (error) {
      // Xử lý lỗi nếu có
      console.error('Đã xảy ra lỗi: ', error);
    }

    if (this.data.addNew) {
      const resp = await this.http
        .post(QuatrinhLamviecURL.getNsCvuDtheUnique(), this.data.NsCvudthe)
        .pipe(takeUntil(this._unsubscribeAll))
        .toPromise();
      if (resp.state === false) {
        this.messageService.showWarningMessage(
          'Hệ thống',
          'Đã tồn tại chức vụ đoàn thể này của nhân sự, chức vụ, đơn vị, ngày ký. Xin vui lòng chọn bộ dữ liệu khác.'
        );
        return;
      }
      this.matDialogRef.close(this.data.NsCvudthe);
    } else {
      const res = await this.http
        .post(
          QuatrinhLamviecURL.checkNgayHieuLucQTLVChuyenTrach(),
          this.data.NsCvudthe
        )
        .pipe(takeUntil(this._unsubscribeAll))
        .toPromise();
      if (res.state === false) {
        this.messageService.showWarningMessage(
          'Hệ thống',
          'Không sửa Ngày bắt đầu nhỏ hơn Ngày bắt đầu của quá trình làm việc cũ!'
        );
        return;
      }
      this.matDialogRef.close(this.data.NsCvudthe);
    }
  }

  close(): void {
    this.matDialogRef.close();
  }
}
