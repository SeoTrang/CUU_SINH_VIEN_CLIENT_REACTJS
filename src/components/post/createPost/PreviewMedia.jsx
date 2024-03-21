import React from 'react';

const PreviewMedia = ({contents}) => {
    console.log(contents);
    return (
        <div className="content-post mt-3">
            
            <div className="content-item-post flex flex-wrap justify-between">
                
            {
                    // contents.length > 0 && < 2
                    (contents.length == 1 ) &&
                    contents.map((content) => {
                        console.log(content);
                        return (
                            content.type == 'img' ?
                            <img className='rounded-md' src={content.content} alt="" />
                            :
                            content.type == 'video'?
                            <video className='w-full rounded-md' autoPlay controls>
                                <source src={content.content} type="video/mp4"/>
                            </video>
                            :
                            null
                            
                        )
                    })
                }
                {
                    // contents.length > 0 && < 2
                    (contents.length == 3) &&
                    contents.map((content) => {
                        console.log(content);
                        return (
                            <div className='img w-33 '>
                                <img className='rounded-md w-full' src={content.content} alt="" />
                            </div>
                        )
                    })
                }

{
                    // contents.length > 0 && < 2
                    (contents.length == 2 || contents.length == 4) &&
                    contents.map((content) => {
                        console.log(content);
                        return (
                            <div className='img w-49_5 '>
                                <img className='rounded-md w-full' src={content.content} alt="" />
                            </div>
                        )
                    })
                }

                {
                    (contents.length == 5) &&
                    contents.map((content,index) => {
                        
                        return (
                            
                                <div className='img w-33'>
                                    <img className='rounded-md w-full' src={content.content} alt="" />
                                </div>
                            
                            
                            
                        )
                    })
                }

                {
                    // contents.length > 0 && < 2
                    
                    (contents.length > 4) &&
                    contents.map((content,index) => {
                        console.log(content);

                        return (
                            
                                index < 2
                                ? 
                                <div className='w-49_5'>
                                    <img className='rounded-md w-full' src={content.content} alt="" /> 
                                </div>
                                : 
                                index == 4
                                    ? 
                                    <div className='w-33 relative'>
                                        <img className='rounded-md w-full' src={content.content} alt="" />
                                        <div className='w-full h-full img-count absolute top-0 z-10'>
                                            <div className='w-full h-full flex items-center justify-center text-white font-medium'>
                                                +{contents.length - (index+1)}
                                            </div>
                                        </div>
                                    </div>
                                    :
                                    index <= 3 &&
                                    <div className='w-33'>
                                        <img className='rounded-md w-full' src={content.content} alt="" />
                                    </div>
                            
                            
                        )
                    })
                }

                
            </div>
        </div>
    );
};

export default PreviewMedia;


{/* <video className='w-full rounded-md' autoPlay controls>
                                <source src={content.content} type="video/mp4"/>
                            </video> */}