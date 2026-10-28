import { useState } from 'react';
import type { Task } from '../../types/task';
import { DeleteElementModal } from '../DeleteElementModal';
import { UpdateTaskButton } from './UpdateTaskButton';
import { Category } from '../../types/category';

interface Props {
  task: Task;
  categories: Category[];
  onUpdate: (taskId: number, title: string, description?: string, categoryId?: number) => void;
  onDelete: (taskId: number) => void;
  toggleDone: (taskId: number, done: boolean) => void;
}

export function TaskItem({ task, categories, onUpdate, onDelete, toggleDone }: Props) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <div className={`task${task.done ? ' done' : ''}`}>
      <div className="task-content">
        <div className="task-title">{task.title}</div>
        {task.categoryId && <div className="task-category">{task.category?.name}</div>}
        {task.description && <div className="task-description">{task.description}</div>}
      </div>
      <div className="buttons-section">
        <button
          onClick={() => toggleDone(task.id, !task.done)}
          title={task.done ? "Mark as to do" : "Mark as done"}
        >
          {task.done ? "To do" : "Done"}
        </button>
        <UpdateTaskButton task={task} categories={categories} onUpdate={onUpdate} />
        <DeleteElementModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} callback={() => onDelete(task.id)} />
        <button
          className="button-delete"
          title="Delete task"
          onClick={() => setIsModalOpen(true)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}
