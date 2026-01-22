import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskAi } from './task-ai';

describe('TaskAi', () => {
  let component: TaskAi;
  let fixture: ComponentFixture<TaskAi>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskAi]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskAi);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
