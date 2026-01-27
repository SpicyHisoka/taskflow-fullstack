import { Component, computed, inject, OnInit, signal } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TaskService } from '../../services/task.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-task-view',
  standalone: true,
  imports: [RouterLink, DatePipe],
  templateUrl: './task-view.html',
  styleUrl: './task-view.css',
})
export class TaskView implements OnInit {
  private route = inject(ActivatedRoute);
  private taskService = inject(TaskService);

  task = signal<any>(null);

  // Signal derivato (computed)
  formattedDuration = computed (() => {
    const t = this.task();

    if (!t  || t.estimatedTimeMinutes == null) {
      return '';
    }

    const mins = t.estimatedTimeMinutes;
    
    if (mins <= 0) {
      return 'X';
    } else if (mins < 60) {
      return `${mins} min`;
    } else {
      const hours = Math.floor(mins / 60);
      const remainingMins = mins % 60;

      return remainingMins === 0 ? `${hours} h` : `${hours} h ${remainingMins} min`;
    }
  });

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.taskService.getTaskById(id).subscribe({
      next: data => this.task.set(data),
      error: err => console.log('Errore nel recupero task', err)
    });
  }
}
