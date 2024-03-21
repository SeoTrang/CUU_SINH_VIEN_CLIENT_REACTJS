import React, { useEffect, useState } from 'react';

import ContainerChat from '../../components/containerChat/ContainerChat';
import './Friend.css';
import ContainerFriend from '../../components/containerFriend/ContainerFriend';
import userAPI from '../../services/api/userAPI';

const Friend = () => {
    const [menuActive,setMenuActive] = useState(1);
    const [listFriends,setListFriends] = useState();

    const handleSetMenuActive = (value) =>{
        setMenuActive(value);
    }

    useEffect(()=>{
        const fetchFriendData = async () => {
            let result = await userAPI.getAllFriends();
            // console.log(result);
            if(result) setListFriends(result);
        }
        fetchFriendData();
    },[])

    //get all friends
    const handleGetAllFriends = async() => {
        setMenuActive(1);
        const result = await userAPI.getAllFriends();
        if(result) return setListFriends(result);

    }
    // Get a list of friends who have sent you requests
    const handleReceived = async() => {
        setMenuActive(2);
        const result = await userAPI.getFriendRequestToYou();
        if(result) return setListFriends(result);
    }
    // Get the list of friends you sent the request to
    const handleRequest = async() => {
        setMenuActive(3);
        const result = await userAPI.getFriendYouRequestToThem();
        if(result) return setListFriends(result);
    }

    
    return (
        <div id='friend-page' className='flex w-full'>
            <div className='menu-friend pl-2 pr-2 hidden lg:block w-3/12 h-screen'>
                <div className="container-menu-friend">
                    <div className="title p-4 text-2xl font-medium">
                        <div className="flex items-center">
                            {/* <i class="fa-solid fa-user-gear"></i> */}
                            <h2>Bạn bè</h2>
                        </div>
                    </div>
                    <div className="list-menu">
                        <div 
                        onClick={handleGetAllFriends}
                        className={"item-menu cursor-pointer font-medium flex items-center p-4 text-base hover:bg-gray-100 transition "+(menuActive == 1 ? "active":"")}>
                            <div className="icon text-black">
                                <i class="fa-solid fa-user-group"></i>
                            </div>
                            <div className="text ml-3">
                                Tất cả bạn bè
                            </div>
                        </div>

                        <div 
                        onClick={handleReceived}
                        className={"item-menu cursor-pointer font-medium flex items-center p-4 text-base hover:bg-gray-100 transition "+(menuActive == 2 ? "active":"")}>
                            <div className="icon text-black">
                                <i class="fa-solid fa-user-minus"></i>
                            </div>
                            <div className="text ml-3">
                                Lời mời kết bạn
                            </div>
                        </div>

                        <div 
                        onClick={handleRequest}
                        className={"item-menu cursor-pointer font-medium flex items-center p-4 text-base hover:bg-gray-100 transition "+(menuActive == 3 ? "active":"")}>
                            <div className="icon text-black">
                                <i class="fa-solid fa-user-check"></i>
                            </div>
                            <div className="text ml-3">
                                Đã gửi yêu cầu
                            </div>
                        </div>

                        <div 
                        onClick={()=> {handleSetMenuActive(4)}}
                        className={"item-menu cursor-pointer font-medium flex items-center p-4 text-base hover:bg-gray-100 transition "+(menuActive == 4 ? "active":"")}>
                            <div className="icon text-black">
                                <i class="fa-solid fa-user-plus"></i>
                            </div>
                            <div className="text ml-3">
                                Gợi ý
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='container-chat mt-3 w-full lg:w-9/12'>
                <div className="nav-friend-mobile lg:hidden mb-3">
                
                    <div className="box-option mt-3">
                        <button 
                        onClick={handleGetAllFriends}
                        className={'option shadow-xss '+(menuActive == 1 ? "option-active":"")}>
                            Bạn bè
                        </button>
                        <button 
                        onClick={handleReceived}
                        className={'option shadow-xss '+(menuActive == 2 ? "option-active":"")}>
                            Lời mời
                        </button>
                        <button 
                        onClick={handleRequest}
                        className={'option shadow-xss '+(menuActive == 3 ? "option-active":"")}>
                            Đã gửi
                        </button>
                        <button
                        onClick={()=> {handleSetMenuActive(4)}}
                        className={'option shadow-xss '+(menuActive == 4 ? "option-active":"")}>
                            Gợi ý
                        </button>
                    </div>
                
                </div>
                <ContainerFriend listFriends={listFriends}/>
            </div>
        </div>
    );
};

export default Friend;