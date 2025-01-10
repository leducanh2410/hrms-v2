import { Component, OnDestroy, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { ShareData } from '../../../../shared/shareservice.service';
import { NHAN_SU } from '../../../../shared/appkeymessages';
import { Subject, takeUntil } from 'rxjs';
import { MatDialog } from '@angular/material/dialog';
import { XacnhanpopupComponent } from '../pages/xacnhanpopup/xacnhanpopup.component';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-listmenu',
  templateUrl: './listmenu.component.html',
  styleUrls: ['./listmenu.component.scss'],
  imports: [CommonModule],
})
export class ListmenuComponent implements OnInit, OnDestroy {
  items: MenuItem[] | undefined;
  menu: string = 'canhan';
  is_change: boolean = false;

  private _unsubscribeAll: Subject<any> = new Subject<any>();
  constructor(
    private shareData: ShareData,
    private subData: ShareData,
    private _matDialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.items = [
      {
        id: 'canhan',
        label: 'Thông tin cá nhân',
        styleClass: 'border-b',
        disabled: true,
        command: async () => {
          this.shareData.sendMessage(NHAN_SU.PAGE, 'canhan');
          this.menu = 'canhan';
        },
      },
      {
        id: 'thannhan',
        label: 'Thông tin thân nhân',
        styleClass: 'border-b',
        command: async () => {
          console.log(this.menu);

          let is_close: boolean;
          if (this.menu === 'canhan') {
            is_close = await this.checkUpdatePage();
            if (is_close != null && is_close) {
              this.shareData.sendMessage(NHAN_SU.PAGE, 'thannhan');
              this.menu = 'thannhan';
            }
          } else {
            this.shareData.sendMessage(NHAN_SU.PAGE, 'thannhan');
            this.menu = 'thannhan';
          }
        },
      },
      {
        id: 'qtlamviec',
        label: 'Quá trình làm việc',
        styleClass: 'border-b',
        command: async () => {
          let is_close: boolean;
          if (this.menu === 'canhan') {
            is_close = await this.checkUpdatePage();
            if (is_close != null && is_close) {
              this.shareData.sendMessage(NHAN_SU.PAGE, 'qtlamviec');
              // this.menu = 'qtlamviec'
            }
          } else {
            this.shareData.sendMessage(NHAN_SU.PAGE, 'qtlamviec');
            // this.menu = 'qtlamviec'
          }
        },
      },
      {
        id: 'qtrluong',
        label: 'Lương - phụ cấp',
        styleClass: 'border-b',
        command: async () => {
          let is_close: boolean;
          if (this.menu === 'canhan') {
            is_close = await this.checkUpdatePage();
            if (is_close != null && is_close) {
              this.shareData.sendMessage(NHAN_SU.PAGE, 'qtrluong');
              // this.menu = 'qtrluong'
            }
          } else {
            this.shareData.sendMessage(NHAN_SU.PAGE, 'qtrluong');
            // this.menu = 'qtrluong'
          }
        },
      },

      {
        id: 'khenthuongkyluat',
        label: 'Đánh giá',
        styleClass: 'border-b',
        command: async () => {
          let is_close: boolean;
          if (this.menu === 'canhan') {
            is_close = await this.checkUpdatePage();
            if (is_close != null && is_close) {
              this.shareData.sendMessage(NHAN_SU.PAGE, 'khenthuongkyluat');
              // this.menu = 'khenthuongkyluat'
            }
          } else {
            this.shareData.sendMessage(NHAN_SU.PAGE, 'khenthuongkyluat');
            // this.menu = 'khenthuongkyluat'
          }
        },
      },
    ];
    this.subData
      .getMessage(NHAN_SU.IS_EDIT)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(async (is_change: any) => {
        this.is_change = is_change;
      });
    this.subData
      .getMessage(NHAN_SU.PAGE)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(async (page: any) => {
        this.menu = page;
      });
  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  checkUpdatePage(): Promise<boolean> {
    return new Promise((resolve) => {
      if (this.menu == 'canhan' && this.is_change) {
        const dialogRef = this._matDialog.open(XacnhanpopupComponent, {
          disableClose: true,
          data: {
            message:
              'Thông tin đang cập nhật chưa được Lưu vào hệ thống! Anh/chị có muốn Lưu lại thông tin này?',
          },
        });

        dialogRef.afterClosed().subscribe((result) => {
          if (result != null) {
            if (result == 0) {
              this.subData.sendMessage(NHAN_SU.UPDATE_TTCN, true);
              this.is_change = false;
              resolve(true);
            } else if (result == 1) {
              this.subData.sendMessage(NHAN_SU.UPDATE_TTCN, false);
              this.is_change = false;
              resolve(true);
            } else {
              resolve(false);
            }
          }
        });
      } else {
        resolve(true);
      }
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
