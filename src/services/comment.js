const BASE_URL = "http://localhost:3000/";

export async function fetchCommentsByPost(postId) {
  const token = localStorage.getItem('token');

  const response = await fetch(`${BASE_URL}comments/${postId}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  });
  if (!response.ok) {
    throw new Error(`Error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}


export async function createComment(commentData) {
  const token = localStorage.getItem('token');
  const response = await fetch(`${BASE_URL}comments/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`,
    },
    body: JSON.stringify(commentData),
  });
  return response.json();
}
