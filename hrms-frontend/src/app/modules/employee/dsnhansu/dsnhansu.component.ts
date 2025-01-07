import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MessageBox } from '../../../fuse/components/message-box/message-box.provider';
import { Store } from '@ngrx/store';
import { TitleHead } from '../../../core/navigation/navigation.types';
import { User } from '../../../core/user/user.types';
import { FileviewComponent } from '../../components/fileview/fileview.component';
import { APP_ACTION } from '../../../ngxstore/actions/app.actions';
import { AppState } from '../../../ngxstore/state/app.state';
import { CommonApiService } from '../../../services/commonHttp';
import { DanhMucURL } from '../../../services/employe/danhmucURL';
import { HSNhansuURL } from '../../../services/employe/hosonhansuURL';
import { llnsURL } from '../../../services/employe/llnsURL';
import { TochucURL } from '../../../services/tochuc/tochucURL';
import { AppUltil, MessageKey } from '../../../shared/AppUltil';
import { MessageService } from '../../../shared/message.services';
import { ShareData } from '../../../shared/shareservice.service';
import { Subject, takeUntil } from 'rxjs';
import { DialogDsNhansuColumnSelectComponent } from './dialog-ds-nhansu-column-select/dialog-ds-nhansu-column-select.component';
import {
  COLUMN_INIT_DS_NHANSU,
  DsNhansuColumnModel,
} from './dsnhansucolumn.model';
import { ActivatedRoute, Router } from '@angular/router';
import { NHAN_SU } from '../../../shared/appkeymessages';
import { TreeNode } from 'primeng/api';
import FileSaver from 'file-saver';
import { MatMenuModule } from '@angular/material/menu';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { TableModule } from 'primeng/table';
import { TreeModule } from 'primeng/tree';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TooltipModule } from 'primeng/tooltip';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { StoreModule } from '@ngrx/store';
import { FormdonviTreeComponent } from '../../../../assets/lib/formdonvi-tree/src/public-api';
import { THONG_TIN_CHUNG } from '../hosonhansu/model/thongtinchung';

@Component({
  selector: 'app-dsnhansu',
  templateUrl: './dsnhansu.component.html',
  styleUrls: ['./dsnhansu.component.scss'],
  imports: [
    CommonModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    TableModule,
    CheckboxModule,
    MatInputModule,
    TreeModule,
    MatDialogModule,
    ButtonModule,
    InputSwitchModule,
    TooltipModule,
    MatMenuModule,
    NgxExtendedPdfViewerModule,
    StoreModule,
  ],
  providers: [],
})
export class DsnhansuComponent implements OnInit, OnDestroy {
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  private user!: User;

  //
  public donvis: any[] = [];
  public donviSelected: any;
  public listDept: any[] = []; // ds Department
  public dataTree = []; // tree ds Department theo donvi
  public selectedDeptNodes: any[] = [];
  public isShowTreeDept: boolean = false;

  //
  public listNhansu: THONG_TIN_CHUNG[] = [];
  public status: Boolean = false; // = false DSNS đang làm việc, true = nghỉ việc
  public columns!: DsNhansuColumnModel[];
  public columnsDefault: DsNhansuColumnModel[] = COLUMN_INIT_DS_NHANSU;
  public columnsSelected: DsNhansuColumnModel[] = [];

  @ViewChild('table') table: any;
  constructor(
    private shareData: ShareData,
    private http: CommonApiService,
    private store: Store<AppState>,

    private messageService: MessageService,
    private mb: MessageBox,
    private _matDialog: MatDialog,
    private _router: Router,
    private _activatedroute: ActivatedRoute
  ) {
    const title: TitleHead = {
      title: 'Nhân sự',
      subTitle: !this.status
        ? 'Danh sách nhân sự'
        : 'Danh sách nhân sự nghỉ việc',
      search: false,
    };
    this.shareData.sendMessage(MessageKey.FN_HEADER_NAME, title);

    const appUser = this.store.select((state) => state.appUser);
    appUser.pipe(takeUntil(this._unsubscribeAll)).subscribe((res: any) => {
      const data = res;
      if (data && data.type === APP_ACTION.USER_INFO) {
        this.user = { ...data.payload };
        this.donviSelected = {
          organizationId: this.user.iddonvi,
          orgName: this.user.tendonvi,
          orgCode: this.user.madonvi,
        };

        this.http
          .get(TochucURL.getListDonviTructhuoc(this.user.iddonvi))
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe((res: any) => {
            if (res.state) {
              this.donvis = res.data;
            }
          });
      }
    });

    this.listNhansu = [
      {
        employee_id: 2,
        employee_name: 'Chu Diệu Linh',
        employee_code: '1809225',
        birthday: '1990-07-20',
        gender: 0,
        cccd_number: '234567890123',
        cccd_ngaycap: '2015-05-15',
        cccd_noicap: 'Hà Nội',
        phone: '03564135957',
        marriage_status: 0,
        noi_sinh: 'Hà Nội',
        que_quan: 'Hà Nội',
        dia_chi: '456 Đường DEF, Hà Nội',
        nationality: 'Việt Nam',
        ethnic: 'Kinh',
        ma_so_thue: '0123456788',
        ngay_vao_lam: '2015-06-01',
        tongiao: 'Không',
        phongban: 'Phòng Kinh Doanh',
        ngayvaodonvi: '2015-06-01',
        vitrichucdanh: 'Nhân viên bán hàng',
        ngayKiHdld: '2015-12-31',
      },
      {
        employee_id: 3,
        employee_name: 'Đỗ Khương Duy',
        employee_code: '2411302',
        birthday: '1988-04-10',
        gender: 1,
        cccd_number: '345678901234',
        cccd_ngaycap: '2012-06-20',
        cccd_noicap: 'Hà Nội',
        phone: '03564135958',
        marriage_status: 1,
        noi_sinh: 'Hà Nội',
        que_quan: 'Hà Nội',
        dia_chi: '789 Đường GHI, Hà Nội',
        nationality: 'Việt Nam',
        ethnic: 'Kinh',
        ma_so_thue: '0123456787',
        ngay_vao_lam: '2012-07-01',
        tongiao: 'Không',
        phongban: 'Phòng Kinh Doanh',
        ngayvaodonvi: '2012-07-01',
        vitrichucdanh: 'Nhân viên kinh doanh',
        ngayKiHdld: '2012-12-31',
      },
      {
        employee_id: 4,
        employee_name: 'Lê Văn Hiếu',
        employee_code: '2010324',
        birthday: '1992-01-25',
        gender: 1,
        cccd_number: '456789012345',
        cccd_ngaycap: '2016-04-15',
        cccd_noicap: 'Hà Nội',
        phone: '03564135959',
        marriage_status: 0,
        noi_sinh: 'Hà Nội',
        que_quan: 'Hà Nội',
        dia_chi: '321 Đường JKL, Hà Nội',
        nationality: 'Việt Nam',
        ethnic: 'Kinh',
        ma_so_thue: '0123456786',
        ngay_vao_lam: '2016-05-01',
        tongiao: 'Không',
        phongban: 'Phòng Kinh Doanh',
        ngayvaodonvi: '2016-05-01',
        vitrichucdanh: 'Nhân viên bán hàng',
        ngayKiHdld: '2016-12-31',
      },
      {
        employee_id: 5,
        employee_name: 'Đặng Đình Hiếu',
        employee_code: '1711022',
        birthday: '1991-03-30',
        gender: 1,
        cccd_number: '567890123456',
        cccd_ngaycap: '2013-08-20',
        cccd_noicap: 'Hà Nội',
        phone: '03564135960',
        marriage_status: 1,
        noi_sinh: 'Hà Nội',
        que_quan: 'Hà Nội',
        dia_chi: '654 Đường MNO, Hà Nội',
        nationality: 'Việt Nam',
        ethnic: 'Kinh',
        ma_so_thue: '0123456785',
        ngay_vao_lam: '2013-09-01',
        tongiao: 'Không',
        phongban: 'Phòng Kinh Doanh',
        ngayvaodonvi: '2013-09-01',
        vitrichucdanh: 'Nhân viên kinh doanh',
        ngayKiHdld: '2013-12-31',
      },
      {
        employee_id: 6,
        employee_name: 'Đinh Đức Giang',
        employee_code: '2304267',
        birthday: '1993-11-15',
        gender: 0,
        cccd_number: '678901234567',
        cccd_ngaycap: '2017-12-01',
        cccd_noicap: 'Hà Nội',
        phone: '03564135961',
        marriage_status: 0,
        noi_sinh: 'Hà Nội',
        que_quan: 'Hà Nội',
        dia_chi: '987 Đường PQR, Hà Nội',
        nationality: 'Việt Nam',
        ethnic: 'Kinh',
        ma_so_thue: '0123456784',
        ngay_vao_lam: '2017-12-15',
        tongiao: 'Không',
        phongban: 'Phòng Kinh Doanh',
        ngayvaodonvi: '2017-12-15',
        vitrichucdanh: 'Nhân viên bán hàng',
        ngayKiHdld: '2017-12-31',
      },
      {
        employee_id: 7,
        employee_name: 'Nguyễn Thế Hòa',
        employee_code: '1611036',
        birthday: '1987-08-22',
        gender: 1,
        cccd_number: '789012345678',
        cccd_ngaycap: '2011-09-10',
        cccd_noicap: 'Hà Nội',
        phone: '03564135962',
        marriage_status: 1,
        noi_sinh: 'Hà Nội',
        que_quan: 'Hà Nội',
        dia_chi: '321 Đường STU, Hà Nội',
        nationality: 'Việt Nam',
        ethnic: 'Kinh',
        ma_so_thue: '0123456783',
        ngay_vao_lam: '2011-10-01',
        tongiao: 'Không',
        phongban: 'Phòng Kinh Doanh',
        ngayvaodonvi: '2011-10-01',
        vitrichucdanh: 'Nhân viên kinh doanh',
        ngayKiHdld: '2011-12-31',
      },
      {
        employee_id: 8,
        employee_name: 'Nguyễn Bá Hùng',
        employee_code: '1405140',
        birthday: '1995-09-30',
        gender: 1,
        cccd_number: '890123456789',
        cccd_ngaycap: '2018-02-14',
        cccd_noicap: 'Hà Nội',
        phone: '03564135963',
        marriage_status: 0,
        noi_sinh: 'Hà Nội',
        que_quan: 'Hà Nội',
        dia_chi: '654 Đường VWX, Hà Nội',
        nationality: 'Việt Nam',
        ethnic: 'Kinh',
        ma_so_thue: '0123456782',
        ngay_vao_lam: '2018-03-01',
        tongiao: 'Không',
        phongban: 'Phòng Kinh Doanh',
        ngayvaodonvi: '2018-03-01',
        vitrichucdanh: 'Nhân viên bán hàng',
        ngayKiHdld: '2018-12-31',
      },
      {
        employee_id: 9,
        employee_name: 'Nguyễn Tuấn Hùng',
        employee_code: '1810141',
        birthday: '1994-10-12',
        gender: 1,
        cccd_number: '901234567890',
        cccd_ngaycap: '2019-03-25',
        cccd_noicap: 'Hà Nội',
        phone: '03564135964',
        marriage_status: 0,
        noi_sinh: 'Hà Nội',
        que_quan: 'Hà Nội',
        dia_chi: '456 Đường YZ, Hà Nội',
        nationality: 'Việt Nam',
        ethnic: 'Kinh',
        ma_so_thue: '0123456781',
        ngay_vao_lam: '2019-04-01',
        tongiao: 'Không',
        phongban: 'Phòng Kinh Doanh',
        ngayvaodonvi: '2019-04-01',
        vitrichucdanh: 'Nhân viên bán hàng',
        ngayKiHdld: '2019-12-31',
      },
      {
        employee_id: 10,
        employee_name: 'Lê Thị Quỳnh Trang',
        employee_code: '1904602',
        birthday: '1996-12-05',
        gender: 0,
        cccd_number: '012345678901',
        cccd_ngaycap: '2020-01-10',
        cccd_noicap: 'Hà Nội',
        phone: '03564135965',
        marriage_status: 0,
        noi_sinh: 'Hà Nội',
        que_quan: 'Hà Nội',
        dia_chi: '789 Đường ABCD, Hà Nội',
        nationality: 'Việt Nam',
        ethnic: 'Kinh',
        ma_so_thue: '0123456780',
        ngay_vao_lam: '2020-01-15',
        tongiao: 'Không',
        phongban: 'Phòng Kinh Doanh',
        ngayvaodonvi: '2020-01-15',
        vitrichucdanh: 'Nhân viên bán hàng',
        ngayKiHdld: '2020-12-31',
      },
      {
        employee_id: 11,
        employee_name: 'Đỗ Duy Thái',
        employee_code: '1904622',
        birthday: '1995-11-20',
        gender: 1,
        cccd_number: '123456789013',
        cccd_ngaycap: '2018-05-15',
        cccd_noicap: 'Hà Nội',
        phone: '03564135966',
        marriage_status: 1,
        noi_sinh: 'Hà Nội',
        que_quan: 'Hà Nội',
        dia_chi: '567 Đường EFGH, Hà Nội',
        nationality: 'Việt Nam',
        ethnic: 'Kinh',
        ma_so_thue: '0123456789',
        ngay_vao_lam: '2018-06-01',
        tongiao: 'Không',
        phongban: 'Phòng Kinh Doanh',
        ngayvaodonvi: '2018-06-01',
        vitrichucdanh: 'Nhân viên bán hàng',
        ngayKiHdld: '2018-12-31',
      },
      {
        employee_id: 12,
        employee_name: 'Nguyễn Thị Phương Hạnh',
        employee_code: '1904623',
        birthday: '1989-02-28',
        gender: 0,
        cccd_number: '234567890124',
        cccd_ngaycap: '2016-07-01',
        cccd_noicap: 'Hà Nội',
        phone: '03564135967',
        marriage_status: 1,
        noi_sinh: 'Hà Nội',
        que_quan: 'Hà Nội',
        dia_chi: '321 Đường JKLM, Hà Nội',
        nationality: 'Việt Nam',
        ethnic: 'Kinh',
        ma_so_thue: '0123456788',
        ngay_vao_lam: '2016-08-01',
        tongiao: 'Không',
        phongban: 'Phòng Kinh Doanh',
        ngayvaodonvi: '2016-08-01',
        vitrichucdanh: 'Nhân viên bán hàng',
        ngayKiHdld: '2016-12-31',
      },
      {
        employee_id: 13,
        employee_name: 'Nguyễn Ngọc Đãi',
        employee_code: '1904624',
        birthday: '1994-05-10',
        gender: 0,
        cccd_number: '345678901235',
        cccd_ngaycap: '2017-09-20',
        cccd_noicap: 'Hà Nội',
        phone: '03564135968',
        marriage_status: 0,
        noi_sinh: 'Hà Nội',
        que_quan: 'Hà Nội',
        dia_chi: '654 Đường NOPQ, Hà Nội',
        nationality: 'Việt Nam',
        ethnic: 'Kinh',
        ma_so_thue: '0123456787',
        ngay_vao_lam: '2017-10-01',
        tongiao: 'Không',
        phongban: 'Phòng Kinh Doanh',
        ngayvaodonvi: '2017-10-01',
        vitrichucdanh: 'Nhân viên bán hàng',
        ngayKiHdld: '2017-12-31',
      },
    ];
  }

  ngOnInit(): void {
    this.onInitDept();
    this.columns = COLUMN_INIT_DS_NHANSU;

    // this.onSelectColumns();
  }

  onInitDept() {
    // this.http
    //   .get(DanhMucURL.getAllDepartment(this.donviSelected?.organizationId))
    //   .pipe(takeUntil(this._unsubscribeAll))
    //   .subscribe((res: any) => {
    //     if (res.state) {
    //       this.listDept = res.data;
    //       this.onChangeFilterState();
    //     } else {
    //       this.messageService.showErrorMessage('Thông báo', res.message);
    //     }
    //   });
  }

  fetchListNhansu() {
    let body = {
      idDeptList: this.selectedDeptNodes.map((item) => item.key).slice(0.2),
      orgList: null,
      status: !this.status,
      donviId: this.donviSelected?.organizationId,
    };
    // this.http
    //   .post(llnsURL.getDsNhanSu(body)
    //   .pipe(takeUntil(this._unsubscribeAll))
    //   .subscribe((res: any) => {
    //     if (res.state) {
    //       this.listNhansu = res.data;
    //       this.listNhansu.forEach((item) => {
    //         item.ten = item.tenkhaisinh.trim().split(' ').slice(-1).join(' ');
    //         item.isNghiviec = this.status;
    //       });
    //     } else {
    //       this.messageService.showErrorMessage('Thông báo', res.message);
    //     }
    //   });
  }

  onChangeFilterState() {
    // donviSelected is root dept tree

    let rootDept = {
      key: this.donviSelected?.organizationId,
      label: this.donviSelected?.orgCode + ' - ' + this.donviSelected?.orgName,
      data: null,
      styleClass: 'font-bold',
      expanded: true,
      children: [],
    };
    this.dataTree = [rootDept];
    this.selectedDeptNodes = [rootDept];

    let data = this.listDept;
    rootDept.children = data
      // this.dataTree = data
      .filter(
        (item: { id: any; parentId: null }) =>
          item.parentId == null || item.parentId == item.id
      )
      .map((e: { id: any; name: any; shortName: any; active: Boolean }) => ({
        key: e.id,
        label: e.shortName + ' - ' + e.name,
        data: e,
        styleClass: 'font-bold',
        expanded: true,
        children: [],
      }));

    this.selectedDeptNodes = this.selectedDeptNodes.concat(
      data.map((e: { id: any; name: any; active: Boolean }) => ({
        key: e.id,
        label: e.name,
        data: e,
        styleClass: 'font-bold',
        expanded: true,
      }))
    );
    rootDept.children.forEach((element) => {
      // this.dataTree.forEach((element) => {
      this.findChildren(data, element);
    });
    this.fetchListNhansu();
  }
  findChildren(listDept: any[], element: TreeNode<any>) {
    element.children = listDept
      .filter(
        (item: { id: any; parentId: any }) =>
          item.parentId &&
          item.parentId != item.id &&
          item.parentId === element.data.id
      )
      .map((e: { id: any; name: any; shortName: any; active: Boolean }) => ({
        key: e.id,
        label: e.shortName + ' - ' + e.name,
        data: e,
        styleClass: 'font-normal ',
        children: [],
      }));

    if (element.children && element.children.length > 0) {
      element.styleClass =
        'font-semibold ' +
        (element.data.active ? 'text-blue-500 ' : 'text-red-500');
    } else {
      element.styleClass =
        'font-normal ' + (element.data.active ? 'text-black ' : 'text-red-500');
    }
    element.children.forEach((child: any) => {
      this.findChildren(listDept, child);
    });
  }

  onSelectOrg() {
    const dialogRef = this._matDialog.open(FormdonviTreeComponent, {
      disableClose: false,
      // width: '900px',
      // height: '80vh',
      data: {
        donvis: this.donvis,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.donviSelected = result.data;
        this.onInitDept();
      }
    });
    return;
  }
  onSelectColumns() {
    const dialogRef = this._matDialog.open(
      DialogDsNhansuColumnSelectComponent,
      {
        disableClose: false,
        data: {
          donvis: this.donvis,
        },
      }
    );

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // this.onInitDept();
        this.columns = [...this.columnsDefault, ...result];
      }
    });
    return;
  }

  onRefreshList() {
    // this.http
    //   .get(DanhMucURL.getAllDepartment(this.donviSelected?.organizationId))
    //   .pipe(takeUntil(this._unsubscribeAll))
    //   .subscribe((res: any) => {
    //     if (res.state) {
    //       this.listDept = res.data;
    //       this.onChangeFilterState();
    //       this.messageService.showSuccessMessage(
    //         'Thông báo',
    //         'Thực hiện làm mới thành công!'
    //       );
    //     } else {
    //       this.messageService.showErrorMessage('Thông báo', res.message);
    //     }
    //   });
  }

  onExportExcel() {
    let data = this.table.filteredValue || this.table.value;
    let titleReport = 'Danh sách nhân sự';
    let columName = [];
    let fieldColumns = [];
    let colWidthList = [];
    this.columns.forEach((item: DsNhansuColumnModel) => {
      let name = item.columnName;
      let field = item.field;
      let width = item.width || 140;

      columName.push(name);
      fieldColumns.push(field);
      colWidthList.push(width);
    });

    let dataBody = data.map((item) =>
      fieldColumns.map((column) => String(item[column] || ''))
    );
    // Hiển thị kết quả
    let body = { columName, dataBody, titleReport, colWidthList };
  }

  downloadMauSYLL(type, nhansu) {
    let fileBase64;
    switch (type) {
      case 1: {
        this.http
          .get(HSNhansuURL.xuatSyllMauEvn(nhansu.nsID, false))
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe((res: any) => {
            if (!res || !res.state) {
              return;
            }
            fileBase64 = res.data;
            const blob = AppUltil.base64ToBlob(fileBase64);
            FileSaver.saveAs(blob, 'SYLLEVN.docx');
          });
        return;
      }
      case 2: {
        this.http
          .get(HSNhansuURL.xuatSyllMau02c(nhansu.nsID, false))
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe((res: any) => {
            if (!res || !res.state) {
              return;
            }
            fileBase64 = res.data;
            const blob = AppUltil.base64ToBlob(fileBase64);
            FileSaver.saveAs(blob, 'SYLLMau02c.docx');
          });
        return;
      }
      case 3: {
        this.http
          .get(HSNhansuURL.xuatSyllMau02cTCTW(nhansu.nsID, false))
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe((res: any) => {
            if (!res || !res.state) {
              return;
            }
            fileBase64 = res.data;
            const blob = AppUltil.base64ToBlob(fileBase64);
            FileSaver.saveAs(blob, 'SYLLMau02cTCTW.docx');
          });
        return;
      }
    }
  }

  viewFileSYLL(type, nhansu) {
    // Show File
    let fileBase64;
    switch (type) {
      case 1: {
        this.http
          .get(HSNhansuURL.xuatSyllMauEvn(nhansu.nsID, true))
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe((res: any) => {
            if (!res || !res.state) {
              return;
            }
            fileBase64 = res.data;
            const dialogRef = this._matDialog.open(FileviewComponent, {
              width: '1000px',
              disableClose: true,
              data: {
                fileId: 'SYLLEVN.pdf',
                fileContent: fileBase64,
                fileExten: 'PDF',
                fileName: 'SYLLEVN.pdf',
              },
            });
            dialogRef.afterClosed().subscribe((result) => {
              if (result) {
              }
            });
          });
        return;
      }
      case 2: {
        this.http
          .get(HSNhansuURL.xuatSyllMau02c(nhansu.nsID, true))
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe((res: any) => {
            if (!res || !res.state) {
              return;
            }
            fileBase64 = res.data;
            const dialogRef = this._matDialog.open(FileviewComponent, {
              width: '1000px',
              disableClose: true,
              data: {
                fileId: 'SYLLMau02c.pdf',
                fileContent: fileBase64,
                fileExten: 'PDF',
                fileName: 'SYLLMau02c.pdf',
              },
            });
            dialogRef.afterClosed().subscribe((result) => {
              if (result) {
              }
            });
          });
        return;
      }
      case 3: {
        this.http
          .get(HSNhansuURL.xuatSyllMau02cTCTW(nhansu.nsID, true))
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe((res: any) => {
            if (!res || !res.state) {
              return;
            }
            fileBase64 = res.data;
            const dialogRef = this._matDialog.open(FileviewComponent, {
              width: '1000px',
              disableClose: true,
              data: {
                fileId: 'SYLLMau02cTCTW.pdf',
                fileContent: fileBase64,
                fileExten: 'PDF',
                fileName: 'SYLLMau02cTCTW.pdf',
              },
            });
            dialogRef.afterClosed().subscribe((result) => {
              if (result) {
              }
            });
          });
        return;
      }
    }
  }

  onNavigatorHsns(ns) {
    console.log(ns);

    this._router.navigate(['../hosonhansu'], {
      relativeTo: this._activatedroute,
      state: ns,
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
