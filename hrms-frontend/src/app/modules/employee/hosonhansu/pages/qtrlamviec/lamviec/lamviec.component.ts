import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonApiService } from '../../../../../../services/commonHttp';
import { HSNhansuURL } from '../../../../../../services/employe/hosonhansuURL';
import { Subject } from 'rxjs/internal/Subject';
import { THONG_TIN_CHUNG } from '../../../model/thongtinchung';
import { takeUntil } from 'rxjs';
import { LamviecdialogComponent } from './lamviecDialog/lamviecdialog/lamviecdialog.component';
import { MessageService } from '../../../../../../shared/message.services';
import { Buttons } from '../../../../../../fuse/components/message-box/common';
import { MessageBox } from '../../../../../../fuse/components/message-box/message-box.provider';
import { AppUltil } from '../../../../../../shared/AppUltil';
import FileSaver from 'file-saver';
import { DividerModule } from 'primeng/divider';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TableModule } from 'primeng/table';
import { QtrinhlamviecBean } from '../../../model/qtrinhlamviec';
import { llnsURL } from '../../../../../../services/employe/llnsURL';
import { ExportUtil } from '../../../../../../core/utilities/exportExcel';

@Component({
  selector: 'app-lamviec',
  templateUrl: './lamviec.component.html',
  styleUrls: ['./lamviec.component.scss'],
  imports: [DividerModule, CommonModule, FormsModule, TableModule],
})
export class LamviecComponent implements OnInit, OnChanges {
  @Input('nsInfo') nsInfo: THONG_TIN_CHUNG;

  listQuaTrinhLamViec: QtrinhlamviecBean[];
  private exportUtil: ExportUtil = new ExportUtil();

  private _unsubscribeAll: Subject<any> = new Subject<any>();
  constructor(
    private _matDialog: MatDialog,
    private http: CommonApiService,
    private messageService: MessageService,
    private mb: MessageBox
  ) {}
  ngOnChanges(): void {
    if (this.nsInfo != null && this.nsInfo?.id != null) {
      // this.http
      //   .get(HSNhansuURL.getQtlamviec(this.nsInfo?.id))
      //   .pipe(takeUntil(this._unsubscribeAll))
      //   .subscribe((res: any) => {
      //     if (!res || !res.state) return;
      //     this.data = res.data;
      //   });
    }
  }

  ngOnInit(): void {
    this.loadData();
  }

  exportExcel() {
    const excelData = this.listQuaTrinhLamViec.map((qtr) => {
      return {
        'Ngày hiệu lực': qtr.ngayHieuLuc,
        'Ngày quyết định': qtr.ngayQuyetDinh,
        'Loại qtct': qtr.loaiQtct.tenLoaiQtct,
        'Phòng ban': qtr.department.departmentName,
        'Chức danh': qtr.chucdanh.tenchucanh,
        'Thành phần nhân sự': qtr.thanhphannhansu.tenThanhphannhansu,
        'Cấp độ nhân sự': qtr.capdonhansu.tenCapdonhansu,
        'Dòng xe': qtr.dongxe.tendongxe,
        'Loại lao động': qtr.loailaodong.tenLoailaodong,
        'Nghiệp vụ': qtr.nghiepvu.tenNghiepvu,
        'Pháp nhân': qtr.phapnhan.tenPhapNhan,
        'Văn phòng làm việc': qtr.vanphonglamviec.tenVanphonglamviec,
        'Ghi chú': qtr.ghiChu,
      };
    });

    this.exportUtil.exportExcel(
      excelData,
      'Danh sách quá trình làm việc_' + Date.now()
    );
  }

  loadData(): void {
    this.http
      .get(llnsURL.getQTCTByEmpId(this.nsInfo.id))
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (res.state == 200) {
          this.listQuaTrinhLamViec = res.data;
        }
      });
  }

  themQTCT() {
    const dialogRef = this._matDialog.open(LamviecdialogComponent, {
      width: '900px',
      disableClose: true,
      data: {
        nsId: this.nsInfo?.id,
        addNew: true,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.loadData();
    });
  }

  suaQTCT(qtct) {
    const dialogRef = this._matDialog.open(LamviecdialogComponent, {
      width: '900px',
      disableClose: true,
      data: {
        qtctId: qtct.id,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.loadData();
    });
  }

  delete(id) {
    let dialog = this.mb.showDefault(
      'Bạn có chắc chắn muốn muốn xóa thông tin không?',
      Buttons.YesNo
    );
    dialog.dialogResult$.subscribe(async (result) => {
      if (result) {
        this.http
          .delete(llnsURL.deleteQTCT(id))
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe((res: any) => {
            console.log(res);

            if (res.state == 200) {
              this.messageService.showSuccessMessage(
                'Hệ thống',
                'Xóa thành công'
              );
              this.loadData();
              return;
            }
            this.messageService.showErrorMessage(
              'Hệ thống',
              'Xóa thông tin không thành công'
            );
          });
      }
    });
  }
}
