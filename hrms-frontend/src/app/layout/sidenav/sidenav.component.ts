import { Component } from '@angular/core';
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
@Component({
  selector: 'app-sidenav',
  imports: [CommonModule, MatTooltipModule, MatIconModule, MatListModule, MatToolbarModule,
      MatMenuModule, MatButtonModule, MatExpansionModule, MatSidenavModule, RouterModule
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent {
  // isCollapsed: boolean = true;
  // items: any[] = [];
  // toggleCollapsable(): void
  // {
  //     // Toggle collapse/expand
  //     if ( this.isCollapsed )
  //     {
  //         this.expand();
  //     }
  //     else
  //     {
  //         this.collapse();
  //     }
  // }
  isCollapsed = false;
  hoverItem: string | null = null;

  menuItems = [
    { label: 'Dashboard', icon: 'dashboard', submenu: ['Overview', 'Stats', 'Reports'] },
    { label: 'Users', icon: 'people', submenu: ['List', 'Roles', 'Permissions'] },
    { label: 'Settings', icon: 'settings', submenu: ['Profile', 'Account', 'Security'] },
  ];

  toggleCollapse() {
    this.isCollapsed = !this.isCollapsed;
  }
}
