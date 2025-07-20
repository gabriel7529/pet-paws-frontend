import AvatarChat from "./AvatarChat";
import PropTypes from "prop-types";
import classNames from "classnames";

const MessageBubble = ({ image,  text, isSender, timestamp }) => {

  const now = new Date();
  const messageDate = new Date(timestamp);

  // Comparar días
  const isSameDay =
    now.getDate() === messageDate.getDate() &&
    now.getMonth() === messageDate.getMonth() &&
    now.getFullYear() === messageDate.getFullYear();

  return(
    <div
      className={classNames("flex gap-2 p-3", {
        "justify-end": isSender,
        "justify-start": !isSender,
      })}
    >
      {!isSender && (
        <div className="flex-shrink-0">
          <AvatarChat image={image}/>
        </div>
      )}

      <div
        className={classNames(
          "rounded-lg p-4 max-w-[80%] text-sm",
          {
            "bg-custom-200 text-white": isSender,
            "bg-custom-75 text-custom-350": !isSender,
          }
        )}
      >
        <p>{text}</p>
        <span className="text-xs text-gray-500 mt-1 block text-right">
          { isSameDay ? new Date(timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit'}) : new Date(timestamp).toLocaleDateString()}
        </span>
      </div>

      {isSender && (
        <div className="flex-shrink-0">
          <AvatarChat image = {JSON.parse(localStorage.getItem('user')).avatar}   />
        </div>
      )}

    </div>
  );
}


MessageBubble.propTypes = {
  image: PropTypes.string,
  text: PropTypes.string.isRequired,
  isSender: PropTypes.bool.isRequired,
  timestamp: PropTypes.string.isRequired,
};

export default MessageBubble;
