import {
  Component,
  ElementRef,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonApiService } from '../../../../../services/commonHttp';
import { HSNhansuURL } from '../../../../../services/employe/hosonhansuURL';
import { filter, Subject, takeUntil } from 'rxjs';
import { THONG_TIN_CHUNG } from '../../model/thongtinchung';
import { MessageService } from '../../../../../shared/message.services';
import { ShareData } from '../../../../../shared/shareservice.service';
import { NHAN_SU } from '../../../../../shared/appkeymessages';
import { MatDialog } from '@angular/material/dialog';
import { CommonModule, formatDate } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  NgForm,
  Validators,
} from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CheckboxModule } from 'primeng/checkbox';
import { DividerModule } from 'primeng/divider';
import { QuillEditorComponent, QuillModule } from 'ngx-quill';
import { MatInputModule } from '@angular/material/input';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { llnsURL } from '../../../../../services/employe/llnsURL';
import { DangDoan } from '../../model/dangDoan';
import { ValidateForm } from '../../../../../core/utilities/ValidateForm';

@Component({
  selector: 'app-thongtincanhan',
  templateUrl: './thongtincanhan.component.html',
  styleUrls: ['./thongtincanhan.component.scss'],
  imports: [
    DropdownModule,
    MatFormFieldModule,
    MatDatepickerModule,
    CheckboxModule,
    DividerModule,
    QuillModule,
    FormsModule,
    MatInputModule,
    InputTextModule,
    CommonModule,
    CalendarModule,
  ],
})
export class ThongtincanhanComponent implements OnInit, OnChanges, OnDestroy {
  @Input('nsInfo') nsInfo: THONG_TIN_CHUNG;
  @ViewChild('form1', { static: false }) form: FormGroup;
  @ViewChild('cccdInput') cccdInput: ElementRef;

  model: THONG_TIN_CHUNG;
  list: any[] = [];

  danToc: any[] = [];
  listChucvu: any[] = [];
  listTtranghonnhan: any[] = [];
  cccd_ngayCap: Date;

  // ho khau thuong tru
  hoKhauTinh: String = '';
  hoKhauHuyen: String = '';
  hoKhauXa: String = '';
  hoKhauThanhPho: any[] = [];
  hoKhauQuanHuyen: any[] = [];
  hoKhauPhuongXa: any[] = [];
  filteredHKQuanHuyen: any[] = [];
  filteredHKPhuongXa: any[] = [];
  hoKhauChiTiet: string = '';

  // Noi o hien tai
  noiOTinh: String = '';
  noiOHuyen: String = '';
  noiOXa: String = '';
  noiOThanhPho: any[] = [];
  noiOQuanHuyen: any[] = [];
  noiOPhuongXa: any[] = [];
  filteredNOQuanHuyen: any[] = [];
  filteredNOPhuongXa: any[] = [];
  noiOChiTiet: string = '';

  is_edit: boolean = false;

  validateForm: ValidateForm = new ValidateForm();

  private _unsubscribeAll: Subject<any> = new Subject<any>();
  constructor(
    private http: CommonApiService,
    private messageService: MessageService,
    private shareData: ShareData,
    private _matDialog: MatDialog,
    private el: ElementRef,
    private fb: FormBuilder
  ) {
    this.cccd_ngayCap = new Date('2010-05-15');

    this.form = this.fb.group({
      cccd: ['', Validators.required],
    });

    this.listTtranghonnhan = [
      { name: 'Độc thân', id: 0 },
      { name: 'Đã kết hôn', id: 1 },
      { name: 'Ly hôn', id: 2 },
      { name: 'Góa', id: 4 },
    ];
  }

  ngOnInit(): void {
    this.model = new THONG_TIN_CHUNG();

    if (this.nsInfo) {
      this.loadDataNsInfo();
    }

    this.loadDataMaster();
  }

  getMessage(errors: any): string {
    if (errors.required) {
      return 'Trường này là bắt buộc.';
    }
    if (errors.minlength) {
      return `Trường này phải có ít nhất ${errors.minlength.requiredLength} ký tự.`;
    }

    if (errors.pattern) {
      return 'Nhập sai định dạng';
    }
    return 'Có lỗi xảy ra.';
  }

  loadDataNsInfo() {
    this.http
      .get(llnsURL.getDsById(this.nsInfo?.id))
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(async (res: any) => {
        if (res?.state == 200) {
          this.model = res?.data;
          this.cccd_ngayCap = new Date(this.model.cccdNgaycap);

          if (!res?.data.dangDoan) {
            this.model.dangDoan = new DangDoan();
          }

          this.hoKhauTinh = this.model.contact.hoKhauThuongTru['tinh'];
          this.hoKhauHuyen = this.model.contact.hoKhauThuongTru['huyen'];
          this.hoKhauXa = this.model.contact.hoKhauThuongTru['xa'];
          this.hoKhauChiTiet = this.model.contact.hoKhauThuongTru['chiTiet'];

          this.noiOTinh = this.model.contact.noiOHienTai['tinh'];
          this.noiOHuyen = this.model.contact.noiOHienTai['huyen'];
          this.noiOXa = this.model.contact.noiOHienTai['xa'];
          this.noiOChiTiet = this.model.contact.noiOHienTai['chiTiet'];
        }
      });
  }

  async loadDataMaster() {
    this.http
      .get(llnsURL.getDSThanhPho())
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(async (res: any) => {
        if (res?.state == 200) {
          this.hoKhauThanhPho = [...res?.data];
          this.noiOThanhPho = [...res?.data];
        }
      });
    this.http
      .get(llnsURL.getDSQuanHuyen())
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(async (res: any) => {
        if (res?.state == 200) {
          this.hoKhauQuanHuyen = [...res?.data];
          this.noiOQuanHuyen = [...res?.data];
          this.filteredHKQuanHuyen = [...res?.data];
          this.filteredNOQuanHuyen = [...res?.data];
        }
      });
    this.http
      .get(llnsURL.getDSPhuongXa())
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(async (res: any) => {
        if (res?.state == 200) {
          this.hoKhauPhuongXa = [...res?.data];
          this.noiOPhuongXa = [...res?.data];
          this.filteredHKPhuongXa = [...res?.data];
          this.filteredNOPhuongXa = [...res?.data];
        }
      });
  }

  filterRegion(data: any[], filterList: any[], regionId, type: string) {
    var filtered = data?.filter((region) => region[type] == regionId);
    filterList.length = 0;
    filterList.push(...filtered);
    console.log(this.filteredNOQuanHuyen, filtered, regionId);
  }

  ngOnChanges(): void {
    if (this.nsInfo) {
    }
  }

  changeMarriageStatus(newStatus: any) {
    this.model.marriageStatus = newStatus;
  }

  save(form: NgForm) {
    console.log(form);

    if (!form.valid) {
      this.model.contact.hoKhauThuongTru = {
        tinh: this.hoKhauTinh,
        huyen: this.hoKhauHuyen,
        xa: this.hoKhauXa,
        chiTiet: this.hoKhauChiTiet,
      };

      this.model.contact.noiOHienTai = {
        tinh: this.noiOTinh,
        huyen: this.noiOHuyen,
        xa: this.noiOXa,
        chiTiet: this.noiOChiTiet,
      };

      const nsRequest = {
        employeeName: this.model.employeeName,
        birthday: this.model.birthday,
        gender: this.model.gender,
        cccdNumber: this.model.cccdNumber,
        cccdNgaycap: this.cccd_ngayCap,
        cccdNoicap: this.model.cccdNoicap,
        marriageStatus: this.model.marriageStatus,
        noiSinh: this.model.noiSinh,
        queQuan: this.model.queQuan,
        nationality: this.model.nationality,
        ethnic: this.model.ethnic,
        maSoThue: this.model.maSoThue,
        ngayVaoLam: this.model.ngayVaoLam,
        tongiao: this.model.tongiao,
        contact: this.model.contact,
        baoHiem: this.model.baoHiem,
      };

      this.http
        .put(llnsURL.updateNhanSu(this.nsInfo.id), nsRequest)
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((res: any) => {
          if (res?.state == 200) {
            this.loadDataNsInfo();
          }
        });

      this.http
        .put(
          llnsURL.updateDangDoan(this.model.dangDoan.id),
          this.model.dangDoan
        )
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((res: any) => {
          if (res?.state == 200) {
            this.loadDataNsInfo();
          }
        });

      this.is_edit = false;
    }
  }

  edit() {
    this.is_edit = true;
    this.shareData.sendMessage(NHAN_SU.IS_EDIT, this.is_edit);
  }

  back() {
    this.is_edit = false;
    this.shareData.sendMessage(NHAN_SU.IS_EDIT, this.is_edit);
  }

  focusFirstInvalidControlPlus(): void {
    const firstElementWithErrors: HTMLElement =
      this.el.nativeElement.querySelector(
        `form :not(mat-form-field) :not(div) .ng-invalid`
      );

    if (firstElementWithErrors) {
      firstElementWithErrors.focus();
    }
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
