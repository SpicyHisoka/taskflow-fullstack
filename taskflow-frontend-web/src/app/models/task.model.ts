export enum Priority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH'
}

export interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  priority: Priority;
  deadline: string;
  createdAt: string;
  estimatedTimeMinutes: number;
}

export interface CreateTask {
  title: string;
  description: string;
  status: string;
  priority: Priority;
  deadline: string;
  estimatedTimeMinutes: number;
}

export interface PageResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}