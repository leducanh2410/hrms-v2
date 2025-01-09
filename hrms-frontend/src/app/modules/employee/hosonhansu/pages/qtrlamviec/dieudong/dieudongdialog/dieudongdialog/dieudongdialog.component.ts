import { QuatrinhDieuDongURL } from '../../../../../../../../services/employe/quatrinhdieudongURL';

import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';

import { MessageBox } from '../../../../../../../../fuse/components/message-box/message-box.provider';
import { Store } from '@ngrx/store';

import { QtrinhDieudongBean } from '../../../../../model/qtrinhdieudongbean';

import { AppState } from '../../../../../../../../ngxstore/state/app.state';
import { CommonApiService } from '../../../../../../../../services/commonHttp'
import { DanhMucURL } from '../../../../../../../../services/employe/danhmucURL';



import { MessageService } from '../../../../../../../../shared/message.services';

import { FormquyetdinhComponent } from '../../../../../../../../../assets/lib/formquyetdinh/src/public-api';


import { Subject } from 'rxjs/internal/Subject';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { FormphongbanComponent } from '../../../../../../../../../assets/lib/formphongban/src/public-api';
// import { FormdonviTreeComponent } from 'formdonvi-tree';
import { HSNhansuURL } from '../../../../../../../../services/employe/hosonhansuURL';
import { EmployeURL } from '../../../../../../../../services/employe/employeURL';
import { ValidateQD } from '../../../../../../../components/qdnoidung/validateQD';
import { Buttons } from '../../../../../../../../fuse/components/message-box/common';
import { AppUltil } from '../../../../../../../../shared/AppUltil'
import FileSaver from 'file-saver';
import { FormdonviTreeComponent } from '../../../../../../../../../assets/lib/formdonvi-tree/src/public-api';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { FileUpload, FileUploadModule } from 'primeng/fileupload';
import { DropdownModule } from 'primeng/dropdown';
import { CheckboxModule } from 'primeng/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { RadioButtonModule } from 'primeng/radiobutton';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';


@Component({
  selector: 'app-dieudongdialog',
  templateUrl: './dieudongdialog.component.html',
  styleUrls: ['./dieudongdialog.component.scss'],
  imports:[
    MatFormFieldModule,
    MatInputModule,
    MatTooltipModule,
    FormsModule,
    CommonModule,
    FileUploadModule,
    DropdownModule,
    CheckboxModule,
    MatDatepickerModule,
    AutoCompleteModule,
    RadioButtonModule,

  ]
})
export class DieudongdialogComponent implements OnInit {
  uploadedFiles: any[] = [];
  _fileForm: any;
  insertFile: any[] = [];
  fileContent: any;

  formState: boolean;
  noedit: boolean;
  isnotnoibo: boolean;
  isnoibo: boolean = true;
  trongnghanh: boolean;
  bietphai: boolean;
  listChucdanh: any[] = [];
  listQdDv: any[] = [];
  filteredChucvuQd: any[] = [];
  listChucvuQd: any[] = [];
  chucvuQdBean: any;
  nguoikyQdBean: any;
  listNguoiKy: any[] = [];
  filteredNguoikyQd: any[] = [];
  phongBan: any[];
  listDonvi: any[];

  disableChucdanhmoi: boolean;

  private _unsubscribeAll: Subject<any> = new Subject<any>();

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
    donviId: null
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: QtrinhDieudongBean,
    public matDialogRef: MatDialogRef<DieudongdialogComponent>,
    private http: CommonApiService,
    private _matDialog: MatDialog,
    private store: Store<AppState>,
    private messageService: MessageService,
    private mb: MessageBox,
  ) {

  }
  ngOnInit(): void {

    this.noedit = false;
    if (this.data.isLastest != null && this.data.isLastest == false) {
      this.noedit = true;
    }

    if ((this.data.donvidiId == null && this.data.phongdiId == null) || (this.data.noidi != null && this.data.noidi.length > 0)) {
      this.noedit = true;
    }

    if (this.data.nsDdtchuyenId == null) {
      this.data.isChamduthdld = false;
      this.data.isTamthoi = false;

      this.disableChucdanhmoi = false;
    } else {
      this.noedit = true;
    }

    this.chucvuQdBean = {};
    this.nguoikyQdBean = {};

    this.isnotnoibo = false;

    this.trongnghanh = true;

    

    this.http
      .get(DanhMucURL.getListVtriCdanh())
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (!res || !res.state) return;
        this.listChucdanh = res.data;
      });

    this.http
      .get(EmployeURL.getDsNguoiKyBean())
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (!res || !res.state) return;
        this.listNguoiKy = res.data;
        this.nguoikyQdBean = this.listNguoiKy.find(element => element.name === this.data.nguoiky)
        if (this.nguoikyQdBean == null) {
          this.nguoikyQdBean = {
            id: null,
            name: this.data.nguoiky
          }
        }
      });

    this.http
      .get(DanhMucURL.getChucvuForQdnoidung())
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (!res || !res.state) return;

        this.listChucvuQd = res.data;
        this.chucvuQdBean = this.listChucvuQd.find(element => element.name === this.data.chucvuky)
        if (this.chucvuQdBean == null) {
          this.chucvuQdBean = {
            id: null,
            name: this.data.chucvuky
          }
        }
      });

    // lay danh sach quyet dinh cua don vi
    // lay chi tiet don vi cua nhan su
    this.http
      .get(DanhMucURL.getDsQdnoidung(this.data.donvidiId))
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (res.state) {
          this.listQdDv = res.data;
        }
      });

    this.http
      .get(DanhMucURL.getAllDepartment(this.data.donvidiId))
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (!res || !res.state) return;
        let donvis = res.data;
        this.phongBan = donvis
      });


    this.http
      .get(HSNhansuURL.getAllListDonvi())
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (!res || !res.state) return;
        this.listDonvi = res.data;

      });

  }

  loadInfo(){
    if (this.data.isEvn != null && this.data.isEvn == true) {
      this.trongnghanh = true;
      if (this.data.donvidenId != null && this.data.donvidenId == this.data.donvidiId) {
        this.isnoibo = true;
        this.isnotnoibo = false;
      } else {
        this.isnoibo = false;
        this.isnotnoibo = true;
      }
    } else {
      this.isnoibo = false;
			this.isnotnoibo = true;

      if(this.data.istrongnghanh==null){
        this.data.istrongnghanh = true;
      }

      if(this.data.istrongnghanh==true && this.data.donvidenId!=null){
        this.trongnghanh = true;
      }else{
        this.trongnghanh = false;
      }

      
        this.bietphai = this.data.isDieuDongBietPhai
      
    }
  }

  onSelectNguoiKy(event) {
    let nguoiky = event;

    this.chucvuQdBean = this.listChucvuQd.find(element => element.name === nguoiky.chucvu)
    if (this.chucvuQdBean == null) {
      this.chucvuQdBean = {
        id: null,
        name: nguoiky.chucvu
      }
    }
  }

  // Autocomplete input
  search(event) {
    //in a real application, make a request to a remote url with the query and return filtered results, for demo we filter at client side
    let filtered: any[] = [];
    let query = event.query;
    if (query && query != '') {
      this.chucvuQdBean = {
        id: null,
        name: query
      }
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
        name: query
      }
    }

    for (let i = 0; i < this.listNguoiKy.length; i++) {
      let country = this.listNguoiKy[i];
      if (country.name.toLowerCase().includes(query.toLowerCase())) {
        filtered.push(country);
      }
    }

    this.filteredNguoikyQd = filtered;

  }

  openSoQDbyTxt(event: any): void {
    this.http
      .post(DanhMucURL.postNsQdndungBySoQd(), { soQd: event.target.value, donviId: this.data.donvidiId })
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

          this.chucvuQdBean = this.listChucvuQd.find(element => element.name === res.data.chucvuKy)
          if (this.chucvuQdBean == null) {
            this.chucvuQdBean = {
              id: null,
              name: res.data.chucvuKy
            }
          }

          this.nguoikyQdBean = this.listNguoiKy.find(element => element.name === res.data.nguoiky)
          if (this.nguoikyQdBean == null) {
            this.nguoikyQdBean = {
              id: null,
              name: res.data.nguoiky
            }
          }

          this.http
            .get(DanhMucURL.getFileQuyetDinh(res.data.qdinhId))
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((res: any) => {
              if (res.state) {
                var file = res.data
                if (file) {
                  this.data.fileAttach = file;

                }

              }

            })

        }
      });
  }

  onChonQuyetDinh(): void {
    const dialogRef = this._matDialog.open(FormquyetdinhComponent, {
      disableClose: true,
      data: this.listQdDv
    });

    dialogRef.afterClosed()
      .subscribe((result) => {
        if (result) {

          this.data.chucvuky = result.chucvuKy;
          this.data.nsQdnoidungId = result.qdinhId;
          this.data.soQd = result.soQd;
          this.data.ngayky = result.ngayKy;
          this.data.nguoiky = result.nguoiky;
          this.data.noidung = result.noiDung;
          this.chucvuQdBean = this.listChucvuQd.find(element => element.name === result.chucvuKy)
          if (this.chucvuQdBean == null) {
            this.chucvuQdBean = {
              id: null,
              name: result.chucvuKy
            }
          }

          this.nguoikyQdBean = this.listNguoiKy.find(element => element.name === result.nguoiky)
          if (this.nguoikyQdBean == null) {
            this.nguoikyQdBean = {
              id: null,
              tenkhaisinh: result.nguoiky
            }
          }
          this.http
            .get(DanhMucURL.getFileQuyetDinh(result.qdinhId))
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((res: any) => {
              if (res.state) {
                var file = res.data
                if (file) {
                  this.data.fileAttach = file;

                }

              }

            })
        }

      });
  }

  onChondviDen(): void {

    const dialogRef = this._matDialog.open(FormdonviTreeComponent, {
      disableClose: false,
      data: {
        donvis: this.listDonvi
      }
    });

    dialogRef.afterClosed()
      .subscribe((result) => {
        this.data.donviden = result.data.orgName;
        this.data.donvidenId = result.data.organizationId;

      });
  }

  onChonphongban(): void {
    const dialogRef = this._matDialog.open(FormphongbanComponent, {
      disableClose: true,
      data: {
        phongBan: this.phongBan,
        boChon: false
      }
    });

    dialogRef.afterClosed()
      .subscribe((result) => {
        if (result) {
          this.data.phongden = result.data.name;
          this.data.phongdenId = result.data.id;
        }

      });
  }

  onCheckSangdvikhac(): void {
    if (this.isnotnoibo == true) {
      this.isnoibo = false;
      this.trongnghanh = true;

      this.data.isChamduthdld = true;

      this.disableChucdanhmoi = true;

      this.bietphai = true;
    } else {

      this.isnoibo = true;
      this.trongnghanh = true;
      this.data.isChamduthdld = false;

      this.disableChucdanhmoi = false;

      this.bietphai = null;
    }
  }

  onCheckChucdanhmoi(): void {
    if (!this.data.isChucdanhmoi) {
      this.data.vtriId = null;

    }
  }

  async onSave(): Promise<void> {

    if (this.insertFile && this.insertFile.length != 0) this.data.fileAttach = this.insertFile[this.insertFile.length - 1]
    if (this.fileContent != null) {
      this.data.fileAttach.fileContent = this.fileContent;
    }


    if (this.isnoibo == true || this.trongnghanh == true)
      this.data.isEvn = true;
    else
      this.data.isEvn = false;

    if (this.trongnghanh == true) {
      this.data.istrongnghanh = true;
    } else {
      this.data.istrongnghanh = false;
      this.data.donvidenId = null;
      this.data.phongdenId = null;

    }

    this.data.isDieuDongBietPhai = this.bietphai;

    this.data.nguoiky = this.nguoikyQdBean.name;
    this.data.chucvuky = this.chucvuQdBean.name;

    if (this.isnoibo == true) {
      if (this.data.phongdenId == this.data.phongdiId) {
        this.messageService.showErrorMessage(
          'Hệ thống',
          'Bạn không được thuyên chuyển trong cùng phòng ban.'
        );
        return;
      }
    } else {
      if (this.trongnghanh == true) {
        if (this.data.donvidenId != null && this.data.donvidenId == this.data.donvidiId) {
          this.messageService.showErrorMessage(
            'Hệ thống',
            'Bạn không được chọn đơn vị đến trùng đơn vị hiện tại.'
          );
          return;
        }
      }
    }

    this.quyetdinh.soQd = this.data.soQd;
    this.quyetdinh.qdinhId = this.data.nsQdnoidungId;
    this.quyetdinh.chucvuKy = this.data.chucvuky;
    this.quyetdinh.nguoiky = this.data.nguoiky;
    this.quyetdinh.ngayKy = this.data.ngayky;
    this.quyetdinh.noiDung = this.data.noidung;
    this.quyetdinh.donviId = this.data.donvidiId;

    const qdnoidung = await ValidateQD.getStatusOfNsQdndung(this.http, this.mb, this.quyetdinh, this.messageService,this.insertFile);

    this.data.nsQdndungHoannd = qdnoidung;

    this.http
      .post(QuatrinhDieuDongURL.validInfoDieudong(), this.data)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (!res || !res.state) {

          this.messageService.showErrorMessage(
            'Hệ thống',
            res.message
          );
          return;
        }

        if (this.data != null && this.data.nsDdtchuyenId != null) {

          this.http
            .post(QuatrinhDieuDongURL.updateNsDdtchuyen(), this.data)
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
            .post(QuatrinhDieuDongURL.insertNsDdtchuyen(), this.data)
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


  async myUploader(event, fileForm) {
    this.uploadedFiles.push(event);
    this._fileForm = fileForm;
    const files = this.uploadedFiles[this.uploadedFiles.length - 1].currentFiles;
    if (this.insertFile == null)
      this.insertFile = []
    files.forEach(async (file) => {
      await this.blobToBase64(file)
        .then((base64data) => {
          this.fileContent = base64data;
        });
      this.insertFile.push(
        {
          fileName: file.name,
          mimeType: file.type,
          fileSize: file.size,
          fileContent: this.fileContent,
        }
      )
    })
  }

  blobToBase64(blob: Blob) {
    return new Promise((resolve, _) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  }

  deleteFile(file) {
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

  taiFiledinhkem(data): void {

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

  onClose(): void {
    this.matDialogRef.close();
  }
}
