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
        toast.success("Élément supprimé avec succès !");
        setIsModalOpen(false);
    };

  return (
    <Modal
      className={"modal"}
      overlayClassName={"modal-overlay"}
      isOpen={isModalOpen}
      onRequestClose={() => setIsModalOpen(false)}
    >
      <h3 className="modal-title">Supprimer l'élément</h3>
      <div className="delete-modal-content">
        <TriangleAlert size={50} color="orange" />
        <p>
          Êtes-vous sûr de vouloir supprimer cet élément ?
          La suppression est irréversible.
        </p>
      </div>
      <div className="modal-buttons-section">
        <button className="button-cancel" onClick={() => setIsModalOpen(false)}>Annuler</button>
        <button type='submit' className="button-add" onClick={handleConfirm}>Confirmer</button>
      </div>
    </Modal>
  );
}
