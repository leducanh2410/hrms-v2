import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaotaoDialogComponent } from './daotao-dialog.component';

describe('DaotaoDialogComponent', () => {
  let component: DaotaoDialogComponent;
  let fixture: ComponentFixture<DaotaoDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DaotaoDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DaotaoDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
