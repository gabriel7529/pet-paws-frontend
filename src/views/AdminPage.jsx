import Navbar from '../components/AdminPage/Navbar';
import Users from '../components/AdminPage/Users';
import Posts from '../components/AdminPage/Posts';
import { useState } from 'react';

const AdminPage = () => {
  const [option, setOption] = useState('users');

  const renderContent = () => {
    switch (option) {
      case 'users':
        return <Users />;
      case 'posts':
        return <Posts />;
      default:
        return null;
    }
  }

  return (
    <div>
      <Navbar setOption={setOption}/>
      <main>
        {renderContent()}
      </main>

    </div>
  );
}

export default AdminPage;
