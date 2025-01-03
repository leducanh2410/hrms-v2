import { Component, Inject, OnInit } from '@angular/core';
import { QtrinhPhucapBean } from '../../../model/qtrinhphucapbean';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { CommonApiService } from '../../../../../../services/commonHttp';
import { MessageBox } from '../../../../../../fuse/components/message-box/message-box.provider';
import { MessageService } from '../../../../../../shared/message.services';
import { Subject, takeUntil } from 'rxjs';
import { DanhMucURL } from '../../../../../../services/employe/danhmucURL';
import { EmployeURL } from '../../../../../../services/employe/employeURL';
import { FormquyetdinhComponent } from '../../../../../../../assets/lib/formquyetdinh/src/public-api';
import { QuatrinhLuongURL } from '../../../../../../services/employe/quatrinhluongURL';
import { ValidateQD } from '../../../../../components/qdnoidung/validateQD';
import { AppUltil } from '../../../../../../shared/AppUltil';
import FileSaver from 'file-saver';
import { Buttons } from '../../../../../../fuse/components/message-box/common';
import { CommonModule, Location } from '@angular/common';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { QtrluongdieuchinhComponent } from '../../qtrluongdieuchinh/qtrluongdieuchinh.component';
import { NumberFormatPipe } from '../../../../../../shared/formatNumber';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { FileUploadModule } from 'primeng/fileupload';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-phucapdialog',
  templateUrl: './phucapdialog.component.html',
  styleUrls: ['./phucapdialog.component.scss'],
  imports: [
    TableModule,
    FormsModule,
    CommonModule,
    MatFormFieldModule,
    MatDatepickerModule,
    AutoCompleteModule,
    FileUploadModule,
    DropdownModule,
    CheckboxModule,
    MatInputModule
  ],
})
export class PhucapdialogComponent implements OnInit {
  uploadedFiles: any[] = [];
  _fileForm: any;
  insertFile: any[] = [];
  fileContent: any;

  listQdDv: any[] = [];

  filteredChucvuQd: any[] = [];
  listChucvuQd: any[] = [];
  chucvuQdBean: any;

  nguoikyQdBean: any;
  listNguoiKy: any[] = [];
  filteredNguoikyQd: any[] = [];

  listLoaiphucap: any[] = [];
  listPhucapHeso: any[] = [];

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
    isChangeFileAttach: false,
  };

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: QtrinhPhucapBean,
    public matDialogRef: MatDialogRef<PhucapdialogComponent>,
    private http: CommonApiService,
    private mb: MessageBox,
    private _matDialog: MatDialog,
    private messageService: MessageService,
    private location: Location
  ) {
    this.isNghiviec = this.data.isNghiviec;
  }
  ngOnInit(): void {
    // if (this.data.nsPhucapId == null) {
    //   this.data.isDanghuong = true;
    // } else {
    //   this.quyetdinh.qdinhId = this.data.nsQdnoidungId;
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
    //   .get(DanhMucURL.getAllLPhucap())
    //   .pipe(takeUntil(this._unsubscribeAll))
    //   .subscribe((res: any) => {
    //     if (res.state) {
    //       this.listLoaiphucap = res.data;

    //       if (this.data.phucapId != null) {
    //         this.http
    //           .get(DanhMucURL.getLPhucapHesobyIdPc(this.data.phucapId))
    //           .pipe(takeUntil(this._unsubscribeAll))
    //           .subscribe((res: any) => {
    //             if (res.state) {
    //               this.listPhucapHeso = res.data;
    //             }
    //           });
    //       }
    //     }
    //   });

    // if (this.data.phucapId != null) {
    //   this.http
    //     .get(DanhMucURL.getLPhucapHesobyIdPc(this.data.phucapId))
    //     .pipe(takeUntil(this._unsubscribeAll))
    //     .subscribe((res: any) => {
    //       if (res.state) {
    //         this.listPhucapHeso = res.data;
    //       }
    //     });
    // }

    // this.http
    //   .get(DanhMucURL.getChucvuForQdnoidung())
    //   .pipe(takeUntil(this._unsubscribeAll))
    //   .subscribe((res: any) => {
    //     if (!res || !res.state) return;

    //     this.listChucvuQd = res.data;
    //     this.chucvuQdBean = this.listChucvuQd.find(
    //       (element) => element.name === this.data.chucvuky
    //     );
    //     if (this.chucvuQdBean == null) {
    //       this.chucvuQdBean = {
    //         id: null,
    //         name: this.data.chucvuky,
    //       };
    //     }
    //   });

    // this.http
    //   .get(EmployeURL.getDsNguoiKyBean())
    //   .pipe(takeUntil(this._unsubscribeAll))
    //   .subscribe((res: any) => {
    //     if (!res || !res.state) return;
    //     this.listNguoiKy = res.data;
    //     this.nguoikyQdBean = this.listNguoiKy.find(
    //       (element) => element.name === this.data.nguoiky
    //     );
    //     if (this.nguoikyQdBean == null) {
    //       this.nguoikyQdBean = {
    //         id: null,
    //         name: this.data.nguoiky,
    //       };
    //     }
    //   });
  }

  changeLoaiPC(value): void {
    this.data.phucapId = value;

    this.http
      .get(DanhMucURL.getPhucapById(this.data.phucapId))
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (res.state) {
          this.data.phantramluong = res.data.phantramluong;
        }
      });

    this.http
      .get(DanhMucURL.getLPhucapHesobyIdPc(this.data.phucapId))
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (res.state) {
          this.listPhucapHeso = res.data;
          this.data.hspcId = null;
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
          (element) => element.name === result.nguoiky
        );
        if (this.nguoikyQdBean == null) {
          this.nguoikyQdBean = {
            id: null,
            name: result.nguoiky,
          };
        }

        this.http
          .get(DanhMucURL.getFileQuyetDinh(result.qdinhId))
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe((res: any) => {
            if (res.state) {
              var file = res.data;
              if (file) {
                this.data.fileAttach = file;
                this.fileContent = file.fileContent;
              } else {
                this.data.fileAttach = null;
              }
            }
          });
      }
    });
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
          this.data.nsQdnoidungId = res && res.data ? res.data.qdinhId : null;
          this.data.nguoiky = res && res.data ? res.data.nguoiky : '';
          this.data.chucvuky = res && res.data ? res.data.chucvuKy : '';
          this.data.ngayky = res && res.data ? res.data.ngayKy : null;
          this.data.noidung = res && res.data ? res.data.noiDung : '';

          this.chucvuQdBean =
            res && res.data
              ? this.listChucvuQd.find(
                  (element) => element.name === res.data.chucvuKy
                )
              : null;
          if (this.chucvuQdBean == null) {
            this.chucvuQdBean = {
              id: null,
              name: this.data.chucvuky,
            };
          }

          this.nguoikyQdBean =
            res && res.data
              ? this.listNguoiKy.find(
                  (element) => element.name === res.data.nguoiky
                )
              : null;
          if (this.nguoikyQdBean == null) {
            this.nguoikyQdBean = {
              id: null,
              name: this.data.nguoiky,
            };
          }

          if (this.data.nsQdnoidungId) {
            this.http
              .get(DanhMucURL.getFileQuyetDinh(this.data.nsQdnoidungId))
              .pipe(takeUntil(this._unsubscribeAll))
              .subscribe((res: any) => {
                if (res.state) {
                  var file = res.data;
                  if (file) {
                    this.data.fileAttach = file;
                    this.fileContent = file.fileContent;
                  } else {
                    this.data.fileAttach = null;
                  }
                }
              });
          } else {
            this.data.fileAttach = null;
            this.fileContent = null;
            this.data.fileAttach = null;
          }
        }
      });
  }

  async onSave(): Promise<void> {
    if (this.data.ngayhl != null && this.data.ngaykt != null) {
      let date1 = new Date(this.data.ngayhl);
      let date2 = new Date(this.data.ngaykt);

      if (date1 > date2) {
        this.messageService.showErrorMessage(
          'Hệ thống',
          'Ngày kết thúc phải sau ngày hiệu lực.'
        );
        return;
      }
    }

    if (this.insertFile && this.insertFile.length != 0)
      this.data.fileAttach = this.insertFile[this.insertFile.length - 1];
    if (this.fileContent != null) {
      this.data.fileAttach.fileContent = this.fileContent;
    }

    this.quyetdinh.soQd = this.data.soQd;
    this.quyetdinh.qdinhId = this.data.nsQdnoidungId;
    this.quyetdinh.chucvuKy = this.chucvuQdBean.name;
    this.quyetdinh.nguoiky = this.nguoikyQdBean.name;
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

    if (this.data != null && this.data.nsPhucapId != null) {
      this.http
        .post(QuatrinhLuongURL.updateNsPhucap(), this.data)
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((res: any) => {
          if (!res || !res.state) {
            this.messageService.showErrorMessage('Hệ thống', res.message);
            return;
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
        .post(QuatrinhLuongURL.insertNsPhucap(), this.data)
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((res: any) => {
          if (!res || !res.state) {
            this.messageService.showErrorMessage('Hệ thống', res.message);
            return;
          }
          this.messageService.showSuccessMessage(
            'Hệ thống',
            'Cập nhật thành công'
          );
          let result = res.data;
          this.matDialogRef.close(result);
        });
    }
  }

  onSelectNguoiKy(event) {
    let nguoiky = event;
    console.log(nguoiky);
    this.chucvuQdBean = this.listChucvuQd.find(
      (element) => element.name === nguoiky.chucvu
    );
    if (this.chucvuQdBean == null) {
      this.chucvuQdBean = {
        id: null,
        name: nguoiky.chucvu,
      };
    }
  }

  async myUploader(event, fileForm) {
    const files = event.currentFiles;
    this.insertFile = [];
    this.quyetdinh.fileAttach = null;
    for (let index = 0; index < files.length; index++) {
      const file = files[index];
      await this.blobToBase64(file).then((base64data) => {
        this.fileContent = base64data;
      });
      this.insertFile.push({
        fileName: file.name,
        mimeType: file.type,
        fileSize: file.size,
        fileContent: this.fileContent,
      });
    }
    if (
      this.quyetdinh &&
      this.quyetdinh.qdinhId &&
      this.insertFile &&
      this.insertFile.length > 0
    ) {
      this.quyetdinh.isChangeFileAttach = true;
    }
  }

  blobToBase64(blob: Blob) {
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  }

  checkTienmat(): void {
    if (this.data.isTienmat == false) {
      this.data.tienmat = null;
    } else {
      this.data.hspcId = null;
    }
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
        id: null,
        name: query,
      };
    }

    for (let i = 0; i < this.listNguoiKy.length; i++) {
      let country = this.listNguoiKy[i];
      if (country.name.toLowerCase().includes(query.toLowerCase())) {
        filtered.push(country);
      }
    }

    this.filteredNguoikyQd = filtered;
  }

  taiFileQDdinhkem(data): void {
    var fileBase64;
    this.http
      .get(EmployeURL.getFile(data.fileAttach.id))
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (!res || !res.state) {
          return;
        }
        fileBase64 = res.data;
        const blob = AppUltil.base64ToBlob(fileBase64);
        FileSaver.saveAs(blob, data.fileAttach.fileName);
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
        this.quyetdinh.isChangeFileAttach = true;
      }
    });
  }

  onClose(): void {
    this.matDialogRef.close();
  }
}
