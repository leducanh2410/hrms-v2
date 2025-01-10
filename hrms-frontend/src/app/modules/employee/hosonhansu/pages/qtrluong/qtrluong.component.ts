import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonApiService } from '../../../../../services/commonHttp';
import { HSNhansuURL } from '../../../../../services/employe/hosonhansuURL';
import { Subject, takeUntil } from 'rxjs';
import { THONG_TIN_CHUNG } from '../../model/thongtinchung';
import { LuongdialogComponent } from './luongdialog/luongdialog.component';
import { MessageBox } from '../../../../../fuse/components/message-box/message-box.provider';
import { Buttons } from '../../../../../fuse/components/message-box/common';
import { QuatrinhLuongURL } from '../../../../../services/employe/quatrinhluongURL';
import { MessageService } from '../../../../../shared/message.services';
import { DanhMucURL } from '../../../../../services/employe/danhmucURL';
import { AppUltil } from '../../../../../shared/AppUltil';
import FileSaver from 'file-saver';
import { FileviewComponent } from '../../../../components/fileview/fileview.component';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { TableModule } from 'primeng/table';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NumberFormatPipe } from '../../../../../shared/formatNumber';
import { Luong } from '../../model/luong';

@Component({
  selector: 'app-qtrluong',
  templateUrl: './qtrluong.component.html',
  styleUrls: ['./qtrluong.component.scss'],
  imports: [
    MatAccordion,
    MatExpansionModule,
    TableModule,
    FormsModule,
    CommonModule,
  ],
})
export class QtrluongComponent implements OnInit, OnChanges {
  @Input('nsInfo') nsInfo: any;
  @ViewChild('qtrluongdieuchinh') qtrluongdieuchinh: any;
  listLuong: Luong[] = [];
  dataPhucap: any[];
  model: THONG_TIN_CHUNG;

  private _unsubscribeAll: Subject<any> = new Subject<any>();
  constructor(
    private _matDialog: MatDialog,
    private http: CommonApiService,
    private messageService: MessageService,
    private mb: MessageBox
  ) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.loadDataLuong();
  }
  ngOnInit(): void {
    this.model = this.nsInfo;

    console.log('nhan su', this.nsInfo);
    // this.loadDataLuong();
    // this.loadDataPhucap();
  }

  loadDataLuong(): void {
    this.http
      .get(HSNhansuURL.getDsLuong(this.nsInfo?.id))
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (!res || !res.state) return;
        this.listLuong = res.data;
      });
  }

  viewFileQD(idQD): void {
    this.http
      .get(DanhMucURL.getFileQuyetDinh(idQD))
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (!res || !res.state) {
          return;
        }
        var fileQD = res.data;
        const dialogRef = this._matDialog.open(FileviewComponent, {
          width: '1000px',
          disableClose: true,
          data: {
            fileId: fileQD.fileId,
            fileContent: fileQD.fileContent,
            fileExten: fileQD.fileExten,
            fileName: fileQD.fileName,
          },
        });
        dialogRef.afterClosed().subscribe((result) => {
          if (result) {
          }
        });
      });
    return;
  }

  themluong() {
    const dialogRef = this._matDialog.open(LuongdialogComponent, {
      width: '1000px',
      disableClose: true,
      data: {
        nsID: this.nsInfo?.nsID,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.loadDataLuong();
    });
  }

  sualuong(nsLuong): void {
    const dialogRef = this._matDialog.open(LuongdialogComponent, {
      width: '1000px',
      disableClose: true,
      data: {
        nsLuong: nsLuong,
        nsInfo: this.nsInfo,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.loadDataLuong();
    });
  }

  delete(id) {
    let dialog = this.mb.showDefault(
      'Bạn có chắc chắn muốn muốn xóa quá trình lương này không?',
      Buttons.YesNo
    );

    dialog.dialogResult$.subscribe(async (result) => {
      if (result) {
        this.http
          .delete(QuatrinhLuongURL.deleteNsLuong(id))
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
            this.loadDataLuong();
          });
      }
    });
  }
}
