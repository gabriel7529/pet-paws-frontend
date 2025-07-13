import { useTranslation } from 'react-i18next';
import {useParams} from 'react-router-dom';
import { useGetUser } from '../../hooks/useGetUser';
import { useGetUserPosts } from '../../hooks/useGetUserPosts';
import Post from '../../components/Post';

function Profile() {
  const { t } = useTranslation();
  const {id} = useParams();
  const {user} = useGetUser(id);
  const {posts} = useGetUserPosts(id);

  return (
    <>
    {
      user===undefined ? <h2>{t("loading")}</h2>:
      <section className='profile-page flex flex-wrap lg:flex-nowrap align-top content-around w-auto'>
         <section className="w-full lg:w-1/4 text-center bg-white rounded shadow mx-5">
          <div className="mx-auto my-2">
              <img className="h-20 w-20 rounded-full m-auto  shadow shadow-pink-300"
                    src={"/img/users/" + user.picture}
                    alt={user.name}
                  />
          </div>
          <h2 className="text-2xl font-bold">{user.name} {user.lastname}</h2>
          <ul className='max-w-md divide-y divide-pink-200 dark:divide-gray-700  px-5 lg:px-10'>
              <li className="mb-3 pt-3">
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                         {t('cellphone')}:
                        </p>
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                           {user.phone}
                        </p>
                    </div>
                </div>
              </li>
              <li className="mb-3 pt-3">
                <div className="flex items-center space-x-4 rtl:space-x-reverse">
                    <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        {t('address')}:
                        </p>
                        <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                           {user.address}
                        </p>
                    </div>
                </div>
              </li>
          </ul>
         </section>
         <section className='w-full lg:w-3/4 rounded mx-5'>
            <h1 className='w-full p-5 lg:px-10 uppercase font-bold text-pink-500 border-pink-500 border-b-2 mb-3'>
              {t('myPosts')}
            </h1>
            {posts.map((post)=>(
              console.log(post),
              <Post key={post.id} post={post}></Post>
            ))}
         </section>
      </section>
    }
    </>

  );
}

export default Profile;
