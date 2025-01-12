import {
  Component,
  CUSTOM_ELEMENTS_SCHEMA,
  EventEmitter,
  forwardRef,
  Inject,
  Output,
} from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { MessageBox } from '../../../../fuse/components/message-box/message-box.provider';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../ngxstore/state/app.state';
import { CommonApiService } from '../../../../services/commonHttp';
import { HSNhansuURL } from '../../../../services/employe/hosonhansuURL';
import { MessageService } from '../../../../shared/message.services';
import moment from 'moment';
import { Moment } from 'moment';
import { Subject, takeUntil } from 'rxjs';
import { FormdonviTreeComponent } from '../../../../../assets/lib/formdonvi-tree/src/public-api';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { TableModule } from 'primeng/table';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { CheckboxModule } from 'primeng/checkbox';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { InputNumberModule } from 'primeng/inputnumber';
import { CommonModule } from '@angular/common';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-taohdld-dialog',
  templateUrl: './taohdld-dialog.component.html',
  styleUrls: ['./taohdld-dialog.component.scss'],
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    TableModule,
    ReactiveFormsModule,
    DropdownModule,
    InputTextModule,
    InputTextareaModule,
    CheckboxModule,
    ButtonModule,
    CalendarModule,
    InputNumberModule,
    FormsModule,
    CommonModule,
    AutoCompleteModule,
    MatIconModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class TaoHdldDialogComponent {
  phapNhanOptions = [
    { label: 'Công ty A', value: 1 },
    { label: 'Công ty B', value: 2 },
  ];

  pheDuyetOptions = [
    { label: 'Duyệt', value: 1 },
    { label: 'Chờ duyệt', value: 2 },
    { label: 'Không duyệt', value: 3 },
  ];

  selectedDate: Date;
  selectedPheDuyet: number;

  donviId: any;
  tenDonvi: string;
  donviList: any[];
  nsList: [] = [];
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  selectedValue: any;
  fDate: Moment = moment();
  tDate: Moment = moment();
  _selectedRowData: any[] = [];
  @Output() selectedDataChange = new EventEmitter<any[]>();

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public matDialogRef: MatDialogRef<TaoHdldDialogComponent>,
    private messageService: MessageService,
    private http: CommonApiService,
    private _matDialog: MatDialog,
    private store: Store<AppState>,
    private mb: MessageBox,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    if (this.data != null && this.data.donviId != null) {
      this.donviId = this.data.donviId;
    }

    // this.http
    //   .get(HSNhansuURL.getAllListDonvi())
    //   .pipe(takeUntil(this._unsubscribeAll))
    //   .subscribe((res: any) => {
    //     if (!res || !res.state) return;
    //     this.donviList = res.data;
    //   });
  }

  close(): void {
    this.matDialogRef.close();
  }

  onChonDonvi() {
    const dialogRef = this._matDialog.open(FormdonviTreeComponent, {
      disableClose: false,
      data: {
        donvis: this.donviList,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      this.donviId = result.data.organizationId;
      this.tenDonvi = result.data.orgName;
      this.loadData();
    });
  }

  onChonNS() {
    this.matDialogRef.close(this._selectedRowData);
  }

  onChangeTuNgay(event: any): void {
    this.loadData();
  }

  onChangeDenNgay(event: any): void {
    this.loadData();
  }

  onChangeDate() {
    this.loadData();
  }

  loadData() {
    if (this.fDate && this.tDate) {
      // Lấy năm
      const year = this.fDate.year();
      // Lấy tháng (đánh số từ 0 đến 11)
      const month = this.fDate.month() + 1;

    }
  }

  onRowSelect(event: any) {
    this._selectedRowData.push(event.data);
    this.selectedDataChange.emit(this._selectedRowData);
  }

  onRowUnselect(event: any) {
    const index = this._selectedRowData.findIndex(
      (item) => item === event.data
    );
    if (index !== -1) {
      this._selectedRowData.splice(index, 1);
      this.selectedDataChange.emit(this._selectedRowData);
    }
  }
}
