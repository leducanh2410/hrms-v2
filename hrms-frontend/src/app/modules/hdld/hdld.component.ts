import { Component, OnInit } from '@angular/core';
import { TitleHead } from '../../core/navigation/navigation.types';
import { MessageKey } from '../../shared/AppUltil';
import { ShareData } from '../../shared/shareservice.service';
import { RouterModule } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ChiTietNhanvienURL } from '../../services/chitietnhanvien/chitietnhanvienURL';
import { CommonApiService } from '../../services/commonHttp';
import { NhanVien } from '../employee/hosonhansu/model/nhanvien';

@Component({
  selector: 'app-hdld',
  templateUrl: './hdld.component.html',
  styleUrls: ['./hdld.component.scss'],
  imports: [RouterModule],
})
export class HdldComponent implements OnInit {
  listNhanVien: NhanVien[] = [];
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(private shareData: ShareData,
        private http: CommonApiService
    
  ) {
    const title: TitleHead = {
      title: 'HĐLĐ',
      subTitle: 'Danh sách',
      search: false,
    };
    this.shareData.sendMessage(MessageKey.FN_HEADER_NAME, title);
  }
  
  ngOnInit(): void {
      
  }
}
