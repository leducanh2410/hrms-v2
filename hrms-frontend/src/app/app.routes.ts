import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { SignInComponent } from './modules/auth/sign-in/sign-in.component';
import { DsnhansuComponent } from './modules/employee/dsnhansu/dsnhansu.component';
export const routes: Routes = [
  {
    path: '', // Đường dẫn gốc
    component: LayoutComponent, // Sử dụng LayoutComponent làm bố cục
    children: [
      //   { path: '', component: HomeComponent }, // Trang chủ
      //   { path: 'about', component: AboutComponent }, // Trang "Giới thiệu"
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
  {
    path: 'employee', // Đường dẫn gốc
    component: DsnhansuComponent, // Sử dụng LayoutComponent làm bố cục
    children: [
      //   { path: '', component: HomeComponent }, // Trang chủ
      //   { path: 'about', component: AboutComponent }, // Trang "Giới thiệu"
    ],
  },
];
