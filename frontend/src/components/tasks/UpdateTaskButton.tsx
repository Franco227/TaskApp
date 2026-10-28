import { useState } from 'react';
import { Category } from '../../types/category';
import { AddOrUpdateTaskModal } from './AddOrUpdateTaskModal';
import { Pencil } from 'lucide-react';
import { Task } from '../../types/task';

interface Props {
  task: Task;
  onUpdate: (taskId: number, title: string, description?: string, categoryId?: number) => void;
  categories: Category[];
}

export function UpdateTaskButton ({ task, onUpdate, categories }: Props) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <>
      <AddOrUpdateTaskModal
        modalType="edit"
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        taskId={task.id}
        defaultValues={{ title: task.title, description: task.description ?? ""}}
        defaultCategoryId={task.categoryId ?? undefined}
        categories={categories}
        onUpdate={onUpdate}
      />
      <button title="Edit task" onClick={() => setIsModalOpen(true)}><Pencil /></button>
    </>
  );
}
