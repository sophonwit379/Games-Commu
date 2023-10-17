/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { fetchImgProfile } from './fetchImage'
import { Image } from "react-bootstrap";
import default_pfp from '../assets/default_pfp.svg'

function ImageProfileList({className,uid,height}) {
  const [img, setImg] = useState(null);

  const imageList = async (uid) => {
    const res = await fetchImgProfile(uid, 0);
    return res;
  };

  useEffect(() => {
    const fetchData = async () => {
      const imageData = await imageList(uid);
      setImg(imageData);
    };
    fetchData();
    return () => {
      if(img){
        URL.revokeObjectURL(img);
      }
    };
  }, [uid]);
  
  return (
    <>
      {img ?  
        <Image className={className} src={img} height={height} alt="profile-image" roundedCircle/>:
        <Image className={className} src={default_pfp} height={height} alt="profile-image" roundedCircle/>
      }
    </>
  );
}

export default ImageProfileList;

