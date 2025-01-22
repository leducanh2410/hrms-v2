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
import { ExportUtil } from '../../../../../core/utilities/exportExcel';

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

  private exportUtil: ExportUtil = new ExportUtil();

  xepLoai = [
    {
      name: 'A+',
      id: 0,
    },
    {
      name: 'A',
      id: 1,
    },
    {
      name: 'B',
      id: 2,
    },
    {
      name: 'B-',
      id: 3,
    },
    {
      name: 'C',
      id: 2,
    },
    {
      name: 'D',
      id: 3,
    },
  ];

  capDoDanhGia = [
    {
      name: 'Giỏi',
      id: 0,
    },
    {
      name: 'Khá',
      id: 1,
    },
    {
      name: 'Trung bình',
      id: 2,
    },
    {
      name: 'Yếu',
      id: 3,
    },
  ];

  constructor(
    private _matDialog: MatDialog,
    private http: CommonApiService,
    private messageService: MessageService,
    private mb: MessageBox
  ) {}

  ngOnInit(): void {
    if (this.nhansu) {
      this.loadDanhGia();
    }
  }

  loadDanhGia() {
    this.http
      .get(DanhGiaURL.getDanhGiaByEmpId(this.nhansu.id))
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (res.state == 200) this.listDanhGia = res.data;
      });
  }

  addKhenThuong(): void {
    const dialogRef = this._matDialog.open(KhenthuongformComponent, {
      width: '900px',
      data: {
        addNew: true,
        nhansu: this.nhansu,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.loadDanhGia();
    });
  }

  updateKhenThuong(danhGia): void {
    const dialogRef = this._matDialog.open(KhenthuongformComponent, {
      width: '900px',
      disableClose: true,
      data: {
        nhansu: this.nhansu,
        danhGiaId: danhGia.id,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.loadDanhGia();
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
          .delete(DanhGiaURL.deleteDanhGia(id))
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
            this.loadDanhGia();
          });
      }
    });
  }

  exportExcel() {
    const excelData = this.listDanhGia?.map((danhGia) => {
      return {
        'Đợt đánh giá': danhGia.dotDanhGia.tenDotDanhGia,
        'Thời gian đánh giá': danhGia.thoiGianTuNgay + '-' + danhGia.thoiGianDenNgay,
        'Thời hạn': danhGia.thoiHan,
        'Nhận xét': danhGia.nhanXet,
        'Cá nhân đánh giá': danhGia.caNhanDanhGia,
        'Cá nhân xếp loại': danhGia.caNhanXepLoai,
        'Điểm mạnh': danhGia.diemManh,
        'Hạn chế': danhGia.hanChe,
        'Cần cải thiện': danhGia.canCaiThien,
        'Điểm': danhGia.diem,
        'Xếp loại': this.xepLoai.find(c => c.id == danhGia.xepLoai).name,
        'Kết quả tăng lương': this.capDoDanhGia.find(c => c.id == danhGia.ketQuaTangLuong).name,
        'Kết quả thưởng': this.capDoDanhGia.find(c => c.id == danhGia.ketQuaThuong).name,
      };
    });
    this.exportUtil.exportExcel(excelData, 'Danh sách đánh giá_' + Date.now());
  }
}
