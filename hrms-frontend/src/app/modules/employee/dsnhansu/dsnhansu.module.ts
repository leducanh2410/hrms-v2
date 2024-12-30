import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Route, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { CheckboxModule } from 'primeng/checkbox';
import { InputSwitchModule } from 'primeng/inputswitch';
import { TableModule } from 'primeng/table';
import { TreeModule } from 'primeng/tree';
import { DialogDsNhansuColumnSelectComponent } from './dialog-ds-nhansu-column-select/dialog-ds-nhansu-column-select.component';
import { DsnhansuComponent } from './dsnhansu.component';
import { TooltipModule } from 'primeng/tooltip';
import { MatMenuModule } from '@angular/material/menu';
import { NgxExtendedPdfViewerModule } from 'ngx-extended-pdf-viewer';
import { StoreModule } from '@ngrx/store';


const routes: Route[] = [
    {
        path: '',
        component: DsnhansuComponent,
    },
];
@NgModule({
    declarations: [DsnhansuComponent, DialogDsNhansuColumnSelectComponent],
    imports: [
        RouterModule.forChild(routes),
        CommonModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        FormsModule,
        TableModule,
        CheckboxModule,
        MatInputModule,
        TreeModule,
        MatDialogModule,
        ButtonModule,
        InputSwitchModule,
        TooltipModule,
        MatMenuModule,
        NgxExtendedPdfViewerModule,
        StoreModule
    ],
})
export class DsnhansuModule {}
