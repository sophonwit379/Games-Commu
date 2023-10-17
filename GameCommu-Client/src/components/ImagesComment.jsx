/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { fetchImgComment } from './fetchImage'
import { Image } from "react-bootstrap";

function ImagesComment({cid}) {
  const [img, setImg] = useState(null);

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
      if(img){
        URL.revokeObjectURL(img)
      }
    };
  }, [cid]);

  return (
    <>
      {img?  
        <Image className="mb-2" src={img} height={200} alt="img-comment" />:
        null
      }
    </>
  );
}

export default ImagesComment;

