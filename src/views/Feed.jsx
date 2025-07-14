import { useState } from 'react';
import PublicForm from '../components/PublicForm';

const Feed = () => {
  const [isModalOpen, setModalOpen] = useState(false);

  const toggleModal = () => setModalOpen(!isModalOpen);

  return (
    <div className="App">

      <PublicForm show={isModalOpen} onClose={toggleModal}>
      </PublicForm>
    </div>
  );
};

export default Feed;
