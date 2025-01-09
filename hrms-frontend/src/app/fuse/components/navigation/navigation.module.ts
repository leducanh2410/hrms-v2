import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { FuseScrollbarModule } from '../../directives/scrollbar/scrollbar.module';
import { FuseHorizontalNavigationBasicItemComponent } from '../navigation/horizontal/components/basic/basic.component';
import { FuseHorizontalNavigationBranchItemComponent } from '../navigation/horizontal/components/branch/branch.component';
import { FuseHorizontalNavigationDividerItemComponent } from '../navigation/horizontal/components/divider/divider.component';
import { FuseHorizontalNavigationSpacerItemComponent } from '../navigation/horizontal/components/spacer/spacer.component';
import { FuseHorizontalNavigationComponent } from '../navigation/horizontal/horizontal.component';
import { FuseVerticalNavigationAsideItemComponent } from '../navigation/vertical/components/aside/aside.component';
import { FuseVerticalNavigationBasicItemComponent } from '../navigation/vertical/components/basic/basic.component';
import { FuseVerticalNavigationCollapsableItemComponent } from '../navigation/vertical/components/collapsable/collapsable.component';
import { FuseVerticalNavigationDividerItemComponent } from '../navigation/vertical/components/divider/divider.component';
import { FuseVerticalNavigationGroupItemComponent } from '../navigation/vertical/components/group/group.component';
import { FuseVerticalNavigationSpacerItemComponent } from '../navigation/vertical/components/spacer/spacer.component';
import { FuseVerticalNavigationComponent } from '../navigation/vertical/vertical.component';

@NgModule({
    declarations: [
        FuseHorizontalNavigationBasicItemComponent,
        FuseHorizontalNavigationBranchItemComponent,
        FuseHorizontalNavigationDividerItemComponent,
        FuseHorizontalNavigationSpacerItemComponent,
        FuseHorizontalNavigationComponent,
        FuseVerticalNavigationAsideItemComponent,
        FuseVerticalNavigationBasicItemComponent,
        FuseVerticalNavigationCollapsableItemComponent,
        FuseVerticalNavigationDividerItemComponent,
        FuseVerticalNavigationGroupItemComponent,
        FuseVerticalNavigationSpacerItemComponent,
        FuseVerticalNavigationComponent
    ],
    imports     : [
        CommonModule,
        RouterModule,
        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatMenuModule,
        MatTooltipModule,
        FuseScrollbarModule
    ],
    exports     : [
        FuseHorizontalNavigationComponent,
        FuseVerticalNavigationComponent
    ]
})
export class FuseNavigationModule
{
}
