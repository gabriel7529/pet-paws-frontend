const BASE_URL = `${import.meta.env.VITE_BASE_URL}/`;

const getAuthHeaders = () => ({
  'Content-Type': 'application/json',
  'Authorization': `Bearer ${localStorage.getItem('token')}`
});

export async function fetchSavedPosts() {
  try {
    const response = await fetch(`${BASE_URL}api/favorites`, {
      headers: getAuthHeaders(),
    });
    return await response.json();
  } catch (e) {
    console.error('Error fetching saved posts:', e);
    return [];
  }
}

export async function savePost(postId) {
  try {
    const dataToSend = {
      postId: postId,
    };
    const response = await fetch(`${BASE_URL}api/favorites`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(dataToSend),
    });
    return await response.json();
  } catch (e) {
    console.error('Error saving post:', e);
    return false;
  }
}

export async function deletePost(id) {
  const res = await fetch(`${BASE_URL}api/favorites/${id}`, {
    method: 'DELETE',
    headers: getAuthHeaders(),
  });
  return await res.json();
}
