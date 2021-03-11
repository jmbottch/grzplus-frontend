import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PsychoDashboardComponent } from './psycho-dashboard.component';

describe('PsychoDashboardComponent', () => {
  let component: PsychoDashboardComponent;
  let fixture: ComponentFixture<PsychoDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PsychoDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PsychoDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
