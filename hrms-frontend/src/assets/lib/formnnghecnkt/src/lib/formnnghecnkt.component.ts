import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TreeNode } from 'primeng/api';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TreeModule } from 'primeng/tree';


@Component({
  selector: 'lib-formnnghecnkt',
  templateUrl: './formnnghecnkt.component.html',
  styleUrls: [
    './formnnghecnkt.component.css'
  ],
  imports:[
    MatCheckboxModule,
    MatTooltipModule,
    MatBadgeModule,
    MatDialogModule,
    MatDividerModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatProgressBarModule,
    MatSelectModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    TreeModule
  ]
})
export class FormnnghecnktComponent implements OnInit {
  selected: any;
  nnghe!: TreeNode[]
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public matDialogRef: MatDialogRef<FormnnghecnktComponent>,
    private _matDialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.nnghe = this.data.lnhomnghe.filter((item: { idNhomngheCha: null; }) => item.idNhomngheCha == null).map((e: { id: any; name: any; }) => ({
      label: e.name,
      data: e,
      styleClass: "font-bold",
      selectable: false,
      expanded: true
    }));
    this.nnghe.forEach(element => {
      this.findChildren(this.data.lnhomnghe, this.data.lnghe, element);
    });
  }

  findChildren(nhomNnghe: any[], dsachNghe: any[], element: TreeNode<any>) {
    element.children = nhomNnghe.filter((item: { idNhomngheCha: any; }) => (item.idNhomngheCha && item.idNhomngheCha == element.data.id)).map((e: { id: any; name: any; }) => ({
      label: e.name,
      data: e,
      styleClass: "font-bold",
      selectable: false
    }))

    let ngheChildren: any[] = dsachNghe.filter((item: { idNhomNgheCnkt: any; }) => (item.idNhomNgheCnkt && item.idNhomNgheCnkt == element.data.id)).map((e: { id: any; name: any; }) => ({
      key: e.id,
      label: e.name,
      data: e,
      styleClass: "font-normal"
    }))

    element.children.forEach((child: any) => {
      this.findChildren(nhomNnghe, dsachNghe, child);
    });

    element.children.push(...ngheChildren)
  }

  saveAndClose(): void {
    if (this.selected == undefined || this.selected == null) {
      return;
    }
    this.matDialogRef.close(this.selected);
  }

  unSelectAndClose(): void {
    this.matDialogRef.close({
      data: {
        id: null,
        name: null
      }
    });
  }

  onClose(): void {
    // Close the dialog
    this.matDialogRef.close();
  }
}
