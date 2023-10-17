/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import ImagesItemList from "./ImagesItemList";
import { fetchImgPost } from './fetchImage'

function ImagesCount({ callData }) {
  const [img, setImg] = useState([]);

  const imageList = async (page,pid) => {
    const data = [];
    for (let i = 0; i < page; i++) {
      const res = await fetchImgPost(pid, i);
      data.push({original:res});
    }
    return data;
  };

  useEffect(() => {
    if (callData.page > -1) {
      const fetchData = async () => {
        const imageData = await imageList(callData.page,callData.pid);
        setImg(imageData);
      };
      fetchData();
    }
    return () => {
      if(img.length >-1){
        img?.forEach((imageData) => {
          URL.revokeObjectURL(imageData.original);
        });
      }
    };
  }, [callData]);

  return (
    <>
      {callData.page > -1?  
        <ImagesItemList images={img} />:
        null
      }
    </>
  );
}

export default ImagesCount;



{/* <ReactImageGallery
  showPlayButton={false}
  autoPlay={false}
  infinite={false}
  items={img}
  showThumbnails={false}
  showIndex
/> */}