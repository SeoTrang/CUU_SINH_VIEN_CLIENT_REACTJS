import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './SideBar.css';
import avatar from './avatar.jpg'
import Cookies from 'js-cookie';
import { fetchUserData } from '../redux/actions/userAction';

const SideBar = () => {
    const [navActive, setNavActive] = useState(1);

    const handeNavActive = (value) => {
        setNavActive(value);
    }

    const dispatch = useDispatch();
    // console.log(user);
    const user = useSelector((state) => state.user.user);
    const loading = useSelector((state) => state.loading.loading);

    console.log(user);
    console.log(loading);

    useEffect(()=> {
        let accessTokenTemp = Cookies.get("accessToken");
        
        if(accessTokenTemp && !user){
            dispatch(fetchUserData());
        }
    },[]);




    return (
        <div className='sidebar h-screen'>
            <div className="avatar flex w-full justify-center items-center">
                <img src={user ? import.meta.env.VITE_API_URL+ user.avatar : null} alt="" />
            </div>

            <div className="container-nav pt-5 flex flex-col justify-between">
                <div className="nav-top flex flex-col">
                <Link 
                    to={'/'} 
                    onClick={()=>{handeNavActive(1)}} 
                    className={"nav w-full h-full pt-4 pb-4 flex justify-center items-center "+ (navActive == 1? "nav-active": "")}>
                        <i class="fa-solid fa-house"></i>
                    </Link>
                    <Link 
                    to={'/chat'} 
                    onClick={()=>{handeNavActive(2)}} 
                    className={"nav w-full h-full pt-4 pb-4 flex justify-center items-center "+ (navActive == 2? "nav-active": "")}>
                        <i class="fa-regular fa-comment"></i>
                    </Link>
                    <Link 
                    to={'/groups'}
                    onClick={()=>{handeNavActive(3)}} 
                    className={"nav w-full h-full pt-4 pb-4 flex justify-center items-center "+ (navActive == 3? "nav-active": "")}>
                        <i class="fa-solid fa-layer-group"></i>
                    </Link>
                    <Link 
                    to={'/groups'}
                    onClick={()=>{handeNavActive(4)}} 
                    className={"nav w-full h-full pt-4 pb-4 flex justify-center items-center "+ (navActive == 4? "nav-active": "")}>
                        <i class="fa-solid fa-clock"></i>
                    </Link>
                    <Link 
                    to={'/friend'}
                    onClick={()=>{handeNavActive(5)}} 
                    className={"nav w-full h-full pt-4 pb-4 flex justify-center items-center "+ (navActive == 5? "nav-active": "")}>
                        <i class="fa-solid fa-user-group"></i>
                    </Link>
                </div>

                <div className="nav-bottom">
                    <Link 
                    to={''} 
                    onClick={()=>{handeNavActive(6)}} 
                    className={"nav w-full h-full pt-4 pb-4 flex justify-center items-center "+ (navActive == 6? "nav-active": "")}>
                        <i class="fa-solid fa-gear"></i>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SideBar;