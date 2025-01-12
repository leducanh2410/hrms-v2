import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subject, takeUntil } from 'rxjs';
import { CommonApiService } from '../../../../../services/commonHttp';
import { MessageService } from '../../../../../shared/message.services';
import { Buttons } from '../../../../../fuse/components/message-box/common';
import { MessageBox } from '../../../../../fuse/components/message-box/message-box.provider';
import { llnsURL } from '../../../../../services/employe/llnsURL';
import { KhenthuongformComponent } from './khenthuongform/khenthuongform.component';
import { AppUltil } from '../../../../../shared/AppUltil';
import { CommonModule, formatDate } from '@angular/common';
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
import { DanhGia } from '../../model/danhgia';
import { THONG_TIN_CHUNG } from '../../model/thongtinchung';
import { DotDanhGia } from '../../model/dotdanhgia';
import { DanhGiaURL } from '../../../../../services/employe/danhgiaURL';

@Component({
  selector: 'app-khenthuongkyluat',
  templateUrl: './khenthuongkyluat.component.html',
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
    MatInputModule,
  ],
})
export class KhenthuongKyluatComponent implements OnInit {
  @Input('nsInfo') nhansu: THONG_TIN_CHUNG;
  dsKhenthuong: any = [
    {
      evaluationName: 'Đánh giá 1',
      startDate: new Date('2023-01-01'),
      endDate: new Date('2023-01-31'),
      deadline: new Date('2023-01-15'),
      comments: 'Excellent performance',
      personalEvaluation: 'Exceeded expectations',
      personalRating: 'A',
      score: 95,
      classification: 'Outstanding',
      strengths: 'Leadership, Teamwork',
      weaknesses: 'Time management',
      areasForImprovement: 'Improve presentation skills',
      salaryIncreaseResult: '10%',
      bonusResult: '5%',
    },
    {
      evaluationName: 'Đánh giá 2',
      startDate: new Date('2023-02-01'),
      endDate: new Date('2023-02-28'),
      deadline: new Date('2023-02-15'),
      comments: 'Good performance',
      personalEvaluation: 'Met expectations',
      personalRating: 'B',
      score: 85,
      classification: 'Satisfactory',
      strengths: 'Technical skills',
      weaknesses: 'Communication',
      areasForImprovement: 'Enhance stakeholder engagement',
      salaryIncreaseResult: '5%',
      bonusResult: '3%',
    },
    {
      evaluationName: 'Đánh giá 3',
      startDate: new Date('2023-03-01'),
      endDate: new Date('2023-03-31'),
      deadline: new Date('2023-03-15'),
      comments: 'Needs improvement',
      personalEvaluation: 'Below expectations',
      personalRating: 'C',
      score: 70,
      classification: 'Needs Improvement',
      strengths: 'Creativity',
      weaknesses: 'Focus',
      areasForImprovement: 'Work on project management',
      salaryIncreaseResult: 'No increase',
      bonusResult: 'None',
    },
  ];
  dsKyluat: any;
  dsSangkien: any;
  listNgKy: any[] = [];
  listChucVu: any[] = [];

  listDanhGia: DanhGia[] = [];

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _matDialog: MatDialog,
    private http: CommonApiService,
    private messageService: MessageService,
    private mb: MessageBox
  ) {}

  ngOnInit(): void {
    // this.loadDataKhenThuong();
    // this.loadDataKyLuat();

    if (this.nhansu) {
      this.listDanhGia = this.nhansu.danhGia;

      // this.http
      //   .get(llnsURL.getTdktSangkienByid(this.nhansu.id))
      //   .pipe(takeUntil(this._unsubscribeAll))
      //   .subscribe((res: any) => {
      //     if (!res || !res.state) return;
      //     this.dsSangkien = res.data;
      //   });
    }
  }

  addKhenThuong(): void {
    const dialogRef = this._matDialog.open(KhenthuongformComponent, {
      width: '900px',
      data: {
        addNew: true,
        nhansu: this.nhansu,
        listNgKy: this.listNgKy,
        listChucVu: this.listChucVu,
        khenthuong: {
          soQD: '',
          nguoiKy: '',
          chucvuKy: '',
          ngayKy: null,
          namQD: null,
          lydo: '',
        },
      },
    });

    dialogRef.afterClosed().subscribe((result) => {});
  }

  updateKhenThuong(danhGia): void {
    const dialogRef = this._matDialog.open(KhenthuongformComponent, {
      width: '900px',
      disableClose: true,
      data: {
        nhansu: this.nhansu,
        danhGia: danhGia,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.http
          .post(llnsURL.createDanhGiaByEmpId(1), result)
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
      }
    });
  }

  deleteKhenthuong(id) {
    let dialog = this.mb.showDefault(
      'Bạn có chắc chắn muốn muốn xóa thông tin không?',
      Buttons.YesNo
    );
    dialog.dialogResult$.subscribe(async (result) => {
      if (result) {
        this.http
          .delete(llnsURL.createDanhGiaByEmpId(id))
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
          });
      }
    });
  }

}
