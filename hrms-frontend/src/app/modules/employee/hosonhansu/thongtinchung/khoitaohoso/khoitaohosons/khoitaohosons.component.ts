import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
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
    @Inject(MAT_DIALOG_DATA) public data: any,
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
    }


  }

  onChangeChucdanh(): void {
    
  }

  onChangeDonvi(donviId) {

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
