import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { Subject } from 'rxjs/internal/Subject';
import { MatDialog } from '@angular/material/dialog';
import { DaotaodaihanComponent } from './daotaodaihan/daotaodaihan.component';
import { BoiduongnganhanComponent } from './boiduongnganhan/boiduongnganhan.component';
import { NuocngoaiComponent } from './nuocngoai/nuocngoai.component';

@Component({
  selector: 'app-qtrdaotao',
  templateUrl: './qtrdaotao.component.html',
  styleUrls: ['./qtrdaotao.component.scss'],
  imports:[
    DaotaodaihanComponent,
    BoiduongnganhanComponent,
    NuocngoaiComponent
  ]
})
export class QtrdaotaoComponent implements OnInit,OnChanges{
  @Input('nsInfo') nsInfo: any;

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _matDialog: MatDialog,
  ){
    

  }
  ngOnChanges(): void {
    
  }

  ngOnInit(): void {
  }



}
