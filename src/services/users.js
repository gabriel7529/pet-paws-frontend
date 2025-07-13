const BASE_URL = "http://localhost:8080/";

export async function fetchUsers() {
  const response = await fetch(`${BASE_URL}users`);
  return response.json();
}

export async function fetchUser(id) {
  const response = await fetch(`${BASE_URL}users/${id}`);
  return response.json();
}
