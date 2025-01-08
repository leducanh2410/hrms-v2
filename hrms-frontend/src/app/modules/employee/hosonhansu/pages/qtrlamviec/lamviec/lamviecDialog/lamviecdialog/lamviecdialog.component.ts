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
import { QtrinhlamviecBean } from '../../../../../model/qtrinhlamviecbean';
import { APP_ACTION } from '../../../../../../../../ngxstore/actions/app.actions';
import { AppState } from '../../../../../../../../ngxstore/state/app.state';
import { CommonApiService } from '../../../../../../../../services/commonHttp';
import { DanhMucURL } from '../../../../../../../../services/employe/danhmucURL';
import { EmployeURL } from '../../../../../../../../services/employe/employeURL';

import { QuatrinhLamviecURL } from '../../../../../../../../services/employe/quatrinhlamviecURL';
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
  tendonvi?: string;
  tenphongban?: string;
  phongbanId?: number;

  uploadedFiles: any[] = [];
  _fileForm: any;
  insertFile: any[] = [];
  fileContent: any;

  listChucdanh: any[] = [];
  listNgheCNKT: any[] = [];
  listNhomNgheCNKT: any[] = [];

  model: any;
  donviThaotacId: number;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  phongBan: any[];
  user_info: User;
  user$ = new BehaviorSubject<User>({});

  disableChkChucdanhnamgiu?: boolean;

  isVisiableVtriCdanh?: boolean;

  isQuaTrinhTruocKhiVaoDonVi?: boolean;
  isQuaTrinhGoc?: boolean;
  isQuaTrinhAnhHuong?: boolean;
  strLabelThongBao?: string;

  disableBtnCNKT: boolean;

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
        this.user_info.avatar = `${API.IMG}/${this.user_info?.iddonvi}/${this.user_info.idnv}.png`;
        this.user_info.status = 'online';
        this.user$.next(this.user_info);
      }
    });
  }

  ngOnInit(): void {
    this.isVisiableVtriCdanh = false;
    this.isQuaTrinhGoc = false;
    this.isQuaTrinhAnhHuong = false;
    this.isQuaTrinhAnhHuong = false;
    this.strLabelThongBao = '';
    this.disableChkChucdanhnamgiu = false;

    this.disableBtnCNKT = true;

    this.donviThaotacId = 1;
    if (this.data) this.model = this.data;

    this.http
      .post(QuatrinhLamviecURL.loadQtlamviec(), this.data)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        this.isQuaTrinhAnhHuong = res.data.isQuaTrinhAnhHuong;
        this.isQuaTrinhGoc = res.data.isQuaTrinhGoc;
        this.isQuaTrinhTruocKhiVaoDonVi = res.data.isQuaTrinhTruocKhiVaoDonVi;
        this.strLabelThongBao = res.data.strLabelThongBao;

        if (
          this.isQuaTrinhTruocKhiVaoDonVi ||
          this.isQuaTrinhAnhHuong ||
          this.isQuaTrinhGoc
        ) {
          this.disableChkChucdanhnamgiu = true;
        }
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
