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
import { QtrinhlamviecComponent } from './qtrinhlamviec/qtrinhlamviec.component';
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
    // this.loadDanhmuc();
    this.model = new THONG_TIN_CHUNG();
    console.log(this.nsInfo);
    
    if (this.nsInfo) {
      this.model = this.nsInfo;
      this.cccd_ngayCap = new Date(this.nsInfo.cccdNgaycap);
    } else {
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

  loadDanhmuc() {
    // this.http
    //   .get(DanhMucURL.getListDantoc())
    //   .pipe(takeUntil(this._unsubscribeAll))
    //   .subscribe((res: any) => {
    //     if (!res || !res.state) return;
    //     this.danToc = res.data;
    //   });
    // this.http
    //   .get(DanhMucURL.getListThanhPho())
    //   .pipe(takeUntil(this._unsubscribeAll))
    //   .subscribe((res: any) => {
    //     if (!res || !res.state) return;
    //     this.thanhPho = res.data;
    //   });
    // this.http
    //   .get(DanhMucURL.getListQuocgia())
    //   .pipe(takeUntil(this._unsubscribeAll))
    //   .subscribe((res: any) => {
    //     if (!res || !res.state) return;
    //     this.quocGia = res.data;
    //   });
    // this.http
    //   .get(DanhMucURL.getListTongiao())
    //   .pipe(takeUntil(this._unsubscribeAll))
    //   .subscribe((res: any) => {
    //     if (!res || !res.state) return;
    //     this.tonGiao = res.data;
    //   });
    // this.http
    //   .get(DanhMucURL.getListNganHang())
    //   .pipe(takeUntil(this._unsubscribeAll))
    //   .subscribe((res: any) => {
    //     if (!res || !res.state) return;
    //     this.nganHang = res.data;
    //   });
    // this.http
    //   .get(DanhMucURL.getListTpGD())
    //   .pipe(takeUntil(this._unsubscribeAll))
    //   .subscribe((res: any) => {
    //     if (!res || !res.state) return;
    //     this.tpGiadinh = res.data;
    //   });
    // this.http
    //   .get(DanhMucURL.getListTrinhdoLLCT())
    //   .pipe(takeUntil(this._unsubscribeAll))
    //   .subscribe((res: any) => {
    //     if (!res || !res.state) return;
    //     this.trinhDo = res.data;
    //   });
    // this.http
    //   .get(DanhMucURL.getListNgheNghiep())
    //   .pipe(takeUntil(this._unsubscribeAll))
    //   .subscribe((res: any) => {
    //     if (!res || !res.state) return;
    //     this.ngheNghiep = res.data;
    //   });
    // this.http
    //   .get(DanhMucURL.getListChucVu())
    //   .pipe(takeUntil(this._unsubscribeAll))
    //   .subscribe((res: any) => {
    //     if (!res || !res.state) return;
    //     this.listChucvu = res.data;
    //   });
    // this.http
    //   .get(DanhMucURL.getDsTtranghonnhan())
    //   .pipe(takeUntil(this._unsubscribeAll))
    //   .subscribe((res: any) => {
    //     if (!res || !res.state) return;
    //     this.listTtranghonnhan = res.data;
    //   });
    // this.http
    //   .get(DanhMucURL.getListHthucdtao())
    //   .pipe(takeUntil(this._unsubscribeAll))
    //   .subscribe((res: any) => {
    //     if (!res || !res.state) return;
    //     this.listHinhThucDaoTao = res.data;
    //   });
    // this.http
    //   .get(DanhMucURL.getListHocham())
    //   .pipe(takeUntil(this._unsubscribeAll))
    //   .subscribe((res: any) => {
    //     if (!res || !res.state) return;
    //     this.listHocham = res.data;
    //   });
    // this.http
    //   .get(DanhMucURL.getListTrinhdoQLKT())
    //   .pipe(takeUntil(this._unsubscribeAll))
    //   .subscribe((res: any) => {
    //     if (!res || !res.state) return;
    //     this.listTrinhdoqlkt = res.data;
    //   });
  }

  ngOnChanges(): void {
    if (this.nsInfo) {
      this.resetData();
      //
    }
  }

  // subcribeChange() {
  //   if (this.model != null) {
  //     setTimeout(() => {
  //       console.log("subcribe");
  //       this.subcribe = this.form.valueChanges.pipe(debounceTime(500))
  //         .subscribe((values) => {
  //           let is_change = !(JSON.stringify(this.model) === JSON.stringify(this.nsInfo))
  //           // let is_change = !(_.isEqual(values, this.nsInfo))
  //           if (is_change) console.log("change");

  //           this.shareData.sendMessage(NHAN_SU.IS_EDIT, is_change)
  //           // if (is_change) this.subcribe.unsubscribe()
  //         });
  //     })
  //   }
  // }

  save(isValid) {
    if (!isValid) {
      if (this.model?.cccdNumber == null) {
        this.messageService.showErrorMessage(
          'Hệ thống',
          'Thông tin nhập thiếu CMND/ Căn cước.'
        );
        this.cccdInput.nativeElement.focus();
        return;
      }
      this.messageService.showErrorMessage(
        'Hệ thống',
        'Thông tin nhập thiếu hoặc không đúng định dạng.'
      );
      this.focusFirstInvalidControlPlus();
      return;
    }
  }

  edit() {
    this.is_edit = true;
    this.shareData.sendMessage(NHAN_SU.IS_EDIT, this.is_edit);
  }

  back() {
    this.is_edit = false;
    this.resetData();
    this.shareData.sendMessage(NHAN_SU.IS_EDIT, this.is_edit);
  }

  resetData() {}

  changeBodoi() {}

  changeGDCS() {}

  getDsQhNoio(idtp) {
    
  }

  getDsQhNoisinh(idtp) {
    
  }

  getDsQhQuequan(idtp) {
    
  }

  getDsQhHokhau(idtp) {
   
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
