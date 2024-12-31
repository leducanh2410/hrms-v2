import { Component, Inject, OnInit } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DIALOG_DATA, MatDialogRef, MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatTooltipModule } from '@angular/material/tooltip';
import { TreeNode } from 'primeng/api';
import { TreeModule } from 'primeng/tree';

@Component({
  selector: 'lib-formdonvi-tree',
  templateUrl: './formdonvi-tree.component.html',
  styleUrls: [
    './formdonvi-tree.component.css',
  ],
  imports: [
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
    TreeModule,
  ]
})
export class FormdonviTreeComponent implements OnInit {
  selected: any;
  donvis!: TreeNode[]
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public matDialogRef: MatDialogRef<FormdonviTreeComponent>,
    private _matDialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.donvis = this.data.donvis.filter((item: { orgParentId: null; }) => item.orgParentId == null).map((e: { organizationId: any; orgName: any; }) => ({
      key: e?.organizationId,
      label: e?.orgName,
      data: e,
      styleClass: "font-bold",
      expanded: true
    }));
    if (!this.donvis || this.donvis.length == 0) {
      let rootNode = this.data.donvis[0];
      this.data.donvis.forEach((element:any) => {
        if (element.orgLevel < rootNode.orgLevel) {
          rootNode = element;
        }
      });
      this.donvis = [{
        key: rootNode?.organizationId,
        label: rootNode?.orgName,
        data: rootNode,
        styleClass: "font-bold",
        expanded: true
      }];
    }
    this.donvis.forEach(element => {
      this.findChildren(this.data.donvis, element);
    });
  }

  findChildren(donvis: any[], element: TreeNode<any>) {
    element.children = donvis.filter((item: { orgParentId: any; }) => (item.orgParentId && item.orgParentId === element.data.orgCode)).map((e: { organizationId: any; orgName: any; }) => ({
      key: e?.organizationId,
      label: e?.orgName,
      data: e,
      styleClass: "font-normal",
    }))
    if (element.children && element.children.length > 0) {
      element.styleClass = "font-semibold"
    }
    element.children.forEach((child: any) => {
      this.findChildren(donvis, child);
    });
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
        orgName: null,
        organizationId: null
      }
    });
  }

  onClose(): void {
    // Close the dialog
    this.matDialogRef.close();
  }
}
