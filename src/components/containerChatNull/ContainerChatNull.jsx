import React from 'react';

// Import Swiper React components
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

// import required modules
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import './ContainerChatNull.css';

const ContainerChatNull = () => {
    return (
        <div id='container-chat-null' className='container-chat-null w-full flex items-center justify-center'>
            <div className="box-chat-null w-full md:w-8/12 lg:w-7/12">
                <div className="header text-center">
                    <div className="title text-2xl font-medium">
                        <h1>Chào mừng đến với Zalo Chat!</h1>
                    </div>
                    <div className="des mt-3">
                        <div>
                            Khám phá những tiện ích hỗ trợ làm việc và trò chuyên cùng người thân, bạn bè được tối ưu hóa trải nghiệm cho bạn.
                        </div>
                    </div>

                </div>
                <div className="slider w-full mt-5 mb-5">
                    <Swiper
                    pagination={{
                    dynamicBullets: true,
                    }}
                    modules={[Pagination,Autoplay]}
                    className="mySwiper"
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                      }}
                    >
                        <SwiperSlide>
                            <div className="content-slider">
                                <div className="img flex items-center justify-center">
                                    <img src={import.meta.env.VITE_API_URL + '/img/resources/Conversation-1.svg'} alt="" />
                                </div>
                                <div className="text-bottom mt-3 text-center">
                                    <div className="text-big text-lg font-medium text-blue-600">
                                        Nhiều tin nhắn hơn, soạn thảo ít hơn
                                    </div>
                                    <div className="text-small">
                                        
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="content-slider">
                                    <div className="img flex items-center justify-center">
                                        <img src={import.meta.env.VITE_API_URL + '/img/resources/Conversation-2.svg'} alt="" />
                                    </div>
                                    <div className="text-bottom mt-3 text-center">
                                        <div className="text-big text-lg font-medium text-blue-600">
                                            Trải nghiệm xuyên suốt
                                        </div>
                                    </div>
                                </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="content-slider">
                                <div className="img flex items-center justify-center">
                                    <img src={import.meta.env.VITE_API_URL + '/img/resources/Conversation-3.svg'} alt="" />
                                </div>
                                <div className="text-bottom mt-3 text-center">
                                    <div className="text-big text-lg font-medium text-blue-600">
                                        Giải quyết công việc hiệu quả lên đến 40%
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className="content-slider">
                                <div className="img flex items-center justify-center">
                                    <img src={import.meta.env.VITE_API_URL + '/img/resources/Conversation-4.svg'} alt="" />
                                </div>
                                <div className="text-bottom mt-3 text-center">
                                    <div className="text-big text-lg font-medium text-blue-600">
                                        Chat nhóm với bạn bè, đồng nghiệp
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        
                    </Swiper>
                </div>

                <div className="footer">

                </div>
            </div>
    
        </div>
    );
};

export default ContainerChatNull;