import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { SignInComponent } from './modules/auth/sign-in/sign-in.component';
import { DsnhansuComponent } from './modules/employee/dsnhansu/dsnhansu.component';
import { DashboardComponent } from './modules/dashboard/dashboard.component';
import { HosonhansuComponent } from './modules/employee/hosonhansu/hosonhansu.component';
import { MenuComponent } from './modules/employee/hosonhansu/menu/menu.component';
import { HdldComponent } from './modules/hdld/hdld.component';
import { DanhsachhdldComponent } from './modules/hdld/danhsachhdld/danhsachhdld.component';
export const routes: Routes = [
  {
    path: '', // Đường dẫn gốc
    component: LayoutComponent, // Sử dụng LayoutComponent làm bố cục
    children: [
      { path: '', component: DashboardComponent }, // Trang chủ
      {
        path: 'dsachnhansu',
        component: DsnhansuComponent,
        children: [],
      }, // Trang "Giới thiệu"
      {
        path: 'hosonhansu',
        component: HosonhansuComponent,
        children: [
          {
            path: '',
            component: MenuComponent,
          },
        ],
      },
      {
        path: 'hdld',
        component: HdldComponent,
        children: [
          {
            path: '',
            component: DanhsachhdldComponent,
          },
        ],
      }, // Trang chủ
    ],
  },
  {
    path: 'sign-in', // Đường dẫn gốc
    component: SignInComponent, // Sử dụng LayoutComponent làm bố cục
    children: [
      //   { path: '', component: HomeComponent }, // Trang chủ
      //   { path: 'about', component: AboutComponent }, // Trang "Giới thiệu"
    ],
  },
];
