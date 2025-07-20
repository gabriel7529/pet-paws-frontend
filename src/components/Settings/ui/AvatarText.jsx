import PropTypes from "prop-types";

const AvatarText = ({ name, description, img_url }) => {
  return (
    <div className="flex items-center gap-4 justify-center border-2 w-full">
      <img
        className="w-10 h-10 rounded-full"
        src={img_url}
        alt=""
      />
      <div className="font-medium dark:text-white">
        <div>{name}</div>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {description}
        </div>
      </div>
    </div>
  );
};

AvatarText.propTypes = {
  name: PropTypes.string,
  description: PropTypes.string,
  img_url: PropTypes.string,
};

export default AvatarText;
