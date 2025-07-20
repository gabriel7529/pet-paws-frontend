import { HiChevronLeft, HiDotsVertical, HiPaperAirplane, HiEmojiHappy } from 'react-icons/hi';
import { useEffect, useState, useRef } from "react";
import AvatarChat from "../../components/Chat/AvatarChat";
import MessageBubble from "../../components/Chat/MessageBubble";
import ChatMessage from "../../components/Chat/ChatMessage";
import socket from "../../services/socket";
import { Link } from 'react-router-dom';
import { fetchChatsByUserId, fetchMessagesByChatId, sendMessage } from '../../services/chat';


const ChatInterface = () => {
  const [activeUsers, setActiveUsers] = useState([]);
  const [chats, setChats] = useState([]);
  const [imageChat, setImageChat] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const conversationRef = useRef(null);

  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  useEffect(() => {
    socket.emit("register", user?.id);
    socket.on("activeSessions", (users) => setActiveUsers(users));

    socket.on("receiveMessage", (message) => {
      setMessages((prevMessages) => {
        if (!prevMessages.some((msg) => msg.id === message.id)) {
          return [...prevMessages, message];
        }
        return prevMessages;
      });
      scrollToBottom();
    });

    return () => {
      socket.off("receiveMessage");
      socket.off("activeSessions");
    };
  }, [user?.id]);

  useEffect(() => {
    fetchChats();
  }, [user?.id, token]);

  const fetchChats = async () => {
    try {
      const data = await fetchChatsByUserId(user.id);
      setChats(data);
    } catch (err) {
      console.error("Error al cargar los chats:", err);
    }
  };

  const fetchMessages = async (chatId) => {
    try {
      const data = await fetchMessagesByChatId(chatId);
      setMessages(data);
      scrollToBottom();
    } catch (err) {
      console.error("Error al cargar mensajes:", err);
    }
  };



  const handleSelectChat = (chat) => {
    setSelectedChat(chat);
    const otherMember = chat.members.find((member) => member.id !== user.id);
    setImageChat(otherMember?.avatar);
    fetchMessages(chat.id);
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !selectedChat) return;

    const receiverId = selectedChat.members.find((member) => member.id !== user.id)?.id;
    const messageData = {
      chat_id: selectedChat.id,
      sender_id: user.id,
      receiver_id: receiverId,
      content: newMessage,
    };

    try {

      const savedMessage = await sendMessage(messageData);
      socket.emit("sendMessagesPrivate", {
        message: { ...savedMessage, chatId: selectedChat.id },
        recipientUserId: receiverId,
      });

      setMessages((prev) => [...prev, { ...savedMessage, chatId: selectedChat.id }]);
      setNewMessage("");
      scrollToBottom();
    } catch (error) {
      console.error("Error al enviar el mensaje:", error);
    }
  };

  const scrollToBottom = () => {
    setTimeout(() => {
      conversationRef.current?.scrollTo(0, conversationRef.current.scrollHeight);
    }, 0);
  };

  return (
    <div className="flex h-screen">
      {/* Panel izquierdo */}
      <div className="w-1/4 border-r flex flex-col bg-white">
        <div className="bg-custom-150 p-8 flex items-center gap-3">
          <AvatarChat image={user.avatar} />
          <div>
            <div className="text-custom-350">{user?.fullName}</div>
            <div className="text-sm text-custom-200">@{user?.email}</div>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          {chats.map((chat) => {
            const friend = chat.members.find((member) => member.id !== user.id);
            return (
              <div key={chat.id} onClick={() => handleSelectChat(chat)}>
                <ChatMessage userId={friend?.id} lastMessage={chat.lastMessage} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Panel derecho */}
      <div className="flex-1 flex flex-col bg-white">
        {/* Header */}
        <div className="bg-white px-4 py-3 flex justify-between items-center border-b">
          <div className="flex items-center gap-4">
            <button className="lg:hidden">
              <HiChevronLeft className="w-6 h-6 text-custom-350" />
            </button>
            <span className="text-custom-350 text-lg">Mensajes</span>
          </div>
          <HiDotsVertical className="w-6 h-6 text-pink-500" />
        </div>

        {/* Perfil del usuario activo */}
        {selectedChat ? (
          <div className="border-b p-6 flex flex-col items-center">
            <AvatarChat size="lg" image={imageChat} />
            <h2 className="text-custom-350 mt-2">
              {selectedChat.members.find((m) => m.id !== user.id)?.name}
            </h2>
            <span className="text-custom-200">
              @{selectedChat.members.find((m) => m.id !== user.id)?.email}
            </span>
            <span className="text-sm mt-1">
              {activeUsers.some((u) => u.id === selectedChat.members.find((m) => m.id !== user.id)?.id) ? "En línea" : "Desconectado"}
            </span>

            <Link to={`/user/${selectedChat.members.find((m) => m.id !== user.id).id}`}>
              <button className="mt-2 px-4 py-1 bg-custom-75 text-custom-200 rounded-full text-sm">
                Ver perfil
              </button>
            </Link>
          </div>
        ) : (
          <div className="flex items-center justify-center h-full text-custom-350 text-6xl">
            Seleccione un chat
          </div>
        )}

        {/* Área de mensajes */}
        <div className="flex-1 overflow-y-auto px-4 py-2" ref={conversationRef}>
          {messages.map((msg, index) => (
            <MessageBubble
            key={`${msg.id}-${index}`}
              text={msg.content}
              isSender={msg.senderId === user.id}
              timestamp={msg.sentAt}
              image={imageChat}
            />
          ))}
        </div>

        {selectedChat && (
          <div className="p-4 border-t">
            <div className="bg-custom-75 rounded-lg flex items-center p-2">
              <HiEmojiHappy className="w-6 h-6 text-custom-200" />
              <input
                type="text"
                placeholder="Escribe un mensaje..."
                className="flex-1 bg-transparent outline-none px-3"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
              />
              <button onClick={handleSendMessage} className="p-2">
                <HiPaperAirplane className="w-6 h-6 text-custom-200" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatInterface;
