import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdlCardComponent } from './adl-card.component';

describe('AdlCardComponent', () => {
  let component: AdlCardComponent;
  let fixture: ComponentFixture<AdlCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdlCardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdlCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
