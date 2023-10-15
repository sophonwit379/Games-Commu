/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import ImagesItemList from "./ImagesItemList"; // Make sure to import the ImagesItemList component
import { fetchImgPost } from './fetchImage'

function ImagesCount({ callData }) {
  const [img, setImg] = useState([]); // Initialize img state

  const imageList = async (page) => {
    const data = [];
    for (let i = 0; i < page; i++) {
      const res = await fetchImgPost(callData.pid, i);
      data.push({original:res});
    }
    return data;
  };

  useEffect(() => {
    // Fetch and set the image data when callData changes
    if (callData.page) {
      const fetchData = async () => {
        const imageData = await imageList(callData.page);
        setImg(imageData);
      };
      fetchData();
    }
  }, [callData]);

  return (
    <>
      {callData.page > 0?  
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