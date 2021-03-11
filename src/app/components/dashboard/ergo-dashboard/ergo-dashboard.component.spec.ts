import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErgoDashboardComponent } from './ergo-dashboard.component';

describe('ErgoDashboardComponent', () => {
  let component: ErgoDashboardComponent;
  let fixture: ComponentFixture<ErgoDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErgoDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErgoDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
