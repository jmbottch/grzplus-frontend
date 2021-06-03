import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GoalsCardComponent } from './goals-card.component';

describe('GoalsCardComponent', () => {
  let component: GoalsCardComponent;
  let fixture: ComponentFixture<GoalsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GoalsCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GoalsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
