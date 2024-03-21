import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import { useDispatch, useSelector } from 'react-redux';

import { socket } from '../../sockets/socket'
import CreateSchool from '../../components/createSchool/CreateSchool';
import './ListChatGroups.css';
import avatar2 from './avatar_6.jpg';
import Test from './Test';
import CreateGroup from '../createGroup/CreateGroup';
import addressAPI from '../../services/api/addressAPI';
import schoolAPI from '../../services/api/schoolAPI';
import conversationAPI from '../../services/api/conversationAPI';

const ListChatGroups = () => {
    // data
    const [addressData,setAddressData] = useState();
    const [schoolData,setSchoolData] = useState();
    // state
    const [itemActive,setItemActive] = useState();
    const [address, setAddress] = useState('');
    const [school, setSchool] = useState('');
    const [conversations,setConversations] = useState();
    const [latestMessage,setLatestMessage] = useState();
    

    const user = useSelector((state) => state.user.user);

    const handleSetItemActive = (item) => {
        setItemActive(item);
    }

    const handleChangeAddress = async (event) => {
        console.log(event.target.value);
        setAddress(event.target.value);
        let result = await schoolAPI.getByAddress(event.target.value);
        if(result) setSchoolData(result);
    };

    // handle school
    const handleChangeSchool = (event) => {
        console.log(event.target.value);
        setSchool(event.target.value);
    };


    


    // api

    useEffect(()=> {
        const fetchData = async () => {
            try {
                const data = await addressAPI.getAll();
                console.log(data);
                // Xử lý dữ liệu ở đây
                setAddressData(data);

                let conversationsData = await conversationAPI.getAllConversationGroupFromUser();
                if(conversationsData) setConversations(conversationsData)
            } catch (error) {
                console.error('Error fetching data:', error);
                // Xử lý lỗi ở đây
            }
        };
    
        fetchData();

        socket.on('notify-room-message', (data) => {
            console.log(data);
            // console.log(socket.id);
            setLatestMessage(data.data_mess);

            // const isCurrentUser = (data.data_mess.sender == socket.id);
            // data.data_mess.me = isCurrentUser;
            // setLatestMessage(data.data_mess)
           
        });

        return () => {
            // Clean up the event listener when the component unmounts
            socket.off('room-message');
        };
    },[])

    
    return (
        <div id='list-chat-group'>

            <div className="options-chat">
                <div className="box-option mt-3">
                    <Link to={'/chat'} className='option'>
                        Tất cả
                    </Link>
                    <Link to={'/groups'} className='option option-active'>
                        Nhóm
                    </Link>
                </div>
            </div>

            <div className="search">

                <div className="box-search box-search-group p-2">
                    {/* <div className="icon w-1/12 flex justify-center">
                        <i class="fa-solid fa-magnifying-glass "></i>
                    </div> */}
                    <input className='w-11/12' type="text" placeholder='Tìm kiếm' />
                </div>
                <div className="filter mt-2">
                    <div className="address w-12/12">
                        <FormControl fullWidth variant="standard" sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="demo-simple-select-label">Tỉnh</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={address}
                                label="Tỉnh"
                                onChange={handleChangeAddress}
                            >
                                {
                                    addressData &&
                                    addressData.map((value,index)=> {
                                        return <MenuItem key={index} value={value.id}>{value.name}</MenuItem>
                                    })
                                }
                                
                                
                            </Select>
                        </FormControl>
                    </div>
                    <div className="address w-12/12">
                        <FormControl fullWidth variant="standard" sx={{ m: 1, minWidth: 120 }}>
                            <InputLabel id="demo-simple-select-label">Trường</InputLabel>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={school}
                                label="Trường"
                                onChange={handleChangeSchool}
                            >
                                {
                                    schoolData &&
                                    schoolData.map((value,index)=> {
                                        return <MenuItem key={index} value={value.id}>{value.name}</MenuItem>
                                    })
                                }
                                
                                
                            </Select>
                        </FormControl>
                    </div>
                </div>
                <div id="create-school">
                    <CreateSchool/>
                </div>
                <div className="action-search w-full mt-3">
                    <Button className='w-full' variant="contained" size="medium">
                        <i class="fa-solid fa-magnifying-glass"></i>
                        <span className='ml-2'>
                            Tìm kiếm
                        </span>
                    </Button>
                </div>
                
            </div>
            <div className='mt-2 mb-2'>
                <hr />
            </div>


            <div className="box-list-chat">

                {
                    conversations &&
                    conversations.map((conversation,index)=> {
                        return (
                            <div className="item-chat pb-3" key={index}>
                                <Link
                                to={'/group/'+conversation.conversation_id} 
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

            <div className='create-group w-full pl-3 pr-3'>
                {/* <Button className='w-full' variant="contained" size="medium">
                    Tạo Nhóm Mới
                </Button> */}
                <CreateGroup/>
            </div>
        </div>
    );
};

export default ListChatGroups;