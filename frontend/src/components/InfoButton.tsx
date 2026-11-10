import { Info } from 'lucide-react';
import { useState } from 'react';
import Modal from 'react-modal';

const INFO_SEEN_KEY = 'infoSeen';

export function InfoButton() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(() => localStorage.getItem(INFO_SEEN_KEY) === null);

  const closeModal = () => {
    localStorage.setItem(INFO_SEEN_KEY, 'true');
    setIsModalOpen(false);
  };

  return (
    <>
      <Modal
        className={"modal"}
        overlayClassName={"modal-overlay"}
        isOpen={isModalOpen}
        onRequestClose={closeModal}
      >
        <h3 className="modal-title">About this demo</h3>
        <div className="info-modal-content">
          <p>
            This is a demo version of TaskApp, running without a backend.<br />Your tasks and categories are saved in your browser's local storage,<br />so they stay on this device and are not shared with anyone.<br /><br />
          </p>
          <p>
            The full application, including its NestJS backend, is available on <a href="https://github.com/Franco227/TaskApp" target="_blank" rel="noreferrer">GitHub</a>.
          </p>
        </div>
        <div className="modal-buttons-section">
          <button onClick={closeModal}>Got it</button>
        </div>
      </Modal>
      <button title="About this demo" onClick={() => setIsModalOpen(true)}>
        <Info />
      </button>
    </>
  );
}
