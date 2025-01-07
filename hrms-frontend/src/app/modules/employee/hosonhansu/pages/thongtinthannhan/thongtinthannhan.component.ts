import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { CommonApiService } from '../../../../../services/commonHttp';
import { EmployeURL } from '../../../../../services/employe/employeURL';
import { MessageService } from '../../../../../shared/message.services';
import { Buttons } from '../../../../../fuse/components/message-box/common';
import { MessageBox } from '../../../../../fuse/components/message-box/message-box.provider';
import { llnsURL } from '../../../../../services/employe/llnsURL';
import { GiadinhformComponent } from './giadinhform/giadinhform.component';
import { NguoiphuthuocformComponent } from './nguoiphuthuocform/nguoiphuthuocform.component';
import { assign } from 'lodash';
import { DividerModule } from 'primeng/divider';
import { TableModule } from 'primeng/table';
import { CheckboxModule } from 'primeng/checkbox';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Person {
  fullName: string;
  relationship: string;
  dateOfBirth: Date;
  gender: string;
  occupation: string;
  address: string;
}

@Component({
  selector: 'app-thongtinthannhan',
  templateUrl: './thongtinthannhan.component.html',
  imports: [
    DividerModule,
    TableModule,
    CheckboxModule,
    CommonModule,
    FormsModule,
  ],
})
export class ThongtinthannhanComponent implements OnInit {
  @Input('nsInfo') nhansu: any;
  thannhan: any;
  nguoiphuthuoc: any;

  people: Person[] = [
    {
      fullName: 'Nguyễn Văn A',
      relationship: 'Bố',
      dateOfBirth: new Date('1980-01-01'),
      gender: 'Nam',
      occupation: 'Kỹ sư',
      address: 'Hà Nội',
    },
    {
      fullName: 'Trần Thị B',
      relationship: 'Mẹ',
      dateOfBirth: new Date('1985-05-05'),
      gender: 'Nữ',
      occupation: 'Giáo viên',
      address: 'Hà Nội',
    },
    {
      fullName: 'Lê Văn C',
      relationship: 'Em trai',
      dateOfBirth: new Date('2000-10-10'),
      gender: 'Nam',
      occupation: 'Sinh viên',
      address: 'Hà Nội',
    },
    // Thêm nhiều dữ liệu nếu cần
  ];
  //nhansu: any = {donviId: 115, nsId : 115000000000002};

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _matDialog: MatDialog,
    private http: CommonApiService,
    private messageService: MessageService,
    private mb: MessageBox
  ) {}

  ngOnInit(): void {
    // this.loadData();
  }

  loadData() {
    if (this.nhansu) {
      this.http
        .get(llnsURL.getDsPTGiaDinh(this.nhansu.nsID))
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((res: any) => {
          if (!res || !res.state) return;
          this.thannhan = res.data;
        });

      this.http
        .get(llnsURL.getDsNguoiPT(this.nhansu.nsID))
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((res: any) => {
          if (!res || !res.state) return;
          this.nguoiphuthuoc = res.data;
          console.log(res.data);
        });
    }
  }

  add(): void {
    const dialogRef = this._matDialog.open(GiadinhformComponent, {
      width: '900px',
      data: {
        giadinh: {},
        nhansu: this.nhansu,
        addNew: true,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.loadData();
    });
  }

  update(data): void {
    const dialogRef = this._matDialog.open(GiadinhformComponent, {
      width: '900px',
      disableClose: true,
      data: { giadinh: data, nhansu: this.nhansu, addNew: false },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.http
          .post(llnsURL.updatePTGiaDinh(), result)
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
          });
        this.loadData();
      }
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
          .delete(llnsURL.deletePTGiaDinh(id))
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

  //----------------------------- nguoi phu thuoc ---------------------------------
  addNgPhuThuoc(): void {
    const dialogRef = this._matDialog.open(NguoiphuthuocformComponent, {
      width: '900px',
      data: {
        giadinh: { lQhenguoiphuthuoc: { id: 0 } },
        nhansu: this.nhansu,
        addNew: true,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      dialogRef.afterClosed();
      this.loadData();
    });
  }

  updateNgPhuThuoc(data): void {
    const dialogRef = this._matDialog.open(NguoiphuthuocformComponent, {
      width: '900px',
      disableClose: true,
      data: {
        giadinh: data,
        nhansu: this.nhansu,
        addNew: false,
      },
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.http
          .post(llnsURL.updateNguoiPT(), result)
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
          });
        this.loadData();
      }
      this.loadData();
    });
  }

  deleteNgPhuThuoc(id) {
    let dialog = this.mb.showDefault(
      'Bạn có chắc chắn muốn muốn xóa thông tin không?',
      Buttons.YesNo
    );
    dialog.dialogResult$.subscribe(async (result) => {
      if (result) {
        this.http
          .delete(llnsURL.deleteNguoiPT(id))
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
