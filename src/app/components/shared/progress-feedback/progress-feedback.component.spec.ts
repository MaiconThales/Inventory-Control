import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProgressFeedbackComponent } from './progress-feedback.component';

describe('ProgressFeedbackComponent', () => {
  let component: ProgressFeedbackComponent;
  let fixture: ComponentFixture<ProgressFeedbackComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProgressFeedbackComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ProgressFeedbackComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
