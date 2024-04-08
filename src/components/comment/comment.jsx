import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import EmojiConfig from "../emoji/EmojiConfig";
import commentAPI from "../../services/api/commentAPI";
import ultilFucntion from "../../util/ultil";
import fileAPI from "../../services/api/fileAPI";
const Comment = ({post_id,refreshCommentApi}) => {
  const { postId } = useParams();
  console.log(post_id);
  const [comments, setComments] = useState();
  const [togglePicker, setTogglePicker] = useState(false);
  const [comment, setComment] = useState("");
  const textareaRef = useRef(null);
  const [selectionStartState, setSelectionStartState] = useState(0);
  const user = useSelector((state) => state.user.user);
  const [commentValid, setCommentValid] = useState(false);
  const [imgFile, setImgFile] = useState();
  const [videoFile, setVideoFile] = useState();
  const [previewImgUrl1, setPreviewImgUrl1] = useState();
  const [previewVideoUrl1, setPreviewVideoUrl1] = useState();
  const [refreshApi, setRefreshApi] = useState(false);

  // input comment
  const [replyInputIndex, setReplyInputIndex] = useState(-1);


  const resizeTextarea = () => {
    const textarea = textareaRef.current;
    textarea.style.height = "auto"; // Đặt chiều cao về auto để tính toán lại kích thước thực tế
    textarea.style.height = textarea.scrollHeight + "px"; // Đặt chiều cao dựa trên scrollHeight
  };

  const insertEmojiAtCursorPosition = (emoji) => {
    if (textareaRef.current) {
      const newText = `${comment.substring(
        0,
        selectionStartState
      )}${emoji}${comment.substring(selectionStartState)}`;
      setComment(newText);
    } else {
      console.log("not current");
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await commentAPI.getCommentByPostID(post_id);
      if (data.length > 0) {
        const comments_temp = ultilFucntion.sortCommentsByHierarchy(data);
        console.log(comments_temp);
        setComments(comments_temp)
      }
    };
    fetchData();
  }, [post_id,refreshCommentApi,refreshApi]);

  const handleTogglePicker = () => {
    setTogglePicker(!togglePicker);
  };

  const handleSeleteEmoji = (emoji) => {
    insertEmojiAtCursorPosition(emoji);
  };

  const checkCommentValid = () => {
    // console.log(comment.trim().length);
    if (comment.trim().length > 0) {
      setCommentValid(true);
    } else setCommentValid(false);
  };

  const handleTextareaChange = (e) => {
    setComment(e.target.value);
    // console.log(e.target.value);
    checkCommentValid();
    resizeTextarea();
  };


  const handleReplyClick = (index) => {
    setReplyInputIndex(index); // Cập nhật chỉ số của comment đang được phản hồi
  };

  const handleSelect = (e) => {
    // console.log(e.target.selectionStart);
    setSelectionStartState(e.target.selectionStart);
  };

  const handleImageChange = (event) => {
    setPreviewImgUrl1(null);
    setPreviewVideoUrl1(null);
    setVideoFile(null);
    setImgFile(null);
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setPreviewImgUrl1(imageUrl);
    setImgFile(file);
  };

  const handleVideoChange = (event) => {
    setPreviewImgUrl1(null);
    setPreviewVideoUrl1(null);
    setVideoFile(null);
    setImgFile(null);
    const file = event.target.files[0];
    const videoUrl = URL.createObjectURL(file);
    setPreviewVideoUrl1(videoUrl);
    setVideoFile(file);
  };


  const resetForm = () => {
    setComment('');
    setImgFile(null);
    setVideoFile(null);
    setPreviewImgUrl1(null);
    setPreviewVideoUrl1(null);
  }

  const handleSubmitComment = async () => {
    
    let content = null;
    if(imgFile){
      let result = await fileAPI.uploadMultiple([imgFile]);
      console.log(result);
      content = {
        url: result[0],
        type: 'img'
      }
    }else if(videoFile){
      let result = await fileAPI.uploadMultiple([videoFile]);
      console.log(result);
      content = {
        url: result[0],
        type: 'video'
      }
    }
    if(comment) {
      console.log(comment);
      console.log(content);
      console.log(post_id);
      console.log(replyInputIndex);
      // post_id,comment,parent_id,content
      const resultComment = await commentAPI.create(post_id,comment,replyInputIndex,content);
      console.log(resultComment);
      if(!resultComment) return
      resetForm();
      setRefreshApi(!refreshApi);

    }
  }
  return (
    <div className="box-comment mt-3">
      {
        comments && 
        comments.map((value,index) => {
          return (
            <div key={index} className="item-comment mt-3">
        <div className="w-full flex">
          <div className="user-left">
            <div className="avatar-md">
              <img src={import.meta.env.VITE_API_URL + value.user.avatar} alt="" />
            </div>
          </div>
          <div className="box-comment-right">
            <span className="secction-top ">
              <span className="user-name text-sm font-medium">{value.user.user_name}</span>
              <span className="comment text-sm">{value.comment}</span>
            </span>
            {
              value?.post_comment_contents && value.post_comment_contents.length > 0 ? 
              <div className="content-comment">
                {
                  value.post_comment_contents[0].type == 'img' ?
                  <div className="img">
                    <img className="rounded-md" src={import.meta.env.VITE_API_URL + value.post_comment_contents[0].content} alt="" />
                  </div>
                  :
                  <div className="video">
                      <video
                        className="rounded-md"
                        controls
                        style={{ maxWidth: "100%", maxHeight: "300px" }}
                      >
                        <source src={import.meta.env.VITE_API_URL +value.post_comment_contents[0].content} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                }

              </div>
              :
              null
            }
            <div className="option-bottom text-sm w-full flex items-center justify-between">
              <div className="left flex">
                <div className="time">3 ngày</div>
                <div className="reply ml-3" onClick={() => handleReplyClick(value.id)}>
                  Trả lời
                </div>
              </div>
              <div className="reaction flex items-center">
                <div className="icon">
                  <i class="fa-regular fa-heart"></i>
                  {/* <i class="fa-solid fa-heart"></i> */}
                </div>
                <div className="length-reaction ml-2">{value.comment_reactions.length}</div>
              </div>
            </div>
          </div>
        </div>

        {
          value?.replies && 
          value.replies.map((value2,index2) => {
             return (
              <div className="children ml-5" key={index2}>
          <div className="item-comment mt-3">
            <div className="w-full flex">
              <div className="user-left">
                <div className="avatar-base">
                  <img
                    src={import.meta.env.VITE_API_URL + value2.user.avatar}
                    alt=""
                  />
                </div>
              </div>
              <div className="box-comment-right">
                <span className="secction-top ">
                  <span className="user-name text-sm font-medium">
                    {value2.user.user_name}
                  </span>
                  <span className="comment text-sm">{value2.comment}</span>
                </span>
                {
              value?.post_comment_contents && value.post_comment_contents.length > 0 ? 
              <div className="content-comment">
                {
                  value2.post_comment_contents[0].type == 'img' ?
                  <div className="img">
                    <img className="rounded-md" src={import.meta.env.VITE_API_URL + value2.post_comment_contents[0].content} alt="" />
                  </div>
                  :
                  <div className="video">
                      <video
                        className="rounded-md"
                        controls
                        style={{ maxWidth: "100%", maxHeight: "300px" }}
                      >
                        <source src={import.meta.env.VITE_API_URL +value2.post_comment_contents[0].content} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                }

              </div>
              :
              null
            }
                <div className="option-bottom text-sm w-full flex items-center justify-between">
                  <div className="left flex">
                    <div className="time">3 ngày</div>
                    <div
                      className="reply ml-3"
                      onClick={() => handleReplyClick(value.id)}
                    >
                      Trả lời
                    </div>
                  </div>
                  <div className="reaction flex items-center">
                    <div className="icon">
                      <i class="fa-regular fa-heart"></i>
                      {/* <i class="fa-solid fa-heart"></i> */}
                    </div>
                    <div className="length-reaction ml-2">{
                      value.comment_reactions.length
                    }</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
        </div>
             )
          })
        }
        {replyInputIndex == value.id && ( // Hiển thị input phản hồi nếu replyInputIndex === index
        <div className="children ml-5">
          <div className="input-comment mt-3">
              <div className="container-input flex">
                <div className="user-left">
                  <div className="avatar-base">
                    <img
                      src={import.meta.env.VITE_API_URL + user?.avatar}
                      alt=""
                    />
                  </div>
                </div>
                <div className="box-input-right">
                  <textarea
                    className="w-full"
                    type="text"
                    placeholder="Viết bình luận..."
                    value={comment}
                    onSelect={handleSelect}
                    onChange={handleTextareaChange}
                    ref={textareaRef}
                  />

                  {/* Input để chọn tập tin ảnh */}
                  <input
                    id="img-input-1"
                    className="hidden"
                    type="file"
                    onChange={handleImageChange}
                    accept="image/*"
                  />

                  {/* Input để chọn tập tin video */}
                  <input
                    id="video-input-1"
                    className="hidden"
                    type="file"
                    onChange={handleVideoChange}
                    accept="video/*"
                  />

                  {previewImgUrl1 && (
                    <div className="preview-img w-full">
                      <img src={previewImgUrl1} alt="" />
                    </div>
                  )}
                  {previewVideoUrl1 && (
                    <div>
                      <video
                        controls
                        style={{ maxWidth: "100%", maxHeight: "300px" }}
                      >
                        <source src={previewVideoUrl1} type="video/mp4" />
                        Your browser does not support the video tag.
                      </video>
                    </div>
                  )}
                  <div className="option-bottom flex justify-between items-center">
                    <div className="option-left flex items-center">
                      <div className="option mr-2" onClick={handleTogglePicker}>
                        {/* <button onClick={handleTogglePicker}>😀</button> */}
                        <i class="fa-regular fa-face-smile"></i>
                      </div>
                      <label for="video-input-1" className="option mr-2">
                        <i class="fa-regular fa-circle-play"></i>
                      </label>
                      <label for="img-input-1" className="option mr-2">
                        <i class="fa-regular fa-image"></i>
                      </label>
                    </div>
                    <div
                      className={"option-right " + (commentValid && "valid")}
                    >
                      <i onClick={handleSubmitComment} class="fa-solid fa-paper-plane"></i>
                    </div>
                  </div>
                  {togglePicker && (
                    <EmojiConfig handleSeleteEmoji={handleSeleteEmoji} />
                  )}
                </div>
              </div>
            </div>
        </div>
            
          )}
      </div>
          )
        })
      }
      
     
    </div>
  );
};

export default React.memo(Comment);
