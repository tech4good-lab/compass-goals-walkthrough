import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { QuarterlyGoalsItemComponent } from './quarterly-goals-item.component';

describe('QuarterlyGoalsItemComponent', () => {
  let component: QuarterlyGoalsItemComponent;
  let fixture: ComponentFixture<QuarterlyGoalsItemComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [QuarterlyGoalsItemComponent],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuarterlyGoalsItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
