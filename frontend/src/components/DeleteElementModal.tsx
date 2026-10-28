import { TriangleAlert } from 'lucide-react';
import Modal from 'react-modal';
import { toast } from 'sonner';

interface Props {
  isModalOpen: boolean;
  setIsModalOpen: (value: boolean) => void;
  callback: () => void;
}

export function DeleteElementModal ({ isModalOpen, setIsModalOpen, callback }: Props) {

    const handleConfirm = () => {
        callback();
        toast.success("Item deleted successfully!");
        setIsModalOpen(false);
    };

  return (
    <Modal
      className={"modal"}
      overlayClassName={"modal-overlay"}
      isOpen={isModalOpen}
      onRequestClose={() => setIsModalOpen(false)}
    >
      <h3 className="modal-title">Delete item</h3>
      <div className="delete-modal-content">
        <TriangleAlert size={50} color="orange" />
        <p>
          Are you sure you want to delete this item?
          This cannot be undone.
        </p>
      </div>
      <div className="modal-buttons-section">
        <button className="button-cancel" onClick={() => setIsModalOpen(false)}>Cancel</button>
        <button type='submit' className="button-add" onClick={handleConfirm}>Confirm</button>
      </div>
    </Modal>
  );
}
