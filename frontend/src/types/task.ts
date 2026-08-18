import { Category } from "./category";

export interface Task {
  id: number;
  title: string;
  description: string | null;
  done: boolean;
  categoryId: number | null;
  createdAt: string;
  updatedAt: string;

  category: Category | null;
}
