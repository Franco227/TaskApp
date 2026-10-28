import { useState } from 'react';
import type { Category } from '../../types/category';
import { Check, Pencil, Trash } from 'lucide-react';
import { DeleteElementModal } from '../DeleteElementModal';
import { toast } from 'sonner';

interface Props {
  category: Category;
  onDelete: (categoryId: number) => void;
  onUpdate: (categoryId: number, name: string) => void;
}

export function ManageableCategoryItem({ category, onDelete, onUpdate }: Props) {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>(category.name);

  const handleUpdate = (event?: React.FormEvent<HTMLFormElement>) => {
    if (event)
      event.preventDefault();

    if (name.trim() === "") {
      toast.error("You must enter a name!");
      return;
    }

    onUpdate(category.id, name);
    setIsEditing(false);
  };

  return (
    <div className="manageable-category-item">
      <div className="category-name-container">
        {!isEditing && <div className="category-name">{category.name}</div>}
        {isEditing && (
          <form onSubmit={handleUpdate}>
            <input
              className="category-name-input"
              size={name.length}
              maxLength={50}
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
              autoFocus
            />
          </form>
        )}
      </div>
      <div className="separator" />
      <div className="buttons-section">
        {!isEditing && <Pencil onClick={() => setIsEditing(true)} />}
        {isEditing && <Check onClick={() => handleUpdate()} />}
        <DeleteElementModal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} callback={() => onDelete(category.id)} />
        <Trash onClick={() => setIsModalOpen(true)}/>
      </div>
    </div>
  );
}
