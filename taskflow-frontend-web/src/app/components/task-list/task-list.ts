import { Component, effect, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CreateTask, Priority, Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { TaskNavbar } from '../task-navbar/task-navbar';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink, TaskNavbar],
  templateUrl: './task-list.html',
  styleUrl: './task-list.css'
})
export class TaskList {
  taskList = signal<Task[]>([]);
  isLoading = signal(true);

  totalPages = signal(0);
  totalElements = signal(0);
  pageSize = 12;

  newTask: CreateTask = {
    title: '',
    description: '',
    status: 'TODO',
    priority: Priority.MEDIUM,
    deadline: '',
    estimatedTimeMinutes: 0
  }

  private taskService = inject(TaskService);

  get currentPage() {
    return this.taskService.currentPage();
  }

  constructor() {
    effect(() => {
      const page = this.taskService.currentPage();
      this.loadTasks(page);
    });
  }

  loadTasks(page: number) {
    this.isLoading.set(true);

    this.taskService.getTasks(page, this.pageSize).subscribe({
      next: (response) => {
        this.taskList.set(response.content);
        this.totalPages.set(response.totalPages);
        this.totalElements.set(response.totalElements);
        this.taskService.setPage(response.number);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.log('Errore durante il caricamento', err);
        this.isLoading.set(false);
      }
    });
  }

  addTask() {
    if (this.newTask.title.length > 0) {
      this.taskService.createTask(this.newTask).subscribe({
        next: (savedTask) => {
          this.taskList.update(tasks => [savedTask, ...tasks]);
          this.newTask = {
            title: '',
            description: '',
            status: 'TODO',
            priority: Priority.MEDIUM,
            deadline: '',
            estimatedTimeMinutes: 0
          };
          console.log('Task salvato!', savedTask);
        },
        error: (err) => {
          console.log('Errore durante il salvataggio', err);
        }
      });
    }
  }

  removeTask(taskId: number) {
    this.taskService.deleteTask(taskId).subscribe({
      next: () => {
        this.loadTasks(this.taskService.currentPage());
        console.log('Task eliminato e metadati ricaricati dal server');
      },
      error: (err) => {
        console.log('Errore durante la cancellazione della task', err);
      }
    });
  }

  updateStatus(task: Task) {
    const newStatus = task.status === 'DONE' ? 'TODO' : 'DONE';

    this.taskService.patchStatus(task.id!, newStatus).subscribe({
      next: updatedTask => {
        this.taskList.update(tasks =>
          tasks.map(t => t.id === updatedTask.id ? updatedTask : t)
        );
      },
      error: err => {
        console.log('Errore durante la modifica dello status', err);
      }
    });
  }

  getPriorityEclamation(priority: string) {
    switch (priority.toUpperCase()) {
      case 'LOW': return '!';
      case 'MEDIUM': return '!!';
      case 'HIGH': return '!!!';
      default: return '';
    }
  }

  getPriorityColor(priority: string) {
    switch (priority.toUpperCase()) {
      case 'LOW': return '#28a745';
      case 'MEDIUM': return '#ffc107';
      case 'HIGH': return '#dc3545';
      default: return '#6c757d';
    }
  }
}
