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


export async function createPost(postData) {
  const response = await fetch(`${BASE_URL}posts`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  });

  if (!response.ok) {
    throw new Error('Error al crear el post');
  }

  return response.json(); // Retornar la respuesta del servidor
}

