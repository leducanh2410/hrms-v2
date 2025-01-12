import { Component, Inject, Input, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { Buttons } from '../../../../../../../../fuse/components/message-box/common';
import { MessageBox } from '../../../../../../../../fuse/components/message-box/message-box.provider';
import { Store } from '@ngrx/store';
import { API } from '../../../../../../../../core/config/app.config';
import { User } from '../../../../../../../../../assets/lib/formnhansu-donvi/src/lib/ngxstore/user.types';
import { QtrinhlamviecBean } from '../../../../../model/qtrinhlamviec';
import { APP_ACTION } from '../../../../../../../../ngxstore/actions/app.actions';
import { AppState } from '../../../../../../../../ngxstore/state/app.state';
import { CommonApiService } from '../../../../../../../../services/commonHttp';
import { AppUltil } from '../../../../../../../../shared/AppUltil';
import { MessageService } from '../../../../../../../../shared/message.services';
import FileSaver from 'file-saver';
import { FormnnghecnktComponent } from '../../../../../../../../../assets/lib/formnnghecnkt/src/public-api';
import { FormphongbanComponent } from '../../../../../../../../../assets/lib/formphongban/src/public-api';
import { FileUpload, FileUploadModule } from 'primeng/fileupload';

import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { CheckboxModule } from 'primeng/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatOptionModule } from '@angular/material/core';
import { DropdownModule } from 'primeng/dropdown';
import { MatInputModule } from '@angular/material/input';
import { CalendarModule } from 'primeng/calendar';
import { ChucDanh } from '../../../../../model/chucdanh';
import { PhongBan } from '../../../../../model/phongban';
import { VanPhongLamViec } from '../../../../../model/vanphonglamviec';
import { PhapNhan } from '../../../../../model/phapnhan';
import { ThanhPhanNS } from '../../../../../model/thanhphannhansu';
import { LoaiLaoDong } from '../../../../../model/loailaodong';
import { DongXe } from '../../../../../model/dongxe';
import { CapDoNS } from '../../../../../model/capdonhansu';
import { NghiepVu } from '../../../../../model/nghiepvu';
import { MasterDataURL } from '../../../../../../../../services/employe/masterDataURL';
import { HSNhansuURL } from '../../../../../../../../services/employe/hosonhansuURL';
import { LoaiQTCT } from '../../../../../model/loaiQtct';

@Component({
  selector: 'app-lamviecdialog',
  templateUrl: './lamviecdialog.component.html',
  styleUrls: ['./lamviecdialog.component.scss'],
  imports: [
    CheckboxModule,
    MatFormFieldModule,
    MatDatepickerModule,
    FormsModule,
    CommonModule,
    FileUploadModule,
    MatOptionModule,
    CheckboxModule,
    DropdownModule,
    MatInputModule,
    CalendarModule,
  ],
})
export class LamviecdialogComponent implements OnInit {
  listChucdanh: ChucDanh[] = [];
  listPhongBan: PhongBan[] = [];
  listVPLamViec: VanPhongLamViec[] = [];
  listPhapNhan: PhapNhan[] = [];
  listThanhPhanNS: ThanhPhanNS[] = [];
  listLoaiLaoDong: LoaiLaoDong[] = [];
  listDongXe: DongXe[] = [];
  listCapDoNS: CapDoNS[] = [];
  listNghiepVu: NghiepVu[] = [];
  listLoaiQTCT: LoaiQTCT[] = [];

  user_info: User;
  ngayHieuLuc: Date = new Date();

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: QtrinhlamviecBean,
    public matDialogRef: MatDialogRef<LamviecdialogComponent>,
    private http: CommonApiService,
    private _matDialog: MatDialog,
    private store: Store<AppState>,
    private messageService: MessageService,
    private mb: MessageBox
  ) {
    const appUser = this.store.select((state) => state.appUser);
    appUser.subscribe((res: any) => {
      const data = res;
      if (data && data.type === APP_ACTION.USER_INFO) {
        this.user_info = { ...data.payload };
        this.user_info.status = 'online';
      }
    });

    if (data) {
      this.ngayHieuLuc = new Date(data.ngayHieuLuc);
    }
  }

  ngOnInit(): void {
    this.onLoadPhongBan();
    this.onLoadCapDoNS();
    this.onLoadChucDanh();
    this.onLoadDongXe();
    this.onLoadLoaiLaoDong();
    this.onLoadVPLamViec();
    this.onLoadThanhPhanNS();
    this.onLoadNghiepVu();
    this.onLoadPhapNhan();
    this.onLoadLoaiQTCT();
  }

  onLoadPhongBan(): void {
    this.http
      .get(MasterDataURL.getAllDepartments())
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (!res || !res.state) return;
        this.listPhongBan = res.data;
      });
  }

  onLoadChucDanh(): void {
    this.http
      .get(MasterDataURL.getAllChucDanh())
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (!res || !res.state) return;
        this.listChucdanh = res.data;
      });
  }
  onLoadVPLamViec(): void {
    this.http
      .get(MasterDataURL.getAllVPLamViec())
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (!res || !res.state) return;
        this.listVPLamViec = res.data;
      });
  }
  onLoadThanhPhanNS(): void {
    this.http
      .get(MasterDataURL.getAllThanhPhanNS())
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (!res || !res.state) return;
        this.listThanhPhanNS = res.data;
      });
  }
  onLoadPhapNhan(): void {
    this.http
      .get(MasterDataURL.getAllPhapNhan())
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (!res || !res.state) return;
        this.listPhapNhan = res.data;
      });
  }
  onLoadNghiepVu(): void {
    this.http
      .get(MasterDataURL.getAllNghiepVu())
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (!res || !res.state) return;
        this.listNghiepVu = res.data;
      });
  }
  onLoadLoaiLaoDong(): void {
    this.http
      .get(MasterDataURL.getAllLoaiLaoDong())
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (!res || !res.state) return;
        this.listLoaiLaoDong = res.data;
      });
  }
  onLoadDongXe(): void {
    this.http
      .get(MasterDataURL.getAllDongXe())
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (!res || !res.state) return;
        this.listDongXe = res.data;
      });
  }
  onLoadCapDoNS(): void {
    this.http
      .get(MasterDataURL.getAllCapDoNS())
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (!res || !res.state) return;
        this.listCapDoNS = res.data;
      });
  }

  onLoadLoaiQTCT(): void {
    this.http
      .get(MasterDataURL.getAllLoaiQTCT())
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (!res || !res.state) return;
        this.listLoaiQTCT = res.data;
      });
  }

  onChonphongban(): void {}

  onChangeChucdanh(): void {}

  onSave(): void {}

  onKeyDown(event: any, maxLength: number) {
    const acceptKeys = [
      'ArrowLeft',
      'ArrowRight',
      'ArrowUp',
      'ArrowDown',
      'Delete',
      'Backspace',
    ];

    if (
      event.target.value.length >= maxLength &&
      !acceptKeys.includes(event.key)
    ) {
      event.preventDefault();
    }
  }

  onClose(): void {
    this.matDialogRef.close();
  }
}
