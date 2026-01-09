import { Component, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-task-view',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './task-view.html',
  styleUrl: './task-view.css',
})
export class TaskView implements OnInit {
  private route = inject(ActivatedRoute);
  private taskService = inject(TaskService);

  task = signal<any>(null);

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.taskService.getTaskById(id).subscribe({
      next: data => this.task.set(data),
      error: err => console.log('Errore nel recupero task', err)
    });
  }
}
