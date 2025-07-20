import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useGetUser } from '../../hooks/useGetUser';
import { useGetUserPosts } from '../../hooks/useGetUserPosts';
import { Link, useParams } from 'react-router-dom';
import { Modal } from 'flowbite-react';

function Profile() {
  const { t } = useTranslation();
  const { id } = useParams();
  const { user } = useGetUser(id);
  const { posts } = useGetUserPosts(id);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      {user === undefined ? (
        <h2>{t('loading')}</h2>
      ) : (
        <section className='profile-page flex flex-wrap align-top content-around w-auto px-0 mx-0 lg:justify-center'>
          <section className='w-full lg:w-1/3 lg:p-10 text-center bg-white flex px-8 align-middle'>
            <div className='my-2 w-1/4 px-0 flex flex-col items-center'>
              <img
                className='h-auto w-20 rounded-full m-auto shadow shadow-pink-300'
                src={'/img/users/' + user.picture}
                alt={user.name}
              />
              <button
                className='p-0 bg-white flex items-center justify-center text-custom-250 font-semibold mt-3 text-sm w-auto'>
                <svg
                  className='w-[17px] h-[17px]'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                >
                  <title>heart-circle</title>
                  <path
                    fill='#ff585d'
                    d='M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M9.75,7.82C10.62,7.82 11.45,8.23 12,8.87C12.55,8.23 13.38,7.82 14.25,7.82C15.79,7.82 17,9.03 17,10.57C17,12.46 15.3,14 12.72,16.34L12,17L11.28,16.34C8.7,14 7,12.46 7,10.57C7,9.03 8.21,7.82 9.75,7.82Z'
                  />
                </svg>
                {t('follow')}
              </button>
            </div>
            <div id='user-info' className='w-3/4'>
              <div className='flex w-full text-left pl-5 mb-3'>
                <div className='w-10/12'>
                  <h2 className='text-xl font-bold text-custom-350'>
                    {user.name} {user.lastname}
                  </h2>
                  <h5 className='text-sm text-custom-250'>@{user.username}</h5>
                </div>
                <div className='w-2/12'>
                  <button
                    className='w-full py-2 bg-white text-white font-bold rounded-tr-lg'
                    type='button'
                    onClick={() => setIsModalOpen(true)}
                  >
                    <svg
                      className='w-[35px]'
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                    >
                      <title>dots-horizontal</title>
                      <path
                        fill='#ff585d'
                        d='M16,12A2,2 0 0,1 18,10A2,2 0 0,1 20,12A2,2 0 0,1 18,14A2,2 0 0,1 16,12M10,12A2,2 0 0,1 12,10A2,2 0 0,1 14,12A2,2 0 0,1 12,14A2,2 0 0,1 10,12M4,12A2,2 0 0,1 6,10A2,2 0 0,1 8,12A2,2 0 0,1 6,14A2,2 0 0,1 4,12Z'
                      />
                    </svg>
                  </button>
                </div>
              </div>
              <div className='flex w-full text-left pl-5'>
                <p className='text-sm text-custom-250 text-justify'>{user.about}</p>
              </div>
            </div>
          </section>
          <section
            className='w-full mx-0 mt-5 p-5 border-solid border-t border-b border-custom-200 flex justify-around'>
            <div>
              <button className='w-full p-0 bg-white flex text-custom-150 font-semibold text-sm content-between'>
                <svg
                  className='w-[42px] h-[42px]'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                >
                  <title>pound</title>
                  <path
                    fill='#FFB0A9'
                    d='M5.41,21L6.12,17H2.12L2.47,15H6.47L7.53,9H3.53L3.88,7H7.88L8.59,3H10.59L9.88,7H15.88L16.59,3H18.59L17.88,7H21.88L21.53,9H17.53L16.47,15H20.47L20.12,17H16.12L15.41,21H13.41L14.12,17H8.12L7.41,21H5.41M9.53,9L8.47,15H14.47L15.53,9H9.53Z'
                  />
                </svg>
              </button>
            </div>
            <div>
              <button className='w-full p-0 bg-white flex text-custom-150 font-semibold text-sm content-between'>
                <svg
                  className='w-[42px] h-[42px]'
                  xmlns='http://www.w3.org/2000/svg'
                  viewBox='0 0 24 24'
                >
                  <title>bookmark</title>
                  <path
                    fill='#FFB0A9'
                    d='M17,3H7A2,2 0 0,0 5,5V21L12,18L19,21V5C19,3.89 18.1,3 17,3Z'
                  />
                </svg>
              </button>
            </div>
          </section>
          <section className='w-full mx-0 grid grid-cols-3 gap-4 p-5'>
            {posts.map((post) => (
              <div key={post.id} className='aspect-square'>
                <img
                  className='object-cover h-full w-full rounded-2xl'
                  src={post.picture}
                  //src={post.pictures?.[0]?.url || 'default.jpg'}
                  alt={post.name}
                />
              </div>
            ))}
          </section>
            <Modal show={isModalOpen} onClose={closeModal} dismissible position="center">
              <Modal.Body className="bg-custom-250 rounded-xl">
                <div className="relative w-full flex justify-end">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="absolute top-0 right-0 text-white bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
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
                <ul className='w-full'>
                  <li className='w-full py-2 border-b border-b-white flex items-center justify-center'>
                    <Link
                      to={`/user/edit/${user.id}`}
                      onClick={closeModal}
                      className='flex items-center justify-center w-full text-white'
                    >
                      <svg className="w-[20px] h-[20px] mr-2 text-white" xmlns="http://www.w3.org/2000/svg"
                           viewBox="0 0 24 24">
                        <title>account-cancel</title>
                        <path fill="currentColor"
                              d="M17,3H14V5H17V21H7V5H10V3H7A2,2 0 0,0 5,5V21A2,2 0 0,0 7,23H17A2,2 0 0,0 19,21V5A2,2 0 0,0 17,3M12,7A2,2 0 0,1 14,9A2,2 0 0,1 12,11A2,2 0 0,1 10,9A2,2 0 0,1 12,7M16,15H8V14C8,12.67 10.67,12 12,12C13.33,12 16,12.67 16,14V15M16,18H8V17H16V18M12,20H8V19H12V20M13,5H11V1H13V5Z"/>
                      </svg>
                      <span>{t("edit")}</span>
                    </Link>
                  </li>
                  <li className='w-full text-white py-2 border-b border-b-white flex items-center justify-center'>
                    <svg
                      className='w-[20px] h-[20px] mr-2 text-white'
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                    >
                      <title>account-cancel</title>
                      <path
                        fill='currentColor'
                        d='M10 4A4 4 0 0 0 6 8A4 4 0 0 0 10 12A4 4 0 0 0 14 8A4 4 0 0 0 10 4M17.5 13C15 13 13 15 13 17.5C13 20 15 22 17.5 22C20 22 22 20 22 17.5C22 15 20 13 17.5 13M10 14C5.58 14 2 15.79 2 18V20H11.5A6.5 6.5 0 0 1 11 17.5A6.5 6.5 0 0 1 11.95 14.14C11.32 14.06 10.68 14 10 14M17.5 14.5C19.16 14.5 20.5 15.84 20.5 17.5C20.5 18.06 20.35 18.58 20.08 19L16 14.92C16.42 14.65 16.94 14.5 17.5 14.5M14.92 16L19 20.08C18.58 20.35 18.06 20.5 17.5 20.5C15.84 20.5 14.5 19.16 14.5 17.5C14.5 16.94 14.65 16.42 14.92 16Z'
                      />
                    </svg>
                    <span>{t('report')}</span>
                  </li>
                  <li className='w-full text-white py-2 flex items-center justify-center'>
                    <svg
                      className='w-[20px] h-[20px] mr-2 text-white'
                      xmlns='http://www.w3.org/2000/svg'
                      viewBox='0 0 24 24'
                    >
                      <title>account-cancel</title>
                      <path
                        fill='currentColor'
                        d='M12 2C17.5 2 22 6.5 22 12S17.5 22 12 22 2 17.5 2 12 6.5 2 12 2M12 4C10.1 4 8.4 4.6 7.1 5.7L18.3 16.9C19.3 15.5 20 13.8 20 12C20 7.6 16.4 4 12 4M16.9 18.3L5.7 7.1C4.6 8.4 4 10.1 4 12C4 16.4 7.6 20 12 20C13.9 20 15.6 19.4 16.9 18.3Z'
                      />
                    </svg>
                    <span>{t('block')}</span>
                  </li>
                </ul>
              </Modal.Body>
            </Modal>
        </section>
        )}
    </>
  );
}

export default Profile;
