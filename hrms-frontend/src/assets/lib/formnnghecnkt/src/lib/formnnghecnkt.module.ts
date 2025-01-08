import { NgModule } from '@angular/core';
import { FormnnghecnktComponent } from './formnnghecnkt.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './auth.interceptor';




@NgModule({
  declarations: [
  ],
  imports: [
    
  ],
  exports: [
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ]
})
export class FormnnghecnktModule { }