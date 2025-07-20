const BASE_URL = import.meta.env.VITE_BASE_URL;
const userUrl= `${BASE_URL}/api/users/`;

export async function fetchUsers() {
  const response = await fetch(`${userUrl}`);
  return response.json();
}

export async function fetchUser(id) {
  const response = await fetch(`${userUrl}${id}`);
  return response.json();
}

export async function fetchUserByEmail(email) {
  const response = await fetch(`${BASE_URL}/api/users/email/${email}`);
  return response.json();
}

export async function updateUser(id, updatedUser) {
  const response = await fetch(`${userUrl}${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedUser),
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
}

export async function patchUser(id, updatedFields) {
  const response = await fetch(`${userUrl}${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${localStorage.getItem("token")}`,
    },
    body: JSON.stringify(updatedFields),
  });
  return response.json();
}

export async function loginUser(username, password) {
  const url = `${BASE_URL}/auth/local/login`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: username,
      password: password,
    }),
  });

  if(response.status == "400" ){
    return null;
  }
  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.statusText}`);
  }
  const data = await response.json();
  // Guardar el token JWT en localStorage
  localStorage.setItem("token", data.token);
  //console.log("data", data);

  // Retornar el perfil del usuario
  return data.profile;
}

export async function createUser(user) {
  const response = await fetch(`${userUrl}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(user),
  });

  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  return response.json();
}

export async function getUserByEmail(email) {
  const url = new URL(`${userUrl}`);

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.statusText}`);
  }

  const users = await response.json();

  if (!Array.isArray(users)) {
    throw new Error("Invalid response format");
  }

  // Filtrar los usuarios que coincidan con el email proporcionado
  const matchingUsers = users.filter(
    (user) => user.email && user.email.toLowerCase() === email.toLowerCase()
  );

  return matchingUsers;
}

export async function recoverPassword(email) {
  const url = new URL(`${BASE_URL}/auth/local/recover-password`);

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Network response was not ok: ${errorData.message}`);
  }

  const result = await response.json();
  return result;
}

export async function resetPassword(token, newPassword) {
  const url = new URL(`${BASE_URL}/auth/local/reset-password`);

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ token, newPassword }),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(`Network response was not ok: ${errorData.message}`);
  }

  return await response.json();
}

export const activateAccount = async (token) => {
  try {
    const response = await fetch(`${BASE_URL}/auth/local/activate/${token}`, {
      method: "GET",
    });

    if (!response.ok) {
      throw new Error("Error al activar la cuenta");
    }

    return response.json();
  } catch (error) {
    console.error("Error en activateAccount:", error);
    throw error;
  }
};

export const fetchLoggedUser= async () => {
  try {
    const response = await fetch(`${BASE_URL}/auth/me`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });

    if (!response.data) {
      throw new Error("Error al obtener el usuario logueado");
    }

    return response.data;
  } catch (error) {
    console.error("Error en fetchLoggedUser:", error);
    throw error;
  }
}
