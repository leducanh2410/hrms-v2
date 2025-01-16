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
import { Subject, takeUntil } from 'rxjs';
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
  thanhPho: any[] = [];
  quocGia: any[] = [];
  tonGiao: any[] = [];
  nganHang: any[] = [];
  tpGiadinh: any[] = [];
  trinhDo: any[] = [];
  ngheNghiep: any[] = [];
  listChucvu: any[] = [];
  listTtranghonnhan: any[] = [];
  qhNoio: any[] = [];
  qhNoisinh: any[] = [];
  qhQuequan: any[] = [];
  qhHokhau: any[] = [];
  listHinhThucDaoTao: any[] = [];
  listHocham: any;
  listTrinhdoqlkt: any;

  cccd_ngayCap: Date;

  is_edit: boolean = false;

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

    this.quocGia = [
      {
        name: 'Việt nam',
        id: 0,
      },
    ];

    this.danToc = [
      {
        name: 'Kinh',
        id: 0,
      },
    ];

    this.tonGiao = [
      {
        name: 'Không',
        id: 0,
      },
    ];

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

    // Xử lý kiểm tra update page khi dùng nút chức năng
    // this.shareData
    //   .getMessage(NHAN_SU.UPDATE_TTCN)
    //   .pipe(takeUntil(this._unsubscribeAll))
    //   .subscribe(async (is_save: any) => {
    //     if (is_save) {
    //       this.save(this.form.valid);
    //     } else {
    //       this.resetData();
    //     }
    //     this.is_edit = false;
    //     this.shareData.sendMessage(NHAN_SU.IS_EDIT, this.is_edit);
    //   });
  }

  loadDataNsInfo() {
    this.http
      .get(llnsURL.getDsById(this.nsInfo?.id))
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(async (res: any) => {
        if (res?.state == 200) {
          this.model = res?.data;
          this.cccd_ngayCap = new Date(this.model.cccdNgaycap);

          if(!res?.data.dangDoan){
            this.model.dangDoan = new DangDoan()
          }
        }
      });
  }

  ngOnChanges(): void {
    if (this.nsInfo) {
      //
    }
  }

  changeMarriageStatus(newStatus: any) {
    this.model.marriageStatus = newStatus;
  }

  save() {
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
      .put(llnsURL.updateDangDoan(this.model.dangDoan.id), this.model.dangDoan)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (res?.state == 200) {
          this.loadDataNsInfo();
        }
      });

    this.is_edit = false
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
