import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeModule } from 'primeng/tree';
import { TabViewModule } from 'primeng/tabview';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { TableModule } from 'primeng/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDrawer, MatDrawerContainer } from '@angular/material/sidenav';
import { CommonApiService } from '../../services/commonHttp';
import { ShareData } from '../../shared/shareservice.service';
import { Store } from '@ngrx/store';
import { AppState } from '../../ngxstore/state/app.state';
import { MessageService } from '../../shared/message.services';
import { MessageBox } from '../../fuse/components/message-box/message-box.provider';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';
import { llnsURL } from '../../services/employe/llnsURL';
import { Subject, takeUntil } from 'rxjs';
import { MasterDataURL } from '../../services/employe/masterDataURL';
import { PhongBan } from '../employee/hosonhansu/model/phongban';

interface TreeNode {
  label: string;
  data?: any;
  icon?: string; // Thêm thuộc tính icon
  children?: TreeNode[];
}

@Component({
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrl: './department.component.css',
  imports: [
    TreeModule,
    CommonModule,
    MatTabsModule,
    MatIconModule,
    TableModule,
    MatCheckboxModule,
    MatDrawerContainer,
    MatDrawer,
  ],
})
export class DepartmentComponent implements OnInit {
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  selectedTabIndex: number = 0;
  selectedNode: TreeNode | null = null;
  nsPhongBanList: any[] = [
    {
      tenNV: 'Đỗ Trung Kiên',
      maNV: '1235623',
      ngayBatDau: new Date('2023-01-01'),
      phongBan: 'Phòng Kinh doanh',
      cap1: 'Trưởng phòng',
      cap2: 'Quản lý',
      chucDanh: 'Giám đốc',
      ngayRaLam: new Date('2023-01-02'),
      cccd: '123456789',
    },
    {
      tenNV: 'Nguyễn Diệu Linh',
      maNV: '6456248',
      ngayBatDau: new Date('2023-02-01'),
      phongBan: 'Phòng Marketing',
      cap1: 'Nhân viên',
      cap2: 'Nhân viên',
      chucDanh: 'Chuyên viên',
      ngayRaLam: new Date('2023-02-03'),
      cccd: '987654321',
    },
  ];

  dsPhongBan: TreeNode[] = [];

  phongBanList: any[] = [];

  filteredNhanVien: any[] = [];

  constructor(
    private shareData: ShareData,
    private http: CommonApiService,
    private store: Store<AppState>,

    private messageService: MessageService,
    private mb: MessageBox,
    private _matDialog: MatDialog,
    private _router: Router,
    private _activatedroute: ActivatedRoute
  ) {}

  onNodeSelect(event: any) {
    this.selectedNode = event.node;
    this.loadNsByOfficeId(event.node?.data);
  }

  ngOnInit(): void {
    this.loadDeparments();
  }

  buildDepartmentHierarchy(departments, parentId = null) {
    return departments
      .filter((department) => department?.departmentAbove === parentId)
      .map((department) => ({
        label: department?.departmentName,
        icon: 'pi pi-users',
        data: department?.id,
        children: this.buildDepartmentHierarchy(departments, department.id),
      }));
  }

  loadNsByOfficeId(officeID) {
    this.http
      .get(llnsURL.getNSByOfficeId(officeID))
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (res.state) {
          this.nsPhongBanList = res.data;
          this.filteredNhanVien = [...res.data];
          this.onTabChange(0)
        } else {
          this.messageService.showErrorMessage('Thông báo', res.message);
        }
      });
  }

  loadDeparments() {
    this.http
      .get(MasterDataURL.getAllDepartments())
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (res.state) {
          this.phongBanList = res.data;
          this.dsPhongBan = this.buildDepartmentHierarchy(res.data);
          this.loadNsByOfficeId(this.dsPhongBan[0]?.data);
        } else {
          this.messageService.showErrorMessage('Thông báo', res.message);
        }
      });
  }

  // Xác định node có children
  hasChild = (_: number, node: TreeNode) =>
    !!node.children && node.children.length > 0;

  onTabChange(index: number): void {
    this.selectedTabIndex = index;

    if (index == 0) {
      this.filteredNhanVien = this.nsPhongBanList.filter((e) => {
        return !e?.deleteFg;
      });
    }

    if (index == 1) {
      this.filteredNhanVien = this.nsPhongBanList.filter((e) => {
        return e?.deleteFg;
      });
    }
  }

  onNavigatorHsns(ns) {
    this._router.navigate(['../hosonhansu'], {
      relativeTo: this._activatedroute,
      state: ns,
    });
  }
}
