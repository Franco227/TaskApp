import { useState } from 'react';
import Modal from 'react-modal';
import { Category } from '../../types/category';
import { ManageableCategoryItem } from './ManageableCategoryItem';

interface Props {
  categories: Category[];
  onDelete: (categoryId: number) => void;
  onUpdate: (categoryId: number, name: string) => void;
}

export function ManageCategoriesButton ({ categories, onDelete, onUpdate }: Props) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  return (
    <>
      <Modal
        className={"modal"}
        overlayClassName={"modal-overlay"}
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
      >
        <h3 className="modal-title">Manage categories</h3>
        <div className="manageable-categories-container">
          {categories.length === 0 && <div>No categories yet.</div>}
          {categories.map((category) =>
            <ManageableCategoryItem key={category.id} category={category} onDelete={onDelete} onUpdate={onUpdate} />)}
        </div>
        <div className="modal-buttons-section">
          <button onClick={() => setIsModalOpen(false)}>Done</button>
        </div>
      </Modal>
      <button onClick={() => setIsModalOpen(true)}>
        Manage categories
      </button>
    </>
  );
}
