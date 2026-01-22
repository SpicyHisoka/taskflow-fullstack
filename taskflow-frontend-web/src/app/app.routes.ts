import { Routes } from '@angular/router';
import { TaskEdit } from './components/task-edit/task-edit';
import { TaskList } from './components/task-list/task-list';
import { TaskAdd } from './components/task-add/task-add';
import { TaskView } from './components/task-view/task-view';
import { TaskAi } from './components/task-ai/task-ai';

export const routes: Routes = [
  { path: 'tasks', component: TaskList },
  { path: 'tasks/edit/:id', component: TaskEdit },
  { path: 'tasks/new-task', component: TaskAdd },
  { path: 'tasks/ai', component: TaskAi },
  { path: 'tasks/task/:id', component: TaskView },
  { path: '', redirectTo: 'tasks', pathMatch: 'full' }
];
