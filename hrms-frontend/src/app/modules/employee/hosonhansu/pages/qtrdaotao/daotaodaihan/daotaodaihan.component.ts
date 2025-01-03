import { Component, Input } from '@angular/core';
import { KetquadaotaocanhanUI } from '../../../model/ketQuaDaotaoCanhanUI';
import { DaotaoCanhanURL } from '../../../../../../services/employe/daotaocanhanURL';
import { CommonApiService } from '../../../../../../services/commonHttp';
import { Subject, takeUntil } from 'rxjs';
import { DaotaoDialogComponent } from './daotao-dialog/daotao-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MessageBox } from '../../../../../../fuse/components/message-box/message-box.provider';
import { AppState } from '../../../../../../ngxstore/state/app.state';
import { Store } from '@ngrx/store';
import { Buttons } from '../../../../../../fuse/components/message-box/common';
import { MessageService } from '../../../../../../shared/message.services';
import { DividerModule } from 'primeng/divider';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-daotaodaihan',
  templateUrl: './daotaodaihan.component.html',
  styleUrls: ['./daotaodaihan.component.scss'],
  imports: [
    DividerModule,
    FormsModule,
    CommonModule,
    TableModule,
    MatTooltipModule,
  ],
})
export class DaotaodaihanComponent {
  @Input('nsInfo') nhansu: any;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  public daotaoList: KetquadaotaocanhanUI[] = [];

  constructor(
    private store: Store<AppState>,
    private http: CommonApiService,
    private _matDialog: MatDialog,
    private messageService: MessageService,
    private mb: MessageBox
  ) {}

  ngOnInit(): void {
    this.loadDaotaoList();
  }

  loadDaotaoList() {
    if (this.nhansu) {
      this.http
        .get(DaotaoCanhanURL.getDsKetquakhoaDt(this.nhansu.nsID))
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((res) => {
          this.daotaoList = res.data;
        });
    }
  }

  themDaotao(): void {
    const dialogRef = this._matDialog.open(DaotaoDialogComponent, {
      width: '800px',
      disableClose: true,
      data: {
        nhansu: this.nhansu,
        addNew: true,
      },
    });
  }

  updateDaotao(daotao) {
    const dialogRef = this._matDialog.open(DaotaoDialogComponent, {
      width: '800px',
      disableClose: true,
      data: {
        nhansu: this.nhansu,
        daotaoSelected: daotao,
        addNew: false,
      },
    });
  }

  deleteDaotao(daotao) {
    let dialog = this.mb.showDefault(
      'Bạn có chắc chắn muốn muốn xóa thông tin không?',
      Buttons.YesNo
    );

    dialog.dialogResult$.subscribe(async (result) => {
      if (result) {
        this.http
          .post(DaotaoCanhanURL.deleteDaotaoBoiduong(), daotao)
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

            this.loadDaotaoList();
          });
      }
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
  }
}
