import type { Category } from '../types/category';

const BASE_URL = '/api';

export async function fetchCategories(): Promise<Category[]> {
  const res = await fetch(`${BASE_URL}/categories`);
  if (!res.ok) throw new Error('Could not load categories');
  return res.json();
}

export async function deleteCategory(categoryId: number): Promise<void> {
  const res = await fetch(`${BASE_URL}/categories/${categoryId}`, { method: 'DELETE' });
  if (!res.ok) throw new Error('Could not delete category');
}

export async function createCategory(name: string): Promise<Category> {
  const body = JSON.stringify({ name: name });
  const headers = { 'Content-Type': 'application/json' };
  const res = await fetch(`${BASE_URL}/categories`, { method: 'POST', headers: headers, body: body });
  if (!res.ok) throw new Error('Could not create category');
  return res.json();
}

export async function updateCategory(categoryId: number, name: string): Promise<Category> {
  const body = JSON.stringify({ name: name });
  const headers = { 'Content-Type': 'application/json' };
  const res = await fetch(`${BASE_URL}/categories/${categoryId}`, { method: 'PATCH', headers: headers, body: body });
  if (!res.ok) throw new Error('Could not update category');
  return res.json();
}