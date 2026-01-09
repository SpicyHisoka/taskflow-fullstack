import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { CreateTask } from '../../models/task.model';

@Component({
  selector: 'app-task-add',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './task-add.html',
  styleUrl: './task-add.css',
})
export class TaskAdd {
  private taskService = inject(TaskService);
  private router = inject(Router);

  newTask: CreateTask = {
    title: '',
    description: '',
    status: 'TODO'
  };

  addTask() {
    if (this.newTask.title.trim().length > 0) {
      this.taskService.createTask(this.newTask).subscribe({
        next: (savedTask) => {
          console.log('Task creato con successo', savedTask);

          this.router.navigate(['/tasks']);
        },
        error: (err) => {
          console.log('Errore durante il salvataggio', err);
        }
      });
    }
  }

  onCancel() {
    this.router.navigate(['/tasks']);
  }
}
