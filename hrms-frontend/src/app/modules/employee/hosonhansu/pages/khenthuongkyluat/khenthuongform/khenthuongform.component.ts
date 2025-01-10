import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { Buttons } from '../../../../../../fuse/components/message-box/common';
import { MessageBox } from '../../../../../../fuse/components/message-box/message-box.provider';
import { FileviewComponent } from '../../../../../components/fileview/fileview.component';
import { ChonquyetdinhComponent } from '../../../../../components/chonquyetdinh/chonquyetdinh.component';
import { ValidateQD } from '../../../../../components/qdnoidung/validateQD';
import { CommonApiService } from '../../../../../../services/commonHttp';
import { DanhMucURL } from '../../../../../../services/employe/danhmucURL';
import { llnsURL } from '../../../../../../services/employe/llnsURL';
import { AppUltil } from '../../../../../../shared/AppUltil';
import { MessageService } from '../../../../../../shared/message.services';
import FileSaver from 'file-saver';
import { FormquyetdinhComponent } from '../../../../../../../assets/lib/formquyetdinh/src/public-api';
import { FileUpload, FileUploadModule } from 'primeng/fileupload';
import { Observable, Subject, takeUntil } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { DividerModule } from 'primeng/divider';
import { TableModule } from 'primeng/table';
import { TooltipModule } from 'primeng/tooltip';
import { DropdownModule } from 'primeng/dropdown';
import { MatInputModule } from '@angular/material/input';
import { InputTextModule } from 'primeng/inputtext';
import { CalendarModule } from 'primeng/calendar';
import { DanhGiaURL } from '../../../../../../services/employe/danhgiaURL';
import { DotDanhGia } from '../../../model/dotdanhgia';
import { DanhGia } from '../../../model/danhgia';
import { THONG_TIN_CHUNG } from '../../../model/thongtinchung';

@Component({
  selector: 'app-khenthuongform',
  templateUrl: './khenthuongform.component.html',
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
    TooltipModule,
    DropdownModule,
    MatInputModule,
    InputTextModule,
    CalendarModule,
  ],
})
export class KhenthuongformComponent implements OnInit {
  registerForm: FormGroup;

  nsInfo : THONG_TIN_CHUNG = new THONG_TIN_CHUNG();
  danhGia: DanhGia = new DanhGia();
  listDotDanhGia: DotDanhGia[] = [];4

  timeDanhGiaTu: Date = new Date();
  timeDanhGiaDen: Date = new Date();
  thoiHan : Date = new Date();

  private _unsubscribeAll: Subject<any> = new Subject<any>();
  protected _onDestroy = new Subject<void>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public matDialogRef: MatDialogRef<KhenthuongformComponent>,
    private messageService: MessageService,
    private _matDialog: MatDialog,
    private http: CommonApiService,
    private formBuilder: FormBuilder,
    private mb: MessageBox
  ) {
    this.danhGia = data?.danhGia;
    this.nsInfo = data?.nhansu;
    this.timeDanhGiaTu = new Date(this.danhGia.thoiGianTuNgay)
    this.timeDanhGiaDen = new Date(this.danhGia.thoiGianDenNgay)
    this.thoiHan = new Date(this.danhGia.thoiHan)
  }

  ngOnInit(): void {
    this.loadAllDotDanhGia();
  }

  loadAllDotDanhGia() {
    this.http
      .get(DanhGiaURL.getAllDotDanhGia())
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (!res || !res.state) return;
        this.listDotDanhGia = res.data;
      });
  }

  async saveAndClose(): Promise<void> {}

  nhapTiep(): void {
    this.data.khenthuong = {};
    this.data.addNew = true;
  }

  close(): void {
    this.matDialogRef.close();
  }
}
