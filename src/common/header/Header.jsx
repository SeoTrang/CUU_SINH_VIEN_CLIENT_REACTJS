import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import logo from '../../assets/logo/logo2.svg';

import './Header.css';
import Cookies from 'js-cookie';
import { fetchUserData } from '../../redux/actions/userAction';
const Header = () => {

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
        <div id='header' className=' w-full'>
            <div className="container-common hidden lg:block header-pc  items-center h-full">
                <div className="flex">
                    <div className="header-left w-2/12 flex items-center">
                        <Link to={'/'} className="logo ">
                            <img src={logo} alt="" />
                        </Link>
                        
                    </div>
                    <div className="header-middle w-8/12 flex items-center">
                        
                        <div className="search hidden xl:block">
                            <div className="box-search h-full flex items-center">
                                <input type="text" placeholder='Tìm kiếm' />
                                <i class="fa-solid fa-magnifying-glass"></i>
                            </div>
                        </div>
                        <div className="menu ml-10 items-center ">
                        <div className="box-menu text-2xl flex ">
                            <div className='menu-item menu-item-active text-blue-600'>
                                    <Link to={'/'} className=''>
                                        <i class="fa-solid fa-house-user"></i>
                                    </Link>
                            </div>
                            <div className='menu-item text-purple-600'>
                                    <Link to={'/friend'} className=''>
                                    <i class="fa-regular fa-user"></i>
                                    </Link>
                            </div>
                            <div className='menu-item text-red-500'>
                                    <Link className=''>
                                    <i class="fa-regular fa-circle-play"></i>
                                    </Link>
                            </div>
                                
                            <div className='menu-item text-green-500'>
                                    <Link className=''>
                                        {/* <i class="fa-solid fa-globe"></i> */}
                                        <i class="fa-regular fa-square-plus"></i>
                                    </Link>
                            </div>
                        </div>
                        </div>
                    </div>

                    <div className="action-right text-2xl w-3/12 flex items-center justify-end">
                        <div className="menu flex">
                            <div className="menu-item  xl:hidden text-end">
                                <Link>
                                    <i class="fa-solid fa-magnifying-glass"></i>
                                </Link>
                            </div>
                            <div className="menu-item text-end text-orange-500">
                                <Link>
                                    <i class="fa-regular fa-bell"></i>
                                </Link>
                            </div>
                            <div className="menu-item text-end text-blue-500">
                                <Link to={'/chat'}>
                                    <i class="fa-brands fa-facebook-messenger"></i>
                                </Link>
                            </div>
                            <div className="menu-item-user flex items-center justify-end">
                                <Link>
                                    <div className="user ">
                                        <div className="img">
                                            <img src="https://uitheme.net/sociala/images/profile-4.png" alt="" />
                                        </div>
                                    </div>
                                </Link>
                            </div>
                            <div className="menu-item menu-item-menu md:hidden lg:hidden xl:hidden text-end">
                                <Link>
                                    <i class="fa-solid fa-bars"></i>
                                </Link>
                            </div>
                        </div>
                        
                        

                    </div>
                </div>
            </div>
            <div className="container-common lg:hidden header-mb">
                <div className="header-top">
                    <div className="flex items-center justify-between">
                        <div className="logo ">
                            <img src={logo} alt="" />
                        </div>
                        <div className="action-right flex items-center text-xl">
                            <div className="icon-add-new">
                                <i class="fa-regular fa-square-plus"></i>
                            </div>
                            <div className="icon-search ml-5">
                                <i class="fa-solid fa-magnifying-glass"></i>
                            </div>
                            <div className="icon-menu ml-5">
                                <i class="fa-solid fa-bars"></i>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="header-bottom mt-2">
                    <ul className='flex w-full text-xl menu-items-m justify-between items-center'>
                        <li className='menu-item-m menu-item-m-active pl-2 pr-2 text-blue-700'>
                            <Link>
                                <i class="fa-solid fa-house-user"></i>
                            </Link>
                        </li>
                        <li className='menu-item-m pl-2 pr-2 text-purple-500'>
                            <Link>
                                <i class="fa-regular fa-user"></i>
                            </Link>
                        </li>
                        <li className='menu-item-m pl-2 pr-2 text-red-500'>
                            <Link>
                                <i class="fa-regular fa-circle-play"></i>
                            </Link>
                        </li>
                        <li className='menu-item-m pl-2 pr-2 text-orange-400'>
                            <Link>
                                <i class="fa-regular fa-bell"></i>
                            </Link>
                        </li>
                        <li className='menu-item-m pl-2 pr-2 text-blue-500'>
                            <Link>
                                <i class="fa-brands fa-facebook-messenger"></i>
                            </Link>
                        </li>
                        <li className='menu-item-m pl-2 pr-2'>
                            <Link>
                                <div className="avatar-md ">
                                    <div className="img">
                                        <img src="https://uitheme.net/sociala/images/profile-4.png" alt="" />
                                    </div>
                                </div>
                            </Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Header;