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
import { LamviecComponent } from './lamviec/lamviec.component';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
@Component({
  selector: 'app-qtrlamviec',
  templateUrl: './qtrlamviec.component.html',
  styleUrls: ['./qtrlamviec.component.scss'],
  imports:[
    LamviecComponent,
    MatAccordion,
    MatExpansionModule,
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
