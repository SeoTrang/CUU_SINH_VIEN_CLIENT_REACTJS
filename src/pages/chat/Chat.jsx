import React, { useEffect, useState } from 'react';
import { useLocation, useParams } from 'react-router-dom';

import ListChat from '../../components/listChat/ListChat';
import ContainerChat from '../../components/containerChat/ContainerChat';

import './Chat.css';
import ContainerChatNull from '../../components/containerChatNull/ContainerChatNull';
const Chat = () => {
    // const location = useLocation();
    // const params = new URLSearchParams(location.search);
    // const conversation = params.get('conversation');
    // console.log(conversation);
    const {conversation} = useParams();
    console.log(conversation);


    
    return (
        <div id='chat' className='flex w-full'>
            <div className='list-chat hidden lg:block w-3/12'>
                <ListChat conversation = {conversation}/>
            </div>
            <div className='container-chat  w-full lg:w-9/12 h-full '>
                {
                    conversation ?
                    <ContainerChat conversation = {conversation}/>
                    :
                    <ContainerChatNull/>
                    // <ContainerChat/>    
                }
            </div>
        </div>
    );
};

export default Chat;