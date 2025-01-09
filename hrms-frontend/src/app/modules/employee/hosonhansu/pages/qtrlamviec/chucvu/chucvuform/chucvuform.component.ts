import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
} from '@angular/forms';
import { MatDatepickerInputEvent, MatDatepickerModule } from '@angular/material/datepicker';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { Buttons } from '../../../../../../../fuse/components/message-box/common';
import { FormquyetdinhComponent } from '../../../../../../../../assets/lib/formquyetdinh/src/public-api';
import { FileUpload } from 'primeng/fileupload';
import { Observable, Subject, map, startWith, takeUntil } from 'rxjs';
import { MessageService } from '../../../../../../../shared/message.services';
import { CommonApiService } from '../../../../../../../services/commonHttp';
import { MessageBox } from '../../../../../../../fuse/components/message-box/message-box.provider';
import { DanhMucURL } from '../../../../../../../services/employe/danhmucURL';
import { FormphongbanComponent } from '../../../../../../../../assets/lib/formphongban/src/public-api';
import { ValidateQD } from '../../../../../../components/qdnoidung/validateQD';
import { Quyetdinh } from '../../../../../../model/quyetdinhND.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { ChonquyetdinhComponent } from '../../../../../../components/chonquyetdinh/chonquyetdinh.component';
import { MatOptionModule } from '@angular/material/core';
import { MatRadioModule } from '@angular/material/radio';
import { TooltipModule } from 'primeng/tooltip';
import { DropdownModule } from 'primeng/dropdown';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-chucvuform',
  templateUrl: './chucvuform.component.html',
  styleUrls: ['./chucvuform.component.scss'],
  imports: [
    MatFormFieldModule,
    FormsModule,
    CommonModule,
    ChonquyetdinhComponent,
    MatOptionModule,
    MatRadioModule,
    MatDatepickerModule,
    TooltipModule,
    DropdownModule,
    MatInputModule
  ],
})
export class ChucvuformComponent implements OnInit {
  @ViewChild('registerForm', { static: false }) registerForm: any;
  insertFile: any[];
  listChucVu: any[] = [];
  listPhuCap: any[] = [];
  listHesoPcap: any[] = [];
  listPhongban: any[] = [];
  listPhanLoaiQD: any[] = [];
  isCheckHeso = false;
  loadingFile: boolean = false;
  disableCheckHeso = true;
  tendonvi = '';
  minDate: Date = null;
  maxDate: Date = null;
  isLockform = false;
  quyetdinh = new Quyetdinh();
  strMucTien = '';
  qtChucvu: any;

  listLoaiQd_BoNhiemLai = {
    loaiQD: 2, // Bổ nhiệm lại
    dsPhanLoaiQD: [
      {
        id: 3,
        name: 'BỔ NHIỆM LẠI',
      },
      {
        id: 4,
        name: 'GIAO NHIỆM VỤ LẠI',
      },
    ],
  };

  listLoaiQd_BoNhiemMoi = {
    loaiQD: 1, // Bổ nhiệm
    dsPhanLoaiQD: [
      {
        id: 1,
        name: 'BỔ NHIỆM MỚI',
      },
      {
        id: 2,
        name: 'GIAO NHIỆM VỤ',
      },
    ],
  };

  listLoaiQd_BaiNhiem = {
    loaiQD: 3,
    dsPhanLoaiQD: [
      {
        id: 5,
        name: 'THÔI GIỮ CHỨC VỤ',
      },
      {
        id: 6,
        name: 'MIỄN NHIỆM',
      },
      {
        id: 7,
        name: 'BÃI NHIỆM',
      },
      {
        id: 8,
        name: 'TỪ CHỨC',
      },
      {
        id: 9,
        name: 'CÁCH CHỨC',
      },
    ],
  };

  private _unsubscribeAll: Subject<any> = new Subject<any>();
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public matDialogRef: MatDialogRef<ChucvuformComponent>,
    private messageService: MessageService,
    private _matDialog: MatDialog,
    private http: CommonApiService,
    private formBuilder: FormBuilder,
    private mb: MessageBox
  ) {
    this.listChucVu = this.data.listChucVu;
    this.qtChucvu = { ...this.data.qtchucfvu };
  }

  ngOnInit(): void {
    this.onloadData();

    if (this.data.state == 'STATE_INSERT') {
      let qd = this.renderLoaiQuyetDinh('STATE_INSERT');
      this.listPhanLoaiQD = qd.dsPhanLoaiQD;
      this.qtChucvu.cvChinh = true;
      this.qtChucvu.loaiQD = qd.loaiQD;
      this.qtChucvu.phanloai = qd.dsPhanLoaiQD[0].id;
      this.tendonvi = this.data.nhansu.donvi;
      this.qtChucvu.duongchuc = true;
    } else if (this.data.state == 'STATE_BO_NHIEM_LAI') {
      //this.qtChucvu.loaiQD = qd.loaiQD;
      //this.qtChucvu.phanloai = qd.dsPhanLoaiQD[0].id;
      this.qtChucvu.ngayKT = null;
      this.qtChucvu.ngayBD = null;
      this.qtChucvu.thoihanbonhiem = null;
      this.tendonvi = this.qtChucvu.donvi;
      if (this.qtChucvu.hspcId === null) {
        this.isCheckHeso = false;
      } else {
        this.isCheckHeso = true;
      }
      if (this.qtChucvu.phucapId === null) {
        this.disableCheckHeso = true;
      } else {
        this.disableCheckHeso = false;
        this.http
          .get(DanhMucURL.getLPhucapHesobyIdPc(this.qtChucvu.phucapId))
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe((res: any) => {
            if (res.state) {
              this.listHesoPcap = res.data;
              //  console.log('----------------------------this.listChucVu: ', this.listChucVu)
            }
          });
      }
      let qd = this.renderLoaiQuyetDinh('STATE_BO_NHIEM_LAI');
      this.listPhanLoaiQD = qd.dsPhanLoaiQD;
    } else if (this.data.state == 'STATE_BAI_NHIEM') {
      let qd = this.renderLoaiQuyetDinh('STATE_BAI_NHIEM');
      this.listPhanLoaiQD = qd.dsPhanLoaiQD;
      this.qtChucvu.loaiQD = qd.loaiQD;
      this.qtChucvu.phanloai = qd.dsPhanLoaiQD[0].id;
      this.qtChucvu.ngayKT = null;
      this.qtChucvu.ngayBD = null;
      this.qtChucvu.thoihanbonhiem = null;
      this.tendonvi = this.qtChucvu.donvi;
      if (this.qtChucvu.hspcId === null) {
        this.isCheckHeso = false;
      } else {
        this.isCheckHeso = true;
      }
      if (this.qtChucvu.phucapId === null) {
        this.disableCheckHeso = true;
      } else {
        this.disableCheckHeso = false;
        this.http
          .get(DanhMucURL.getLPhucapHesobyIdPc(this.qtChucvu.phucapId))
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe((res: any) => {
            if (res.state) {
              this.listHesoPcap = res.data;
              //  console.log('----------------------------this.listChucVu: ', this.listChucVu)
            }
          });
      }
    } else if (this.data.state == 'STATE_UPDATE') {
      this.quyetdinh.soQd = this.qtChucvu.soQD;
      this.quyetdinh.qdinhId = this.qtChucvu.nsQdnoidungId;
      this.quyetdinh.nguoiky = this.qtChucvu.nguoiky;
      this.quyetdinh.chucvuKy = this.qtChucvu.chucvuky;
      this.quyetdinh.ngayKy = this.qtChucvu.ngayky;
      this.quyetdinh.noiDung = this.qtChucvu.noidung;
      this.tendonvi = this.qtChucvu.donvi;
      if (this.qtChucvu.muctien) {
        this.strMucTien = String(this.qtChucvu.muctien);
        this.strMucTien = this.strMucTien.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
      }
      if (this.qtChucvu.ngayKT) this.maxDate = new Date(this.qtChucvu.ngayKT);
      if (this.qtChucvu.ngayBD) this.minDate = new Date(this.qtChucvu.ngayBD);

      if (this.qtChucvu.hspcId === null) {
        this.isCheckHeso = false;
      } else {
        this.isCheckHeso = true;
      }
      if (this.qtChucvu.phucapId === null) {
        this.disableCheckHeso = true;
      } else {
        this.disableCheckHeso = false;
        this.http
          .get(DanhMucURL.getLPhucapHesobyIdPc(this.qtChucvu.phucapId))
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe((res: any) => {
            if (res.state) {
              this.listHesoPcap = res.data;
            }
          });
      }
      // bo nhiem moi
      if (this.qtChucvu.loaiQD == 1) {
        let qd = this.renderLoaiQuyetDinh('STATE_INSERT');
        this.listPhanLoaiQD = qd.dsPhanLoaiQD;
      }
      // bo nhiem lai
      else if (this.qtChucvu.loaiQD == 2) {
        let qd = this.renderLoaiQuyetDinh('STATE_BO_NHIEM_LAI');
        this.listPhanLoaiQD = qd.dsPhanLoaiQD;
      }
      // bai nhiem
      else if (this.qtChucvu.loaiQD == 3) {
        let qd = this.renderLoaiQuyetDinh('STATE_BAI_NHIEM');
        this.listPhanLoaiQD = qd.dsPhanLoaiQD;
      }
    }
  }

  onloadData(): void {
    //--------- get danh sach phu cap  --------
    this.http
      .get(DanhMucURL.getAllLPhucap())
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (res.state) {
          this.listPhuCap = res.data;
          //  console.log('----------------------------this.listChucVu: ', this.listChucVu)
        }
      });

    this.http
      .get(DanhMucURL.getAllDepartment(this.data.nhansu.donviId))
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (!res || !res.state) return;
        let donvis = res.data;
        this.listPhongban = donvis;
      });
  }

  onChonphucap(event): any {
    //--------- get danh sach he so phu cap  --------
    if (event.value == null) {
      this.disableCheckHeso = true;
      this.qtChucvu.phucapId = null;
      this.isCheckHeso = false;
      this.qtChucvu.hspcId = null;
    } else {
      this.disableCheckHeso = false;
      this.http
        .get(DanhMucURL.getLPhucapHesobyIdPc(event.value))
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((res: any) => {
          if (res.state) {
            this.listHesoPcap = res.data;
            //  console.log('----------------------------this.listChucVu: ', this.listChucVu)
          }
        });
    }
  }

  onClearPhucap(): any {
    this.disableCheckHeso = true;
    this.qtChucvu.phucapId = null;
    this.qtChucvu.muctien = null;
    this.qtChucvu.hspcId = null;
    this.strMucTien = '';
    this.isCheckHeso = false;
  }

  onChonphongban(): void {
    const dialogRef = this._matDialog.open(FormphongbanComponent, {
      disableClose: true,
      data: {
        phongBan: this.listPhongban,
        boChon: false,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.qtChucvu.phongto = result.data.name;
        this.qtChucvu.phongtoId = result.data.id;
      }
    });
  }

  oncheckHeso(event): any {
    if (event.checked == false) {
      this.qtChucvu.hspcId = null;
    } else {
      this.qtChucvu.muctien = null;
    }
  }

  renderLoaiQuyetDinh(state): any {
    if (state == 'STATE_INSERT') {
      //loaiQd = "Bổ nhiệm mới";
      return this.listLoaiQd_BoNhiemMoi;
    } else if (state == 'STATE_BO_NHIEM_LAI') {
      return this.listLoaiQd_BoNhiemLai;
    } else if (state == 'STATE_BAI_NHIEM') {
      //loaiQd = "Bãi nhiệm";
      return this.listLoaiQd_BaiNhiem;
    }
  }

  onChonLoaiQD(): void {
    // ------------------ danh sach danh hieu theo cap khen thuong -----------------
    // this.http
    //     .get(DanhMucURL.getDanhhieuRaQD(this.capKtId, false, this.data.nhansu.donviId))
    //     .pipe(takeUntil(this._unsubscribeAll))
    //     .subscribe((res: any) => {
    //         if (res.state) {
    //             this.listDanhhieu = res.data;
    //         }
    //     });
  }

  startDate(event: MatDatepickerInputEvent<Date>): void {
    this.minDate = event.value;
    if (this.qtChucvu.ngayKT) {
      let stareYear = new Date(event.value).getFullYear();
      let endYear = new Date(this.qtChucvu.ngayKT).getFullYear();
      if (endYear - stareYear > 0)
        this.qtChucvu.thoihanbonhiem = endYear - stareYear;
    }
  }

  endDate(event: MatDatepickerInputEvent<Date>): void {
    this.maxDate = event.value;

    if (this.qtChucvu.ngayBD) {
      let stareYear = new Date(this.qtChucvu.ngayBD).getFullYear();
      let endYear = new Date(event.value).getFullYear();
      if (endYear - stareYear > 0)
        this.qtChucvu.thoihanbonhiem = endYear - stareYear;
    }
  }

  onHanbonhiem(value): void {
    if (this.qtChucvu.ngayBD) {
      let endDate = new Date(this.qtChucvu.ngayBD);
      endDate.setFullYear(endDate.getFullYear() + Number(value));
      this.qtChucvu.ngayKT = endDate;
    }
  }

  converToNumber(value: string): Number {
    let abc = value.replaceAll('.', '');
    return parseInt(abc);
  }

  async saveAndClose(): Promise<void> {
    try {
      if (this.minDate && this.maxDate && this.minDate > this.maxDate) {
        this.messageService.showWarningMessage(
          'Hệ thống',
          'Ngày hiệu lực phải nhỏ hơn ngày kết thúc!'
        );
        return;
      }
      if (this.registerForm.invalid) return;
      // Xử lý bất đồng bộ ở đây
      const qdnoidung = await ValidateQD.getStatusOfNsQdndung(
        this.http,
        this.mb,
        this.quyetdinh,
        this.messageService,
        this.insertFile
      );
      if (qdnoidung === null) return;

      const muctien = this.converToNumber(this.strMucTien);
      this.qtChucvu.nsQdndung = qdnoidung;

      this.qtChucvu.nsQdnoidungId = qdnoidung.qdinhId;
      this.qtChucvu.soQD = qdnoidung.soQd;
      this.qtChucvu.nguoiky = qdnoidung.nguoiky;
      this.qtChucvu.chucvuky = qdnoidung.chucvuKy;
      this.qtChucvu.ngayky = qdnoidung.ngayKy;
      this.qtChucvu.muctien = muctien;

      this.qtChucvu.nsID = this.data.nhansu.nsID;
      this.qtChucvu.donviId = this.data.nhansu.donviId;
      if (
        this.insertFile &&
        this.insertFile.length > 0 &&
        this.quyetdinh.isChangeFileAttach
      ) {
        let arrStr = this.insertFile[0].fileName.split('.');
        let extend = arrStr[arrStr - 1];
        this.qtChucvu.nsQdndung.fileAttach = this.insertFile[0];
        this.qtChucvu.nsQdndung.fileName = this.insertFile[0].fileName;
        this.qtChucvu.nsQdndung.fileExtend = extend;
      } else {
        this.qtChucvu.nsQdndung.fileAttach = this.quyetdinh.fileAttach;
      }
    } catch (error) {
      // Xử lý lỗi nếu có.
      console.error('Đã xảy ra lỗi: ', error);
    }

    this.matDialogRef.close(this.qtChucvu);
  }

  close(): void {
    this.matDialogRef.close();
  }
}
