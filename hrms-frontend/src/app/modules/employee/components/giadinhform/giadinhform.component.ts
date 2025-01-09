import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonApiService } from '../../../../services/commonHttp';
import { DanhMucURL } from '../../../../services/employe/danhmucURL';
import { Subject, takeUntil } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { CheckboxModule } from 'primeng/checkbox';
import { DropdownModule } from 'primeng/dropdown';
import { FileUploadModule } from 'primeng/fileupload';

@Component({
  selector: 'app-giadinhform',
  templateUrl: './giadinhform.component.html',
  styleUrls: ['./giadinhform.component.scss'],
  imports: [
    CommonModule,
    DropdownModule,
    MatButtonModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatRadioModule,
    MatSelectModule,
    FormsModule,
    MatCheckboxModule,
    MatDatepickerModule,
    DropdownModule,
    CheckboxModule,
    FileUploadModule,
    MatInputModule,
    MomentDateModule,
    AutoCompleteModule,
  ],
})
export class GiadinhformComponent implements OnInit {
  data: any;
  stateForm: boolean;

  _fileForm: any;
  ngaysinhTamthoi: Date;
  listQhegd: any[];

  private _unsubscribeAll: Subject<any> = new Subject<any>();
  constructor(
    @Inject(MAT_DIALOG_DATA) public obj: any,
    public matDialogRef: MatDialogRef<GiadinhformComponent>,
    private http: CommonApiService
  ) {}

  ngOnInit(): void {
    if (this.obj) {
      this.data = this.obj.product;
      this.stateForm = this.obj.state;
    }

    this.http
      .get(DanhMucURL.getListQhegiadinh())
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((res: any) => {
        if (!res || !res.state) return;
        this.listQhegd = res.data;
      });
    if (this.data.namsinh && !this.data.ngaysinh) {
      this.ngaysinhTamthoi = new Date(this.data.namsinh, 0, 1);
    }
  }

  onChangeQhe(idQhe) {
    this.data.tenquanhe = this.listQhegd.find((item) => item.id == idQhe).name;
    console.log(this.data.tenquanhe);
  }

  saveAndClose(): void {
    this.matDialogRef.close(this.data);
  }

  close(): void {
    this.matDialogRef.close();
  }
}
