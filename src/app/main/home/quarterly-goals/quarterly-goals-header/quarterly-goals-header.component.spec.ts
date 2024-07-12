import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuarterlyGoalsHeaderComponent } from './quarterly-goals-header.component';

describe('QuarterlyGoalsHeaderComponent', () => {
  let component: QuarterlyGoalsHeaderComponent;
  let fixture: ComponentFixture<QuarterlyGoalsHeaderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [QuarterlyGoalsHeaderComponent],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuarterlyGoalsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
