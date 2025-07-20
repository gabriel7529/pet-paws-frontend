const BASE_SERVER = import.meta.env.VITE_BASE_URL;
const BASE_URL = `${BASE_SERVER}/`;


function getHeaders() {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${token}`,
  };
}

export async function fetchChatsByUserId(userId) {
  try {

    const response = await fetch(`${BASE_URL}chat/user/${userId}`, {
      method: "GET",
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Error al obtener los chats: ${response.status} ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error en fetchChatsByUserId:", error);
    throw error;
  }
}

export async function fetchMessagesByChatId(chatId) {
  try {
    const response = await fetch(`${BASE_URL}menssage/${chatId}`, {
      method: "GET",
      headers: getHeaders(),
    });

    if (!response.ok) {
      throw new Error(`Error al obtener mensajes: ${response.status} ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error en fetchMessagesByChatId:", error);
    throw error;
  }
}

export async function createChat(chatData) {
  try {
    const response = await fetch(`${BASE_URL}chat/`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(chatData),
    });

    if (!response.ok) {
      throw new Error(`Error al crear el chat: ${response.status} ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error en createChat:", error);
    throw error;
  }
}

export async function sendMessage(messageData) {
  try {
    const response = await fetch(`${BASE_URL}menssage/`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify(messageData),
    });

    if (!response.ok) {
      throw new Error(`Error al enviar mensaje: ${response.status} ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error en sendMessage:", error);
    throw error;
  }
}

export async function createChatIfNotExists(ownerId, friendId) {
  try {

    const existingChats = await fetchChatsByUserId(ownerId);

    const chatExists = existingChats.some(chat =>
      chat.members.some(member => member.id === friendId)
    );

    if (chatExists) {
      return existingChats.find(chat =>
        chat.members.some(member => member.id === friendId)
      );
    }

    // Si no existe, crear un nuevo chat
    const response = await fetch(`${BASE_URL}chat/`, {
      method: "POST",
      headers: getHeaders(),
      body: JSON.stringify({ owner_id: ownerId, friend_id: friendId }),
    });

    if (!response.ok) {
      throw new Error(`Error al crear el chat: ${response.status} ${response.statusText}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error en createChatIfNotExists:", error);
    throw error;
  }
}
