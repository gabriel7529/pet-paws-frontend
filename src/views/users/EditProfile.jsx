import {useTranslation} from 'react-i18next';
import {useNavigate , useParams} from 'react-router-dom';
import {useGetUser} from '../../hooks/useGetUser';
import {useEffect, useState} from "react";
import {useUpdateUser} from "../../hooks/useUpdateUser.jsx";
import PersonalDataForm from "../../components/user/PersonalDataForm.jsx";
import {Modal} from "flowbite-react";

function EditProfile() {
  const {t} = useTranslation();
  const {id} = useParams();
  const {user} = useGetUser(id);
  const [about, setAbout] = useState('');
  const [gender, setGender] = useState('');
  const [charCount, setCharCount] = useState(0);
  const maxLength = 120;
  const { saveUser, isLoading, error } = useUpdateUser();
  const navigate = useNavigate();
  const [isModalDataOpen, setIsModalDataOpen] = useState(false);

  const closeModalData = () => {
    setIsModalDataOpen(false);
  };

  useEffect(() => {
    if (user) {
      setAbout(user.about || '');
      setGender(user.gender || '');
      setCharCount((user.about || '').length);
    }
  }, [user]);

  const handleAboutChange = (e) => {
    setAbout(e.target.value);
    setCharCount(e.target.value.length);
  };

  const handleGenderChange = (e) => {
    setGender(e.target.value);
  };

  const handleSave = async () => {
    try {
      const updatedFields = {
        about,
        gender,
      };

      const updatedUser = await saveUser(id, updatedFields, "PATCH");
      console.log('User updated:', updatedUser);
    } catch (error) {
      console.error('Error updating user:', error);
    }
  };

  const goBack = () => {
    navigate(-1);
  };

  return (
    <>
      <div className="m-5 bg-custom-100 flex p-2 rounded-xl align-middle">
        <div className="w-1/4">
          <img
            className='h-auto w-20 m-auto bg-white rounded-full'
            src={'/img/users/' + user.picture}
            alt={user.name}
          />
        </div>
        <div className='w-3/4'>
          <div className='flex w-full text-left pl-5'>
            <h2 className='text-xl font-bold text-custom-350'>
              {user.name} {user.lastname}
            </h2>
          </div>
          <div className='flex w-full text-left pl-5 mb-3'>
            <div className='mr-1'>
              <button
                onClick={() => setIsModalDataOpen(true)}
                className='text-sm bg-custom-250 text-white px-1 rounded'>{t('change')} {t('personalInformation')}</button>
            </div>
            <div className='mr-1'>
              <button className='text-sm bg-custom-250 text-white px-1 rounded'>{t('change')} {t('picture')}</button>
            </div>
          </div>
        </div>
      </div>
      <div className="p-2 m-5">
        <label className='mb-4 block text-custom-350'>
          {t('description')}
        </label>
        <div className="relative">
          <textarea
            className="w-full rounded-lg border-2 border-custom-250 p-2 placeholder-custom-250 font-normal text-base text-custom-250 focus:border-custom-350 focus:outline-none"
            rows={3}
            maxLength={maxLength}
            value={about}
            onChange={handleAboutChange}
          ></textarea>
          <div className="absolute bottom-2 right-2 text-xs text-custom-250">
            {charCount}/{maxLength}
          </div>
        </div>
        <label className='my-4 block text-custom-350'>
          {t('gender')}
        </label>
        <select
          className="w-full max-w-full rounded-lg border-2 border-custom-250 p-2 placeholder-custom-250 font-normal text-base text-custom-250 focus:border-custom-350 focus:outline-none"
          value={gender}
          onChange={handleGenderChange}
        >
          <option value="female">{t('genderOptionsLabel2')}</option>
          <option value="male">{t('genderOptionsLabel1')}</option>
        </select>
        <div className="mt-10 mb-5">
          <div className="flex flex-col lg:flex-row lg:justify-between gap-2">
            <button
              onClick={goBack}
              className="w-full lg:w-1/2 py-2 border-2 border-custom-250 text-custom-250 font-bold rounded-lg focus:outline-none hover:bg-custom-250 hover:text-white transition-colors"
            >
              {t('goBack')}
            </button>

            <button
              onClick={handleSave}
              disabled={isLoading}
              className="w-full lg:w-1/2 py-2 bg-custom-250 text-white font-bold rounded-lg focus:outline-none hover:bg-custom-350 transition-colors"
            >
              {t('save')}
            </button>
          </div>
          {error && <p className="text-red-500 mt-2">{t('saveError')}</p>}
        </div>
      </div>
      <Modal show={isModalDataOpen} onClose={closeModalData} dismissible position="center">
        <Modal.Body className="bg-white rounded-xl">
          <div className="relative w-full flex justify-end">
            <button
              type="button"
              onClick={closeModalData}
              className="absolute top-0 right-0 text-custom-250 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
              <span className="sr-only">Close modal</span>
            </button>
          </div>
          <h3 className="text-custom-350 mb-4 border-b border-custom-350 pb-5 font-bold">{t('personalInformation')}</h3>
          <PersonalDataForm user={user} onSaveSuccess={closeModalData} />
        </Modal.Body>
      </Modal>
    </>
);
}

export default EditProfile;
