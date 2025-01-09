import { NgModule } from '@angular/core';
import { HosonhansuComponent } from './hosonhansu.component';
import { Route, RouterModule } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { QuillModule } from 'ngx-quill'


const routes: Route[] = [
  {
    path: '',
    component: HosonhansuComponent,
    children: [
      {
        path: '',
        component: MenuComponent
      }
    ]
  }
];

@NgModule({
  declarations: [
    
  ],
  imports: [
    RouterModule.forChild(routes),
    QuillModule.forRoot(),
  ],
  exports: [
    
  ]
})
export class HosonhansuModule { }
