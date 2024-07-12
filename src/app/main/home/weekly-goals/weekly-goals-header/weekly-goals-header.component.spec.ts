import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyGoalsHeaderComponent } from './weekly-goals-header.component';

describe('WeeklyGoalsHeaderComponent', () => {
  let component: WeeklyGoalsHeaderComponent;
  let fixture: ComponentFixture<WeeklyGoalsHeaderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [WeeklyGoalsHeaderComponent],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeeklyGoalsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
