import { Component, Input, OnInit } from '@angular/core';
import { AppState } from '../../../../../../../assets/lib/formnhansu-donvi/src/lib/ngxstore/app.state';
import { Store } from '@ngrx/store';
import { User } from '../../../../../../core/user/user.types';
import { APP_ACTION } from '../../../../../../ngxstore/actions/app.actions';
import { HSNhansuURL } from '../../../../../../services/employe/hosonhansuURL';
import { Subject, takeUntil } from 'rxjs';
import { CommonApiService } from '../../../../../../services/commonHttp';
import { HopdonglaodongUI } from '../../../model/hopdonglaodongUI';
import { KyHdldDialogComponent } from './ky-hdld-dialog/ky-hdld-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MessageBox } from '../../../../../../fuse/components/message-box/message-box.provider';
import { llnsURL } from '../../../../../../services/employe/llnsURL';
import { Buttons } from '../../../../../../fuse/components/message-box/common';
import { QuatrinhLamviecURL } from '../../../../../../services/employe/quatrinhlamviecURL';
import { MessageService } from '../../../../../../shared/message.services';
import { DividerModule } from 'primeng/divider';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-kyhdld',
  templateUrl: './kyhdld.component.html',
  styleUrls: ['./kyhdld.component.scss'],
  imports:[
    DividerModule,
    TableModule,
    CommonModule,
    FormsModule
  ]
})

export class KyhdldComponent implements OnInit {
  @Input('nsInfo') nhansu: any;
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  data: any[] = null;
  public hopdongList: HopdonglaodongUI[] = [];
  public appUserId: any = null;  

  constructor(
    private store: Store<AppState>,    
    private http: CommonApiService,
    private _matDialog: MatDialog,
    private messageService: MessageService,
    private mb: MessageBox
  ) {}

  ngOnInit(): void {
    // this.loadHdldList();        
    // throw new Error('Method not implemented.');
  }

  loadHdldList() {
    if (this.nhansu) {
      // this.http.get(HSNhansuURL.getAllHdld(this.nhansu.nsID))
      //           .pipe(takeUntil(this._unsubscribeAll))
      //           .subscribe((res)=> {    
      //             this.hopdongList = res.data;                  
      //       })
    }
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }

  themHDLD() {
    const dialogRef = this._matDialog.open(KyHdldDialogComponent, {
      width: '800px',
      disableClose: true,
      data: {
        nhansu: this.nhansu,
        addNew: true,
      }
    });
  }

  updateHDLD(hdld) {
    const dialogRef = this._matDialog.open(KyHdldDialogComponent, {
      width: '800px',
      disableClose: true,
      data: {
        nhansu: this.nhansu,
        hopdongSelected: hdld,
        addNew: false,
      }
    });

  }

  deleteHDLD(hdld) {    
    let dialog = this.mb.showDefault(
      'Bạn có chắc chắn muốn muốn xóa thông tin không?',
      Buttons.YesNo
    );

    dialog.dialogResult$.subscribe(async (result) => {      
      if (result) {
        // this.http
        //   .post(QuatrinhLamviecURL.deleteHdld(), hdld)
        //   .pipe(takeUntil(this._unsubscribeAll))
        //   .subscribe((res: any) => {
        //     debugger
        //     if (!res || !res.state) {              
        //       this.messageService.showErrorMessage(
        //         'Hệ thống',
        //         'Xóa thông tin không thành công'
        //       );
        //       return;
        //     }

        //     debugger
        //     this.messageService.showSuccessMessage(
        //       'Hệ thống',
        //       'Xóa thành công'
        //     );

        //     this.loadHdldList();
        //   });
      }
    });
  }
 
}
