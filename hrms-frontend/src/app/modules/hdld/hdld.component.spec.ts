import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HdldComponent } from './hdld.component';

describe('HdldComponent', () => {
  let component: HdldComponent;
  let fixture: ComponentFixture<HdldComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HdldComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HdldComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
