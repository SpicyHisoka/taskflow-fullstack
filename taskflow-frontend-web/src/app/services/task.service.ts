import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { Task, CreateTask, PageResponse } from '../models/task.model';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/tasks';
  currentPage = signal(0);

  getTasks(page: number, size: number): Observable<PageResponse<Task>> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<PageResponse<Task>>(`${this.apiUrl}`, { params });
  }

  createTask(task: CreateTask) {
    return this.http.post<Task>(this.apiUrl, task);
  }

  generateAiTask(userPrompt: String) {
    return this.http.post<Task[]>(`${this.apiUrl}/ai/generate`, { prompt: userPrompt });
  }

  deleteTask(taskId: number) {
    return this.http.delete<void>(`${this.apiUrl}/${taskId}`);
  }

  patchStatus(taskId: number, status: string) {
    return this.http.patch<Task>(`${this.apiUrl}/${taskId}/status`, { status });
  }

  getTaskById(id: number) {
    return this.http.get(`${this.apiUrl}/${id}`);
  }

  updateTask(id: number, task: Task) {
    return this.http.patch(`${this.apiUrl}/${id}`, task)
  }

  setPage(page: number) {
    this.currentPage.set(page);
  }

  resetToFirstPage() {
    this.currentPage.set(0);
  }
}
