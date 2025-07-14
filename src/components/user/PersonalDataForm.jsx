import { useState, useEffect } from 'react';
import { useUpdateUser } from '../../hooks/useUpdateUser';
import PropTypes from 'prop-types';
import { useTranslation } from 'react-i18next';

function PersonalDataForm({ user, onSaveSuccess }) {
  const { t } = useTranslation();
  const [name, setName] = useState('');
  const [lastname, setLastname] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const { saveUser, isLoading, error } = useUpdateUser();

  useEffect(() => {
    if (user) {
      setName(user.name || '');
      setLastname(user.lastname || '');
      setUsername(user.username || '');
      setEmail(user.email || '');
      setBirthdate(user.birthdate || '');
    }
  }, [user]);

  const handleNameChange = (e) => setName(e.target.value);
  const handleLastnameChange = (e) => setLastname(e.target.value);
  const handleUsernameChange = (e) => setUsername(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleBirthdateChange = (e) => setBirthdate(e.target.value);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const updatedUser = await saveUser(user.id, { name, lastname, username, email, birthdate }, "PATCH");
      console.log('User updated (PATCH):', updatedUser);
      if (onSaveSuccess) onSaveSuccess();
    } catch (err) {
      console.error('Error updating user (PATCH):', err);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-custom-350">{t('name')}</label>
        <input
          type="text"
          value={name}
          onChange={handleNameChange}
          className="w-full rounded-lg border-2 border-custom-250 p-2 placeholder-custom-250 font-normal text-base text-custom-250 focus:border-custom-350 focus:outline-none"
        />
      </div>
      <div>
        <label className="block text-custom-350">{t('lastname')}</label>
        <input
          type="text"
          value={lastname}
          onChange={handleLastnameChange}
          className="w-full rounded-lg border-2 border-custom-250 p-2 placeholder-custom-250 font-normal text-base text-custom-250 focus:border-custom-350 focus:outline-none"
        />
      </div>
      <div>
        <label className="block text-custom-350">{t('username')}</label>
        <input
          type="text"
          value={username}
          onChange={handleUsernameChange}
          className="w-full rounded-lg border-2 border-custom-250 p-2 placeholder-custom-250 font-normal text-base text-custom-250 focus:border-custom-350 focus:outline-none"
        />
      </div>
      <div>
        <label className="block text-custom-350">{t('email')}</label>
        <input
          type="email"
          value={email}
          onChange={handleEmailChange}
          className="w-full rounded-lg border-2 border-custom-250 p-2 placeholder-custom-250 font-normal text-base text-custom-250 focus:border-custom-350 focus:outline-none"
        />
      </div>
      <div>
        <label className="block text-custom-350">{t('birthdate')}</label>
        <input
          type="date"
          value={birthdate}
          onChange={handleBirthdateChange}
          className="w-full rounded-lg border-2 border-custom-250 p-2 placeholder-custom-250 font-normal text-base text-custom-250 focus:border-custom-350 focus:outline-none"
        />
      </div>
      <button
        type="submit"
        className="w-full py-2 bg-custom-250 text-white font-bold rounded-lg mt-4"
      >
        {isLoading ? t('saving') : t('save')}
      </button>
      {error && <div className="text-red-500">{t('errorUpdatingUser')}</div>}
    </form>
  );
}

PersonalDataForm.propTypes = {
  user: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    lastname: PropTypes.string,
    username: PropTypes.string,
    email: PropTypes.string,
    birthdate: PropTypes.string,
  }).isRequired,
  onSaveSuccess: PropTypes.func,
};

export default PersonalDataForm;
