import { Plus } from 'lucide-react';
import { useState } from 'react';
import Modal from 'react-modal';
import { toast } from 'sonner';

interface Props {
  onCreate: (name: string) => void;
}

export function AddCategoryButton ({ onCreate }: Props) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [name, setName] = useState<string>("");

  const resetFormAndCloseModal = () => {
    setIsModalOpen(false);
    setName("");
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (name.trim() === "") {
      toast.error("You must enter a name!");
      return;
    }

    onCreate(name);
    toast.success("Category created");
    resetFormAndCloseModal();
  }

  return (
    <>
      <Modal
        className={"modal"}
        overlayClassName={"modal-overlay"}
        isOpen={isModalOpen}
        onRequestClose={resetFormAndCloseModal}
      >
        <h3 className="modal-title">Add a category</h3>
        <form onSubmit={handleSubmit} onAbort={resetFormAndCloseModal}>
          <div className="input-container">
            <label>Name *</label>
            <input
              type='text'
              value={name}
              maxLength={50}
              onChange={(event) => setName(event.target.value)}
              required
              autoFocus
            />
          </div>
          <div className="modal-buttons-section">
            <button className="button-cancel" onClick={resetFormAndCloseModal}>Cancel</button>
            <button type='submit' className="button-add">Add</button>
          </div>
        </form>
      </Modal>
      <button title="Add a category" onClick={() => setIsModalOpen(true)}>
        <Plus />
      </button>
    </>
  );
}
