import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { CommonApiService } from '../../../../../../services/commonHttp';
import { Subject, takeUntil } from 'rxjs';
import { AppUltil } from '../../../../../../shared/AppUltil';
import FileSaver from 'file-saver';
import { Buttons } from '../../../../../../fuse/components/message-box/common';
import { MessageBox } from '../../../../../../fuse/components/message-box/message-box.provider';
import { QuatrinhLuongURL } from '../../../../../../services/employe/quatrinhluongURL';
import { MessageService } from '../../../../../../shared/message.services';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FileUploadModule } from 'primeng/fileupload';
import { CheckboxModule } from 'primeng/checkbox';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { Luong } from '../../../model/luong';
import { THONG_TIN_CHUNG } from '../../../model/thongtinchung';
import { NgachLuong } from '../../../model/nghachluong';
import { BacLuong } from '../../../model/bacluong';

@Component({
  selector: 'app-luongdialog',
  templateUrl: './luongdialog.component.html',
  styleUrls: ['./luongdialog.component.scss'],
  imports: [
    MatFormFieldModule,
    FormsModule,
    MatDatepickerModule,
    AutoCompleteModule,
    FileUploadModule,
    CheckboxModule,
    CommonModule,
    MatInputModule,
    DropdownModule,
    InputTextModule,
    CalendarModule,
  ],
})
export class LuongdialogComponent implements OnInit, OnDestroy {
  pheDuyetOptions = [
    { label: 'Duyệt', value: true },
    { label: 'Chờ duyệt', value: false },
  ];

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  isNghiviec: boolean;
  nsId: number;
  luong: Luong = new Luong();
  ngayHieuLuc: Date = new Date();
  listNgachLuong: NgachLuong[] = [];
  listBacLuong: BacLuong[] = [];
  isEdit: boolean = true;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public matDialogRef: MatDialogRef<LuongdialogComponent>,
    private http: CommonApiService,
    private mb: MessageBox,
    private _matDialog: MatDialog,
    private messageService: MessageService
  ) {
    console.log(data);

    this.nsId = data?.nsID;

    if (data?.addNew) {
      this.isEdit = false;
    }
  }

  ngOnInit(): void {
    console.log(this.nsId);

    this.http
      .get(QuatrinhLuongURL.getAllNgachLuong())
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (res.state == 200) {
          this.listNgachLuong = res.data;
        }
      });
    this.http
      .get(QuatrinhLuongURL.getAllBacLuong())
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (res.state == 200) {
          this.listBacLuong = res.data;
        }
      });

    if (this.isEdit) {
      this.http
        .get(QuatrinhLuongURL.getNsLuongById(this.data?.nsLuongId))
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((res: any) => {
          if (res.state == 200) {
            this.luong = res.data;
            this.ngayHieuLuc = new Date(res.data?.ngayHieuLuc);
          }
        });
    }
  }

  async onSave(): Promise<void> {
    const luongRequest = {
      ngachLuongId: this.luong.ngachLuong.id,
      bacLuongId: this.luong.bacluong.id,
      ngayHieuLuc: this.ngayHieuLuc,
      ngayQuyetDinh: this.ngayHieuLuc,
      luongThuNhap: this.luong.luongThuNhap,
      mucTamUngChung: this.luong.mucTamUngChung,
      thamNien: this.luong.thamNien,
      kiemNhiem: this.luong.kiemNhiem,
      thuHut: this.luong.thuHut,
      bietPhai: this.luong.bietPhai,
      trachNhiem: this.luong.trachNhiem,
      vungMien: this.luong.vungMien,
      datDo: this.luong.datDo,
      phuCap: this.luong.phuCap,
      trangThai: this.luong.trangThai,
    };

    if (this.isEdit) {
      this.http
        .put(QuatrinhLuongURL.updateNSLuong(this.luong?.id), luongRequest)
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((res: any) => {
          if (res.state == 200) {
            this.onClose();
          }
        });
    } else {
      this.http
        .post(QuatrinhLuongURL.createNSLuongByEmpId(this.nsId), luongRequest)
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((res: any) => {
          if (res.state == 200) {
            this.onClose();
          }
        });
    }
  }

  onClose(): void {
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
