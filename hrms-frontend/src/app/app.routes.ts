import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';

export const routes: Routes = [
    {
        path: '', // Đường dẫn gốc
        component: LayoutComponent, // Sử dụng LayoutComponent làm bố cục
        children: [
        //   { path: '', component: HomeComponent }, // Trang chủ
        //   { path: 'about', component: AboutComponent }, // Trang "Giới thiệu"
        ],
      }
];
