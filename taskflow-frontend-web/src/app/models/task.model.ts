export interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
}

export interface CreateTask {
  title: string;
  description: string;
  status: string;
}

export interface PageResponse<T> {
  content: T[];
  totalPages: number;
  totalElements: number;
  size: number;
  number: number;
}
