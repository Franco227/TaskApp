import {  useState } from 'react';
import { Category } from '../../types/category';
import { AddOrUpdateTaskModal } from './AddOrUpdateTaskModal';

interface Props {
  onCreate: (title: string, description?: string, categoryId?: number) => void;
  categories: Category[];
  defaultCategoryId: number | undefined;
}

export function AddTaskButton ({ onCreate, categories, defaultCategoryId }: Props) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <>
      <AddOrUpdateTaskModal
        modalType="add"
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        defaultCategoryId={defaultCategoryId}
        categories={categories}
        onCreate={onCreate}
      />
      <button className="button-add-task" onClick={() => setIsModalOpen(true)}>Add a task</button>
    </>
  );
}
