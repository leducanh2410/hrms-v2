import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TreeModule } from 'primeng/tree';
import { TabViewModule } from 'primeng/tabview';
import { MatTabsModule } from '@angular/material/tabs';
import { MatIconModule } from '@angular/material/icon';
import { TableModule } from 'primeng/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDrawer, MatDrawerContainer } from '@angular/material/sidenav';

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
export class DepartmentComponent {
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

  nodes: TreeNode[] = [
    {
      label: '1.10.2.43 - Thaco Auto Giải Phóng - HN (Du lịch) (0/149)',
      icon: 'pi pi-users', // Icon cho menu cha
      children: [
        {
          label: '1.10.2.43.1 - Ban Lãnh đạo Công ty',
          icon: 'pi pi-users', // Icon cho menu con (có thể thay đổi nếu cần)
          children: [
            { label: '1.10.2.43.1.1 - Nghiệp vụ Công ty', icon: 'pi pi-user' },
          ],
        },
        {
          label: '1.10.2.43.2 - Kế hoạch (1/1)',
          icon: 'pi pi-users', // Icon cho menu con (có thể thay đổi nếu cần)
          children: [
            { label: '1.10.2.43.2.1 - Nhân sự (2/2)', icon: 'pi pi-user' },
            { label: '1.10.2.43.2.2 - Kế toán (0/1)', icon: 'pi pi-user' },
            { label: '1.10.2.43.2.3 - Marketing (0/1)', icon: 'pi pi-user' },
          ],
        },
        {
          label: '1.10.2.43.3 - Hành chính (0/2)',
          icon: 'pi pi-users', // Icon cho menu con (có thể thay đổi nếu cần)
          children: [
            {
              label: '1.10.2.43.3.1 - Quản lý Bất động sản (0/1)',
              icon: 'pi pi-user',
            },
            {
              label: '1.10.2.43.3.2 - Quản lý Xây dựng Cơ bản & Tài sản (0/1)',
              icon: 'pi pi-user',
            },
          ],
        },
      ],
    },
  ];

  onNodeSelect(event: any) {
    this.selectedNode = event.node;
    console.log('Selected Node:', this.selectedNode);
  }
  // Xác định node có children
  hasChild = (_: number, node: TreeNode) =>
    !!node.children && node.children.length > 0;

  onTabChange(index: number): void {
    this.selectedTabIndex = index;
  }
}
