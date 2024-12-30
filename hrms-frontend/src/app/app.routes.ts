import { Routes } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { SignInComponent } from './modules/auth/sign-in/sign-in.component';
import { SidenavComponent } from './layout/sidenav/sidenav.component';
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
    path: 'sidenav', // Đường dẫn gốc
    component: SidenavComponent, // Sử dụng LayoutComponent làm bố cục
    children: [
    //   { path: '', component: HomeComponent }, // Trang chủ
    //   { path: 'about', component: AboutComponent }, // Trang "Giới thiệu"
    ],
}
];
