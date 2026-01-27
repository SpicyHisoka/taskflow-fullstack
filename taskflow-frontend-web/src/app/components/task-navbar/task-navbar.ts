import { Component, inject } from '@angular/core';
import { TaskService } from '../../services/task.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-task-navbar',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './task-navbar.html',
  styleUrl: './task-navbar.css',
})
export class TaskNavbar {
  // private taskService = inject(TaskService);

  // homeClick() {
  //   this.taskService.resetToFirstPage();
  // }
}
