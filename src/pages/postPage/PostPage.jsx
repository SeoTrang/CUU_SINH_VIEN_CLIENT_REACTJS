import React, { useEffect } from 'react';
import {
    useParams,
} from "react-router-dom";

import SidebarCommon from '../../components/SidebarCommon/SidebarCommon';
import ContainerHome from '../../components/containerHome/ContainerHome';
import OptionRight from '../home/components/OptionRight';
import './PostPage.css';
const PostPage = () => {
    let { id } = useParams();
    useEffect(() => {
        console.log(id);
    },[id])
    return (
        <div className='post-page flex justify-between w-full' >
            <SidebarCommon/>
            <div id='content-common' className="content-common">
                <div className="box-content-common">
                    <div className="content-post-page w-full bg-white rounded-md">
                        
                    </div>
                </div>
            </div>
            <OptionRight/>
        </div>
    );
};

export default PostPage;