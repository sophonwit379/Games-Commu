/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { fetchImgProfile } from './fetchImage'
import { Image } from "react-bootstrap";
import { useCountProfileImgQuery} from '../store/apis/imageApi'
import default_pfp from '../assets/default_pfp.svg'
import ImageProfileList from "./ImageProfileList";
import Skeleton from "react-loading-skeleton";

function ImageProfile({className,uid,height}) {
  const { isFetching,data } = useCountProfileImgQuery(uid);
  let content;
  if(isFetching){
    content = <Skeleton height={height}/>
  }else if(data > -1){
    content = <ImageProfileList uid={uid} className={className} height={height}/>
  }else{
    content = <Image className={className} src={default_pfp} height={height} alt="profile-image" roundedCircle/>
  }

  return (
    <>
      {content}
    </>
  );
}

export default ImageProfile;

