import type { Category } from '../types/category';
import type { Task } from '../types/task';

const CATEGORIES_KEY = 'categories';
const TASKS_KEY = 'tasks';

export function readCategories(): Category[] {
  return JSON.parse(localStorage.getItem(CATEGORIES_KEY) ?? '[]');
}

function writeCategories(categories: Category[]) {
  localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
}

export async function fetchCategories(): Promise<Category[]> {
  return readCategories();
}

export async function deleteCategory(categoryId: number): Promise<void> {
  const categories = readCategories();
  if (!categories.some((category) => category.id === categoryId)) throw new Error('Could not delete category');
  writeCategories(categories.filter((category) => category.id !== categoryId));

  const tasks: Omit<Task, 'category'>[] = JSON.parse(localStorage.getItem(TASKS_KEY) ?? '[]');
  const updatedTasks = tasks.map((task) => task.categoryId === categoryId ? { ...task, categoryId: null } : task);
  localStorage.setItem(TASKS_KEY, JSON.stringify(updatedTasks));
}

export async function createCategory(name: string): Promise<Category> {
  const categories = readCategories();
  const now = new Date().toISOString();
  const newCategory: Category = {
    id: Math.max(0, ...categories.map((category) => category.id)) + 1,
    name: name,
    createdAt: now,
    updatedAt: now,
  };
  writeCategories([...categories, newCategory]);
  return newCategory;
}

export async function updateCategory(categoryId: number, name: string): Promise<Category> {
  const categories = readCategories();
  const existingCategory = categories.find((category) => category.id === categoryId);
  if (!existingCategory) throw new Error('Could not update category');
  const updatedCategory = { ...existingCategory, name: name, updatedAt: new Date().toISOString() };
  writeCategories(categories.map((category) => category.id === categoryId ? updatedCategory : category));
  return updatedCategory;
}
