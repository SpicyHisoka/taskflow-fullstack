import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { CreateTask, Priority } from '../../models/task.model';

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
    status: 'TODO',
    priority: Priority.MEDIUM,
    deadline: '',
    estimatedTimeMinutes: 0
  };

  addTask() {
    if (this.newTask.title.trim().length === 0) {
      console.warn('Il titolo è obbligatorio');
      return;
    }

    this.taskService.createTask(this.newTask).subscribe({
      next: (savedTask) => {
        console.log('Task creato con successo', savedTask);
        this.router.navigate(['/tasks']);
      },
      error: (err) => {
        console.error('Errore durante il salvataggio del task', err);
        alert('Si è verificato un errore durante la creazione del task.');
      }
    });
  }

  onCancel() {
    this.router.navigate(['/tasks']);
  }
}