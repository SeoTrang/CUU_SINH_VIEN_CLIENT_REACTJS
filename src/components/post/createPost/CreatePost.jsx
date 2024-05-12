import React, { useRef, useState, useEffect } from "react";
import Draggable from "react-draggable";
import { Button, Modal } from "antd";
import TextField from "@mui/material/TextField";
import ContentPost from "../contentPost/ContentPost";
import PreviewMedia from "./PreviewMedia";
import ModalUserTag from "../modalUserTag/ModalUserTag";
import fileAPI from "../../../services/api/fileAPI";
import handleSubmitPost from "./handleSubmit";
import toast from "react-hot-toast";

const CreatePost = () => {
  const [newPostValue, setNewPostValue] = useState();
  const [mediasPreviewUrl, setMediasPreviewUrl] = useState([]);
  const [imgFile, setImgFile] = useState();
  const [videoFile, setVideoFile] = useState();
  const [ortherFile, setOrtherFile] = useState();
  const [userTagged,setUserTagged] = useState([]);

  const resetValue = () => {
    setNewPostValue("");
    setMediasPreviewUrl([]); 
    setImgFile(null);
    setVideoFile(null);
    setUserTagged([])
    setOrtherFile(null);
  }
//   useEffect(() => {
//     console.log(userTagged);
//   },[userTagged]);

  const handleImageChange = (e) => {
    e.preventDefault();

    const files = e.target.files;
    setImgFile(e.target.files);
    const previewUrls = [];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];

      // Tạo URL tạm thời cho hình ảnh
      const imageUrl = URL.createObjectURL(file);
      previewUrls.push({
        type: "img",
        content: imageUrl,
      });
    }

    setMediasPreviewUrl(previewUrls);
  };

  const handleVideoChange = (event) => {
    const file = event.target.files[0];
    console.log(event.target.files[0]);
    setVideoFile(event.target.files[0]);
    if (file && file.type.includes("video")) {
      const videoURL = URL.createObjectURL(file);
      setMediasPreviewUrl([
        {
          type: "video",
          content: videoURL,
        },
      ]);
    } else {
      setVideoPreview(null);
    }
  };

  const deleteFile = () => {
    setImgFile(null);
    setVideoFile(null);
    setOrtherFile(null);
    setMediasPreviewUrl([]);
  };

  useEffect(() => {
    console.log(mediasPreviewUrl);
  }, [mediasPreviewUrl]);

  // handle modal user tag
  const [open, setOpen] = useState(false);
  const [disabled, setDisabled] = useState(true);
  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  });
  const draggleRef = useRef(null);
  const showModal = () => {
    setOpen(true);
  };
  const handleOk = (e) => {
    console.log(e);
    setOpen(false);
  };
  const handleCancel = (e) => {
    console.log(e);
    setOpen(false);
  };
  const onStart = (_event, uiData) => {
    const { clientWidth, clientHeight } = window.document.documentElement;
    const targetRect = draggleRef.current?.getBoundingClientRect();
    if (!targetRect) {
      return;
    }
    setBounds({
      left: -targetRect.left + uiData.x,
      right: clientWidth - (targetRect.right - uiData.x),
      top: -targetRect.top + uiData.y,
      bottom: clientHeight - (targetRect.bottom - uiData.y),
    });
  };



//   hamdle submit
  const handleSumit = async() => {
    await handleSubmitPost(imgFile, videoFile, ortherFile, userTagged, newPostValue);
    toast.success('Bài viết của bạn đã được đăng !');
    resetValue();
  }
  return (
    <div className="create-post mt-3 mr-1 pt-5 pb-5 pl-4 pr-4 bg-white shadow-xss rounded-md">
      <div className="title mb-3 flex items-center">
        <div className="icon text-purple-500 border-solid border-purple-400">
          <i class="fa-solid fa-pencil"></i>
        </div>
        <div>
            <span className="ml-2 text-gray-400">Tạo mới bài viết</span>
            <span>
            {
                userTagged.length > 0 && 
                <span className="user-tag ml-1">
                    <span className='text-gray-400'>cùng với </span>
                    <span className='font-medium ml-1'>
                        {userTagged[0].user_name}
                    </span>
                    {
                        userTagged.length == 2 &&
                        <span className=''>
                            <span className='ml-1 mr-1 text-gray-400'>và</span>
                            <span className='font-medium ml-1'>
                                {userTagged[1].user_name}
                            </span>
                        </span>
                    }
                    
                    {
                        userTagged.length > 2 &&
                        <span className=''>
                            <span className='ml-1 mr-1 text-gray-400'>và</span>
                            <span className='font-medium ml-1'>
                                {(userTagged.length - 1)  }
                                <span className='ml-1'>
                                người khác
                                </span>
                            </span>
                        </span>
                    }
                </span>
            }
            </span>
        </div>
      </div>
      <div className="box-input-post flex pb-3 pr-3">
        <div className="avatar-md mt-3 ml-1">
          <img src="https://uitheme.net/sociala/images/user-8.png" alt="" />
        </div>
        <div className="input-field">
          <TextField
            id="outlined-textarea"
            onChange={(e) => {
              setNewPostValue(e.target.value);
            }}
            className="border-none"
            // label="Multiline Placeholder"
            placeholder="Bạn đang nghĩ gì thế 😊?"
            value={newPostValue}
            multiline
            fullWidth
            minRows={3}
          />

          {mediasPreviewUrl.length > 0 && <hr />}
          <div className="mt-5">
            {mediasPreviewUrl.length > 0 && (
              <div className="flex justify-end">
                <button onClick={deleteFile} className="text-red-500">
                  Xóa tất cả
                </button>
              </div>
            )}
            {mediasPreviewUrl.length > 0 ? (
              <PreviewMedia contents={mediasPreviewUrl} />
            ) : null}
          </div>
        </div>
      </div>

      <input
        className="hidden"
        type="file"
        id="file-img"
        accept="image/*"
        onChange={handleImageChange}
        multiple
      />
      <input
        className="hidden"
        type="file"
        id="file-video"
        onChange={handleVideoChange}
        accept="video/mp4, video/webm, video/ogg"
      />
      <input className="hidden" type="file" id="file" accept="*" />

      <div className="option-bottom w-full mt-3">
        <div className="flex">
          <label
            htmlFor="file-video"
            className="option mr-4 cursor-pointer flex items-center"
          >
            <div className="icon text-red-500 mr-2 text-xl">
              <i class="fa-regular fa-circle-play"></i>
            </div>
            <div className="text-title text-gray-500 hidden md:block">
              Video
            </div>
          </label>
          <label
            htmlFor="file-img"
            className="option mr-4 cursor-pointer flex items-center"
          >
            <div className="icon text-green-400 mr-2 text-xl">
              <i class="fa-regular fa-image"></i>
            </div>

            <div className="text-title text-gray-500 hidden md:block">
              Hình ảnh
            </div>
          </label>
          <label
            htmlFor="file"
            className="option mr-4 cursor-pointer flex items-center"
          >
            <div className="icon text-blue-500 mr-2 text-xl">
              <i class="fa-solid fa-paperclip"></i>
            </div>

            <div className="text-title text-gray-500 hidden md:block">File</div>
          </label>
          <div className="option mr-4 cursor-pointer flex items-center">
            <div className="icon text-yellow-500 mr-2 text-xl">
              <i class="fa-regular fa-face-smile"></i>
            </div>
            <div className="text-title text-gray-500 hidden md:block">
              Cảm xúc
            </div>
          </div>

          <div
            onClick={showModal}
            className="option mr-4 cursor-pointer flex items-center"
          >
            <div className="icon text-blue-500 mr-2 text-xl">
              <i class="fa-solid fa-user-tag"></i>
            </div>
            <div className="text-title text-gray-500 hidden md:block">
              Gắn thẻ
            </div>
          </div>
        </div>
      </div>

      {
        newPostValue || imgFile || videoFile || ortherFile ?
        <div className="btn-post mt-4">
            <button onClick={handleSumit} className="bg-blue-500 text-white pt-2 pb-2 w-full rounded-sm">
                Đăng bài
            </button>
        </div>
        :
        null
      }

      <Modal
        title={
          <div
            style={{
              width: "100%",
              cursor: "move",
            }}
            onMouseOver={() => {
              if (disabled) {
                setDisabled(false);
              }
            }}
            onMouseOut={() => {
              setDisabled(true);
            }}
            // fix eslintjsx-a11y/mouse-events-have-key-events
            // https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/blob/master/docs/rules/mouse-events-have-key-events.md
            onFocus={() => {}}
            onBlur={() => {}}
            // end
          >
            <i class="text-blue-500 fa-solid fa-user-tag"></i>
            <span className="ml-2">Gắn thẻ người khác</span>
          </div>
        }
        open={open}
        onOk={handleOk}
        okButtonProps={{ className: "btn-ok" }}
        onCancel={handleCancel}
        modalRender={(modal) => (
          <Draggable
            disabled={disabled}
            bounds={bounds}
            nodeRef={draggleRef}
            onStart={(event, uiData) => onStart(event, uiData)}
          >
            <div ref={draggleRef}>{modal}</div>
          </Draggable>
        )}
      >
        <div id="modal-user-tag">
            <ModalUserTag setUserTagged = {setUserTagged}/>
        </div>
      </Modal>
    </div>
  );
};

export default CreatePost;
