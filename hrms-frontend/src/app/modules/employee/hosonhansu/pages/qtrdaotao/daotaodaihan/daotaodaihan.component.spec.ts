import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DaotaodaihanComponent } from './daotaodaihan.component';

describe('DaotaodaihanComponent', () => {
  let component: DaotaodaihanComponent;
  let fixture: ComponentFixture<DaotaodaihanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DaotaodaihanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DaotaodaihanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
