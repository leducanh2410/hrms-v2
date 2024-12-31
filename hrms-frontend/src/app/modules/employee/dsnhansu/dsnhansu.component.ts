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
import { HeaderComponent } from '../../../layout/header/header.component';
import { FormdonviTreeComponent } from '../../../../assets/lib/formdonvi-tree/src/public-api';



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
    HeaderComponent
  ],
  providers: []
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
  public listNhansu: any[] = [];
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
    this.http
      .post(llnsURL.getDsNhanSu(), body)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (res.state) {
          this.listNhansu = res.data;
          this.listNhansu.forEach((item) => {
            item.ten = item.tenkhaisinh.trim().split(' ').slice(-1).join(' ');
            item.isNghiviec = this.status;
          });
        } else {
          this.messageService.showErrorMessage('Thông báo', res.message);
        }
      });
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

    this._router.navigate(['../capnhathoso'], {
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
