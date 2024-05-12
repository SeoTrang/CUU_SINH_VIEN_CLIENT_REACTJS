import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { socket } from '../../sockets/socket'

import './ListChat.css';

import avatar2 from './avatar_2.jpg';
import userAPI from '../../services/api/userAPI';
import conversationAPI from '../../services/api/conversationAPI';

const ListChat = ({ conversation }) => {
    const [itemActive,setItemActive] = useState();
    const [search,setSearch] = useState();
    
    const [listFriends,setListFriends] = useState();
    const [conversations,setConversations] = useState();
    const [latestMessage,setLatestMessage] = useState();

    
    const user = useSelector((state) => state.user.user);
    console.log(user);

    const handleSetItemActive = (item) => {
        setItemActive(item);
    }
    useEffect(() => {
        let timer;
    
        const handleSearch = async () => {
          try {
            const data = await userAPI.search(search);
            console.log('search');
            console.log(data);
            
            // Xử lý dữ liệu ở đây
          } catch (error) {
            console.error('Error fetching data:', error);
            // Xử lý lỗi ở đây
          }
        };
    
        if (search && search.trim() !== '') {
          // Gọi API truy vấn tìm kiếm khi người dùng dừng nhập sau 2 giây
          timer = setTimeout(handleSearch, 2000);
        }
    
        return () => {
          // Hủy bỏ timer nếu giá trị nhập liệu thay đổi
          clearTimeout(timer);
        };
    }, [search]);

    useEffect(()=>{
        const fetchData = async () => {
            let Friendsdata = await userAPI.getAllFriends();
            // console.log(result);
            if(Friendsdata) setListFriends(Friendsdata);

            let conversationsData = await conversationAPI.getAllConversationFromUser();
            if(conversationsData) setConversations(conversationsData)


        }
        fetchData();
    },[])

    useEffect(()=> {
        console.log(conversations);
        console.log(user);
    },[conversations])

    useEffect(() => {
        
        
    
        // Register the event listener
        socket.on('notify-room-message', (data) => {
            console.log(data);
            // console.log(socket.id);
            setLatestMessage(data);

            // const isCurrentUser = (data.data_mess.sender == socket.id);
            // data.data_mess.me = isCurrentUser;
            // setLatestMessage(data.data_mess)
           
        });
  
        return () => {
            // Clean up the event listener when the component unmounts
            socket.off('room-message');
        };
    }, []);
    

    useEffect(()=> {
        // console.log(conversations);
        // console.log(user);
        console.log(conversation);
    },[latestMessage,conversation])


    return (
        <div id='list-chat'>
            <div className="options-chat mt-3">
                <div className="box-option">
                    <Link to={'/chat'} className='option option-active'>
                        Tất cả
                    </Link>
                    <Link to={'/groups'} className='option'>
                        Nhóm
                    </Link>
                </div>
            </div>
            <div className="search">

                <div className="box-search">
                    <div className="icon w-1/12 flex justify-center cursor-pointer hover:text-blue-500">
                        <i class="fa-solid fa-magnifying-glass "></i>
                    </div>
                    <input 
                    className='w-11/12' 
                    onChange={(e) => {setSearch(e.target.value)}}
                    type="text" 
                    placeholder='Tìm kiếm' />
                </div>

                
            </div>

            <div className="box-list-chat">

                {
                    conversations &&
                    conversations.map((conversation,index)=> {
                        return (
                            <div className="item-chat pb-3" key={index}>
                                <Link
                                to={'/chat/'+conversation.conversation_id} 
                                onClick={()=>{handleSetItemActive(index)}}
                                className={"box-item flex items-center pl-3 pr-2 pt-2 pb-2 cursor-pointer w-full "+ (itemActive == index ? "box-item-active" : "")}>
                                    <div className="avatar pr-4">
                                        {
                                            conversation.type == 'user' && user ?
                                            conversation.users
                                            .filter((value) => value.id !== user?.id)
                                            .map((value) => (
                                                <img src={import.meta.env.VITE_API_URL + value.avatar} alt="" />
                                            ))
                                            :
                                            <img src={import.meta.env.VITE_API_URL + conversation.avatar} alt="" />
                                        }
                                        
                                    </div>
                                    <div className="text-val-center">
                                        <div className="name">
                                        {
                                            conversation.type == 'user' && user ?
                                            conversation.users.filter((value) => value.id != user?.id)
                                            .map((value2) => (
                                                value2.user_name
                                            ))
                                            :
                                            conversation.conversation_name
                                        }
                                        </div>
                                        <div className="lastest-chat flex text-gray-400 text-sm">
                                            {
                                                latestMessage &&
                                                latestMessage.room_id == conversation.conversation_id ?
                                                (
                                                    latestMessage.user.id == user.id ?
                                                    <>
                                                        <div className={"user "}>
                                                            Bạn : 
                                                        </div>
                                                        <div className={"text-val ml-1 "}>
                                                            {
                                                                latestMessage.type == 'text' ? latestMessage.content_messages[0].content: 'Đã gửi 1 file'
                                                            }
                                                        </div>
                                                    </>
                                                    :
                                                    <div className={"text-val ml-1 "+ (latestMessage && latestMessage.seen == false ? 'text-black': '')}>
                                                        {
                                                            latestMessage.type == 'text' ? latestMessage.content_messages[0].content: 'Đã gửi 1 file'
                                                        }
                                                    </div>
                                                )
                                                :
                                                (
                                                    <>
                                                        {
                                                        conversation.latestMessage &&
                                                        conversation.latestMessage.user_id == user?.id ?
                                                        <div className={"user "}>
                                                            Bạn : 
                                                        </div>
                                                        :
                                                        null
                                                    }
                                                    
                                                    <div className={"text-val ml-1 "}>
                                                        {
                                                            conversation.latestMessage &&
                                                            conversation.latestMessage.type == 'text' ?
                                                            conversation.latestMessage.content_messages[0].content
                                                            :
                                                            'Đã gửi 1 file'
                                                        }
                                                    </div>
                                                    </>
                                                    
                                                )
                                            }
                                            
                                        </div>
                                    </div>

                                
                                </Link>
                            </div>
                        )
                    })
                }
                
                
                
            </div>
        </div>
    );
};

export default ListChat;