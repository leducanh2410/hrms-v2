import { Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { CommonApiService } from '../../../../../services/commonHttp';
import { HSNhansuURL } from '../../../../../services/employe/hosonhansuURL';
import { Subject, takeUntil } from 'rxjs';
import { THONG_TIN_CHUNG } from '../../model/thongtinchung';
import { DanhMucURL } from '../../../../../services/employe/danhmucURL';
import { MessageService } from '../../../../../shared/message.services';
import { ShareData } from '../../../../../shared/shareservice.service';
import { NHAN_SU } from '../../../../../shared/appkeymessages';
import { QtrinhlamviecComponent } from './qtrinhlamviec/qtrinhlamviec.component';
import { MatDialog } from '@angular/material/dialog';
import { formatDate } from '@angular/common';
import { FormBuilder, FormGroup, FormsModule, NgForm, Validators } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { CheckboxModule } from 'primeng/checkbox';
import { DividerModule } from 'primeng/divider';
import { QuillEditorComponent, QuillModule } from 'ngx-quill';
import { MatInputModule } from '@angular/material/input';
import { InputTextModule } from 'primeng/inputtext';

@Component({
  selector: 'app-thongtincanhan',
  templateUrl: './thongtincanhan.component.html',
  styleUrls: ['./thongtincanhan.component.scss'],
  imports:[
    DropdownModule,
    MatFormFieldModule,
    MatDatepickerModule,
    CheckboxModule,
    DividerModule,
    QuillModule,
    FormsModule,
    MatInputModule,
    InputTextModule
  ]
})
export class ThongtincanhanComponent implements OnInit, OnChanges, OnDestroy {
  @Input('nsInfo') nsInfo: THONG_TIN_CHUNG;
  @ViewChild('form1', { static: false }) form: FormGroup;
  @ViewChild('cccdInput') cccdInput: ElementRef;

  model: THONG_TIN_CHUNG;
  list: any[] = []

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
    this.form = this.fb.group({
      cccd: ['', Validators.required]
    })
  }

  ngOnInit(): void {
    this.loadDanhmuc();
    this.model = new THONG_TIN_CHUNG()
    if (this.nsInfo) {
      this.resetData();
    }
    // Xử lý kiểm tra update page khi dùng nút chức năng
    this.shareData.getMessage(NHAN_SU.UPDATE_TTCN).pipe(takeUntil(this._unsubscribeAll)).subscribe(async (is_save: any) => {
      if (is_save) {
        this.save(this.form.valid);
      }
      else {
        this.resetData();
      }
      this.is_edit = false
      this.shareData.sendMessage(NHAN_SU.IS_EDIT, this.is_edit);
    });

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
      if (this.model.is_create) {
        this.model.quocgiaId = 1;
        this.model.dantocId = 1;
        this.model.tongiaoId = 2;
        this.model.is_create = false;
        this.is_edit = true;
      } else {
        this.is_edit = false;
      }
      if (this.nsInfo.nsTtphoId)
        this.getDsQhNoisinh(this.nsInfo.nsTtphoId);
      if (this.nsInfo.qqTtphoId)
        this.getDsQhQuequan(this.nsInfo.qqTtphoId);
      if (this.nsInfo.chnTtphoId)
        this.getDsQhNoio(this.nsInfo.chnTtphoId);
      if (this.nsInfo.ttTtphoId)
        this.getDsQhHokhau(this.nsInfo.ttTtphoId);
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
      if (this.model.socmnd == null) {
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
      this.focusFirstInvalidControlPlus()
      return;
    }
    this.http
      .post(HSNhansuURL.updateNsLlns(), this.model)
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
        this.is_edit = false;
        this.shareData.sendMessage(NHAN_SU.VIEW_TTIN, this.model);
        this.shareData.sendMessage(NHAN_SU.IS_EDIT, this.is_edit);
        this.shareData.sendMessage(NHAN_SU.REFRESH_THONGTINCHUNG, 'REFRESH_THONGTINCHUNG');
      });
  }

  edit() {
    this.is_edit = true;
    this.shareData.sendMessage(NHAN_SU.IS_EDIT, this.is_edit)
  }

  back() {
    this.is_edit = false
    this.resetData();
    this.shareData.sendMessage(NHAN_SU.IS_EDIT, this.is_edit)
  }

  resetData() {
    this.model = JSON.parse(JSON.stringify(this.nsInfo))
    if (this.model.capnhatquatrinhct) this.model.capnhatquatrinhct = this.model.capnhatquatrinhct.replaceAll("\n", "<br/>");
    else this.model.capnhatquatrinhct = ''
  }

  chonTuQtrinh() {
    let listQtlamviec;
    this.http
      .get(HSNhansuURL.getQtlamviec(this.model.nsID))
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (!res || !res.state) return;
        listQtlamviec = res.data;
        const dialogRef = this._matDialog.open(QtrinhlamviecComponent, {
          width: '900px',
          disableClose: true,
          data: listQtlamviec
        });
        dialogRef.afterClosed()
          .subscribe((result) => {
            if (result) {
              if (this.model.capnhatquatrinhct == null) {
                this.model.capnhatquatrinhct = ''
              }
              result.forEach(qtrinh => {
                let line = `Từ ${formatDate(qtrinh.tungay, 'dd/MM/yyyy', 'en-US')}`
                if (qtrinh.denngay) {
                  line += ` đến ${formatDate(qtrinh.denngay, 'dd/MM/yyyy', 'en-US')}`
                }
                line += `: ${qtrinh.vtricdanh}`;
                if (this.model.capnhatquatrinhct.includes(line)) {
                    this.messageService.showErrorMessage(
                        'Hệ thống',
                        'Quá trình hiện đã có trong tóm tắt.'
                      );
                } else {
                    this.model.capnhatquatrinhct += '<br/>';
                    this.model.capnhatquatrinhct += (line + `, ${qtrinh.tendonvi}`);
                }
              });

            }
          });
      });
  }

  changeBodoi() {
    if (!this.model.bodoi) {
      this.model.ngaynhapngu = null;
      this.model.ngayxnlydo = null;
      this.model.chucvucaonhat = null;
    }
  }

  changeGDCS() {
    if (!this.model.giadinhchinhsach)
      this.model.kieugdcsach = null
  }

  getDsQhNoio(idtp) {
    let tpnoio = idtp;
    this.http
      .get(DanhMucURL.getListQHuyen(tpnoio))
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (!res || !res.state) return;
        this.qhNoio = res.data;
      });
  }

  getDsQhNoisinh(idtp) {
    let tpnoisinh = idtp;
    this.http
      .get(DanhMucURL.getListQHuyen(tpnoisinh))
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (!res || !res.state) return;
        this.qhNoisinh = res.data;
      });
  }

  getDsQhQuequan(idtp) {
    let tpquequan = idtp;
    this.http
      .get(DanhMucURL.getListQHuyen(tpquequan))
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (!res || !res.state) return;
        this.qhQuequan = res.data;
      });
  }

  getDsQhHokhau(idtp) {
    let tpquequan = idtp;
    this.http
      .get(DanhMucURL.getListQHuyen(tpquequan))
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (!res || !res.state) return;
        this.qhHokhau = res.data;
      });
  }

  focusFirstInvalidControlPlus(): void {
    const firstElementWithErrors: HTMLElement = this.el.nativeElement.querySelector(`form :not(mat-form-field) :not(div) .ng-invalid`);

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
