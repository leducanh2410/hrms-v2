import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaoHdldDialogComponent } from './taohdld-dialog.component';

describe('TaoHdldDialogComponent', () => {
  let component: TaoHdldDialogComponent;
  let fixture: ComponentFixture<TaoHdldDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaoHdldDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaoHdldDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
