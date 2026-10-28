import type { Task } from '../types/task';

const BASE_URL = '/api';

export async function fetchTasks(categoryId?: number): Promise<Task[]> {
  const res = await fetch(`${BASE_URL}/tasks${categoryId ? `?categoryId=${categoryId}` : ''}`);
  if (!res.ok) throw new Error('Could not load tasks');
  return res.json();
}

export async function deleteTask(taskId: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/tasks/${taskId}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Could not delete task');
}

export async function createTask(title: string, description?: string, categoryId?: number): Promise<Task> {
  const body = JSON.stringify({ title: title, description: description, categoryId: categoryId });
  const headers = { 'Content-Type': 'application/json' };
  const res = await fetch(`${BASE_URL}/tasks`, { method: 'POST', headers: headers, body: body });
  if (!res.ok) throw new Error('Could not create task');
  return res.json();
}

export async function updateTask(taskId: number, title: string, description?: string, categoryId?: number): Promise<Task> {
  const body = JSON.stringify({ title: title, description: description, categoryId: categoryId ?? null });
  const headers = { 'Content-Type': 'application/json' };
  const res = await fetch(`${BASE_URL}/tasks/${taskId}`, { method: 'PATCH', headers: headers, body: body });
  if (!res.ok) throw new Error('Could not update task');
  return res.json();
}

export async function toggleDone(taskId: number, done: boolean): Promise<Task> {
  const body = JSON.stringify({ done: done });
  const headers = { 'Content-Type': 'application/json' };
  const res = await fetch(`${BASE_URL}/tasks/${taskId}`, { method: 'PATCH', headers: headers, body: body });
  if (!res.ok) throw new Error('Could not update task');
  return res.json();
}
