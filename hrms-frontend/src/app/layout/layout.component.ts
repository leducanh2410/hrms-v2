import { Component } from '@angular/core';
// import { HeaderComponent } from "./header/header.component";
import { CommonModule } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule, Routes }   from '@angular/router';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import {MatSidenavModule} from '@angular/material/sidenav';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  imports: [CommonModule, MatTooltipModule, MatIconModule, 
    MatListModule, MatToolbarModule, RouterModule, MatExpansionModule,
     MatMenuModule, MatButtonModule, MatSidenavModule],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.css'
})
export class LayoutComponent {
  constructor(
    private _router: Router,
) {
}
  signOut(): void {
    this._router.navigate(['/sign-in']);
}
}
