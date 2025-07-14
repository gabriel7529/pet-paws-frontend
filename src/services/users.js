const BASE_URL = "http://localhost:8080/";

export async function fetchUsers() {
  const response = await fetch(`${BASE_URL}users`);
  return response.json();
}

export async function fetchUser(id) {
  const response = await fetch(`${BASE_URL}users/${id}`);
  return response.json();
}

export async function updateUser(id, updatedUser) {
  const response = await fetch(`${BASE_URL}users/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedUser),
  });
  return response.json();
}

export async function patchUser(id, updatedFields) {
  const response = await fetch(`${BASE_URL}users/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(updatedFields),
  });
  return response.json();
}

export async function loginUser(username, password) {
  const url = new URL(`${BASE_URL}users`);
  url.search = new URLSearchParams({
    username: encodeURIComponent(username),
    password: encodeURIComponent(password),
  });

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Network response was not ok: ${response.statusText}`);
  }

  const users = await response.json();

  if (!Array.isArray(users)) {
    throw new Error("Invalid response format");
  }

  return users;
}

export async function createUser(user) {
  const response = await fetch(`${BASE_URL}users`, {
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
