/* eslint-disable react/prop-types */
import React from 'react';
import { Link } from 'react-router-dom';
import { postByGameApi } from '../../store/apis/postByGameApi';
import { postApi } from '../../store/apis/postApi';
import { imageApi } from '../../store/apis/imageApi';
import { likeApi } from '../../store/apis/likeApi';
import { useDispatch } from 'react-redux';
import { setData } from '../../store';
import './PostedItems.css'

const postList = [
    {
        name:'แสดงโพสที่เคยทั้งหมด'
    },
    {
        name:'แสดงโพสที่เคยคอมเม้นต์ทั้งหมด'
    },
]



function PostedItems({setPage}) {
    const dispatch = useDispatch();
    const handleClick = () => {
        setPage(0);
        dispatch(setData([]));
        dispatch(postByGameApi.util.resetApiState());
        dispatch(postApi.util.resetApiState());
        dispatch(imageApi.util.resetApiState());
        dispatch(likeApi.util.resetApiState());
    }
    let content;

    content = postList?.map((item,id)=>{
        return <h6 className="text-break" key={id}>
                <Link to={`posted/${id}`} onClick={handleClick} className="text-decoration-none link-g">
                    {item.name}
                </Link>
            </h6>
    })


    return (
        <>
            {content}
        </>
    )
}

export default PostedItems;