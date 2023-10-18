/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { fetchImgGame } from './fetchImage'
import { Image } from "react-bootstrap";
import no_img from '../assets/no-image.svg'

function ImageGameList({className,gid,height}) {
  const [img, setImg] = useState(null);

  const imageList = async (gid) => {
    const res = await fetchImgGame(gid, 0);
    return res;
  };

  useEffect(() => {
    const fetchData = async () => {
      const imageData = await imageList(gid);
      setImg(imageData);
    };
    fetchData();
    return () => {
      if(img){
        URL.revokeObjectURL(img);
      }
    };
  }, [gid]);
  
  return (
    <>
      {img ?  
        <Image className={className} src={img} height={height} alt="profile-image" roundedCircle/>:
        <Image className={className} src={no_img} height={height} alt="profile-image" roundedCircle/>
      }
    </>
  );
}

export default ImageGameList;

