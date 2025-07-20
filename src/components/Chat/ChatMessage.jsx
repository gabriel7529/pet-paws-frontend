import PropTypes from "prop-types";
import AvatarChat  from "./AvatarChat";
import { useEffect, useState } from "react";
import { fetchUser } from "../../services/users";

const ChatMessage = ({ userId, time }) => {
  const [user, setUser] = useState("Usuario desconocido");

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userData = await fetchUser(userId);
        setUser(userData || "Usuario desconocido");
      } catch (error) {
        console.error("Error al obtener el usuario:", error);
      }
    };

    if (userId) {
      getUserData();
    }
  }, [userId]);

  return (
    <div className="flex items-center gap-3 p-3 hover:bg-pink-50">
      <AvatarChat image = {user.avatar} />
      <div className="flex flex-col">
        <span className="text-custom-350">{user.name} {user.lastName}</span>
        <span className="text-sm text-custom-200">{time}</span>
      </div>
    </div>
  );
};

ChatMessage.propTypes = {
  userId: PropTypes.string,
  time: PropTypes.string
}

export default ChatMessage;
