import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { CommonApiService } from '../../../../../../services/commonHttp';
import { EmployeURL } from '../../../../../../services/employe/employeURL';
import { Subject, takeUntil } from 'rxjs';
import { QtrinhLuongBean } from '../../../model/qtrinhluongbean';
import { DanhMucURL } from '../../../../../../services/employe/danhmucURL';
import { AppUltil } from '../../../../../../shared/AppUltil';
import FileSaver from 'file-saver';
import { Buttons } from '../../../../../../fuse/components/message-box/common';
import { MessageBox } from '../../../../../../fuse/components/message-box/message-box.provider';
import { FormquyetdinhComponent } from '../../../../../../../assets/lib/formquyetdinh/src/public-api';
import { QuatrinhLuongURL } from '../../../../../../services/employe/quatrinhluongURL';
import { MessageService } from '../../../../../../shared/message.services';
import { ValidateQD } from '../../../../../components/qdnoidung/validateQD';
import { FileviewComponent } from '../../../../../components/fileview/fileview.component';
import { FormnhansuComponent } from '../../../../../../../assets/lib/formnhansu/src/public-api';
import { ThamsoluongformComponent } from './thamsoluongform/thamsoluongform.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FileUploadModule } from 'primeng/fileupload';
import { CheckboxModule } from 'primeng/checkbox';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';

@Component({
  selector: 'app-luongdialog',
  templateUrl: './luongdialog.component.html',
  styleUrls: ['./luongdialog.component.scss'],
  imports: [
    MatFormFieldModule,
    FormsModule,
    MatDatepickerModule,
    AutoCompleteModule,
    FileUploadModule,
    CheckboxModule,
    CommonModule,
    MatInputModule,
    DropdownModule,
    InputTextModule,
    CalendarModule,
  ],
})
export class LuongdialogComponent implements OnInit, OnDestroy {
  pheDuyetOptions = [
    { label: 'Duyệt', value: 1 },
    { label: 'Chờ duyệt', value: 2 },
    { label: 'Không duyệt', value: 3 },
  ];

  selectedPheDuyet: number;


  uploadedFiles: any[] = [];
  _fileForm: any;
  insertFile: any[] = [];
  fileContent: any;

  uploadedFilesPhuluc: any[] = [];
  _fileFormPhuluc: any;
  insertFilePhuluc: any[] = [];
  fileContentPhuluc: any;

  listQdDv: any[] = [];

  filteredChucvuQd: any[] = [];
  listChucvuQd: any[] = [];
  chucvuQdBean: any;

  nguoikyQdBean: any;
  listNguoiKy: any[] = [];
  filteredNguoikyQd: any[] = [];

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  isNghiviec: boolean;

  quyetdinh = {
    qdinhId: null,
    soQd: '',
    ngayKy: null,
    nguoiky: '',
    chucvuKy: '',
    noiDung: '',
    namqd: '',
    fileAttach: {},
    fileName: '',
    fileExtend: '',
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: QtrinhLuongBean,
    public matDialogRef: MatDialogRef<LuongdialogComponent>,
    private http: CommonApiService,
    private mb: MessageBox,
    private _matDialog: MatDialog,
    private messageService: MessageService
  ) {
    this.isNghiviec = this.data.isNghiviec;
  }

  ngOnInit(): void {
    // if (this.data.nsLuongId == null) {
    //   this.data.isDanghuong = true;
    // }
    // this.http
    //   .get(DanhMucURL.getDsQdnoidung(this.data.donviId))
    //   .pipe(takeUntil(this._unsubscribeAll))
    //   .subscribe((res: any) => {
    //     if (res.state) {
    //       this.listQdDv = res.data;
    //     }
    //   });
    // this.http
    //   .get(DanhMucURL.getChucvuForQdnoidung())
    //   .pipe(takeUntil(this._unsubscribeAll))
    //   .subscribe((res: any) => {
    //     if (!res || !res.state) return;
    //     this.listChucvuQd = res.data;
    //     this.chucvuQdBean = this.listChucvuQd.find(element => element.name === this.data.chucvuky)
    //     if (this.chucvuQdBean == null) {
    //       this.chucvuQdBean = {
    //         id: null,
    //         chucvuky: this.data.chucvuky
    //       }
    //     }
    //   });
    // this.http
    //   .get(EmployeURL.getDsNguoiKy())
    //   .pipe(takeUntil(this._unsubscribeAll))
    //   .subscribe((res: any) => {
    //     if (!res || !res.state) return;
    //     this.listNguoiKy = res.data;
    //     this.nguoikyQdBean = this.listNguoiKy.find(element => element.tenkhaisinh === this.data.nguoiky)
    //     if (this.nguoikyQdBean == null) {
    //       this.nguoikyQdBean = {
    //         id: null,
    //         tenkhaisinh: this.data.nguoiky
    //       }
    //     }
    //   });
  }

  onCheckLuongkhoan(): void {
    if (this.data.ckeckLuongKhoan == true) {
      this.data.bacluongId = null;
      this.data.mangachluong = '';
      this.data.mabangluong = '';
      this.data.bacluong = '';
      this.data.heSo = null;
    } else {
      this.data.luongkhoan = null;
    }
  }

  onCheckKcanhbao(): void {
    if (this.data.canhbaonl == false) {
      this.data.lydokocanhbao = '';
    }
  }

  onChangeNgayHieuLuc(): void {
    this.data.thoiGianCanCuNangL = this.data.ngayhieuluc;
    if (!this.data.ckeckLuongKhoan) {
      this.http
        .get(
          QuatrinhLuongURL.getThoiGianNangLuongLanSau(
            this.data.ngayhieuluc,
            this.data.bacluongId,
            this.data.donviId
          )
        )
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((res: any) => {
          if (!res || !res.state) return;
          this.data.moctinhnl = res.data;
        });
    }
  }

  onChangeMoctinhLuong() {
    if (!this.data.ckeckLuongKhoan) {
      if (this.data.thoiGianCanCuNangL) {
        this.http
          .get(
            QuatrinhLuongURL.getThoiGianNangLuongLanSau(
              this.data.thoiGianCanCuNangL,
              this.data.bacluongId,
              this.data.donviId
            )
          )
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe((res: any) => {
            if (!res || !res.state) return;
            this.data.moctinhnl = res.data;
          });
      }
    }
  }

  openSoQDbyTxt(event: any): void {
    this.http
      .post(DanhMucURL.postNsQdndungBySoQd(), {
        soQd: event.target.value,
        donviId: this.data.donviId,
      })
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (res.state) {
          //                  this.quyetdinh = res.data;
          this.data.nsQdnoidungId = res.data.qdinhId;
          this.data.soQd = res.data.soQd;
          this.data.nguoiky = res.data.nguoiky;
          this.data.chucvuky = res.data.chucvuKy;
          this.data.ngayky = res.data.ngayKy;
          this.data.noidung = res.data.noiDung;

          this.chucvuQdBean = this.listChucvuQd.find(
            (element) => element.name === res.data.chucvuKy
          );
          if (this.chucvuQdBean == null) {
            this.chucvuQdBean = {
              id: null,
              name: res.data.chucvuKy,
            };
          }

          this.nguoikyQdBean = this.listNguoiKy.find(
            (element) => element.tenkhaisinh === res.data.nguoiky
          );
          if (this.nguoikyQdBean == null) {
            this.nguoikyQdBean = {
              id: null,
              tenkhaisinh: res.data.nguoiky,
            };
          }
          this.http
            .get(DanhMucURL.getFileQuyetDinh(res.data.qdinhId))
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((res: any) => {
              if (res.state) {
                var file = res.data;
                if (file) {
                  this.data.fileQdinh = file;
                }
              }
            });
        }
      });
  }

  onChonQuyetDinh(): void {
    const dialogRef = this._matDialog.open(FormquyetdinhComponent, {
      disableClose: true,
      data: this.listQdDv,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log(result);

        this.data.chucvuky = result.chucvuKy;
        this.data.nsQdnoidungId = result.qdinhId;
        this.data.soQd = result.soQd;
        this.data.ngayky = result.ngayKy;
        this.data.nguoiky = result.nguoiky;
        this.data.noidung = result.noiDung;
        this.chucvuQdBean = this.listChucvuQd.find(
          (element) => element.name === result.chucvuKy
        );
        if (this.chucvuQdBean == null) {
          this.chucvuQdBean = {
            id: null,
            name: result.chucvuKy,
          };
        }

        this.nguoikyQdBean = this.listNguoiKy.find(
          (element) => element.tenkhaisinh === result.nguoiky
        );
        if (this.nguoikyQdBean == null) {
          this.nguoikyQdBean = {
            id: null,
            tenkhaisinh: result.nguoiky,
          };
        }

        this.http
          .get(DanhMucURL.getFileQuyetDinh(result.qdinhId))
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe((res: any) => {
            if (res.state) {
              var file = res.data;
              if (file) {
                this.data.fileQdinh = file;
              }
            }
          });
      }
    });
  }

  onChonThangLuong(): void {
    const dialogRef = this._matDialog.open(ThamsoluongformComponent, {
      disableClose: true,
      data: {
        id: this.data.mabangluong,
        bacluongId: this.data.bacluongId,
        mangachluong: this.data.mangachluong,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.data.bacluongId = result.id;
        this.http
          .get(DanhMucURL.getLuongInfo(result.id))
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe((res: any) => {
            if (res.state) {
              (this.data.mabangluong = res.data.mabangluong),
                (this.data.mangachluong = res.data.mangachluong),
                (this.data.heSo = res.data.heSo),
                (this.data.bacluong = res.data.bacluong);
            }
          });
      }
    });
  }

  async onSave(): Promise<void> {
    if (this.insertFile && this.insertFile.length != 0)
      this.data.fileQdinh = this.insertFile[this.insertFile.length - 1];
    if (this.fileContent != null) {
      this.data.fileQdinh.fileContent = this.fileContent;
    }

    if (this.insertFilePhuluc && this.insertFilePhuluc.length != 0)
      this.data.fileLuongDinhkem =
        this.insertFilePhuluc[this.insertFilePhuluc.length - 1];
    if (this.fileContentPhuluc != null) {
      this.data.fileLuongDinhkem.fileContent = this.fileContentPhuluc;
    }

    this.quyetdinh.soQd = this.data.soQd;
    this.quyetdinh.qdinhId = this.data.nsQdnoidungId;
    this.quyetdinh.chucvuKy = this.data.chucvuky;
    this.quyetdinh.nguoiky = this.data.nguoiky;
    this.quyetdinh.ngayKy = this.data.ngayky;
    this.quyetdinh.noiDung = this.data.noidung;

    if (this.data.soQd != null && this.data.ngayky != null) {
      const qdnoidung = await ValidateQD.getStatusOfNsQdndung(
        this.http,
        this.mb,
        this.quyetdinh,
        this.messageService,
        this.insertFile
      );

      this.data.nsQdndung = qdnoidung;
    }

    // if (this.data.ngayhieuluc > this.data.ngayketthuc) {
    //   this.messageService.showErrorMessage(
    //     'Hệ thống',
    //     'Ngày hiệu lực không được lớn hơn ngày kết thúc.'
    //   );
    //   return;
    // }

    this.http
      .post(QuatrinhLuongURL.validInfoLuong(), this.data)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (!res || !res.state) {
          this.messageService.showErrorMessage('Hệ thống', res.message);
          return;
        }
        if (this.data != null && this.data.nsLuongId != null) {
          this.http
            .post(QuatrinhLuongURL.updateNsLuong(), this.data)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((res: any) => {
              if (!res || !res.state) {
                this.messageService.showErrorMessage(
                  'Hệ thống',
                  'Cập nhật thông tin không thành công'
                );
              }
              this.messageService.showSuccessMessage(
                'Hệ thống',
                'Cập nhật thành công'
              );
              let result = res.data;
              this.matDialogRef.close(result);
            });
        } else {
          this.http
            .post(QuatrinhLuongURL.insertNsLuong(), this.data)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((res: any) => {
              if (!res || !res.state) {
                this.messageService.showErrorMessage(
                  'Hệ thống',
                  'Cập nhật thông tin không thành công'
                );
              }
              this.messageService.showSuccessMessage(
                'Hệ thống',
                'Cập nhật thành công'
              );
              let result = res.data;
              this.matDialogRef.close(result);
            });
        }
      });
  }

  search(event) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: any[] = [];
    let query = event.query;
    if (query && query != '') {
      this.chucvuQdBean = {
        id: null,
        name: query,
      };
    }

    for (let i = 0; i < this.listChucvuQd.length; i++) {
      let country = this.listChucvuQd[i];
      if (country.name.toLowerCase().includes(query.toLowerCase())) {
        filtered.push(country);
      }
    }

    this.filteredChucvuQd = filtered;
  }

  searchNguoiky(event) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: any[] = [];
    let query = event.query;
    if (query && query != '') {
      this.nguoikyQdBean = {
        nsId: null,
        tenkhaisinh: query,
      };
    }
    for (let i = 0; i < this.listNguoiKy.length; i++) {
      let country = this.listNguoiKy[i];
      if (country.tenkhaisinh.toLowerCase().includes(query.toLowerCase())) {
        filtered.push(country);
      }
    }

    this.filteredNguoikyQd = filtered;
  }

  onSelectNguoiKy(event) {
    let nguoiky = event;
    console.log(nguoiky);
    this.chucvuQdBean = this.listChucvuQd.find(
      (element) => element.name === nguoiky.chucvuKy
    );
    if (this.chucvuQdBean == null) {
      this.chucvuQdBean = {
        id: null,
        name: nguoiky.chucvuKy,
      };
    }
  }

  onKeyDownBacluong(event: KeyboardEvent) {
    if (event.key === 'Tab') {
      this.http
        .get(
          QuatrinhLuongURL.getLBacluongForSearch(
            this.data.mabangluong,
            this.data.mangachluong,
            this.data.bacluong
          )
        )
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((res: any) => {
          if (!res || !res.state) {
            this.data.heSo = null;
            this.messageService.showWarningMessage(
              'Hệ thống',
              'Không tìm thấy thông tin, vui lòng click nút chọn Thang bảng lương.'
            );
            return;
          }

          let result = res.data;
          this.data.heSo = result;
          if (result == null) {
            this.messageService.showWarningMessage(
              'Cảnh báo',
              'Không tìm thấy thông tin, vui lòng click nút chọn Thang bảng lương.'
            );
          }
        });
    }
  }

  async myUploader(event, fileForm) {
    this.uploadedFiles.push(event);
    this._fileForm = fileForm;
    const files =
      this.uploadedFiles[this.uploadedFiles.length - 1].currentFiles;
    if (this.insertFile == null) this.insertFile = [];
    files.forEach(async (file) => {
      await this.blobToBase64(file).then((base64data) => {
        this.fileContent = base64data;
      });
      this.insertFile.push({
        fileName: file.name,
        mimeType: file.type,
        fileSize: file.size,
        fileContent: this.fileContent,
      });
    });
  }

  async myUploaderFilePhuluc(event, _fileFormPhuluc) {
    this.uploadedFilesPhuluc.push(event);
    this._fileFormPhuluc = _fileFormPhuluc;
    const files =
      this.uploadedFilesPhuluc[this.uploadedFilesPhuluc.length - 1]
        .currentFiles;
    if (this.insertFilePhuluc == null) this.insertFilePhuluc = [];
    files.forEach(async (file) => {
      await this.blobToBase64(file).then((base64data) => {
        this.fileContentPhuluc = base64data;
      });
      this.insertFilePhuluc.push({
        fileName: file.name,
        mimeType: file.type,
        fileSize: file.size,
        fileContent: this.fileContentPhuluc,
      });
    });
  }

  blobToBase64(blob: Blob) {
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  }

  taiFileQDdinhkem(data): void {
    var fileBase64;
    this.http
      .get(EmployeURL.getFile(data.fileQdinh.id))
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (!res || !res.state) {
          return;
        }
        fileBase64 = res.data;
        const blob = AppUltil.base64ToBlob(fileBase64);
        FileSaver.saveAs(blob, data.fileQdinh.fileName);
      });
  }

  taiFilePhuluc(data): void {
    var fileBase64;
    this.http
      .get(EmployeURL.getFile(data.fileLuongDinhkem.id))
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (!res || !res.state) {
          return;
        }
        fileBase64 = res.data;
        const blob = AppUltil.base64ToBlob(fileBase64);
        FileSaver.saveAs(blob, data.fileLuongDinhkem.fileName);
      });
  }

  deleteFileQD(file) {
    let dialog = this.mb.showDefault(
      'Bạn có muốn xóa file đính kèm không?',
      Buttons.YesNo
    );
    dialog.dialogResult$.subscribe(async (result) => {
      if (result) {
        file.deleted = true;
        // this.data.webLlbsKyluatFileqd = null
      }
    });
  }

  deleteFilePhuluc(file) {
    let dialog = this.mb.showDefault(
      'Bạn có muốn xóa file phụ lục này không?',
      Buttons.YesNo
    );
    dialog.dialogResult$.subscribe(async (result) => {
      if (result) {
        file.deleted = true;
        // this.data.webLlbsKyluatFileqd = null
      }
    });
  }

  onClose(): void {
    this.matDialogRef.close();
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
