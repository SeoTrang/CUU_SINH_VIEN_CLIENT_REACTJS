import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import ContentPost from '../contentPost/ContentPost';
import ModalUserReaction from '../../modalUserReaction/ModalUserReaction';
import postAPI from '../../../services/api/postAPI';
const ItemPost = ({post_item}) => {
    const [post,setPost] = useState();
    const user = useSelector((state) => state.user.user);
    const [openModalReaction, setOpenModalReaction] = useState(false);
    const [postReactionId, setPostReactionId] = useState();

    useEffect(()=> {
        console.log(post_item);
        setPost(post_item);
    },[post_item])

    const handleAddReaction = async (post_id,user_id) => {
        // let post = postsData.filter(post => post.id === post_id);
        // post[0].reactions = [...post[0].reactions,{"post_id": post_id,"user_id": user_id}]
        // console.log(post);
        // setPostsData(postsData.map((value) => {
        //     if(value.id == post_id){
        //         return post[0];
        //     }else return value
        // }))

        // let updateReaction =  post.reactions.filter(reaction => reaction.user_id != user_id)
        // console.log(updateReaction);
        setPost(prev => ({
            ...prev,
            reactions: [...prev.reactions,{"post_id": post_id,"user_id": user_id}]

        }))

        let resultCreateReaction = await postAPI.createReaction(post_id);
        console.log(resultCreateReaction);

    }
    const handleDeleteReaction = async (post_id,user_id) => {
        let updateReaction =  post.reactions.filter(reaction => reaction.user_id != user_id)
        console.log(updateReaction);
        setPost(prev => ({
            ...prev,
            reactions: [...updateReaction]

        }))
        let deleteCreateReaction = await postAPI.deleteReaction(post_id);
        console.log(deleteCreateReaction);
    }

    const handleShowModalReaction = (post_id) => {
        setOpenModalReaction(true);
        // console.log(post_id);
        setPostReactionId(post_id);
    }

    useEffect(()=> {
        console.log(post);
    },[post]);
    return (
        post ?
        <div className='post mt-3 mr-1 pt-5 pb-5 pl-4 pr-4 bg-white shadow-xss rounded-md' style={{marginRight: 0}}>
            <div className="post-top">
                <div className="w-full flex justify-between items-center">
                    <div className="user flex items-center">
                        <div className="avatar-common">
                            <div className="img">
                                <img src={import.meta.env.VITE_API_URL + post.user.avatar} alt="" />
                            </div>
                        </div>
                        <span className="post-info  ml-2">
                            <span className="user-name">
                                <Link className="name font-medium">
                                    {post.user.user_name}
                                </Link>

                                {
                                    post.usersTags.length > 0 && 
                                    <span className="user-tag ml-1">
                                        <span className='text-gray-400'>cùng với </span>
                                        <span className='font-medium ml-1'>
                                            {post.usersTags[0].user_name}
                                        </span>
                                        {
                                            post.usersTags.length == 2 &&
                                            <span className=''>
                                                <span className='ml-1 mr-1 text-gray-400'>và</span>
                                                <span className='font-medium ml-1'>
                                                    {post.usersTags[1].user_name}
                                                </span>
                                            </span>
                                        }
                                        
                                        {
                                            post.usersTags.length > 2 &&
                                            <span className=''>
                                                <span className='ml-1 mr-1 text-gray-400'>và</span>
                                                <span className='font-medium ml-1'>
                                                    {(post.usersTags.length - 1)  }
                                                    <span className='ml-1'>
                                                    người khác
                                                    </span>
                                                </span>
                                            </span>
                                        }
                                    </span>
                                }
                            </span>
                            <div className="updated text-sm text-gray-400">
                                3 hour ago
                            </div>
                        </span>
                    </div>
                    <div className="action-right cursor-pointer">
                        <div className="box-action">
                            <i class="fa-solid fa-ellipsis"></i>
                        </div>
                    </div>
                </div>
            </div>
            <div className="caption text-sm">
                <p>
                    {
                        post.caption
                    }
                </p>
                <button className='text-blue-500'>
                    Xem thêm
                </button>
            </div>
            <ContentPost contents={post.contents}/>
            <div className="action-bottom mt-3">
                <div className="flex items-center justify-between">
                    <div className="action-left flex">
                        <div className="reaction flex items-center">
                            <div  className="heart text-xl mr-2 hover:text-red-500 cursor-pointer">
                                {
                                    post.reactions.some((reaction) => reaction.user_id == user.id)
                                    ?
                                    <i onClick={() => {handleDeleteReaction(post.id,user.id)}} class="text-red-500 fa-solid fa-heart"></i>
                                    :
                                    <i onClick={() => {handleAddReaction(post.id,user.id)}} class="fa-regular fa-heart"></i>

                                }
                            </div>
                            <div onClick={() => {handleShowModalReaction(post.id)}} className="length-reaction text-sm font-medium cursor-pointer">
                                {/* <i class="fa-solid fa-heart"></i> */}
                                {post.reactions.length} Thích
                            </div>
                        </div>

                        <Link to={'/detail-post/'+post.id} className="comment flex items-center ml-3">
                            <div className="heart text-xl mr-2">
                                <i class="fa-regular fa-comment"></i>
                            </div>
                            <div className="length-reaction text-sm font-medium">
                                {/* <i class="fa-solid fa-heart"></i> */}
                                {post.lengthComment} Bình luận
                            </div>
                        </Link>
                    </div>
                    <div className="action-right ">
                        <div className="action-share flex items-center  ">
                            <div className="icon text-blue-600">
                                <i class="text-xl fa-solid fa-share"></i>
                            </div>
                            <span className='ml-2 font-medium'>Chia sẻ</span>
                        </div>
                    </div>
                </div>
            </div>
            <ModalUserReaction open={openModalReaction} post_id = {postReactionId} setOpenModalReaction = {setOpenModalReaction}/>
        </div>
        :
        null
    );
};

export default ItemPost;