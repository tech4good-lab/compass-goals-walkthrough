import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuarterlyGoalsComponent } from './quarterly-goals.component';

describe('QuarterlyGoalsComponent', () => {
  let component: QuarterlyGoalsComponent;
  let fixture: ComponentFixture<QuarterlyGoalsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [QuarterlyGoalsComponent],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuarterlyGoalsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
