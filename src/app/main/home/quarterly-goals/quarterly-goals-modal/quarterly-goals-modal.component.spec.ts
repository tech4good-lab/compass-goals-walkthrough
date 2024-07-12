import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuarterlyGoalsModalComponent } from './quarterly-goals-modal.component';

describe('QuarterlyGoalsModalComponent', () => {
  let component: QuarterlyGoalsModalComponent;
  let fixture: ComponentFixture<QuarterlyGoalsModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [QuarterlyGoalsModalComponent],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuarterlyGoalsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
