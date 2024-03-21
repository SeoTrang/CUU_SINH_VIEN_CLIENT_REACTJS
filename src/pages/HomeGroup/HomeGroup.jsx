import React from 'react';
import ListChatGroups from '../../components/listChatGroup/ListChatGroups';
import ContainerChatNull from '../../components/containerChatNull/ContainerChatNull';

const HomeGroup = () => {
    return (
        <div id='chat' className='flex w-full'>
            <div className='list-chat w-full lg:w-3/12 '>
                <ListChatGroups/>
            </div>
            <div className='container-chat hidden lg:block w-9/12'>
                <ContainerChatNull/>
            </div>
        </div>
    );
};

export default HomeGroup;