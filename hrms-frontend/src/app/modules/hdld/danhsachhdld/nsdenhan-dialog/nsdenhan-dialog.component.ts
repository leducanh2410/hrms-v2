import { Component, EventEmitter, Inject, Output } from '@angular/core';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogRef,
} from '@angular/material/dialog';
import { MessageBox } from '../../../../fuse/components/message-box/message-box.provider';
import { Store } from '@ngrx/store';
import { AppState } from '../../../../ngxstore/state/app.state';
import { CommonApiService } from '../../../../services/commonHttp';
import { MessageService } from '../../../../shared/message.services';
import { Subject, takeUntil } from 'rxjs';
import { ThongtincanhbaoUI } from '../../model/ThongtincanhbaoUI';
import { HSNhansuURL } from '../../../../services/employe/hosonhansuURL';
import { FormdonviTreeComponent } from '../../../../../assets/lib/formdonvi-tree/src/public-api';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { TableModule } from 'primeng/table';
import { RadioButtonModule } from 'primeng/radiobutton';

@Component({
  selector: 'app-nsdenhan-dialog',
  templateUrl: './nsdenhan-dialog.component.html',
  styleUrls: ['./nsdenhan-dialog.component.scss'],
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    TableModule,
    RadioButtonModule,
  ],
})
export class NsdenhanDialogComponent {
  isLoading: boolean = true;
  isTableVisible: boolean = false; //
  donviId: any;
  tenDonvi: string;
  nsList1: [] = [];
  nsList2: [] = [];
  donviList: any[];

  selectedValue: any;
  fDate: Date;
  tDate: Date;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  _selectedRowData1: any[] = [];
  _selectedRowData2: any[] = [];
  @Output() selectedDataChange = new EventEmitter<any[]>();

  get selectedRowData1(): any[] {
    return this._selectedRowData1;
  }

  get selectedRowData2(): any[] {
    return this._selectedRowData2;
  }

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public matDialogRef: MatDialogRef<NsdenhanDialogComponent>,
    private messageService: MessageService,
    private http: CommonApiService,
    private _matDialog: MatDialog,
    private store: Store<AppState>,
    private mb: MessageBox
  ) {}

  ngOnInit(): void {
    this.selectedValue = 1; // mặc định hiển thị all nhân sự của đơn vị
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

    // this.loadThongtinHopdongList();
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

      this.loadThongtinHopdongList();
    });
  }

  onChonNS() {
    if (this.selectedValue == 1 || this.selectedValue == 2) {
      this.matDialogRef.close({
        param1: this._selectedRowData1,
        param2: false,
      });
    } else {
      this.matDialogRef.close({ param1: this._selectedRowData2, param2: true });
    }
  }

  onRadioButtonChange(event) {
    if (this.selectedValue == 1 || this.selectedValue == 2) {
      this.isTableVisible = false;
    } else if (this.selectedValue == 3) {
      this.isTableVisible = true;
    }
    this.loadThongtinHopdongList();
  }

  loadThongtinHopdongList() {
  }

  onRowSelect(event: any) {
    if (this.selectedValue == 1 || this.selectedValue == 2) {
      this._selectedRowData1.push(event.data);
      this.selectedDataChange.emit(this._selectedRowData1);
    } else {
      this._selectedRowData2.push(event.data);
      this.selectedDataChange.emit(this._selectedRowData2);
    }
  }

  onRowUnselect(event: any) {
    if (this.selectedValue == 1 || this.selectedValue == 2) {
      const index = this._selectedRowData1.findIndex(
        (item) => item === event.data
      );
      if (index !== -1) {
        this._selectedRowData1.splice(index, 1);
        this.selectedDataChange.emit(this._selectedRowData1);
      }
    } else {
      const index = this._selectedRowData2.findIndex(
        (item) => item === event.data
      );
      if (index !== -1) {
        this._selectedRowData2.splice(index, 1);
        this.selectedDataChange.emit(this._selectedRowData2);
      }
    }
  }
}
