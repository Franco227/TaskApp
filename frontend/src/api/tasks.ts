import type { Category } from '../types/category';
import type { Task } from '../types/task';
import { readCategories } from './categories';
import { DEFAULT_TASKS } from './defaults';

type StoredTask = Omit<Task, 'category'>;

const TASKS_KEY = 'tasks';

function readTasks(): StoredTask[] {
  return JSON.parse(localStorage.getItem(TASKS_KEY) ?? JSON.stringify(DEFAULT_TASKS));
}

function writeTasks(tasks: StoredTask[]) {
  localStorage.setItem(TASKS_KEY, JSON.stringify(tasks));
}

function withCategory(task: StoredTask, categories: Category[]): Task {
  return { ...task, category: categories.find((category) => category.id === task.categoryId) ?? null };
}

function updateStoredTask(taskId: number, changes: Partial<StoredTask>): Task {
  const tasks = readTasks();
  const existingTask = tasks.find((task) => task.id === taskId);
  if (!existingTask) throw new Error('Could not update task');
  const updatedTask = { ...existingTask, ...changes, updatedAt: new Date().toISOString() };
  writeTasks(tasks.map((task) => task.id === taskId ? updatedTask : task));
  return withCategory(updatedTask, readCategories());
}

export async function fetchTasks(): Promise<Task[]> {
  const categories = readCategories();
  return readTasks().map((task) => withCategory(task, categories));
}

export async function deleteTask(taskId: number): Promise<void> {
  const tasks = readTasks();
  if (!tasks.some((task) => task.id === taskId)) throw new Error('Could not delete task');
  writeTasks(tasks.filter((task) => task.id !== taskId));
}

export async function createTask(title: string, description?: string, categoryId?: number): Promise<Task> {
  const tasks = readTasks();
  const now = new Date().toISOString();
  const newTask: StoredTask = {
    id: Math.max(0, ...tasks.map((task) => task.id)) + 1,
    title: title,
    description: description ?? null,
    done: false,
    categoryId: categoryId ?? null,
    createdAt: now,
    updatedAt: now,
  };
  writeTasks([...tasks, newTask]);
  return withCategory(newTask, readCategories());
}

export async function updateTask(taskId: number, title: string, description?: string, categoryId?: number): Promise<Task> {
  return updateStoredTask(taskId, { title: title, description: description ?? null, categoryId: categoryId ?? null });
}

export async function toggleDone(taskId: number, done: boolean): Promise<Task> {
  return updateStoredTask(taskId, { done: done });
}
