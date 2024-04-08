import React, { useEffect, useState, useRef  } from 'react';

import { useDispatch, useSelector } from 'react-redux';

import { socket } from '../../sockets/socket';
import './ContainerChat.css';
import avatar2 from './avatar_2.jpg';
import dataMes from './testData';
import renderMessageContent from './RenderMessageContent';
import conversationAPI from '../../services/api/conversationAPI';
import messageAPI from '../../services/api/messageAPI';
import handleSendFile from './handleSendFile';
const ContainerChat = ({ conversation }) => {
    const [room, setRoom] = useState();
    const [users, setUsers] = useState();
    const [userIds, setUserIds] = useState();
    const [message, setMessage] = useState();
    const [dataMes, setDataMes] = useState([]);
    const [userSeen,setUserSeen] = useState();
    const [imgInput,setImgInput] = useState();
    const [fileInput,setFileInput] = useState();
    const user = useSelector((state) => state.user.user);

    // useEffect(()=>{
        
    // },[]);
  
    useEffect(() => {
        async function fetchData() {
            const dataUsers = await conversationAPI.getUserFromConversationID(conversation);
            if (dataUsers) {
              setRoom(dataUsers);
              setUsers(dataUsers.users);
              let datauserIds = dataUsers.users.map((user)=> {return {id: user.id}})
            //   console.log(datauserIds);
              setUserIds(datauserIds);
            }

            const dataMessFetch = await messageAPI.getMessageFromConversation(conversation)
            console.log(dataMessFetch);
            if(dataMessFetch && user){
                let data = dataMessFetch.map((mess) => {return {...mess,me: (mess.user_id == user.id? true : false)}})
                setDataMes(data)
            }
          }
      
        fetchData();
        socket.emit('join-room', conversation);
    
        // Clean up previous event listener before adding a new one
        socket.off('room-message');
    
        // Register the event listener
        socket.on(`room-message`, (data) => {
            console.log(data.data_mess);
            console.log(socket.id);

            const isCurrentUser = (data.data_mess.sender == socket.id);
            data.data_mess.me = isCurrentUser;
    
            // Cập nhật state dataMes bằng cách thêm phần tử mới vào mảng
            setDataMes((prevDataMes) => [...prevDataMes, data.data_mess]);
            console.log(isCurrentUser);
            scrollToBottom();
        });


        // 
        socket.on('seen',(data)=>{
            console.log(data);
            setUserSeen(data);
        })
  
        // Clean up function for component unmount
        return () => {
            // Emit the leave-room event when the component is unmounted
            socket.emit('leave-room', conversation);
            // Clean up the event listener when the component unmounts
            socket.off('room-message');
        };
    }, [conversation]);

    useEffect(()=>{
        // console.log(dataMes);
        scrollToBottom();
    },[dataMes])


    const endOfMessagesRef = useRef(null);
    const scrollToBottom = () => {
        endOfMessagesRef.current.scrollIntoView({ behavior: 'smooth' });
    };
  
    const handleSendMessage = async (message1,type) => {
        console.log(message1);
        console.log(type);
        socket.emit('room-message', { room: conversation, message: message1, user: user, type: type, userIds: userIds });
        scrollToBottom();
        // await messageAPI.create(
        //     {
        //         conversation_id: conversation, reply_to: null,type: 'text',content:[message]
        //     }
        // )
        setMessage('');

    };

    const handleKeyDown = (event) => {
        if (event.key === 'Enter' && !event.shiftKey) {
          event.preventDefault();  // Ngăn chặn xuống dòng tự động
          handleSendMessage([message],'text');
        }
    };


  
    useEffect(() => {
    //   console.log(dataMes);
    //   setMessage('');
        if(dataMes.length > 0){
            let latestMessage_id = dataMes[dataMes.length - 1].id;
            socket.emit('seen',{user_id: user.id,message_id: latestMessage_id, conversation_id: conversation})
        }
    }, [dataMes]);

    // Add an event listener for "beforeunload"

    // useEffect(() => {
    //     const handleBeforeUnload = () => {
    //         // Emit the leave-room event when the page is about to unload
    //         socket.emit('leave-room', conversation);
    //     };

    //     window.addEventListener('beforeunload', handleBeforeUnload);

    //     // Clean up the event listener when the component is unmounted
    //     return () => {
    //         window.removeEventListener('beforeunload', handleBeforeUnload);
    //     };
    // }, [conversation]);



    // handle input file and img
    useEffect(() => {
        console.log('Selected images:', imgInput);
        console.log('Selected files:', fileInput);
    }, [imgInput, fileInput]);

    const handleImgInputChange = async (e) => {
       
        const selectedFiles = Array.from(e.target.files);
        setImgInput(selectedFiles);
        let result = await handleSendFile(selectedFiles);
        if(result){
            handleSendMessage(result,'img');
        }
    };

    const handleFileInputChange = async (e) => {
        const selectedFiles = Array.from(e.target.files);
        setFileInput(selectedFiles);
        let result = await handleSendFile(selectedFiles);
        if(!result) {
            // handleSendMessage(result,'file');
            return ;
        }
        for (let index = 0; index < result.length; index++) {
            handleSendMessage([result[index]],'file');
        }

    };
    

    return (
        <div id='container-chat' className=''>
            <div className="user pl-3 pr-3  flex justify-between items-center">
                <div className="left flex items-center">
                    <div className="avatar flex">
                    <div className="img avatar-common">
                        {room && room.type === "room" ? (
                        <img src={import.meta.env.VITE_API_URL + room.avatar} alt="" />
                        ) : (
                        users &&
                        users
                            .filter((user1) => user1.id !== user?.id)
                            .map((user2) => (
                            <img
                                key={user2.id}
                                src={import.meta.env.VITE_API_URL + user2.avatar}
                                alt=""
                            />
                            ))
                        )}
                    </div>
                        <div className="status">
                            <i class="fa-solid fa-circle"></i>
                        </div>
                    </div>
                    <div className="short-info ml-2">
                        <div className="name ">
                        {room && room.type === "room" ? (
                        room.name
                        ) : (
                        users &&
                        users
                            .filter((user1) => user1.id !== user.id)
                            .map((user2) => (
                                user2.user_name
                            ))
                        )}
                        </div>
                        <div className="status text-sm">
                            Đang hoạt động
                        </div>
                    </div>
                </div>
                <div className="right">
                    <div className="flex w-full">
                        <div className="call item">
                            <i class="fa-solid fa-phone"></i>
                        </div>
                        <div className="call-video item">
                            <i class="fa-solid fa-video"></i>
                        </div>
                        <div className="user-info item">
                            <i class="fa-solid fa-circle-info"></i>
                        </div>
                    </div>
                </div>
            </div>

            

            <div className="content  pl-3 pr-3" >
            {
                dataMes &&
                dataMes.map((message) => {
                    
                    return (
                        <div className="item-mes"  key={message.id} >
                            <div className={'flex items-start '+(message.me == true ? " flex-row-reverse": null)}>
                                <div className="avatar-common">
                                    <img src={import.meta.env.VITE_API_URL + message.user.avatar} alt="User Avatar" />
                                </div>
                                <div className={"messager w-9/12 ml-1 flex "+(message.type == 'images'|| 'videos' ? '' : 'messager-bg')+(message.me == true ? "  justify-end": null)}>
                                    {/* <div className="user-name text-gray-400 text-xs">
                                        <span>{message.user.name}</span>
                                    </div> */}
                                    <div className="">
                                        <div className='bg-white p-4 flex  rounded-lg d-flex'>

                                            {renderMessageContent(message)}
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>

                            <div className="flex justify-end pb-2">
                                <div className="seen flex">
                                    {
                                        userSeen &&
                                        userSeen
                                        .filter((user)=> user.message_id == message.id)
                                        .map((user,index)=> (
                                            // <span>{user.user.user_name}</span>
                                            <div className="avatar-sm ml-1">
                                                <img src={import.meta.env.VITE_API_URL + user.user.avatar} alt="" />
                                            </div>
                                            
                                        ))
                                    }
                                </div>
                            </div>
                        </div>   
                        
                    )
                }
               
               )}

                <div className='' ref={endOfMessagesRef}></div>
            </div>
            

            <div className="input-box">
                <input
                    className='hidden'
                    onChange={handleImgInputChange}
                    id='img-input'
                    type="file"
                    accept="image/*"
                    multiple
                />
                <input
                    className='hidden'
                    onChange={handleFileInputChange}
                    id='file-input'
                    type="file"
                    multiple
                />
                <div className="box-send w-full pl-3 pr-3 flex items-center h-full">
                    <div className="tool-bar w-1/12 h-full items-center flex ">
                        <div className="img tool-item mr-3">
                            <label htmlFor="img-input">
                                <i class="fa-regular fa-image"></i>
                            </label>
                            
                        </div>
                        <div className="file tool-item mr-3">
                            <label htmlFor="file-input">
                                <i class="fa-solid fa-paperclip"></i>
                            </label>
                        </div>
                        <div className="micro tool-item mr-3">
                            <i class="fa-solid fa-microphone"></i>
                        </div>
                    </div>
                    <div className="content-input w-11/12 flex h-full">
                        <div className="input w-full">
                            <input 
                            value={message}
                            onKeyDown={handleKeyDown}
                            onChange={(e) => {setMessage(e.target.value)}}
                            className='w-full' type="text" placeholder='Nhập vào đây...' />
                        </div>
                        <div 
                        onClick={() => {handleSendMessage([message],'text');}}
                        className="action-send">
                            <i class="fa-solid fa-paper-plane"></i>
                        </div>
                    </div>
                    
                    
                </div>
                
            </div>
        </div>
    );
};

export default ContainerChat;