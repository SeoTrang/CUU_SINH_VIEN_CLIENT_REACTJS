import RenderbgFile from "./RenderbgFile";

const renderMessageContent = (message) => {
    switch (message.type) {
      case 'text':
        return <span className="content-text">{message.content_messages[0].content}</span>;
        // break;
      case 'img':
          return (
          <div className="img-chat w-full">
            
            {
              message.content_messages.length > 1 ? 
              <div className="multiple">
                {
                  message.content_messages.map((img,index)=>{
                    return <img className="ml-1" key={index} src={import.meta.env.VITE_API_URL + img.content} alt="Image" />
                  })
                }
              </div>
              :
              <div className="single">
                {
                  message.content_messages.map((img,index)=>{
                    return <img key={index} src={import.meta.env.VITE_API_URL + img.content} alt="Image" />
                  })
                }
              </div>
              
            }
          </div>
          );
      case 'videos':
        return (
          <div className="video-chat w-full">
            
            {
              message.content.length > 1 ? 
              <div className="multiple">
                {
                  message.content.map((video,index)=>{
                    return (
                      <div className="mb-3">
                        <video width="400" key={index} controls>
                            <source src={video} type="video/mp4"></source>
                        </video>
                      </div>
                    )
                  })
                }
              </div>
              :
              <div className="single">
                {
                  message.content.map((video,index)=>{
                    return (
                    <div className="mb-3">
                      <video  key={index} controls>
                            {/* <source src={video} type="video/mp4"> */}
                            <source src={video} type="video/mp4"></source>
                          </video>
                    </div>
                    )
                  })
                }
              </div>
              
            }
          </div>
        );
      // Thêm các trường hợp khác nếu cần
      case 'file':
        // Lấy tên file
        // console.log(message)
        // console.log(message.content_messages[0]?.content);
        const fileName = message.content_messages[0]?.content.split('/').pop();

        // Lấy phần mở rộng của file
        const fileExtension = message.content_messages[0]?.content.split('.').pop();
        // console.log(fileName);
        // console.log(fileExtension);
        if(fileName && fileExtension){
          return RenderbgFile(message.content_messages[0]?.content, fileName, fileExtension);
        }
        return;
        // return <span className="content-file">{message.content_messages[0].content}</span>;
        
      default:
        return null;
    }
};




export default renderMessageContent;