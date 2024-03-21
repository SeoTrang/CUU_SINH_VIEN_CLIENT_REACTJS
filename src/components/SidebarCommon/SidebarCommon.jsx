import React from 'react';

import './SidebarCommon.css';
import { Link } from 'react-router-dom';
const SidebarCommon = () => {
    return (
        <div  className='side-bar-common shadow-lg hidden lg:block '>
            <div className="box-sb-common w-full rounded-md pt-3 pl-5 pr-5">
                <div className="title">

                </div>
                <ul className='nav-caption mt-5'>
                    <li className='nav-cap-item mb-3'>
                        <Link>
                            <div className="flex items-center">
                                <div className="icon bg-blue-gradiant">
                                    <i class="fa-solid fa-tv"></i>
                                </div>
                                <div className="text-value ml-3">
                                    Bài viết
                                </div>
                            </div>
                        </Link>
                    </li>
                    <li className='nav-cap-item mb-3'>
                        <Link>
                            <div className="flex items-center">
                                <div className="icon bg-red-gradiant">
                                    <i class="fa-solid fa-user"></i>
                                </div>
                                <div className="text-value ml-3">
                                    Bạn bè
                                </div>
                            </div>
                        </Link>
                    </li>
                    <li className='nav-cap-item mb-3'>
                        <Link>
                            <div className="flex items-center">
                                <div className="icon bg-gold-gradiant">
                                    <i class="fa-solid fa-globe"></i>
                                </div>
                                <div className="text-value ml-3">
                                    Bản tin
                                </div>
                            </div>
                        </Link>
                    </li>
                    <li className='nav-cap-item mb-3'>
                        <Link>
                            <div className="flex items-center">
                                <div className="icon bg-mini-gradiant">
                                    <i class="fa-solid fa-circle-play"></i>
                                </div>
                                <div className="text-value ml-3">
                                    Video
                                </div>
                            </div>
                        </Link>
                    </li>
                    <li className='nav-cap-item mb-3'>
                        <Link>
                            <div className="flex items-center">
                                <div className="icon bg-primary-gradiant">
                                    <i class="fa-brands fa-facebook-messenger"></i>
                                </div>
                                <div className="text-value ml-3">
                                    Nhắn tin
                                </div>
                            </div>
                        </Link>
                    </li>
                    <li className='nav-cap-item mb-3'>
                        <Link>
                            <div className="flex items-center">
                                <div className="icon bg-red-gradiant">
                                    <i class="fa-solid fa-layer-group"></i>
                                </div>
                                <div className="text-value ml-3">
                                    Thảo luận
                                </div>
                            </div>
                        </Link>
                    </li>
                </ul>
                <ul className='nav-caption mt-5'>
                    <li className='nav-cap-item mb-3'>
                        <Link>
                            <div className="flex items-center">
                                <div className="icon bg-blue-gradiant">
                                    <i class="fa-solid fa-tv"></i>
                                </div>
                                <div className="text-value ml-3">
                                    Bài viết
                                </div>
                            </div>
                        </Link>
                    </li>
                    <li className='nav-cap-item mb-3'>
                        <Link>
                            <div className="flex items-center">
                                <div className="icon bg-red-gradiant">
                                    <i class="fa-solid fa-user"></i>
                                </div>
                                <div className="text-value ml-3">
                                    Bạn bè
                                </div>
                            </div>
                        </Link>
                    </li>
                    <li className='nav-cap-item mb-3'>
                        <Link>
                            <div className="flex items-center">
                                <div className="icon bg-gold-gradiant">
                                    <i class="fa-solid fa-globe"></i>
                                </div>
                                <div className="text-value ml-3">
                                    Bản tin
                                </div>
                            </div>
                        </Link>
                    </li>
                    <li className='nav-cap-item mb-3'>
                        <Link>
                            <div className="flex items-center">
                                <div className="icon bg-mini-gradiant">
                                    <i class="fa-solid fa-circle-play"></i>
                                </div>
                                <div className="text-value ml-3">
                                    Video
                                </div>
                            </div>
                        </Link>
                    </li>
                    <li className='nav-cap-item mb-3'>
                        <Link>
                            <div className="flex items-center">
                                <div className="icon bg-primary-gradiant">
                                    <i class="fa-brands fa-facebook-messenger"></i>
                                </div>
                                <div className="text-value ml-3">
                                    Nhắn tin
                                </div>
                            </div>
                        </Link>
                    </li>
                    <li className='nav-cap-item mb-3'>
                        <Link>
                            <div className="flex items-center">
                                <div className="icon bg-red-gradiant">
                                    <i class="fa-solid fa-layer-group"></i>
                                </div>
                                <div className="text-value ml-3">
                                    Thảo luận
                                </div>
                            </div>
                        </Link>
                    </li>
                </ul>


                <div className='your-group mt-5'>
                    <div className="title">
                        Nhóm thảo luận
                    </div>

                    <ul className='mt-3'>
                        <li className='your-group-item'>
                            <Link>
                                <div className="group flex items-center">
                                    <div className="avatar">
                                        <img src="https://uitheme.net/sociala/images/user-12.png" alt="" />
                                    </div>
                                    <div className="name ml-2">
                                        Mohannad Zitoun
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

export default SidebarCommon;