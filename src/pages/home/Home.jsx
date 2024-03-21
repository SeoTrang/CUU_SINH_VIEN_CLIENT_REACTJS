import React, { useEffect, useState } from 'react';
import SidebarCommon from '../../components/SidebarCommon/SidebarCommon';

import './Home.css';
import ContainerHome from '../../components/containerHome/ContainerHome';
import OptionRight from './components/OptionRight';
import postAPI from '../../services/api/postAPI';
const Home = () => {

    
    return (
        <div id='home' className='flex w-full'>
            
            <SidebarCommon/>
            <div className="content-common">
                <ContainerHome/>
            </div>
            <OptionRight/>

        </div>
    );
};

export default Home;