import React, { useEffect, useState } from 'react';



import './Post.css';
import datatest from './data-test';
import postAPI from '../../services/api/postAPI';

import ItemPost from './itemPost/ItemPost';
const Post = () => {
    const [postsData, setPostsData] = useState([]);
    
    useEffect(()=> {
        postAPI.getFeed()
            .then(data => {
                if (data !== null) {
                    setPostsData(data);
                    console.log('Received data:', data);
                } else {
                    console.log('Failed to fetch data.');
                }
            })
            .catch(err => console.error('Error in getFeed:', err));
    },[]);


    

    return (
        <div className="container-post">
            {
                postsData.length > 0 &&
                postsData.map((post,index) => {
                    return (
                        <ItemPost post_item={post}/>
                    )
                })
            }

            

        
        </div>
    );
};

export default Post;