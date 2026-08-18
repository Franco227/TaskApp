import { useEffect, useState } from 'react';
import Modal from 'react-modal';
import { Category } from '../../types/category';
import { toast } from 'sonner';

interface Props {
  modalType: "add" | "edit";
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  taskId?: number;
  defaultValues?: { title?: string, description?: string, categoryId?: number };
  defaultCategoryId?: number | undefined;
  onCreate?: (title: string, description?: string, categoryId?: number) => void;
  onUpdate?: (taskId: number, title: string, description?: string, categoryId?: number) => void;
  categories: Category[];
}

export function AddOrUpdateTaskModal ({ modalType, isModalOpen, setIsModalOpen, taskId, defaultValues, defaultCategoryId, categories, onCreate, onUpdate }: Props) {
  const [title, setTitle] = useState<string>(defaultValues?.title ?? "");
  const [description, setDescription] = useState<string>(defaultValues?.description ?? "");
  const [categoryId, setCategoryId] = useState<number | undefined>(defaultCategoryId);

  useEffect(() => {
    setCategoryId(defaultCategoryId);
  }, [defaultCategoryId]);

  const resetFormAndCloseModal = () => {
    setIsModalOpen(false);
    setTitle(defaultValues?.title ?? "");
    setDescription(defaultValues?.description ?? "");
    setCategoryId(defaultCategoryId);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (title.trim() === "") {
      toast.error("Vous devez entrer un titre !");
      return;
    }

    if (modalType === "add" && onCreate) {
      onCreate(title, description, categoryId);
      toast.success("Tâche créée");
    }
    if (modalType === "edit" && taskId && onUpdate) {
      onUpdate(taskId, title, description, categoryId);
      toast.success("Tâche modifiée");
    }
    resetFormAndCloseModal();
  };

  return (
    <Modal
      className={"modal"}
      overlayClassName={"modal-overlay"}
      isOpen={isModalOpen}
      onRequestClose={resetFormAndCloseModal}
    >
      <h3 className="modal-title">{modalType === "add" ? "Ajouter une tâche" : "Modifier la tâche"}</h3>
      <form
        onSubmit={handleSubmit}
        onAbort={resetFormAndCloseModal}
      >
        <div className="input-container">
          <label>Titre *</label>
          <input
            type='text'
            value={title}
            onChange={(event) => setTitle(event.target.value)}
            required
            autoFocus
          />
        </div>
        <div className="input-container">
          <label>Description</label>
          <textarea
            style={{ resize: "vertical" }}
            value={description}
            onChange={(event) => setDescription(event.target.value)}
          />
        </div>
        <div className="input-container">
          <label>Catégorie</label>
          <select
            value={categoryId ?? ""}
            onChange={(event) => setCategoryId(event.target.value === "" ? undefined : parseInt(event.target.value))}
          >
            <option value={""}>Aucune</option>
            {categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}
          </select>
        </div>
        <div className="modal-buttons-section">
          <button className="button-cancel" onClick={resetFormAndCloseModal}>Annuler</button>
          <button type='submit' className="button-add">{modalType === "add" ? "Ajouter" : "Modifier"}</button>
        </div>
      </form>
    </Modal>
  );
}
