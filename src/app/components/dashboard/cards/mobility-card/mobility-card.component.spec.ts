import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MobilityCardComponent } from './mobility-card.component';

describe('MobilityCardComponent', () => {
  let component: MobilityCardComponent;
  let fixture: ComponentFixture<MobilityCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MobilityCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MobilityCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
