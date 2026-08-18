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
      <div>
        <div className="task-title">{task.title}</div>
        {task.categoryId && <div className="task-category">{task.category?.name}</div>}
        {task.description && <div className="task-description">{task.description}</div>}
      </div>
      <div className="buttons-section">
        <button
          onClick={() => toggleDone(task.id, !task.done)}
          title={task.done ? "Marquer comme à faire" : "Marquer comme terminée"}
        >
          {task.done ? "À faire" : "Terminée"}
        </button>
        <UpdateTaskButton task={task} categories={categories} onUpdate={onUpdate} />
        <DeleteElementModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} callback={() => onDelete(task.id)} />
        <button
          className="button-delete"
          title="Supprimer la tâche"
          onClick={() => setIsModalOpen(true)}
        >
          Supprimer
        </button>
      </div>
    </div>
  );
}
