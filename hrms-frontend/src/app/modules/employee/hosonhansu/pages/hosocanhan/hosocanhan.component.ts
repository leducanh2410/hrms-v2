import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { CommonApiService } from '../../../../../services/commonHttp';
import { EmployeURL } from '../../../../../services/employe/employeURL';
import { MessageService } from '../../../../../shared/message.services';
import { Buttons } from '../../../../../fuse/components/message-box/common';
import { MessageBox } from '../../../../../fuse/components/message-box/message-box.provider';
import { llnsURL } from '../../../../../services/employe/llnsURL';
import { HosoformComponent } from './hosoform/hosoform.component';
import FileSaver from 'file-saver';
import { FileviewComponent } from '../../../../components/fileview/fileview.component';
import { AppUltil } from '../../../../../shared/AppUltil';
import { DividerModule } from 'primeng/divider';
import { TableModule } from 'primeng/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-hosocanhan',
  templateUrl: './hosocanhan.component.html',
  imports: [DividerModule, TableModule, CommonModule],
})
export class HosocanhanComponent implements OnInit {
  @Input('nsInfo') nhansu: any;
  listNsGiayto: any;

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _matDialog: MatDialog,
    private http: CommonApiService,
    private messageService: MessageService,
    private mb: MessageBox
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    if (this.nhansu) {
      this.http
        .get(llnsURL.getNsGiaytoByNsId(this.nhansu.nsID))
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((res: any) => {
          if (!res || !res.state) return;
          this.listNsGiayto = res.data;
        });
    }
  }

  add(): void {
    const dialogRef = this._matDialog.open(HosoformComponent, {
      width: '1500px',
      height: '800px',
      data: {
        giadinh: {},
        nhansu: this.nhansu,
        listNsGiayto: this.listNsGiayto,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.loadData();
    });
  }

  downloadFileQD(idQD): void {
    this.http
      .get(llnsURL.getFileHosoGiayto(idQD))
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (!res || !res.state) {
          return;
        }
        var fileQD = res.data;
        if (fileQD) {
          const blob = AppUltil.base64ToBlob(fileQD.fileContent);
          FileSaver.saveAs(blob, fileQD.fileName);
        } else {
          this.messageService.showWarningMessage(
            'Hệ thống',
            'Hồ sơ, giấy tờ không có File đính kèm!'
          );
        }
      });
    return;
  }

  viewFileQD(idQD): void {
    this.http
      .get(llnsURL.getFileHosoGiayto(idQD))
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (!res || !res.state) {
          return;
        }

        var fileQD = res.data;
        if (fileQD) {
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
        } else {
          this.messageService.showWarningMessage(
            'Hệ thống',
            'Hồ sơ, giấy tờ không có File đính kèm!'
          );
          return;
        }
      });
    return;
  }

  delete(id) {
    let dialog = this.mb.showDefault(
      'Bạn có chắc chắn muốn muốn xóa thông tin không?',
      Buttons.YesNo
    );
    dialog.dialogResult$.subscribe(async (result) => {
      if (result) {
        this.http
          .delete(llnsURL.deleteNsGiayto(id))
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
            this.loadData();
          });
      }
    });
  }
}
