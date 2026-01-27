import { CommonModule } from '@angular/common';
import { Component, signal, output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-task-ai',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './task-ai.html',
  styleUrl: './task-ai.css',
})
export class TaskAi {
  prompt = '';
  isLoading = signal(false);

  taskGenerated = output<void>(); // Notifica successo creazione task

  constructor(private taskService: TaskService, private router: Router) { }

  onCancel() {
    this.router.navigate(['/tasks']);
  }

  handleGeneration() {
    this.isLoading.set(true);

    this.taskService.generateAiTask(this.prompt).subscribe({
      next: () => {
        this.prompt = '';
        this.taskGenerated.emit(); // Notifico il genitore
        this.isLoading.set(false);

        this.router.navigate(['tasks']);
      },
      error: (err) => {
        console.error(err);
        alert("Errore durante la generazione: " + err.message);
        this.isLoading.set(false);
      } 
    });
  }
}
