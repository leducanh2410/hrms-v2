import { Component } from '@angular/core';
// import { HeaderComponent } from "./header/header.component";
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule, Routes }   from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import { Router } from '@angular/router';
import {MatTableModule} from '@angular/material/table';
// import { SearchComponent } from "./common/search/search.component";
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
@Component({
  selector: 'app-layout',
  imports: [CommonModule, MatTooltipModule, MatIconModule,
    MatListModule, MatToolbarModule, RouterModule, MatExpansionModule,
    MatMenuModule, MatButtonModule, MatSidenavModule, MatTableModule,
      MatFormFieldModule, MatInputModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  constructor(
    private _router: Router,
) {
}
  signOut(): void {
    this._router.navigate(['/sign-in']);
}
displayedColumns: string[] = ['column1', 'column2'];
  thongKe = [
    { column1: '200', column2: 'Tổng số nhân viên', icon: 'group' },
    { column1: '170', column2: 'Nhân viên đang làm việc', icon: 'group' },
    { column1: '30', column2: 'Nhân viên xin nghỉ việc', icon: 'group' }
  ];
  thongTinCaNhan = [
    { column1: 'Tên nhân viên', column2: 'Lê Đức Anh' },
    { column1: 'Phòng ban', column2: 'Nhân sự' },
    { column1: 'Tên đăng nhập', column2: 'leducanh@thaco.com.vn' },
    { column1: 'Chức danh', column2: 'Chuyên viên quản lý nhân sự'}
  ];
}
