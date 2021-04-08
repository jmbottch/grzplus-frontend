import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PractitionersCardComponent } from './practitioners-card.component';

describe('PractitionersCardComponent', () => {
  let component: PractitionersCardComponent;
  let fixture: ComponentFixture<PractitionersCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PractitionersCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PractitionersCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
