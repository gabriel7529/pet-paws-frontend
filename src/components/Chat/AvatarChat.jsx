import PropTypes from "prop-types";

 function AvatarChat ({ size = 'sm', image }) {
  const sizeClasses = {
    sm: 'w-12 h-12',
    lg: 'w-16 h-16'
  };

  return (
    <div className={`${sizeClasses[size]} bg-custom-150 rounded-full flex items-center justify-center`}>
      <img src={image || "/src/assets/img/Icons/avatar_placeholder.svg"} className="rounded-full w-full"></img>
    </div>
  );
};

AvatarChat.propTypes = {
  size: PropTypes.string,
  image: PropTypes.string,
}

export default AvatarChat;
