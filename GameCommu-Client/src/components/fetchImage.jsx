import axios from 'axios';

export async function fetchImgPost(pid,page) {
  try {
    const jwtToken = localStorage.getItem('Token');
    let header; 
    if(jwtToken){
      header =  {'Authorization': `Bearer ${jwtToken}`}
    }
    const response = await axios.get(`http://localhost:8080/api/images/call?pid=${pid}&page=${page}`, {
      responseType: 'arraybuffer',
      headers: header
    });

    const blob = new Blob([response.data], { type: 'image/jpeg' });
    const imageUrl = URL.createObjectURL(blob);

    return imageUrl;
  } catch (error) {
    console.error('Error fetching image:', error);
    throw error; 
  }
}

export async function fetchImgComment(cid,page) {
  try {
    const jwtToken = localStorage.getItem('Token');
    let header;
    if(jwtToken){
      header =  {'Authorization': `Bearer ${jwtToken}`}
    }
    console.log(header);
    const response = await axios.get(`http://localhost:8080/api/images/call?cid=${cid}&page=${page}`, {
      responseType: 'arraybuffer',
      headers: header
    });

    const blob = new Blob([response.data], { type: 'image/jpeg' });
    const imageUrl = URL.createObjectURL(blob);

    return imageUrl;
  } catch (error) {
    console.error('Error fetching image:', error);
    throw error; 
  }
}

export async function fetchImgProfile(uid,page) {
  try {
    const jwtToken = localStorage.getItem('Token');
    let header;
    if(jwtToken){
      header =  {'Authorization': `Bearer ${jwtToken}`}
    }
    const response = await axios.get(`http://localhost:8080/api/images/call?uid=${uid}&page=${page}`, {
      responseType: 'arraybuffer',
      headers: header
    });

    const blob = new Blob([response.data], { type: 'image/jpeg' });
    const imageUrl = URL.createObjectURL(blob);

    return imageUrl;
  } catch (error) {
    console.error('Error fetching image:', error);
    throw error; 
  }
}

export async function fetchImgGame(gid,page) {
  try {
    const jwtToken = localStorage.getItem('Token');
    let header;
    if(jwtToken){
      header =  {'Authorization': `Bearer ${jwtToken}`}
    }
    const response = await axios.get(`http://localhost:8080/api/images/call?gid=${gid}&page=${page}`, {
      responseType: 'arraybuffer',
      headers: header
    });

    const blob = new Blob([response.data], { type: 'image/jpeg' });
    const imageUrl = URL.createObjectURL(blob);

    return imageUrl;
  } catch (error) {
    console.error('Error fetching image:', error);
    throw error; 
  }
}



