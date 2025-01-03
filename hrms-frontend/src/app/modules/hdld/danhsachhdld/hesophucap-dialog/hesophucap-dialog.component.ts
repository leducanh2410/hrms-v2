import { Component, OnInit } from '@angular/core';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { CommonApiService } from '../../../../services/commonHttp';
import { hdldURL } from '../../../../services/employe/hdldURL';
import { Subject, takeUntil } from 'rxjs';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { TableModule } from 'primeng/table';
import { RadioButtonModule } from 'primeng/radiobutton';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-hesophucap-dialog',
  templateUrl: './hesophucap-dialog.component.html',
  styleUrls: ['./hesophucap-dialog.component.scss'],
  imports: [
    FormsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    TableModule,
    RadioButtonModule,
    CommonModule,
    MatDialogModule
  ],
})
export class HesophucapDialogComponent implements OnInit {
  selected: any;
  columns: string[];
  phucapList: any[] = [];
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private http: CommonApiService,
    public matDialogRef: MatDialogRef<HesophucapDialogComponent>
  ) {}

  ngOnInit(): void {
    this.columns = [
      'Tên phụ cấp',
      'I',
      'II',
      'III',
      'IV',
      'V',
      'VI',
      'VII',
      'VIII',
      'IX',
      'X',
    ];

    // this.http
    //   .get(hdldURL.GetPhucapList())
    //   .pipe(takeUntil(this._unsubscribeAll))
    //   .subscribe((res) => {
    //     if (res.state) {
    //       this.phucapList = res.data;
    //     }
    //   });
  }

  // double click to choose and close
  onSelectHeso(phucap) {
    this.selected = phucap;
    if (this.selected == undefined || this.selected == null) {
      return;
    }
    this.matDialogRef.close(this.selected);
  }

  onClose(): void {
    // Close the dialog
    this.matDialogRef.close();
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
