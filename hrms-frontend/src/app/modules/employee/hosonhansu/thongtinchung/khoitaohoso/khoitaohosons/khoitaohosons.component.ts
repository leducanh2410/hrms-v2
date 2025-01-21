import { Component, Inject, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { CommonApiService } from '../../../../../../services/commonHttp';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { HSNhansuURL } from '../../../../../../services/employe/hosonhansuURL';
import { MessageService } from '../../../../../../shared/message.services';
import { FormphongbanComponent } from '../../../../../../../assets/lib/formphongban/src/public-api';
import { User } from '../../../../../../../assets/lib/formnhansu-donvi/src/lib/ngxstore/user.types';
import { Store } from '@ngrx/store';
import { API } from '../../../../../../core/config/app.config';
import { APP_ACTION } from '../../../../../../ngxstore/actions/app.actions';
import { AppState } from '../../../../../../ngxstore/state/app.state';
import { FormnnghecnktComponent } from '../../../../../../../assets/lib/formnnghecnkt/src/public-api';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { DropdownModule } from 'primeng/dropdown';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MatInputModule } from '@angular/material/input';
import { CalendarModule } from 'primeng/calendar';
import { InputTextModule } from 'primeng/inputtext';
import { llnsURL } from '../../../../../../services/employe/llnsURL';
import { CheckboxModule } from 'primeng/checkbox';
import { ActivatedRoute, Router } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';

@Component({
  selector: 'app-khoitaohosons',
  templateUrl: './khoitaohosons.component.html',
  styleUrls: ['./khoitaohosons.component.scss'],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatRadioModule,
    RadioButtonModule,
    FormsModule,
    MatDatepickerModule,
    DropdownModule,
    MatInputModule,
    CalendarModule,
    InputTextModule,
    CheckboxModule,
    MatTabsModule,
  ],
})
export class KhoitaohosonsComponent implements OnInit {
  listLoaiHdld: any[] = [];
  listChucdanh: any[] = [];
  listDonvi: any[] = [];
  listNganhNgheKte: any[] = [];
  listNghenghiep: any[] = [];
  listNgheCNKT: any[] = [];
  listNhomNgheCNKT: any[] = [];
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  phongBan: any[];
  model: any;

  user_info: User;
  user$ = new BehaviorSubject<User>({});
  donviThaotacId: number;

  disableBtnCNKT: boolean;

  formData = {
    employeeName: '',
    birthday: null,
    gender: null,
    cccdNumber: '',
    cccdNgaycap: null,
    cccdNoicap: '',
    marriageStatus: null,
    noiSinh: '',
    queQuan: '',
    nationality: '',
    ethnic: '',
    maSoThue: '',
    ngayVaoLam: null,
    tongiao: '',
    contact: {
      companyEmail: '',
      phoneNumber: '',
      noiOHienTai: {},
      hoKhauThuongTru: {},
      emergencyContactAddress: '',
      emergencyContactName: '',
      emergencyContactPhoneNumber: '',
      emergencyContactRelationship: '',
      emergencyContactEmail: '',
    },
    baoHiem: {
      soSoBhxh: '',
      soSoBhxhCu: '',
      maSoBhxh: '',
      ngayCapBhxh: new Date(),
      ngayThamGiaBhxh: new Date(),
      noiCapBhxh: '',
      nopSoBhxh: false,
      ngayNopSoBhxh: new Date(),
      noiDongBh: '',
      daNhanSoBhxhBaoLuu: false,
      ngayNhanSoBhxhBaoLuu: new Date(),
      ngayBaoLuuSo: new Date(),
      ngayTraSoBaoHiem: new Date(),
      ngayHenNhanSo: new Date(),
      ghiChuBhxh: '',
      soBhyt: '',
      noiDkKhamBenh: '',
      ngayCapBhyt: new Date(),
      ngayHetHanBhyt: new Date(),
      khamSucKhoeDinhKy: false,
      maTinhBenhVienKcb: '',
      maBenhVienDangKyKham: '',
      ngayThamGiaBhtn: new Date(),
      tgDongBhtnTruocKhiVaoCongTy: 0,
      ghiChuBhyt: '',
      laDoanVienCongDoan: false,
      chucVuDoanVienCongDoan: '',
      ngayKetNap: new Date(),
      ngayKetThuc: new Date(),
    },
  };

  quocGia = [
    {
      name: 'Việt nam',
      id: 0,
    },
  ];

  danToc = [
    {
      name: 'Kinh',
      id: 0,
    },
  ];

  tonGiao = [
    {
      name: 'Không',
      id: 0,
    },
  ];

  listTtranghonnhan = [
    { name: 'Độc thân', id: 0 },
    { name: 'Đã kết hôn', id: 1 },
    { name: 'Ly hôn', id: 2 },
    { name: 'Góa', id: 4 },
  ];

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

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public matDialogRef: MatDialogRef<KhoitaohosonsComponent>,
    private http: CommonApiService,
    private messageService: MessageService,
    private _matDialog: MatDialog,
    private store: Store<AppState>,
    private _router: Router,
    private _activatedroute: ActivatedRoute
  ) {
    const appUser = this.store.select((state) => state.appUser);
    appUser.subscribe((res: any) => {
      const data = res;
      if (data && data.type === APP_ACTION.USER_INFO) {
        this.user_info = { ...data.payload };
        this.user_info.avatar = `${API.IMG}/${this.user_info?.iddonvi}/${this.user_info.idnv}.png`;
        this.user_info.status = 'online';
        this.user$.next(this.user_info);
      }
    });
  }

  ngOnInit(): void {
    this.donviThaotacId = this.user_info?.iddonvi;
    if (this.data) this.model = this.data;

    this.disableBtnCNKT = true;

    if (this.data == null || this.data.nsID == null) {
      this.data.gioitinh = true;
    }

    this.loadDataMaster();
  }

  onNavigatorHsns(ns) {
    this._router.navigate(['../dsachnhansu'], {
      relativeTo: this._activatedroute,
      state: ns,
    });
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

  onSave(): void {
    this.formData.contact.hoKhauThuongTru = {
      tinh: this.hoKhauTinh,
      huyen: this.hoKhauHuyen,
      xa: this.hoKhauXa,
      chiTiet: this.hoKhauChiTiet,
    };

    this.formData.contact.noiOHienTai = {
      tinh: this.noiOTinh,
      huyen: this.noiOHuyen,
      xa: this.noiOXa,
      chiTiet: this.noiOChiTiet,
    };

    this.http
      .post(llnsURL.createNhanSu(), this.formData)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res) => {
        this.onNavigatorHsns(res?.data);
        this.onClose();
      });
  }
  
  filterRegion(data: any[], filterList: any[], regionId, type: string) {
    var filtered = data?.filter((region) => region[type] == regionId);
    filterList.length = 0;
    filterList.push(...filtered);
    console.log(this.filteredNOQuanHuyen, filtered, regionId);
  }

  onInputChange(event: any) {
    const input = event.target as HTMLInputElement;
    const inputValue = input.value;
    const onlyNumbers = inputValue.replace(/[^0-9]/g, ''); // Lọc chỉ số

    // Gán lại giá trị với chỉ số
    input.value = onlyNumbers;
  }
  onClose(): void {
    this.matDialogRef.close();
  }
}
