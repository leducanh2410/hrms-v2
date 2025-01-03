import { Component, Input } from '@angular/core';
import { CommonApiService } from '../../../../../../services/commonHttp';
import { DaotaoCanhanURL } from '../../../../../../services/employe/daotaocanhanURL';
import { Subject, takeUntil } from 'rxjs';
import { KetquadaotaocanhanUI } from '../../../model/ketQuaDaotaoCanhanUI';
import { BoiduongDialogComponent } from './boiduong-dialog/boiduong-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { Buttons } from '../../../../../../fuse/components/message-box/common';
import { MessageBox } from '../../../../../../fuse/components/message-box/message-box.provider';
import { AppState } from '../../../../../../ngxstore/state/app.state';
import { Store } from '@ngrx/store';
import { MessageService } from '../../../../../../shared/message.services';
import { DividerModule } from 'primeng/divider';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { MatTooltipModule } from '@angular/material/tooltip';

@Component({
  selector: 'app-boiduongnganhan',
  templateUrl: './boiduongnganhan.component.html',
  styleUrls: ['./boiduongnganhan.component.scss'],
  imports: [
    DividerModule,
    FormsModule,
    CommonModule,
    TableModule,
    MatTooltipModule,
  ],
})
export class BoiduongnganhanComponent {
  @Input('nsInfo') nhansu: any;
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  daotaoSelected: KetquadaotaocanhanUI = {};

  public boiduongList: KetquadaotaocanhanUI[] = [];

  constructor(
    private http: CommonApiService,
    private _matDialog: MatDialog,
    private messageService: MessageService,
    private mb: MessageBox
  ) {}

  ngOnInit(): void {
    this.loadBoiduongList();
  }

  loadBoiduongList() {
    if (this.nhansu) {
      this.http
        .get(DaotaoCanhanURL.getDsKetquakhoaBd(this.nhansu.nsID))
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((res) => {
          this.boiduongList = res.data;
        });
    }
  }

  themBoiduong(): void {
    const dialogRef = this._matDialog.open(BoiduongDialogComponent, {
      width: '800px',
      disableClose: true,
      data: {
        nhansu: this.nhansu,
        addNew: true,
      },
    });
  }

  updateBoiduong(boiduong) {
    const dialogRef = this._matDialog.open(BoiduongDialogComponent, {
      width: '800px',
      disableClose: true,
      data: {
        nhansu: this.nhansu,
        boiduongSelected: boiduong,
        addNew: false,
      },
    });
  }

  deleteBoiduong(boiduong) {
    let dialog = this.mb.showDefault(
      'Bạn có chắc chắn muốn muốn xóa thông tin không?',
      Buttons.YesNo
    );

    dialog.dialogResult$.subscribe(async (result) => {
      if (result) {
        boiduong.isdaihan = false;
        this.http
          .post(DaotaoCanhanURL.deleteDaotaoBoiduong(), boiduong)
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

            this.loadBoiduongList();
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
