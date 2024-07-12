import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { WeeklyGoalsItemComponent } from './weekly-goals-item.component';

describe('WeeklyGoalsItemComponent', () => {
  let component: WeeklyGoalsItemComponent;
  let fixture: ComponentFixture<WeeklyGoalsItemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [WeeklyGoalsItemComponent],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WeeklyGoalsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
