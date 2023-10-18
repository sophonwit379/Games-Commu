/* eslint-disable react/prop-types */
import React, { useEffect, useState } from "react";
import { fetchImgProfile } from './fetchImage'
import { Image } from "react-bootstrap";
import { useCountGameImgQuery} from '../store/apis/imageApi'
import no_img from '../assets/no-image.svg'
import ImageGameList from "./ImageGameList";
import Skeleton from "react-loading-skeleton";

function ImageGame({className,gid,height}) {
  const { isFetching,data } = useCountGameImgQuery(gid);
  let content;
  if(isFetching){
    content = <Skeleton height={height}/>
  }else if(data > -1){
    content = <ImageGameList uid={gid} className={className} height={height}/>
  }else{
    content = <Image className={className} src={no_img} height={height} alt="profile-image" roundedCircle/>
  }

  return (
    <>
      {content}
    </>
  );
}

export default ImageGame;

