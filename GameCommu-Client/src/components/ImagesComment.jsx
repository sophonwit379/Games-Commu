/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import ImagesItemList from "./ImagesItemList";
import { fetchImgComment } from './fetchImage'
import { Image } from "react-bootstrap";

function ImagesComment({cid}) {
  const [img, setImg] = useState([]);

  const imageList = async (cid) => {
    const res = await fetchImgComment(cid, 0);
    return res;
  };

  useEffect(() => {
      const fetchData = async () => {
        const imageData = await imageList(cid);
        setImg(imageData);
      };
      fetchData();
    return () => {
      img?.forEach((imageData) => {
        URL.revokeObjectURL(imageData.original);
      });
    };
  }, [cid]);

  return (
    <>
      {img.length > 0?  
        <Image src={img} height={200} alt="img-comment" />:
        null
      }
    </>
  );
}

export default ImagesComment;



{/* <ReactImageGallery
  showPlayButton={false}
  autoPlay={false}
  infinite={false}
  items={img}
  showThumbnails={false}
  showIndex
/> */}