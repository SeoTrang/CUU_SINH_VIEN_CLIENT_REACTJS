import React, { useState } from 'react';

import TextField from '@mui/material/TextField';

import './ContainerHome.css';
import Post from '../post/Post';
import CreatePost from '../post/createPost/CreatePost';
const ContainerHome = () => {
    

    return (
        <div id='containerHome' className='w-full'>
            <div className="container-home w-full ">
                <div className="box-container-home w-full flex justify-center">
                    <div className="contaier-content-h w-8/12">
                        <CreatePost/>
                        <div className="posts">
                            <Post/>
                        </div>

                        
                    </div>

                    
                </div>
            </div>
            
        </div>
    );
};

export default ContainerHome;

