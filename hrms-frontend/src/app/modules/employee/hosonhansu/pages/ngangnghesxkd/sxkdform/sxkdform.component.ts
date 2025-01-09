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
import { MessageBox } from '../../../../../../fuse/components/message-box/message-box.provider';
import { CommonApiService } from '../../../../../../services/commonHttp';
import { DanhMucURL } from '../../../../../../services/employe/danhmucURL';
import { llnsURL } from '../../../../../../services/employe/llnsURL';
import { QuatrinhLamviecURL } from '../../../../../../services/employe/quatrinhlamviecURL';
import { MessageService } from '../../../../../../shared/message.services';
import { Subject, takeUntil } from 'rxjs';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { FileUploadModule } from 'primeng/fileupload';
import { MatSelectModule } from '@angular/material/select';
import { DividerModule } from 'primeng/divider';
import { TableModule } from 'primeng/table';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-doantheform',
  templateUrl: './sxkdform.component.html',
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
    MatInputModule
  ],
})
export class SxkdformComponent implements OnInit {
  @ViewChild('registerForm', { static: false }) registerForm: any;
  submitted = false;
  listNganhNgheSX: any[] = [];
  minDate: Date = null;
  maxDate: Date = null;
  isLockform = false;

  private _unsubscribeAll: Subject<any> = new Subject<any>();
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public matDialogRef: MatDialogRef<SxkdformComponent>,
    private messageService: MessageService,
    private _matDialog: MatDialog,
    private http: CommonApiService,
    private formBuilder: FormBuilder,
    private mb: MessageBox
  ) {}

  ngOnInit(): void {
    this.onloadData();
    if (!this.data.addNew) {
      if (this.data.NsNganhkte.ngayBdau)
        this.minDate = new Date(this.data.NsNganhkte.ngayBdau);
      if (this.data.NsNganhkte.ngayKthuc)
        this.maxDate = new Date(this.data.NsNganhkte.ngayKthuc);
    }
  }

  onloadData(): void {
    this.http
      .get(DanhMucURL.getAllNganhngheKinhte())
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (res.state) {
          this.listNganhNgheSX = res.data;
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

  compareObjects(o1: any, o2: any): boolean {
    return o1.name === o2.name && o1.id === o2.id;
  }

  async saveAndClose(): Promise<void> {
    if (this.minDate && this.maxDate && this.minDate > this.maxDate) {
      this.messageService.showWarningMessage(
        'Hệ thống',
        'Ngày bắt đầu phải nhỏ hơn ngày kết thúc!'
      );
      return;
    }

    if (this.registerForm.invalid) return;

    this.data.NsNganhkte.nsId = this.data.nhansu.nsID;
    this.data.NsNganhkte.donviId = this.data.nhansu.donviId;

    if (this.data.addNew) {
      this.http
        .post(llnsURL.saveQtSXKD(), this.data.NsNganhkte)
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((res: any) => {
          if (!res || !res.state) {
            this.messageService.showErrorMessage('Hệ thống', res.message);
            return;
          }
          this.messageService.showSuccessMessage(
            'Hệ thống',
            'Cập nhật thành công'
          );
          this.matDialogRef.close();
        });
    } else {
      this.matDialogRef.close(this.data.NsNganhkte);
    }
  }

  close(): void {
    this.matDialogRef.close();
  }
}
