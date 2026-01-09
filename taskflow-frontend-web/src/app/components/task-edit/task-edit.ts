import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-edit',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './task-edit.html',
  styleUrl: './task-edit.css',
})
export class TaskEdit implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private taskService = inject(TaskService);

  task = signal<any>(null);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.taskService.getTaskById(id).subscribe({
      next: data => this.task.set(data),
      error: err => console.log('Errore nel recupero task', err)
    });
  }

  onSave() {
    this.taskService.updateTask(this.task().id, this.task()).subscribe({
      next: () => {
        console.log('Task aggiornato con successo')
        this.router.navigate(['/tasks']);
      },
      error: (err) => {
        console.log('Errore invio task', err);
      }
    });
  }

  onCancel() {
    this.router.navigate(['/tasks']);
  }
}
