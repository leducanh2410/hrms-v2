import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NHAN_SU } from '../../../../shared/appkeymessages';
import { ShareData } from '../../../../shared/shareservice.service';
import { Subject, takeUntil } from 'rxjs';
import { ThongtincanhanComponent } from './thongtincanhan/thongtincanhan.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FileUploadModule } from 'primeng/fileupload';
import { MatSelectModule } from '@angular/material/select';
import { ThongtinthannhanComponent } from './thongtinthannhan/thongtinthannhan.component';
import { KhenthuongKyluatComponent } from './khenthuongkyluat/khenthuongkyluat.component';
import { QtrinhlamviecComponent } from './thongtincanhan/qtrinhlamviec/qtrinhlamviec.component';
import { QtrluongComponent } from './qtrluong/qtrluong.component';
import { SxKinhdoanhComponent } from './ngangnghesxkd/sxkinhdoanh.component';
import { HosocanhanComponent } from './hosocanhan/hosocanhan.component';
import { QtrlamviecComponent } from './qtrlamviec/qtrlamviec.component';
import { THONG_TIN_CHUNG } from '../model/thongtinchung';
@Component({
  selector: 'app-pages',
  templateUrl: './pages.component.html',
  styleUrls: ['./pages.component.scss'],
  imports: [
    ThongtincanhanComponent,
    ThongtinthannhanComponent,
    KhenthuongKyluatComponent,
    QtrluongComponent,
    SxKinhdoanhComponent,
    HosocanhanComponent,
    QtrlamviecComponent,
    CommonModule,
  ],
})
export class PagesComponent implements OnInit, OnDestroy {
  @ViewChild('thongtincanhan') ttcanhan: ThongtincanhanComponent;
  page: any = 'canhan';
  nsInfo: THONG_TIN_CHUNG;

  private _unsubscribeAll: Subject<any> = new Subject<any>();
  constructor(private subData: ShareData) {}

  ngOnInit(): void {
    // Xử lý kiểm tra update page khi chuyển tab
    this.subData
      .getMessage(NHAN_SU.PAGE)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(async (page: any) => {
        this.page = page;
      });
    this.subData
      .getMessage(NHAN_SU.VIEW_TTIN)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(async (nsInfo: any) => {
        this.nsInfo = nsInfo;
      });
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
