import React, { useRef, useState, useEffect } from "react";
import Draggable from "react-draggable";
import { Button, Modal } from "antd";

import './ModalUserReaction.css';
import postAPI from "../../services/api/postAPI";
import ItemUser from "../itemUser/ItemUser";
const ModalUserReaction = ({open,post_id,setOpenModalReaction}) => {

    const [reactionData,setReactionData] = useState([]);
  // handle modal user tag
  
  const [disabled, setDisabled] = useState(true);
  const [bounds, setBounds] = useState({
    left: 0,
    top: 0,
    bottom: 0,
    right: 0,
  });
  const draggleRef = useRef(null);
//   const showModal = () => {
//     // setOpen(true);

//   };
  const handleOk = (e) => {
    console.log(e);
    setOpenModalReaction(false);
  };
  const handleCancel = (e) => {
    console.log(e);
    setOpenModalReaction(false);
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
  
  useEffect(() => {
    // console.log("======== testing");
    // console.log(post_id);
    async function fetchData() {
        let result = await postAPI.getReactionByPost(post_id);
        if(result) setReactionData(result);
    }
    fetchData();
  },[post_id]);

  useEffect(() => {
    // console.log(reactionData);
  },[reactionData]);
    return (
        <>
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
                    <i class="text-red-500 fa-solid fa-heart"></i>
                    <span className="ml-2">Người bày tỏ cảm xúc</span>
                </div>
                }
                open={open}
                onOk={handleOk}
                okButtonProps={{ className: "btn-ok" }}
                onCancel={handleCancel}
                cancelButtonProps={{className: 'hidden'}}
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
                <div id="modal-user-reaction">
                    <div className='modal-user-reaction pr-2 mt-3'>
                        {
                            reactionData.length > 0 &&
                            reactionData.map((reaction)=> {
                                return (
                                    <div className="item-reaction flex items-center justify-between">
                                        <div className="user">
                                            <ItemUser item={reaction.user}/>
                                        </div>
                                        <div className="icon">
                                            <i class="text-red-500 fa-solid fa-heart"></i>
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default ModalUserReaction;