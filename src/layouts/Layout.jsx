import React from 'react';
import SideBar from '../common/SideBar';

import './Layout.css';
import Header from '../common/header/Header';

const Layout = ({ children }) => {
    return (
        <div className='app w-full'>
            {/* <div className='container-sidebar pt-2'>
                <SideBar></SideBar>
            </div> */}
            <div className="header">
                <Header/>
            </div>
            <div className='container-content app-content container-common'>
                { children }
            </div>

        </div>
    );
};

export default Layout;