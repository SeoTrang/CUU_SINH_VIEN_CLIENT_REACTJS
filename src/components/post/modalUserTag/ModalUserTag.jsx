import React, { useEffect, useState } from 'react';

import './ModalUserTag.css';
import ItemUser from '../../itemUser/ItemUser';
import friendAPI from '../../../services/api/friendAPI';
const ModalUserTag = ({setUserTagged}) => {
    const [allFriend,setAllFriend] = useState([]);
    const [FriendTagged,setAllFriendTagged] = useState([]);
    const [searchFriend,setSearchFriend] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            let result = await friendAPI.getAll();
            // console.log(result);
            if(result) return setAllFriend(result);
        }
        fetchData();

        
    },[])

    const handleChangUserTag = (user) => {
        let exist = FriendTagged.some((friend) => friend.id === user.id);
        if(exist) return;
        let friendsTag = [...FriendTagged,user];
        // console.log(friendsTag);
        setAllFriendTagged(friendsTag);
    }

    const handleDeleteUserTagged = (user) => {
        const updatedFriendTagged = FriendTagged.filter((friend) => friend.id !== user.id);
        setAllFriendTagged(updatedFriendTagged);
         
    }

    useEffect(() => {
        // console.log(searchFriend);
        setUserTagged(FriendTagged)
    },[FriendTagged])

    return (
        <div className='modal-user-tag mt-3'>
            <hr />
            <div className="box-search mt-3 bg-gray-100 rounded-md">
                <input 
                type="text" 
                placeholder='Tìm kiếm bạn bè' 
                onChange={(e) => {setSearchFriend(e.target.value)}}
                value={searchFriend}
                className='outline-none bg-gray-100 w-full pt-3 pb-3 pl-2 pr-2 rounded-md' />
            </div>

            {
                FriendTagged.length > 0 && 
                <div className="user-tagged border mt-3 flex p-3">
                    {
                        
                        
                        FriendTagged
                        
                        .map((friend) => {
                            return (
                                <div className="item-user-tagged flex items-center bg-blue-100 rounded-md p-3 mr-2">
                                    <div className="user-name text-blue-600 mr-2">
                                        {
                                            friend.user_name
                                        }
                                    </div>
                                    <div onClick={() => handleDeleteUserTagged(friend)} className="delete text-blue-600 cursor-pointer">
                                        <i class="fa-solid fa-xmark"></i>
                                    </div>
                                </div>
                            )
                        })
                        
                    }
                </div>
            }
            

            <div className="suggest mt-3">
                <div className="title">
                    Gợi ý
                </div>

                <div className="box-friend mt-3">
                {
                allFriend &&
                allFriend
                    .filter((friend) => friend.user_name.toLowerCase().includes(searchFriend))
                    .map((friend, index) => (
                    <div key={index} onClick={() => handleChangUserTag(friend)}>
                        <ItemUser  item={friend}/>
                    </div>
                    ))
                }
                </div>
            </div>
        </div>
    );
};

export default ModalUserTag;