const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL ?? "https://cloud-todo-list-backend.onrender.com";

export interface Task {
  _id: string;
  title: string;
  completed: boolean;
  createdAt?: string;
  updatedAt?: string;
}

export class MondogbService {
  private readonly baseUrl: string;

  constructor(baseUrl: string = API_BASE_URL) {
    this.baseUrl = baseUrl;
  }

  async get<T>(path: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${path}`);

    if (!response.ok) {
      throw new Error(`MondogbService GET error: ${response.status}`);
    }

    return response.json() as Promise<T>;
  }

  async getAllTasks(): Promise<Task[]> {
    return this.get<Task[]>('/api/tasks/getAllTasks');
  }
}

export const mondogbService = new MondogbService();
