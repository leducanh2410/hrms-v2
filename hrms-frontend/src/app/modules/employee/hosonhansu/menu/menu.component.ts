import {
  AfterViewInit,
  Component,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { NHAN_SU } from '../../../../shared/appkeymessages';
import { Subject, takeUntil } from 'rxjs';
import { ShareData } from '../../../../shared/shareservice.service';
import { ActivatedRoute } from '@angular/router';
import { ThongtinchungComponent } from '../thongtinchung/thongtinchung.component';
import {
  MatDrawer,
  MatDrawerContainer,
  MatDrawerContent,
} from '@angular/material/sidenav';
import { ListmenuComponent } from '../listmenu/listmenu.component';
import { PagesComponent } from '../pages/pages.component';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  imports: [
    ThongtinchungComponent,
    MatDrawerContainer,
    MatDrawer,
    ListmenuComponent,
    MatDrawerContent,
    PagesComponent,
  ],
})
export class MenuComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('thongtinchung') ttchung: ThongtinchungComponent;

  sub: any;
  is_new_phieu = false;
  drawerMode: 'over' | 'side' = 'side';
  drawerOpened: boolean = true;
  private _unsubscribeAll: Subject<any> = new Subject<any>();
  constructor(private subData: ShareData, private route: ActivatedRoute) {}
  ngAfterViewInit(): void {
    this.sub = this.route.data.subscribe((data) => {
      if (data['type'] == 'khoitao') {
        this.ttchung.khoitaohoso();
      } else if (data['type'] == 'capnhat') {
        this.ttchung.onChonNhansu();
      }
    });
  }

  ngOnInit(): void {
    this.subData
      .getMessage(NHAN_SU.TOGGLE_MENU)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(async (opened: any) => {
        this.drawerOpened = opened;
      });
  }

  onOpenedChange($event) {}

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next(null);
    this._unsubscribeAll.complete();
    this.sub?.unsubscribe();
  }
}
