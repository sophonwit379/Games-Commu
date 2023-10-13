import axios from 'axios';

export async function fetchImgPost(pid,page) {
  try {
    const jwtToken = localStorage.getItem('Token');
    const response = await axios.get(`http://localhost:8080/api/images/call?pid=${pid}&page=${page}`, {
      responseType: 'arraybuffer',
      headers: {
        'Authorization': `Bearer ${jwtToken}`
      }
    });

    const blob = new Blob([response.data], { type: 'image/jpeg' });
    const imageUrl = URL.createObjectURL(blob);

    return imageUrl;
  } catch (error) {
    console.error('Error fetching image:', error);
    throw error; // Optional: Rethrow the error to handle it in the calling code
  }
}
