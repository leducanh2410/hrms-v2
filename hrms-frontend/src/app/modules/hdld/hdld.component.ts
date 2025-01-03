import { Component, OnInit } from '@angular/core';
import { TitleHead } from '../../core/navigation/navigation.types';
import { MessageKey } from '../../shared/AppUltil';
import { ShareData } from '../../shared/shareservice.service';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-hdld',
  templateUrl: './hdld.component.html',
  styleUrls: ['./hdld.component.scss'],
  imports: [RouterModule],
})
export class HdldComponent implements OnInit {
  constructor(private shareData: ShareData) {
    const title: TitleHead = {
      title: 'HĐLĐ',
      subTitle: 'Danh sách',
      search: false,
    };
    this.shareData.sendMessage(MessageKey.FN_HEADER_NAME, title);
  }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }
}
