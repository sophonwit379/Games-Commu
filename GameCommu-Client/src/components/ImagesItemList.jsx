/* eslint-disable react/prop-types */
import React from "react";
import { Image } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import ReactImageGallery from "react-image-gallery";

function ImagesItemList({ images }) {

    if (!images || images.length === 0) {
        return;
    }

    return <div>
        <ReactImageGallery
            showPlayButton={false}
            autoPlay={false}
            infinite={false}
            items={images}
            showThumbnails={false}
            showIndex
        /> 
    </div>;
}

export default ImagesItemList;


