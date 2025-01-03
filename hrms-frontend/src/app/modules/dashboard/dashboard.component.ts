import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-dashboard',
  imports: [MatTableModule, MatIconModule, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
  displayedColumns: string[] = ['column1', 'column2'];
  thongKe = [
    { column1: '200', column2: 'Tổng số nhân viên', icon: 'group' },
    { column1: '170', column2: 'Nhân viên đang làm việc', icon: 'group' },
    { column1: '30', column2: 'Nhân viên xin nghỉ việc', icon: 'group' },
  ];
  thongTinCaNhan = [
    { column1: 'Tên nhân viên', column2: 'Lê Đức Anh' },
    { column1: 'Phòng ban', column2: 'Nhân sự' },
    { column1: 'Tên đăng nhập', column2: 'leducanh@thaco.com.vn' },
    { column1: 'Chức danh', column2: 'Chuyên viên quản lý nhân sự' },
  ];
}
