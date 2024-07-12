import { waitForAsync, ComponentFixture, TestBed } from '@angular/core/testing';

import { LongTermGoalsHeaderComponent } from './long-term-goals-header.component';

describe('LongTermGoalsHeaderComponent', () => {
  let component: LongTermGoalsHeaderComponent;
  let fixture: ComponentFixture<LongTermGoalsHeaderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [LongTermGoalsHeaderComponent],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LongTermGoalsHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
