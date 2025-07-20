const BASE_URL = "http://localhost:3000";

export async function fetchUsers() {
  const response = await fetch(`${BASE_URL}/api/users/`);
  return response.json();
}

export async function fetchUser(id) {
  const response = await fetch(`${BASE_URL}/api/users/${id}`);
  return response.json();
}

export async function updateUser(id, updatedUser) {
  const response = await fetch(`${BASE_URL}/api/users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedUser),
  });
  return response.json();
}

export async function patchUser(id, updatedFields) {
  const response = await fetch(`${BASE_URL}/api/users/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
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

  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.statusText}`);
  }

  const data = await response.json();

  // Guardar el token JWT en localStorage
  localStorage.setItem("token", data.token);

  // Retornar el perfil del usuario
  return data.profile;
}

export async function createUser(user) {
  const response = await fetch(`${BASE_URL}/api/users`, {
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
  const url = new URL(`${BASE_URL}/api/users`);

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
