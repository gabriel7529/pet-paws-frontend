import { HiPaperAirplane, HiEmojiHappy } from 'react-icons/hi';
import { useEffect, useState, useRef, useCallback } from "react";
import AvatarChat from "../../components/Chat/AvatarChat";
import MessageBubble from "../../components/Chat/MessageBubble";
import ChatMessage from "../../components/Chat/ChatMessage";
import socket from "../../services/socket";
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { fetchChatsByUserId, fetchMessagesByChatId, sendMessage } from '../../services/chat';
import useWindowSize from '../../hooks/useWindowsSize';

const ChatInterface = () => {
  const [activeUsers, setActiveUsers] = useState([]);
  const [chats, setChats] = useState([]);
  const [imageChat, setImageChat] = useState(null);
  const [selectedChat, setSelectedChat] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const { t } = useTranslation();
  const conversationRef = useRef(null);
  const { width } = useWindowSize();
  const [isChatListVisible, setIsChatListVisible] = useState(true);

  const user = JSON.parse(localStorage.getItem("user"));

  const fetchChats = useCallback (async () => {
    try {
      const data = await fetchChatsByUserId(user.id);
      setChats(data);
    } catch (err) {
      console.error("Error al cargar los chats:", err);
    }
  }, [user?.id]);

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
  }, [fetchChats]);

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
    if (width < 768) setIsChatListVisible(false); // Ocultar lista de chats en pantallas pequeñas
  };

  const handleBackToChatList = () => {
    setSelectedChat(null);
    setIsChatListVisible(true); // Mostrar lista de chats en pantallas pequeñas
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
    <div className="flex min-h-screen-minus-100">
      {/* Panel izquierdo: Lista de chats */}
      {(isChatListVisible || width >= 768) && (
        <div className="w-full max-h-96 md:w-2/6 border-r flex flex-col bg-white">
          <div className="bg-custom-150 p-4 flex items-center gap-3">
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
      )}
      <div className="flex-1 flex flex-col bg-white">
        {selectedChat ? (
          <>
            <div className="border-b p-4 flex items-center justify-center gap-4">
              <AvatarChat size="lg" image={imageChat} />
              <div>
                <h2 className="text-custom-350">{selectedChat.members.find((m) => m.id !== user.id)?.name}</h2>
                <span className="text-sm">
                  @{selectedChat.members.find((m) => m.id !== user.id)?.email}
                </span>
                <br></br>
                <span className="text-sm mt-1">
                {activeUsers.some((u) => u.id === selectedChat.members.find((m) => m.id !== user.id)?.id) ? "En línea" : "Desconectado"}
               </span>
               <br></br>
              <Link to={`/user/${selectedChat.members.find((m) => m.id !== user.id).id}`}>
                  <button className="mt-2 px-4 py-1 bg-custom-75 text-custom-200 rounded-full text-sm">
                    {t('seeProfile')}
                  </button>
              </Link>
              {!isChatListVisible && width < 768 && selectedChat && (
                <button onClick={handleBackToChatList} className="mt-2 px-4 py-1 bg-custom-75 text-custom-200 rounded-full text-sm">
                {t("goBack")}
                </button>
              )}
              </div>
            </div>
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
            <div className="p-4 border-t">
              <div className="flex items-center p-2 bg-custom-75 rounded-lg">
                <HiEmojiHappy className="w-6 h-6 text-custom-200" />
                <input
                  type="text"
                  className="flex-1 bg-transparent outline-none px-3"
                  placeholder={t("typeMessage")}
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                />
                <button onClick={handleSendMessage} className="p-2">
                  <HiPaperAirplane className="w-6 h-6 text-custom-200" />
                </button>
              </div>
            </div>
          </>
        ) : (
          width >= 768 && (
            <div className="flex items-center justify-center h-full text-custom-350 text-6xl">
              {t("selectChat")}
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default ChatInterface;
