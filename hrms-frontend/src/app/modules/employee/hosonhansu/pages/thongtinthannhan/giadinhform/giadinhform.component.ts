import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonApiService } from '../../../../../../services/commonHttp';
import { DanhMucURL } from '../../../../../../services/employe/danhmucURL';
import { llnsURL } from '../../../../../../services/employe/llnsURL';
import { Subject, takeUntil } from 'rxjs';
import { MessageService } from '../../../../../../shared/message.services';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatOptionModule } from '@angular/material/core';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { NhanThan } from '../../../model/nhanthan';
import { InputTextareaModule } from 'primeng/inputtextarea';
@Component({
  selector: 'app-giadinhform',
  templateUrl: './giadinhform.component.html',
  styleUrls: ['./giadinhform.component.scss'],
  imports: [
    MatFormFieldModule,
    FormsModule,
    MatDatepickerModule,
    MatOptionModule,
    DropdownModule,
    CheckboxModule,
    CommonModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatInputModule,
    InputTextModule,
    CalendarModule,
    InputTextareaModule
  ],
})
export class GiadinhformComponent implements OnInit {
  @ViewChild('registerForm', { static: false }) registerForm: any;
  uploadedFiles: any[] = [];
  _fileForm: any;
  listGioiTinh: any[] = [
    {
      name: 'Nam',
      id: 0,
    },
    {
      name: 'Nữ',
      id: 1,
    },
    {
      name: 'LGBT',
      id: 2,
    },
  ];
  isLockform = false;
  lqhegdinh: number;
  isAddnew: boolean = false;
  nhanThan: NhanThan;
  ngaySinh: Date;

  private _unsubscribeAll: Subject<any> = new Subject<any>();
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public matDialogRef: MatDialogRef<GiadinhformComponent>,
    private messageService: MessageService,
    private http: CommonApiService,
    private formBuilder: FormBuilder
  ) {
    this.nhanThan = data?.nhanthan;
    this.ngaySinh = new Date(data?.nhanthan.ngaySinh);
  }

  ngOnInit(): void {
    this.registerForm = this.formBuilder.group({
      //firstName: ['', Validators.required],
      hoten: new FormControl('', Validators.required),
      lqhegdinh: new FormControl('', Validators.required),
    });
    console.log(this.nhanThan.ngaySinh);

    // this.http
    //   .get(DanhMucURL.getListQhegiadinh())
    //   .pipe(takeUntil(this._unsubscribeAll))
    //   .subscribe((res: any) => {
    //     if (!res || !res.state) return;
    //     this.listQhegd = res.data;
    //   });
  }

  myUploader(event, fileForm) {
    this.uploadedFiles.push(event);
    this._fileForm = fileForm;
  }
  compareObjectsLQuanhe(o1: any, o2: any): boolean {
    return o1.name === o2.name && o1.id === o2.id;
  }
  nhapTiep(): void {
    this.isLockform = false;
    this.data.giadinh = {};
    this.data.addNew = true;
  }

  saveAndClose(): void {
    if (this.registerForm.invalid) return;
    if (this.data.addNew) {
      if (this.data.giadinh) {
        this.data.giadinh.donviId = this.data.nhansu.donviId;
        this.data.giadinh.nsId = this.data.nhansu.nsID;
        this.data.giadinh.namsinh = new Date(
          this.data.giadinh.ngaysinh
        ).getFullYear();
        this.http
          .post(llnsURL.insertPTGiaDinh(), this.data.giadinh)
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
      }
    } else {
      this.matDialogRef.close(this.data.giadinh);
    }
  }

  close(): void {
    this.matDialogRef.close();
  }
}
