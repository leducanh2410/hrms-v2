import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NsdenhanDialogComponent } from './nsdenhan-dialog.component';

describe('NsdenhanDialogComponent', () => {
  let component: NsdenhanDialogComponent;
  let fixture: ComponentFixture<NsdenhanDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NsdenhanDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NsdenhanDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
