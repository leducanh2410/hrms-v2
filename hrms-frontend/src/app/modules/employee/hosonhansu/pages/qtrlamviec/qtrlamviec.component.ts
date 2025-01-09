import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { NHAN_SU } from '../../../../../shared/appkeymessages';
import { takeUntil } from 'rxjs';
import { Subject } from 'rxjs/internal/Subject';
import { MatDialog } from '@angular/material/dialog';
import { ChucvuComponent } from './chucvu/chucvu.component';
import { LamviecComponent } from './lamviec/lamviec.component';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { DieudongComponent } from './dieudong/dieudong.component';
import { DoantheComponent } from './doanthe/doanthe.component';
import { KyhdldComponent } from './kyhdld/kyhdld.component';
@Component({
  selector: 'app-qtrlamviec',
  templateUrl: './qtrlamviec.component.html',
  styleUrls: ['./qtrlamviec.component.scss'],
  imports:[
    LamviecComponent,
    MatAccordion,
    MatExpansionModule,
    ChucvuComponent,
    DieudongComponent,
    DoantheComponent,
    KyhdldComponent
  ]
})
export class QtrlamviecComponent implements OnInit, OnChanges {
  @Input('nsInfo') nsInfo: any;
  data: any[];

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(private _matDialog: MatDialog) {}
  ngOnChanges(): void {}

  ngOnInit(): void {}
}
