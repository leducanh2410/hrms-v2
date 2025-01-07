import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CommonApiService } from '../../../../../../services/commonHttp';
import { DanhMucURL } from '../../../../../../services/employe/danhmucURL';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { HSNhansuURL } from '../../../../../../services/employe/hosonhansuURL';
import { MessageService } from '../../../../../../shared/message.services';
import { HosonhansuBean } from '../../../model/hosonhansubean';
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
    MatInputModule
  ]
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

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: HosonhansuBean,
    public matDialogRef: MatDialogRef<KhoitaohosonsComponent>,
    private http: CommonApiService,
    private messageService: MessageService,
    private _matDialog: MatDialog,
    private store: Store<AppState>,
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

      this.http
        .get(HSNhansuURL.genSohieuNS(this.donviThaotacId))
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((res: any) => {
          if (!res || !res.state) return;
          this.data.sohieu = res.data;
        });

      this.http
        .get(HSNhansuURL.getTenDvikyHDLD(this.donviThaotacId))
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((res: any) => {
          if (!res || !res.state) return;
          this.data.donviKyhdld = res.data;
        });
    }


    this.http
      .get(HSNhansuURL.getDsDonviTructhuoc(this.donviThaotacId))
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (!res || !res.state) return;
        this.listDonvi = res.data;
      });

    this.http
      .get(DanhMucURL.getAllTTrangHopdong())
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (!res || !res.state) return;
        this.listLoaiHdld = res.data;
      });

    this.http
      .get(DanhMucURL.getListVtriCdanhByDonvi(this.donviThaotacId))
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (!res || !res.state) return;
        this.listChucdanh = res.data;
      });

    this.http
      .get(DanhMucURL.getAllNganhngheKinhte())
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (!res || !res.state) return;
        this.listNganhNgheKte = res.data;

        this.http
          .get(HSNhansuURL.getNganhSxID(this.donviThaotacId))
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe((res: any) => {
            if (!res || !res.state) return;
            this.data.nganhSxkdId = res.data;
          });

      });

    this.http
      .get(DanhMucURL.getListNgheNghiep())
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (!res || !res.state) return;
        this.listNghenghiep = res.data;
      });

    this.http
      .get(DanhMucURL.getDsAllPhongbanIsActAndNoAct(this.donviThaotacId))
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (!res || !res.state) return;
        let donvis = res.data;
        this.phongBan = donvis
      });

    this.http
      .get(DanhMucURL.getListNgheCNKT())
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (!res || !res.state) return;
        this.listNgheCNKT = res.data;
      });

    this.http
      .get(DanhMucURL.getListNhomNgheCNKT())
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (!res || !res.state) return;
        this.listNhomNgheCNKT = res.data;
      });
  }

  onChangeChucdanh(): void {
    if (this.data != null && this.data.vtriId != null) {
      this.http
        .get(DanhMucURL.checkCdanhCnkt(this.data.vtriId))
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((res: any) => {
          if (!res || !res.state) return;
          this.disableBtnCNKT = res.data;
          if (this.disableBtnCNKT) {
            this.data.nghecnkt = '';
            this.data.nghecnktId = null;
          }
        });
    }
  }

  onChangeDonvi(donviId) {
    this.http
      .get(DanhMucURL.getDsAllPhongbanIsActAndNoAct(donviId))
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (!res || !res.state) return;
        let donvis = res.data;
        this.phongBan = donvis
        this.data.phongban = '';
        this.data.phongbanId = null;
        this.data.donviId = donviId;
      });

    this.http
      .get(DanhMucURL.getListVtriCdanhByDonvi(donviId))
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (!res || !res.state) return;
        this.listChucdanh = res.data;

        this.data.vtriId = null;

      });

    this.http
      .get(HSNhansuURL.genSohieuNS(donviId))
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (!res || !res.state) return;
        this.data.sohieu = res.data;
      });

    this.http
      .get(HSNhansuURL.getNganhSxID(donviId))
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (!res || !res.state) return;
        this.data.nganhSxkdId = res.data;
      });

    this.http
      .get(HSNhansuURL.getTenDvikyHDLD(donviId))
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (!res || !res.state) return;
        this.data.donviKyhdld = res.data;
      });

  }

  onChonphongban(): void {
    const dialogRef = this._matDialog.open(FormphongbanComponent, {
      disableClose: true,
      data: {
        phongBan: this.phongBan,
        boChon: true
      }
    });

    dialogRef.afterClosed()
      .subscribe((result) => {
        if (result && result.data.id) {
          this.data.phongban = result.data.name;
          this.data.phongbanId = result.data.id;
        }

      });
  }

  onChonNgheCNKT(): void {
    const dialogRef = this._matDialog.open(FormnnghecnktComponent, {
      disableClose: true,
      data: {
        lnhomnghe: this.listNhomNgheCNKT,
        lnghe: this.listNgheCNKT,
        boChon: true
      }
    });

    dialogRef.afterClosed()
      .subscribe((result) => {
        if (result) {
          this.data.nghecnkt = result.data.name;
          this.data.nghecnktId = result.data.id;
        }

      });
  }

  onSave(): void {


    this.http
      .post(HSNhansuURL.validInfo(), this.data)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (!res || !res.state) {

          this.messageService.showErrorMessage(
            'Hệ thống',
            res.message
          );
          return;
        }

        if (this.data != null && this.data.nsID != null) {
          this.http
            .post(HSNhansuURL.updateNsLlns(), this.data)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((res: any) => {
              if (!res || !res.state) {
                this.messageService.showErrorMessage(
                  'Hệ thống',
                  'Cập nhật thông tin không thành công'
                );
              }
              this.messageService.showSuccessMessage(
                'Hệ thống',
                'Cập nhật thành công'
              );
              let result = res.data;
              this.matDialogRef.close(result);
            });
        } else {
                      this.http
            .post(HSNhansuURL.insertNsLlns(), this.data)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((res: any) => {
              if (!res || !res.state) {
                this.messageService.showErrorMessage(
                  'Hệ thống',
                  'Cập nhật thông tin không thành công'
                );
              }
              this.messageService.showSuccessMessage(
                'Hệ thống',
                'Cập nhật thành công'
              );
              let result = res.data;
              this.matDialogRef.close(result);
            });
        }

      });


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
