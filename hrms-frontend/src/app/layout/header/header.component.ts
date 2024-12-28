import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { SearchComponent } from '../common/search/search.component';
import { MatMenuModule } from '@angular/material/menu';
import { BehaviorSubject, Subject, takeUntil } from 'rxjs';
import { User } from '../../core/user/user.types';
import {MatDividerModule} from '@angular/material/divider';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, MatIconModule, SearchComponent, MatMenuModule, MatDividerModule,
    CommonModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  user$ = new BehaviorSubject<User>({});
  signOut(): void
  {
      // Sign out
      // this._authService.signOut();
      // this._cookie.delete(AuthConfig.ACCESS_TOKEN, '/', API.ORG_DOMAIN, true, 'Lax');
      // this._cookie.delete(AuthConfig.REFRESH_TOKEN, '/', API.ORG_DOMAIN, true, 'Lax');
      // this._cookie.delete('__Secure-PSID', '/', API.ORG_DOMAIN, true, 'Lax');
      // this._router.navigate(['/sign-in']);
  }
}
