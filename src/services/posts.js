const BASE_URL = "http://localhost:8080/";

export async function fetchPosts() {
  const response = await fetch(`${BASE_URL}posts`);
  return response.json();
}

export async function fetchPost(id) {
  const response = await fetch(`${BASE_URL}posts/${id}`);
  return response.json();
}

export async function fetchPostsByUser(id) {
  const response = await fetch(`${BASE_URL}users/${id}/posts`);
  return response.json();
}
