import React from 'react';
import ListChat from '../../components/listChat/ListChat';
import ContainerChatNull from '../../components/containerChatNull/ContainerChatNull';

const HomeChat = () => {
    return (
        <div id='chat' className='flex w-full'>
            <div className='list-chat w-full lg:w-3/12 h-screen'>
                <ListChat/>
            </div>
            <div className='container-chat hidden lg:block w-9/12'>
                
                <ContainerChatNull/>
                    
            </div>
        </div>
    );
};

export default HomeChat;