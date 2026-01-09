import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskNavbar } from './task-navbar';

describe('TaskNavbar', () => {
  let component: TaskNavbar;
  let fixture: ComponentFixture<TaskNavbar>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TaskNavbar]
    })
      .compileComponents();

    fixture = TestBed.createComponent(TaskNavbar);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
