/* eslint-disable react/prop-types */
import { fetchImgPost } from './fetchImage'
import ReactImageGallery from 'react-image-gallery';

function ImagesCount({ callData }) {
  const imageList =(page) => {
    const data = [];
    for (let i = 0; i < page; i++) {
      fetchImgPost(callData.pid,i).then((res)=>{
        data.push({original:res})
      });
    }
    return data;
  }

  const img = callData.page ? imageList(callData.page) : 0;
  return (
    <>
      {img ?(
        <ReactImageGallery
          showPlayButton={false}
          autoPlay={false}
          infinite={false}
          items={img}
          showThumbnails={false}
          showIndex
          loading="lazy"
        />
      ):(
        null
      )}
      
    </>
  );
}


export default ImagesCount;