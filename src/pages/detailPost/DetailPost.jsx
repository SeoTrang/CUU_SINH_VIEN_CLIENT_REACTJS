import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
// import { Button, Drawer, Radio, Space } from 'antd';

import SidebarCommon from "../../components/SidebarCommon/SidebarCommon";
import ItemPost from "../../components/post/itemPost/ItemPost";
import postAPI from "../../services/api/postAPI";
import EmojiConfig from "../../components/emoji/EmojiConfig";

import "./DetailPost.css";
import OptionRight from "../home/components/OptionRight";
import Comment from "../../components/comment/comment";
import fileAPI from "../../services/api/fileAPI";
import commentAPI from "../../services/api/commentAPI";

const DetailPost = () => {
  const { postId } = useParams();
  const [post, setPost] = useState();
  const [togglePicker, setTogglePicker] = useState(false);
  const [comment, setComment] = useState("");
  const textareaRef = useRef(null);
  const [selectionStartState, setSelectionStartState] = useState(0);
  const user = useSelector((state) => state.user.user);
  const [commentValid, setCommentValid] = useState(false);
  const [imgFile, setImgFile] = useState();
  const [videoFile, setVideoFile] = useState();
  const [previewImgUrl, setPreviewImgUrl] = useState();
  const [previewVideoUrl, setPreviewVideoUrl] = useState();
  const [refreshCommentApi, setRefreshCommentApi] = useState(false);
  


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
      const data = await postAPI.getPostById(postId);
      if (data.length > 0) {
        setPost(data[0]);
      }
    };
    fetchData();
  }, []);

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


  const handleSelect = (e) => {
    // console.log(e.target.selectionStart);
    setSelectionStartState(e.target.selectionStart);
  };

  const handleImageChange = (event) => {
    setPreviewImgUrl(null);
    setPreviewVideoUrl(null);
    setVideoFile(null);
    setImgFile(null);
    const file = event.target.files[0];
    const imageUrl = URL.createObjectURL(file);
    setPreviewImgUrl(imageUrl);
    setImgFile(file);
  };

  const handleVideoChange = (event) => {
    setPreviewImgUrl(null);
    setPreviewVideoUrl(null);
    setVideoFile(null);
    setImgFile(null);
    const file = event.target.files[0];
    const videoUrl = URL.createObjectURL(file);
    setPreviewVideoUrl(videoUrl);
    setVideoFile(file);
  };

  useEffect(() => {
      console.log(previewImgUrl);
  },[previewImgUrl]);

  const resetForm = () => {
    setComment('');
    setImgFile(null);
    setVideoFile(null);
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
      let contentTemp = [];
      if(content) contentTemp = [content];
      console.log(content);
      // post_id,comment,parent_id,content
      const resultComment = await commentAPI.create(postId,comment,null,content);
      console.log(resultComment);
      if(!resultComment) return
      setRefreshCommentApi(!refreshCommentApi);
      resetForm();
    }
  }
  return (
    <div id="detail-post">
      <SidebarCommon />
      <div className="content-common">
        <div id="content-common">
          <div id="containerHome" className="w-full">
            <div className="container-home">
              <div className="contaier-content-h">
                <div className="mt-3 w-full">
                  <ItemPost post_item={post} />
                  <div className="comment-bottom pl-3 pr-3 pt-3 pb-3 bg-white">
                    <div className="input-comment">
                      <div className="container-input flex">
                        <div className="user-left">
                          <div className="avatar-md">
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
                            id="img-input"
                            className="hidden"
                            type="file"
                            onChange={handleImageChange}
                            accept="image/*"
                          />

                          {/* Input để chọn tập tin video */}
                          <input
                            id="video-input"
                            className="hidden"
                            type="file"
                            onChange={handleVideoChange}
                            accept="video/*"
                          />

                          {previewImgUrl && (
                            <div className="preview-img w-full">
                              <img src={previewImgUrl} alt="" />
                            </div>
                          )}
                          {previewVideoUrl && (
                            <div>
                              <video
                                controls
                                style={{ maxWidth: "100%", maxHeight: "300px" }}
                              >
                                <source
                                  src={previewVideoUrl}
                                  type="video/mp4"
                                />
                                Your browser does not support the video tag.
                              </video>
                            </div>
                          )}
                          <div className="option-bottom flex justify-between items-center">
                            <div className="option-left flex items-center">
                              <div
                                className="option mr-2"
                                onClick={handleTogglePicker}
                              >
                                {/* <button onClick={handleTogglePicker}>😀</button> */}
                                <i class="fa-regular fa-face-smile"></i>
                              </div>
                              <label for="video-input" className="option mr-2">
                                <i class="fa-regular fa-circle-play"></i>
                              </label>
                              <label for="img-input" className="option mr-2">
                                <i class="fa-regular fa-image"></i>
                              </label>
                            </div>
                            <div
                              className={
                                "option-right " + (commentValid && "valid")
                              }
                            >
                              <i onClick={handleSubmitComment} class="fa-solid fa-paper-plane"></i>
                            </div>
                          </div>
                          {togglePicker && (
                            <EmojiConfig
                              handleSeleteEmoji={handleSeleteEmoji}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                    <Comment post_id={postId} refreshCommentApi={refreshCommentApi}/>
                    
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
     
      <OptionRight /> 
    </div>
  );
};

export default DetailPost;
