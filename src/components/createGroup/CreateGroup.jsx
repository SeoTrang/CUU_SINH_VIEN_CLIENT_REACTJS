import React, { useEffect, useState } from "react";

import { Modal } from "antd";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import toast from 'react-hot-toast';

import addressAPI from "../../services/api/addressAPI";
import schoolAPI from "../../services/api/schoolAPI";
import conversationAPI from "../../services/api/conversationAPI";

const CreateGroup = () => {
  // data
  const [addressData, setAddressData] = useState();
  const [schoolData, setSchoolData] = useState();
  // state
  const [address, setAddress] = useState("");
  const [school, setSchool] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [groupName, setGroupName] = useState();

  const showModal = () => {
    setIsModalOpen(true);
  };

  

  

  const handleChangeAddress = async (event) => {
    console.log(event.target.value);
    setAddress(event.target.value);
    let result = await schoolAPI.getByAddress(event.target.value);
    if (result) setSchoolData(result);
  };

  // handle school
  const handleChangeSchool = (event) => {
    console.log(event.target.value);
    setSchool(event.target.value);
  };

  // api

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await addressAPI.getAll();
        console.log(data);
        // Xử lý dữ liệu ở đây
        setAddressData(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        // Xử lý lỗi ở đây
      }
    };

    fetchData();
  }, []);


  const handleOk = async() => {
    

    console.log(address);
    console.log(school);
    console.log(groupName);
    if(!groupName || !school) return toast.error('Vui lòng điền đầy đủ thông tin !');
    let result = await conversationAPI.CreateGroup({address,school,groupName})
    
    if(result) {
      setIsModalOpen(false);
      return toast.success('Nhóm đang chờ phê duyệt !')
    }
    return toast.error('Có vấn đề khi tạo nhóm !');
    
    
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };
  

  return (
    <>
      <Button
        onClick={showModal}
        className="w-full"
        variant="contained"
        size="medium"
      >
        <i class="fa-solid fa-plus"></i>
        <span className="ml-2">Tạo Nhóm Mới</span>
      </Button>
      <Modal
        title="Thêm nhóm mới"
        open={isModalOpen}
        onOk={handleOk}
        okText={"Lưu lại"}
        cancelText={"Hủy"}
        onCancel={handleCancel}
        className="modal-with-background"
      >
        <div className="create-new-group">
          <div className="address w-12/12">
            <FormControl
              fullWidth
              variant="standard"
              sx={{ m: 1, minWidth: 120 }}
            >
              <InputLabel id="demo-simple-select-label">Tỉnh</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={address}
                label="Tỉnh"
                onChange={handleChangeAddress}
              >
                {addressData &&
                  addressData.map((value, index) => {
                    return (
                      <MenuItem key={index} value={value.id}>
                        {value.name}
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
          </div>
          <div className="address w-12/12">
            <FormControl
              fullWidth
              variant="standard"
              sx={{ m: 1, minWidth: 120 }}
            >
              <InputLabel id="demo-simple-select-label">Trường</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={school}
                label="Trường"
                onChange={handleChangeSchool}
              >
                {schoolData &&
                  schoolData.map((value, index) => {
                    return (
                      <MenuItem key={index} value={value.id}>
                        {value.name}
                      </MenuItem>
                    );
                  })}
              </Select>
            </FormControl>
          </div>
          <div className="mt-3">
            <TextField
              id="outlined-basic"
              label="Tên nhóm..."
              variant="outlined"
              value={groupName}
              onChange={(e) => {setGroupName(e.target.value)}}
              fullWidth
            />
          </div>
        </div>
      </Modal>
    </>
  );
};

export default CreateGroup;
