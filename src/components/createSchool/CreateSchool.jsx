import React, { useEffect, useState } from 'react';

import toast from 'react-hot-toast';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import TextField from '@mui/material/TextField';
import addressAPI from '../../services/api/addressAPI';
import schoolAPI from '../../services/api/schoolAPI';

const style = {
    position: 'absolute',
    top: '30%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width:600,
    bgcolor: 'background.paper',
    // border: '2px solid #000',
    boxShadow: 24,
    p: 4,
    borderRadius: 2,
    // transition: '0.2s',
  };

const CreateSchool = () => {
    // data
    const [addressData,setAddressData] = useState();

    const [openModal, setOpenModal] = useState(false);
    const handleOpenModal = () => setOpenModal(true);
    const handleCloseModal = () => setOpenModal(false);
    const [address, setAddress] = useState('');
    const [school,setSchool] = useState();

    const handleChange = (event) => {
        console.log(event.target.value);
        setAddress(event.target.value);
    };


     // api

     useEffect(()=> {
        const fetchData = async () => {
            try {
                const data = await addressAPI.getAll();
                console.log(data);
                // Xử lý dữ liệu ở đây
                setAddressData(data);
            } catch (error) {
                console.error('Error fetching data:', error);
                // Xử lý lỗi ở đây
            }
        };
    
        fetchData();
    },[])


    const handleSubmit = async() => {
        let result = await schoolAPI.create({address,school})
        if(result) {
            toast.success('Thêm trường học thành công !')
            return handleCloseModal();
        }
        toast.error('Thêm trường thất bại !');
    }
    
    return (
        <>
        <div className='create-school'>
            <div className="box-text text-sm flex">
                <span>Chưa có tên trường ? </span>
                <div 
                onClick={handleOpenModal}
                className='underline text-blue-600 cursor-pointer ml-2'>Tạo mới</div>
            </div>
        </div>

        <div>
            <Modal
                keepMounted
                open={openModal}
                onClose={handleCloseModal}
                aria-labelledby="keep-mounted-modal-title"
                aria-describedby="keep-mounted-modal-description"
                >
                <Box sx={style}>
                    <div className='title'>
                        <h5 className='font-medium text-lg'>
                            Thêm trường học mới
                        </h5>
                        <hr />

                        <div className="form mt-5">
                            <div className="address">
                                <FormControl fullWidth>
                                    <InputLabel id="demo-simple-select-label">Tỉnh</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={address}
                                        label="Tỉnh"
                                        onChange={handleChange}
                                    >
                                        {
                                            addressData &&
                                            addressData.map((value,index)=> {
                                                return <MenuItem key={index} value={value.id}>{value.name}</MenuItem>
                                            })
                                        }
                                    </Select>
                                </FormControl>
                            </div>

                            <div className="input-school mt-3">
                                <TextField 
                                fullWidth 
                                id="newSchool" 
                                label="Trường Học" 
                                onChange={(e) => {setSchool(e.target.value)}}
                                variant="outlined" />
                            </div>

                            <hr />

                            <div className="action-bottom w-full flex justify-end mt-5">
                                <div className='cancel ml-2'>
                                    <Button 
                                    onClick={handleCloseModal}
                                    variant="contained" color='error'>Hủy</Button>
                                </div>
                                <div className="add ml-2">
                                    <Button
                                    onClick={handleSubmit}
                                    variant="contained">Lưu lại</Button>
                                </div>

                            </div>
                            
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
        </>
    );
};

export default CreateSchool;