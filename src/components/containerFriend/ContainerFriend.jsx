import React from 'react';
import { useNavigate } from "react-router-dom";

import './ContainerFriend.css';
import conversationAPI from '../../services/api/conversationAPI';

const ContainerFriend = ({listFriends}) => {
    console.log(listFriends);
    const navigate = useNavigate();

    const handleGetConversation = async(value) => {
        console.log(value);
        const conversation_id = await conversationAPI.getPrivateConversation(value);
        console.log("conversationId : "+conversation_id);
        if(conversation_id) return navigate(`/chat/${conversation_id}`)
    }
    return (
        <div className='container-friend pl-3 pt-4'>
            <div className="box-container">
                <div className="title">
                    <h1 className='text-2xl font-medium'>Lời mời kết bạn</h1>
                </div>

                <div className="content mt-3">
                    <div className="list-user grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 mx-auto">
                        {
                            listFriends &&
                            listFriends.map((value,index)=> {
                                return(
                                    <div className="card-user pt-3 pb-3" key={index}>
                                        <div className="img flex items-center justify-center">
                                            <div className="avatar-lg">
                                                <img src={import.meta.env.VITE_API_URL + value.avatar} alt="" />
                                            </div>
                                        </div>
                                        <div className="card-content">
                                            <div className="content-text">
                                                
                                                <div className="name font-medium flex items-center justify-center">
                                                    {value.user_name}
                                                </div>
                                                <div className="short-info text-xs text-gray-400 flex items-center justify-center">
                                                    5 bạn chung
                                                </div>
                                            </div>

                                            <div className="content-action flex flex-col items-center mt-3">
                                                {
                                                    value.status == "pending" ?
                                                    (
                                                        value.sender == value.id ?
                                                        <button className="action-top bg-blue-600 text-white w-7/12">
                                                            Xác nhận
                                                        </button>
                                                        :
                                                        null
                                                    )
                                                    :
                                                    <button onClick={()=>{handleGetConversation(value.id)}} className="action-top bg-blue-600 text-white w-7/12">
                                                            Nhắn tin
                                                    </button>
                                                }
                                                {
                                                    value.status == "pending"?

                                                    (
                                                        <button className="action-bottom bg-gray-300 text-black mt-2 w-7/12">
                                                            Hủy
                                                        </button>
                                                    )
                                                    :
                                                    <button className="action-bottom bg-gray-300 text-black mt-2 w-7/12">
                                                        Hủy kết bạn
                                                    </button>
                                                }
                                            </div>
                                        </div>
                                    </div>
                                )
                            })
                        }
                        
                        
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContainerFriend;