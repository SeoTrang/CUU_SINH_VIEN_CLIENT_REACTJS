import React from 'react';
import { useLocation, useParams } from 'react-router-dom';

import '../chat/Chat.css';
import ListChat from '../../components/listChat/ListChat';
import ContainerChat from '../../components/containerChat/ContainerChat';
import ListChatGroups from '../../components/listChatGroup/ListChatGroups';
import ContainerChatNull from '../../components/containerChatNull/ContainerChatNull';
const Group = () => {
    const {conversation} = useParams();
    console.log(conversation);
    return (
        <div id='chat' className='flex w-full'>
            <div className='list-chat w-full lg:w-3/12 h-screen'>
                <ListChatGroups/>
            </div>
            <div className='container-chat hidden lg:block w-9/12'>
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

export default Group;