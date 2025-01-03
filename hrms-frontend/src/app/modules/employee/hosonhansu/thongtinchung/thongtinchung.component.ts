import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Store } from '@ngrx/store';
import { API } from '../../../../core/config/app.config';
import { User } from '../../../../core/user/user.types';
import { APP_ACTION } from '../../../../ngxstore/actions/app.actions';
import { AppState } from '../../../../ngxstore/state/app.state';
import { CommonApiService } from '../../../../services/commonHttp';
import { HSNhansuURL } from '../../../../services/employe/hosonhansuURL';
import { FormnhansuDonviComponent } from '../../../../../assets/lib/formnhansu-donvi/src/public-api';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { ShareData } from '../../../../shared/shareservice.service';
import { NHAN_SU } from '../../../../shared/appkeymessages';
import { KhoitaohosonsComponent } from './khoitaohoso/khoitaohosons/khoitaohosons.component';
import { MessageService } from '../../../../shared/message.services';
import { Buttons } from '../../../../fuse/components/message-box/common';
import { MessageBox } from '../../../../fuse/components/message-box/message-box.provider';
import { CropimageComponent } from '../../../components/cropimage/cropimage.component';
import { FileviewComponent } from '../../../components/fileview/fileview.component';
import { AppUltil } from '../../../../shared/AppUltil';
import FileSaver from 'file-saver';
import { THONG_TIN_CHUNG } from '../model/thongtinchung';
import { XacnhanpopupComponent } from '../pages/xacnhanpopup/xacnhanpopup.component';
import { CommonModule, Location } from '@angular/common';
import { MatMenuModule } from '@angular/material/menu';
import { FileUploadModule } from 'primeng/fileupload';
import { ImageviewComponent } from '../../../components/imageview/imageview.component';

@Component({
  selector: 'app-thongtinchung',
  templateUrl: './thongtinchung.component.html',
  styleUrls: ['./thongtinchung.component.scss'],
  imports:[
    MatMenuModule,
    CommonModule,
    FileUploadModule,
    ImageviewComponent,
  ]
})
export class ThongtinchungComponent implements OnInit, OnDestroy {
  // Model
  nsInfo: THONG_TIN_CHUNG = new THONG_TIN_CHUNG();
  anhHoso: any;

  isHienthiTtin: boolean = true;
  isHienthiMenu: boolean = true;

  currentPage: any = 'canhan';
  is_change: boolean = false;

  // File
  uploadedFiles: any[] = [];
  _fileForm: any;

  // Current user
  user_info: any;
  user$ = new BehaviorSubject<User>({});
  donvi: any
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  constructor(
    private _matDialog: MatDialog,
    private store: Store<AppState>,
    private http: CommonApiService,
    private shareData: ShareData,
    private messageService: MessageService,
    private mb: MessageBox,
    private subData: ShareData,
    private location: Location
  ) {
    const appUser = this.store.select((state) => state.appUser);
    appUser.subscribe((res: any) => {
      const data = res;
      if (data && data.type === APP_ACTION.USER_INFO) {
        this.user_info = { ...data.payload };
        this.user_info.avatar = `${API.IMG}/${this.user_info.iddonvi}/${this.user_info.idnv}.png`;
        this.user_info.status = 'online';
        this.user$.next(this.user_info);
      }
    });

    // Xử lý navigation từ các tab khác sang, dữ liệu được truyền: state
    const state: any = location.getState();

    if (state && state.nsID) {
        this.http
        .get(HSNhansuURL.getHsNs(state.nsID))
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((res: any) => {
          if (!res || !res.state) return;
          this.nsInfo = res.data;
          this.nsInfo.isNghiviec = state.isNghiviec;

          this.shareData.sendMessage(NHAN_SU.VIEW_TTIN, this.nsInfo);
        });
    }
  }

  ngOnInit(): void {
        this.subData.getMessage(NHAN_SU.PAGE).pipe(takeUntil(this._unsubscribeAll)).subscribe(async (page: any) => {
      this.currentPage = page;
    });
    this.subData.getMessage(NHAN_SU.IS_EDIT).pipe(takeUntil(this._unsubscribeAll)).subscribe(async (is_change: any) => {
      this.is_change = is_change;
    });
    this.subData.getMessage(NHAN_SU.REFRESH_THONGTINCHUNG).pipe(takeUntil(this._unsubscribeAll)).subscribe(async (is_refresh: any) => {
      this.http
        .get(HSNhansuURL.getHsNs(this.nsInfo.nsID))
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((res: any) => {
          if (!res || !res.state) return;
          this.nsInfo = res.data;
          this.shareData.sendMessage(NHAN_SU.VIEW_TTIN, this.nsInfo);
        });
    });

  }

  async onChonNhansu() {
    let is_close = await this.checkUpdatePage();
    if (is_close != null && is_close) {
        // Lấy tên đơn vị
        this.http
        .get(HSNhansuURL.getDsDonviTructhuoc(this.user_info.iddonvi))
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((res: any) => {
            if (!res || !res.state) return;
            this.donvi = res.data[0];
            const dialogRef = this._matDialog.open(FormnhansuDonviComponent, {
              disableClose: true,
              data: {
                apiDonvi: HSNhansuURL.getDsDonviTructhuoc(this.user_info.iddonvi),
                apiNhansu: HSNhansuURL.getDsNsTheodonvi(),
                userDonvi: {
                  organizationId: this.user_info.iddonvi,
                  orgName: this.donvi.orgName,
                  orgCode: this.user_info.madonvi
                },
                hthiSohieu: true
              }
            });

            dialogRef.afterClosed()
              .subscribe((result) => {
                if (result && result.nsID) {
                  this.http
                    .get(HSNhansuURL.getHsNs(result.nsID))
                    .pipe(takeUntil(this._unsubscribeAll))
                    .subscribe((res: any) => {
                      if (!res || !res.state) return;
                      this.nsInfo = res.data;
                      this.shareData.sendMessage(NHAN_SU.VIEW_TTIN, this.nsInfo);
                      this.shareData.sendMessage(NHAN_SU.PAGE, 'canhan');
                    });
                }

              });
        });
    }
  }

  toggle() {
    this.isHienthiTtin = !this.isHienthiTtin
  }

  toggleMenu() {
    this.isHienthiMenu = !this.isHienthiMenu;
    this.shareData.sendMessage(NHAN_SU.TOGGLE_MENU, this.isHienthiMenu);
  }

  async khoitaohoso() {
    let is_close = await this.checkUpdatePage();
    if (is_close != null && is_close) {
      const dialogRef = this._matDialog.open(KhoitaohosonsComponent, {
        width: '900px',
        disableClose: true,
        data: { donvi: this.user_info?.tendonvi, donviKyhdld: this.user_info?.tendonvi, donviId: this.user_info?.iddonvi }
      });
      dialogRef.afterClosed()
        .subscribe((result) => {
          if (result && result.nsID) {
            this.http
              .get(HSNhansuURL.getHsNs(result.nsID))
              .pipe(takeUntil(this._unsubscribeAll))
              .subscribe((res: any) => {
                if (!res || !res.state) return;
                this.nsInfo = res.data;
                this.nsInfo.is_create = true;
                this.shareData.sendMessage(NHAN_SU.VIEW_TTIN, this.nsInfo);
                this.is_change = true
                this.shareData.sendMessage(NHAN_SU.IS_EDIT, this.is_change);
              });
          }

        });
    }
  }

  async suathongtin() {
    let is_close = await this.checkUpdatePage();
    if (is_close != null && is_close) {

      const dialogRef = this._matDialog.open(KhoitaohosonsComponent, {
        width: '900px',
        disableClose: true,
        data: this.nsInfo
      });
      dialogRef.afterClosed()
        .subscribe((result) => {
          if (result && result.nsID) {
            this.http
              .get(HSNhansuURL.getHsNs(result.nsID))
              .pipe(takeUntil(this._unsubscribeAll))
              .subscribe((res: any) => {
                if (!res || !res.state) return;
                this.nsInfo = res.data;
                this.shareData.sendMessage(NHAN_SU.VIEW_TTIN, this.nsInfo);
              });
              this.shareData.sendMessage(NHAN_SU.PAGE, 'canhan');
          }
        });
    }
  }

  async xoahoso() {
    let is_close = await this.checkUpdatePage();
    if (is_close != null && is_close) {
      let dialog = this.mb.showDefault(`Bạn có chắc chắn muốn xóa không?`, Buttons.YesNo);
      dialog.dialogResult$.subscribe(result => {
        if (result) {
          this.http
            .delete(HSNhansuURL.deleteHsNs(this.nsInfo.nsID))
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((res: any) => {
              if (!res || !res.state) {
                this.messageService.showErrorMessage(
                  'Hệ thống',
                  'Xóa thông tin không thành công'
                );
                return;
              }
              this.messageService.showSuccessMessage(
                'Hệ thống',
                'Xóa thành công'
              );
              this.nsInfo = new THONG_TIN_CHUNG()
              this.shareData.sendMessage(NHAN_SU.VIEW_TTIN, this.nsInfo);
            });
        } else {
        }
      });
    }
  }

  viewFile(type) {
    // Show File
    let fileBase64;
    switch (type) {
      case 1: {
        this.http
          .get(HSNhansuURL.xuatSyllMauEvn(this.nsInfo.nsID, true))
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe((res: any) => {
            if (!res || !res.state) {
              return;
            }
            fileBase64 = res.data;
            const dialogRef = this._matDialog.open(FileviewComponent, {
              width: '1000px',
              disableClose: true,
              data: {
                fileId: "SYLLEVN.docx",
                fileContent: fileBase64,
                fileExten: "PDF",
                fileName: "SYLLEVN.docx"
              }
            });
            dialogRef.afterClosed()
              .subscribe((result) => {
                if (result) {
                }
              });
          });
        return;
      }
      case 2: {
        this.http
          .get(HSNhansuURL.xuatSyllMau02c(this.nsInfo.nsID, true))
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe((res: any) => {
            if (!res || !res.state) {
              return;
            }
            fileBase64 = res.data;
            const dialogRef = this._matDialog.open(FileviewComponent, {
              width: '1000px',
              disableClose: true,
              data: {
                fileId: "SYLLMau02c.docx",
                fileContent: fileBase64,
                fileExten: "PDF",
                fileName: "SYLLMau02c.docx"
              }
            });
            dialogRef.afterClosed()
              .subscribe((result) => {
                if (result) {
                }
              });
          });
        return;
      }
      case 3: {
        this.http
          .get(HSNhansuURL.xuatSyllMau02cTCTW(this.nsInfo.nsID, true))
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe((res: any) => {
            if (!res || !res.state) {
              return;
            }
            fileBase64 = res.data;
            const dialogRef = this._matDialog.open(FileviewComponent, {
              width: '1000px',
              disableClose: true,
              data: {
                fileId: "SYLLMau02cTCTW.docx",
                fileContent: fileBase64,
                fileExten: "PDF",
                fileName: "SYLLMau02cTCTW.docx"
              }
            });
            dialogRef.afterClosed()
              .subscribe((result) => {
                if (result) {
                }
              });
          });
        return;
      }
    }

  }

  download(type) {
    let fileBase64;
    switch (type) {
      case 1: {
        this.http
          .get(HSNhansuURL.xuatSyllMauEvn(this.nsInfo.nsID, false))
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe((res: any) => {
            if (!res || !res.state) {
              return;
            }
            fileBase64 = res.data;
            const blob = AppUltil.base64ToBlob(fileBase64);
            FileSaver.saveAs(blob, "SYLLEVN.docx");
          });
        return;
      }
      case 2: {
        this.http
          .get(HSNhansuURL.xuatSyllMau02c(this.nsInfo.nsID, false))
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe((res: any) => {
            if (!res || !res.state) {
              return;
            }
            fileBase64 = res.data;
            const blob = AppUltil.base64ToBlob(fileBase64);
            FileSaver.saveAs(blob, "SYLLMau02c.docx");
          });
        return;
      }
      case 3: {
        this.http
          .get(HSNhansuURL.xuatSyllMau02cTCTW(this.nsInfo.nsID, false))
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe((res: any) => {
            if (!res || !res.state) {
              return;
            }
            fileBase64 = res.data;
            const blob = AppUltil.base64ToBlob(fileBase64);
            FileSaver.saveAs(blob, "SYLLMau02cTCTW.docx");
          });
        return;
      }
    }
  }

  myUploader(event, fileForm) {
    this.uploadedFiles.push(event);
    this._fileForm = fileForm;
    let file = this.uploadedFiles[this.uploadedFiles.length - 1].currentFiles[0]
    console.log(file);

    const dialogRef = this._matDialog.open(CropimageComponent, {
      width: '900px',
      data: file
    });

    dialogRef.afterClosed()
      .subscribe((result: string) => {
        if (result) {
          this.nsInfo.fileAttach = {
            fileName: file.name,
            fileContent: result,
          }
          let anhCu = this.nsInfo.anhNs
          this.nsInfo.anhNs = null;
          this.http
            .post(HSNhansuURL.saveAnhNs(), this.nsInfo)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((res: any) => {
              if (!res || !res.state) {
                this.messageService.showErrorMessage(
                  'Hệ thống',
                  'Cập nhật thông tin không thành công'
                );
                this.nsInfo.anhNs = anhCu
                return;
              }
              this.messageService.showSuccessMessage(
                'Hệ thống',
                'Cập nhật thông tin thành công'
              );
              this.nsInfo.anhNs = result
            });
        }
      });
    fileForm.clear();
    //
  }

  checkUpdatePage(): Promise<boolean> {
    return new Promise((resolve) => {
      if (this.currentPage == 'canhan' && this.is_change) {
        const dialogRef = this._matDialog.open(XacnhanpopupComponent, {
          disableClose: true,
          data: {
            message: 'Thông tin đang cập nhật chưa được Lưu vào hệ thống! Anh/chị có muốn Lưu lại thông tin này?'
          }
        });

        dialogRef.afterClosed()
          .subscribe((result) => {
            if (result != null) {
              if (result == 0) {
                this.subData.sendMessage(NHAN_SU.UPDATE_TTCN, true);
                this.is_change = false
                resolve(true);
              } else if (result == 1) {
                this.subData.sendMessage(NHAN_SU.UPDATE_TTCN, false);
                this.is_change = false
                resolve(true);
              } else {
                resolve(false);
              }
            }

          });
      } else {
        resolve(true);
      }
    })
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