import PropTypes from 'prop-types';

const Post=({post})=>{
    return(
        <div key={post.id} className="flex mb-4 items-stretch">
          <div className="w-1/4 h-full  flex align-middle">
            <img
              className="object-cover h-full w-full radius-2"
              src={post.pictures?.[0]?.url || 'default.jpg'}
              alt={post.name}
            />
          </div>
          <div className="w-3/4 bg-white p-5 lg:px-10 ">
            <h2 className="text-lg font-bold">{post.name}</h2>
            <p className="pb-3 truncate">{post.pet_description}</p>
            <div className="flex content-between flex-wrap gap-2 pt-3 border-t-2 border-pink-500">
              <span className="bg-pink-100 text-pink-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-pink-900 dark:text-pink-300">Tipo: {post.pet_type}</span>
              <span className="bg-pink-100 text-pink-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-pink-900 dark:text-pink-300">Género: {post.pet_gender}</span>
              <span className="bg-pink-100 text-pink-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-pink-900 dark:text-pink-300">Tamaño: {post.pet_size}</span>
              <span className="bg-pink-100 text-pink-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-pink-900 dark:text-pink-300">Edad: {post.pet_age}</span>
              <span className="bg-pink-100 text-pink-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-pink-900 dark:text-pink-300">Fecha: {post.date_lost}</span>
              <span className="bg-pink-100 text-pink-800 text-sm font-medium me-2 px-2.5 py-0.5 rounded dark:bg-pink-900 dark:text-pink-300">Recompensa: {post.reward}</span>
            </div>
          </div>
        </div>
    )
}

Post.propTypes = {
    post: PropTypes.shape({
        id: PropTypes.number.isRequired,
        pictures: PropTypes.arrayOf(PropTypes.shape({
            url: PropTypes.string.isRequired
        })),
        name: PropTypes.string.isRequired,
        pet_description: PropTypes.string.isRequired,
        pet_type: PropTypes.string.isRequired,
        pet_gender: PropTypes.string.isRequired,
        pet_size: PropTypes.string.isRequired,
        pet_age: PropTypes.string.isRequired,
        date_lost: PropTypes.string.isRequired,
        reward: PropTypes.string.isRequired,
    }).isRequired
};

export default Post;

