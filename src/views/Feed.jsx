import { useState } from 'react';
import Modal from '../components/ModalForm';

const Feed = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = () => setModalOpen(!isModalOpen);

  return (
    <div className="App">

      <Modal show={isModalOpen} onClose={toggleModal}>
      </Modal>
    </div>
  );
};

export default Feed;
