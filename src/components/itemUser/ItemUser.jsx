import React from 'react';

const ItemUser = ({item}) => {
    // console.log(item);
    return (
        <div className='item flex items-center mb-3 cursor-pointer'>
            <div className="avatar-common">
                <img src={import.meta.env.VITE_API_URL+item.avatar} alt="" />
            </div>
            <div className="name ml-3">
                {item?.user_name}
            </div>
            
        </div>
    );
};

export default ItemUser;