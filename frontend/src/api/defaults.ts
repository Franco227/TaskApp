import type { Category } from '../types/category';
import type { Task } from '../types/task';

const CREATED_AT = '2026-11-09T00:00:00.000Z';

export const DEFAULT_CATEGORIES: Category[] = [
  { id: 1, name: 'Learning', createdAt: CREATED_AT, updatedAt: CREATED_AT },
  { id: 2, name: 'Personal', createdAt: CREATED_AT, updatedAt: CREATED_AT },
  { id: 3, name: 'Work', createdAt: CREATED_AT, updatedAt: CREATED_AT },
];

export const DEFAULT_TASKS: Omit<Task, 'category'>[] = [
  {
    id: 1,
    title: 'Read chapters 7 to 9 of Designing Data-Intensive Applications',
    description: 'Transactions, consistency and distributed systems.',
    done: false,
    categoryId: 1,
    createdAt: CREATED_AT,
    updatedAt: CREATED_AT,
  },
  {
    id: 2,
    title: 'Renew passport',
    description: 'Book an appointment at the town hall and gather the required documents.',
    done: false,
    categoryId: 2,
    createdAt: CREATED_AT,
    updatedAt: CREATED_AT,
  },
  {
    id: 3,
    title: 'Write unit tests for TaskService',
    description: 'Cover create, update and delete cases, including invalid category IDs.',
    done: false,
    categoryId: 3,
    createdAt: CREATED_AT,
    updatedAt: CREATED_AT,
  },
  {
    id: 4,
    title: 'Groceries',
    description: 'Milk, eggs, parmesan, spaghetti',
    done: true,
    categoryId: 2,
    createdAt: CREATED_AT,
    updatedAt: CREATED_AT,
  },
];
