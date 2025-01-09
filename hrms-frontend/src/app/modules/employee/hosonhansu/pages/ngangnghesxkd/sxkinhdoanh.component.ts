import { Component, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MessageBox } from '../../../../../fuse/components/message-box/message-box.provider';
import { CommonApiService } from '../../../../../services/commonHttp';
import { QuatrinhLamviecURL } from '../../../../../services/employe/quatrinhlamviecURL';
import { MessageService } from '../../../../../shared/message.services';
import { SxkdformComponent } from './sxkdform/sxkdform.component';
import { Buttons } from '../../../../../fuse/components/message-box/common';
import { Subject, takeUntil } from 'rxjs';
import { DanhMucURL } from '../../../../../services/employe/danhmucURL';
import FileSaver from 'file-saver';
import { AppUltil } from '../../../../../shared/AppUltil';
import { CommonModule, formatDate } from '@angular/common';
import { llnsURL } from '../../../../../services/employe/llnsURL';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FileUploadModule } from 'primeng/fileupload';
import { MatSelectModule } from '@angular/material/select';
import { DividerModule } from 'primeng/divider';
import { TableModule } from 'primeng/table';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-sxkd',
  templateUrl: './sxkinhdoanh.component.html',
  imports: [
    MatFormFieldModule,
    CommonModule,
    FormsModule,
    MatCheckboxModule,
    MatOptionModule,
    MatDatepickerModule,
    FileUploadModule,
    MatSelectModule,
    DividerModule,
    TableModule,
    MatInputModule
  ],
})
export class SxKinhdoanhComponent {
  @Input('nsInfo') nhansu: any;

  listNsNganhkte: any[] = [];

  private _unsubscribeAll: Subject<any> = new Subject<any>();
  constructor(
    private _matDialog: MatDialog,
    private http: CommonApiService,
    private messageService: MessageService,
    private mb: MessageBox
  ) {}

  ngOnInit(): void {
    this.loadDsNsNganhkte();
  }

  loadDsNsNganhkte(): void {
    if (this.nhansu) {
      this.http
        .get(llnsURL.getNsNganhkteByNsID(this.nhansu.nsID))
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((res: any) => {
          if (res || res.state) {
            this.listNsNganhkte = res.data;
          }
        });
    }
  }

  addNew(): void {
    const dialogRef = this._matDialog.open(SxkdformComponent, {
      disableClose: true,
      width: '900px',
      data: {
        nhansu: this.nhansu,
        NsNganhkte: { nnKte: null },
        addNew: true,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.loadDsNsNganhkte();
    });
  }

  update(data): void {
    const dialogRef = this._matDialog.open(SxkdformComponent, {
      width: '900px',
      disableClose: true,
      data: {
        nhansu: this.nhansu,
        NsNganhkte: data,
        addNew: false,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.http
          .post(llnsURL.saveQtSXKD(), result)
          .pipe(takeUntil(this._unsubscribeAll))
          .subscribe((res: any) => {
            if (!res || !res.state) {
              this.messageService.showErrorMessage(
                'Hệ thống',
                'Cập nhật thông tin không thành công'
              );
              return;
            }
            this.messageService.showSuccessMessage(
              'Hệ thống',
              'Cập nhật thành công'
            );
            this.loadDsNsNganhkte();
          });
      }
      this.loadDsNsNganhkte();
    });
  }

  delete(id): void {
    let dialog = this.mb.showDefault(
      'Bạn có chắc chắn muốn muốn xóa thông tin không?',
      Buttons.YesNo
    );
    dialog.dialogResult$.subscribe(async (result) => {
      if (result) {
        this.http
          .delete(llnsURL.deleteNsNganhkte(id))
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
            this.loadDsNsNganhkte();
          });
      }
    });
  }

  xuatExcel() {
    var data = {};
    var columName = ['Từ ngày', 'Đến ngày', 'Ngành nghề SXKD', 'Ghi chú'];
    var dataBody = [];
    if (this.listNsNganhkte && this.listNsNganhkte.length > 0) {
      for (let index = 0; index < this.listNsNganhkte.length; index++) {
        const element = this.listNsNganhkte[index];
        var tungay = '';
        var denngay = '';
        if (element.ngayBdau) {
          tungay = formatDate(element?.ngayBdau, 'dd/MM/yyyy', 'en-US');
        }
        if (element.ngayKthuc) {
          denngay = formatDate(element?.ngayKthuc, 'dd/MM/yyyy', 'en-US');
        }
        var arr = [tungay, denngay, element.nnKte?.name, element.ghichu];
        dataBody.push(arr);
      }
      data = { columName, dataBody };

      this.http
        .post(DanhMucURL.xuatExcel(), data)
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((res: any) => {
          if (!res || !res.state) {
            return;
          }

          const blob = AppUltil.base64ToBlob(res.data);
          FileSaver.saveAs(blob, 'NganhNgheSXKD.xls');
        });
    }
  }
}
