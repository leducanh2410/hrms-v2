import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoiduongnganhanComponent } from './boiduongnganhan.component';

describe('BoiduongnganhanComponent', () => {
  let component: BoiduongnganhanComponent;
  let fixture: ComponentFixture<BoiduongnganhanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BoiduongnganhanComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BoiduongnganhanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
