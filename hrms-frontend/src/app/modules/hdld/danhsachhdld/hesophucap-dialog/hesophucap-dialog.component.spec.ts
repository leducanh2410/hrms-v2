import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HesophucapDialogComponent } from './hesophucap-dialog.component';

describe('HesophucapDialogComponent', () => {
  let component: HesophucapDialogComponent;
  let fixture: ComponentFixture<HesophucapDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HesophucapDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HesophucapDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
